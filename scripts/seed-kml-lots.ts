import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { kml } from '@tmcw/togeojson'
import { DOMParser } from '@xmldom/xmldom'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadEnv() {
  try {
    const env = readFileSync(path.join(__dirname, '../.env.local'), 'utf-8')
    for (const line of env.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let value = trimmed.slice(eqIdx + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  } catch (e) {}
}
loadEnv()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const kmlFiles = [
  { slug: 'dunah', file: 'doc.kml' },
  { slug: 'el-quelele', file: 'quelele.kml' },
  { slug: 'quintaesencia', file: 'quintaesencia.kml' },
  { slug: 'quercus-baja', file: 'quercus.kml' }
]

async function seedKmlLots() {
  console.log('🔄 Borrando lotes actuales (ejemplos falsos)...')
  
  // Borrar todos los lotes actuales para no duplicar
  const existingLots = await client.fetch('*[_type == "projectLot"]{ _id }')
  for (const lot of existingLots) {
    await client.delete(lot._id)
  }
  console.log(`✅ ${existingLots.length} lotes antiguos borrados.`)

  console.log('🗺️  Procesando archivos KML...')
  
  let totalLots = 0

  for (const item of kmlFiles) {
    const kmlPath = path.join(__dirname, '../public', item.file)
    
    if (!existsSync(kmlPath)) {
      console.warn(`⚠️ Archivo ${item.file} no encontrado. Omitiendo ${item.slug}.`)
      continue
    }

    const kmlContent = readFileSync(kmlPath, 'utf-8')
    const kmlDoc = new DOMParser().parseFromString(kmlContent, 'text/xml')
    
    const geoJson = kml(kmlDoc)
    
    if (!geoJson || !geoJson.features) {
      console.warn(`⚠️ No se pudieron extraer features de ${item.file}`)
      continue
    }

    // Filtrar solo polígonos
    const polygons = geoJson.features.filter(f => f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon'))
    
    console.log(`➡️  Proyecto ${item.slug}: ${polygons.length} lotes encontrados.`)

    for (const feature of polygons) {
      // Usar el nombre original del KML (o generar uno si no tiene)
      const lotId = feature.properties?.name || `Lote-${totalLots + 1}`
      
      const sanityLot = {
        _type: 'projectLot',
        lotId: lotId,
        project: {
          _type: 'reference',
          _ref: `project-${item.slug}`
        },
        geoJsonFeature: JSON.stringify(feature),
        status: 'available',
        area: 'Consultar',
        price: 'Consultar',
        zone: 'General',
        view: 'Consultar',
      }

      await client.create(sanityLot)
      totalLots++
    }
  }

  console.log(`\n🎉 Proceso completado. Se subieron ${totalLots} lotes reales a Sanity.`)
}

seedKmlLots().catch(console.error)
