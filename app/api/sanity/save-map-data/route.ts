import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { writeClient } from '@/sanity/lib/client'

/**
 * API Route: POST /api/sanity/save-map-data
 * 
 * Permite que el Modo Editor del mapa guarde los cambios directamente en Sanity.
 * Usa el writeClient (con token) que NUNCA se expone al navegador.
 * 
 * Body esperado:
 * {
 *   projectSlug: string,        // Slug del proyecto (ej: "dunah")
 *   imageCoords?: [lng, lat][], // Coordenadas de la imagen overlay (4 puntos)
 *   lots?: {                    // Array de lotes con su GeoJSON actualizado
 *     lotId: string,
 *     geoJsonFeature: string,
 *     status?: string,
 *     area?: string,
 *     price?: string,
 *     zone?: string,
 *     view?: string,
 *   }[]
 * }
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verificar que el token existe (seguridad básica server-side)
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'Token de escritura no configurado' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { projectSlug, imageCoords, lots } = body

    if (!projectSlug) {
      return NextResponse.json(
        { error: 'Se requiere projectSlug' },
        { status: 400 }
      )
    }

    // 2. Buscar el documento del proyecto en Sanity
    const projectDoc = await writeClient.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ _id, name }`,
      { slug: projectSlug }
    )

    if (!projectDoc) {
      return NextResponse.json(
        { error: `Proyecto "${projectSlug}" no encontrado en Sanity` },
        { status: 404 }
      )
    }

    const results: string[] = []

    // 3. Guardar coordenadas de la imagen overlay (si se enviaron)
    if (imageCoords && Array.isArray(imageCoords) && imageCoords.length === 4) {
      const mappedCoords = imageCoords.map(([lng, lat]: [number, number]) => ({ lng, lat }))

      await writeClient
        .patch(projectDoc._id)
        .set({ mapImageOverlayCoords: mappedCoords })
        .commit()

      results.push(`✅ Coordenadas de imagen actualizadas para ${projectDoc.name}`)
    }

    // 4. Guardar y Sincronizar lotes
    if (lots && Array.isArray(lots)) {
      // 4a. Buscar todos los lotes actuales de este proyecto en Sanity (con todos los campos para comparar)
      const allExistingLots = await writeClient.fetch(
        `*[_type == "projectLot" && project._ref == $projectId]{ _id, lotId, geoJsonFeature, status, area, price, zone, view }`,
        { projectId: projectDoc._id }
      )

      const incomingLotIds = new Set(lots.map((l: any) => l.lotId))
      const transaction = writeClient.transaction()
      let patchesCount = 0;
      let createsCount = 0;
      let deletesCount = 0;

      // 4b. Procesar creaciones y actualizaciones
      for (const lot of lots) {
        const existingLot = allExistingLots.find((l: any) => l.lotId === lot.lotId)

        if (existingLot) {
          // Comparar si hubo cambios reales
          const incomingStatus = lot.status || 'available'
          const incomingArea = lot.area || 'Consultar'
          const incomingPrice = lot.price || 'Consultar'
          const incomingZone = lot.zone || 'General'
          const incomingView = lot.view || 'Vista al desarrollo'

          const hasChanges = 
            existingLot.geoJsonFeature !== lot.geoJsonFeature ||
            existingLot.status !== incomingStatus ||
            existingLot.area !== incomingArea ||
            existingLot.price !== incomingPrice ||
            existingLot.zone !== incomingZone ||
            existingLot.view !== incomingView;

          if (hasChanges) {
            transaction.patch(existingLot._id, (p) => p.set({
              geoJsonFeature: lot.geoJsonFeature,
              status: incomingStatus,
              area: incomingArea,
              price: incomingPrice,
              zone: incomingZone,
              view: incomingView,
            }))
            patchesCount++;
          }
        } else {
          // Crear nuevo lote
          transaction.create({
            _type: 'projectLot',
            lotId: lot.lotId,
            project: { _type: 'reference', _ref: projectDoc._id },
            geoJsonFeature: lot.geoJsonFeature,
            status: lot.status || 'available',
            area: lot.area || 'Consultar',
            price: lot.price || 'Consultar',
            zone: lot.zone || 'General',
            view: lot.view || 'Vista al desarrollo',
          })
          createsCount++;
        }
      }

      // 4c. Procesar eliminaciones (lotes en Sanity que ya no vienen en el mapa)
      const lotsToDelete = allExistingLots.filter((l: any) => !incomingLotIds.has(l.lotId))
      for (const lotToDelete of lotsToDelete) {
        transaction.delete(lotToDelete._id)
        deletesCount++;
      }

      // Ejecutar la transacción si hay operaciones
      if (patchesCount > 0 || createsCount > 0 || deletesCount > 0) {
        await transaction.commit()
        results.push(`✅ ${createsCount} creados, ${patchesCount} actualizados, ${deletesCount} eliminados`)
      } else {
        results.push(`✅ Sin cambios requeridos en Sanity`)
      }
    }

    // Invalidar caché globalmente si hubo cualquier cambio (coordenadas de imagen o lotes)
    if (results.length > 0) {
      revalidatePath(`/proyectos/${projectSlug}`)
      revalidatePath(`/proyectos`)
    }

    return NextResponse.json({
      success: true,
      message: results.join(' | '),
      project: projectDoc.name,
      timestamp: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('[save-map-data] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
