import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { projectsData, lotsData } from '../lib/projects-data'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local
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
  } catch (e) {
    console.error('No se pudo cargar .env.local:', e.message)
  }
}
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId || !token) {
  console.error('❌ Faltan variables de entorno: NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-02',
  token,
  useCdn: false,
})

// Helper to download a remote file and return a buffer
async function fetchAssetBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

// Helper to upload an asset to Sanity (either 'image' or 'file' for video)
async function uploadAsset(urlOrPath, type = 'image') {
  if (!urlOrPath) return undefined

  try {
    let buffer
    let filename

    if (urlOrPath.startsWith('http')) {
      console.log(`  ⬇️  Descargando asset remoto: ${urlOrPath.split('?')[0]}`)
      buffer = await fetchAssetBuffer(urlOrPath)
      filename = urlOrPath.split('/').pop().split('?')[0]
    } else {
      console.log(`  📂  Cargando asset local: ${urlOrPath}`)
      const fullPath = path.join(__dirname, '../public', urlOrPath)
      buffer = readFileSync(fullPath)
      filename = path.basename(fullPath)
    }

    const asset = await client.assets.upload(type, buffer, { filename })
    console.log(`  ✅ Asset subido: ${asset.url}`)
    
    return {
      _type: type === 'image' ? 'image' : 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`  ❌ Error al subir asset ${urlOrPath}:`, error.message)
    return undefined
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Iniciando seed completo de Sanity...\n')

  // 1. Global Config
  console.log('📋 Creando configuración global...')
  const globalConfigData = {
    _type: 'globalConfig',
    _id: 'globalConfig',
    siteName: 'Quercus',
    contactEmail: 'info@quercus.mx',
    notificationsEmail: 'notificaciones@quercus.mx',
    footerDescription: 'Creando comunidades regenerativas en Baja California Sur.',
    socialLinks: [
      { _key: 'instagram', platform: 'Instagram', url: 'https://instagram.com/quercus' },
      { _key: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/quercus' },
      { _key: 'youtube', platform: 'YouTube', url: 'https://youtube.com/quercus' },
    ],
  }
  await client.createOrReplace(globalConfigData)
  console.log('  ✅ globalConfig\n')

  // 2. Home Page
  console.log('🏠 Creando página de inicio...')
  const homePageData = {
    _type: 'homePage',
    _id: 'homePage',
    heroTitle: 'Comunidades regenerativas en Baja California Sur',
    heroSubtitle: 'Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza.',
    heroCta1Label: 'Explorar comunidades',
    heroCta2Label: 'Conocer la filosofía',
    heroLocationBadge: 'Baja California Sur · México',
    editorialHeadline: 'Quercus desarrolla comunidades de baja densidad donde la naturaleza, el bienestar y la inversión patrimonial conviven en equilibrio.',
    editorialParagraph: 'Durante más de dos décadas, hemos creado entornos regenerativos diseñados para quienes buscan vivir con propósito, invertir con visión y formar parte de una comunidad consciente.',
    editorialSectionLabel: 'Regeneración',
    editorialSectionTitle: 'Diseñar con respeto por el territorio',
    editorialSectionText: 'Cada comunidad se concibe desde una relación consciente con el paisaje, promoviendo baja densidad, integración arquitectónica, respeto por la vegetación endémica y una forma de habitar más responsable.',
    principles: [
      { _key: 'p1', title: 'Baja densidad', desc: 'Espacios amplios que respetan el entorno natural' },
      { _key: 'p2', title: 'Integración con el paisaje', desc: 'Arquitectura que dialoga con el territorio' },
      { _key: 'p3', title: 'Bajo impacto', desc: 'Construcción responsable y materiales locales' },
      { _key: 'p4', title: 'Bienestar comunitario', desc: 'Diseño pensado para la conexión humana' },
      { _key: 'p5', title: 'Conservación', desc: 'Protección de la vegetación endémica' },
    ],
    stats: [
      { _key: 's1', number: '20+', label: 'Años de experiencia' },
      { _key: 's2', number: '5', label: 'Comunidades activas' },
      { _key: 's3', number: '1000+', label: 'Hectáreas desarrolladas' },
      { _key: 's4', number: '∞', label: 'Compromiso con la naturaleza' },
    ],
    contactTitle: 'Encuentra tu lugar en Quercus',
    contactSubtitle: 'Gracias por tu interés en los desarrollos de Quercus. Completa tus datos y selecciona el proyecto que te interesa.',
    testimonials: [],
  }
  await client.createOrReplace(homePageData)
  console.log('  ✅ homePage\n')

  // 3. Proyectos
  console.log('🏡 Creando proyectos con assets reales...')
  for (const project of projectsData) {
    console.log(`\n➡️ Procesando proyecto: ${project.name}`)
    
    // Create Sanity project document base
    const sanityProject = {
      _type: 'project',
      _id: `project-${project.slug}`,
      name: project.name,
      slug: { _type: 'slug', current: project.slug },
      location: project.location,
      region: project.region,
      tagline: project.tagline,
      description: project.description,
      status: project.status,
      stats: project.stats.map((s, i) => ({ _key: `s${i}`, label: s.label, value: s.value })),
      amenities: project.amenities,
      coordinates: project.coordinates,
      nearbyPlaces: project.nearbyPlaces?.map((np, i) => ({ _key: `np${i}`, name: np.name, distance: np.distance })) || [],
    }

    // Upload Main Image
    if (project.image) {
      console.log('  Subiendo imagen principal...')
      sanityProject.image = await uploadAsset(project.image, 'image')
    }

    // Upload Logo
    if (project.logo) {
      console.log('  Subiendo logo...')
      sanityProject.logo = await uploadAsset(project.logo, 'image')
    }

    // Upload Video
    if (project.video) {
      console.log('  Subiendo video (hover)...')
      sanityProject.video = await uploadAsset(project.video, 'file')
    }

    // Upload Hero Video
    if (project.heroVideo) {
      console.log('  Subiendo hero video...')
      sanityProject.heroVideo = await uploadAsset(project.heroVideo, 'file')
    }

    // Map Image Overlay for Dunah and Quelele
    if (project.slug === 'dunah') {
      sanityProject.mapImageOverlayCoords = [
        { _key: 'c1', lng: -110.70714266576692, lat: 23.81281604288452 },
        { _key: 'c2', lng: -110.69544243149925, lat: 23.80000604943828 },
        { _key: 'c3', lng: -110.70517181071799, lat: 23.792710712705727 },
        { _key: 'c4', lng: -110.71710045270571, lat: 23.8054396118674 },
      ]
    } else if (project.slug === 'el-quelele') {
      sanityProject.mapImageOverlayCoords = [
        { _key: 'c1', lng: -110.52013342247271, lat: 24.198945723894923 },
        { _key: 'c2', lng: -110.51599195795393, lat: 24.19775905835681 },
        { _key: 'c3', lng: -110.51690308014788, lat: 24.195102133096967 },
        { _key: 'c4', lng: -110.52123091057005, lat: 24.196609920918107 },
      ]
    }

    // Create the project in Sanity
    await client.createOrReplace(sanityProject)
    console.log(`  ✅ Proyecto ${project.name} guardado en Sanity`)
  }

  // 4. Lotes
  console.log('\n🗺️  Creando Lotes...')
  let lotCount = 0
  for (const lot of lotsData) {
    // Generate an ID based on project + lot id
    const docId = `lot-${lot.projectSlug}-${lot.id}`.toLowerCase()
    
    // Find the Sanity project reference
    const projectId = `project-${lot.projectSlug}`

    const geoJsonFeature = {
      type: "Feature",
      geometry: lot.shape === 'polygon' && lot.coordinates.points 
        ? {
            type: "Polygon",
            coordinates: [[...lot.coordinates.points.map(p => [p.x, p.y]), [lot.coordinates.points[0].x, lot.coordinates.points[0].y]]]
          }
        : {
            type: "Polygon",
            coordinates: [[
              [lot.coordinates.x, lot.coordinates.y],
              [lot.coordinates.x + lot.coordinates.width, lot.coordinates.y],
              [lot.coordinates.x + lot.coordinates.width, lot.coordinates.y - lot.coordinates.height],
              [lot.coordinates.x, lot.coordinates.y - lot.coordinates.height],
              [lot.coordinates.x, lot.coordinates.y]
            ]]
          },
      properties: {
        id: lot.id
      }
    }

    const sanityLot = {
      _type: 'projectLot',
      _id: docId,
      lotId: lot.id,
      project: {
        _type: 'reference',
        _ref: projectId
      },
      status: lot.status === 'sold' ? 'occupied' : lot.status,
      area: lot.area,
      price: lot.price,
      zone: lot.zone,
      view: lot.view,
      geoJsonFeature: JSON.stringify(geoJsonFeature)
    }

    await client.createOrReplace(sanityLot)
    lotCount++
  }
  console.log(`  ✅ ${lotCount} lotes procesados y guardados en Sanity`)

  console.log('\n🎉 ¡Seed completado exitosamente!')
}

seed().catch((err) => {
  console.error('\n❌ Error en seed:', err)
  process.exit(1)
})
