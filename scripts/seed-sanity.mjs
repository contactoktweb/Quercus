/**
 * SEED SCRIPT — Sube el contenido inicial a Sanity
 * Ejecutar con: node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Cargar .env.local manualmente
function loadEnv() {
  try {
    const env = readFileSync('.env.local', 'utf-8')
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
  console.log('  PROJECT_ID:', projectId)
  console.log('  TOKEN:', token ? '(presente)' : '(ausente)')
  process.exit(1)
}

console.log(`🔗 Conectando a Sanity: ${projectId} / ${dataset}`)

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-02',
  token,
  useCdn: false,
})

// ─── DATOS ────────────────────────────────────────────────────────────────────

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

const historiaPageData = {
  _type: 'historiaPage',
  _id: 'historiaPage',
  heroLabel: 'Nuestra historia',
  heroTitle: 'Más de dos décadas creando comunidades regenerativas',
  heroSubtitle: 'Desde Michoacán hasta Baja California Sur, nuestra trayectoria es un testimonio del compromiso con la naturaleza.',
  timelineLabel: 'Trayectoria',
  timelineTitle: 'El camino que nos trajo aquí',
  timelineItems: [],
  valuesLabel: 'Filosofía',
  valuesTitle: 'Lo que nos guía',
  valuesSubtitle: 'Nuestros valores son la brújula que orienta cada decisión de diseño, construcción y comunidad.',
  values: [
    { _key: 'v1', title: 'Regeneración', description: 'Construimos con la intención de devolver más de lo que tomamos.', icon: '🌿' },
    { _key: 'v2', title: 'Comunidad', description: 'Diseñamos espacios para la conexión profunda entre personas.', icon: '🏡' },
    { _key: 'v3', title: 'Bienestar', description: 'El bienestar del ser humano es el centro de cada proyecto.', icon: '✨' },
  ],
}

const projectsData = [
  {
    _type: 'project', _id: 'project-dunah',
    name: 'DUNAH', slug: { _type: 'slug', current: 'dunah' },
    location: 'Baja California Sur, México', region: 'baja-california-sur',
    tagline: 'Bienestar en la naturaleza',
    description: 'Una comunidad regenerativa orientada al bienestar, ubicada en un paisaje prístino del Pacífico.',
    video: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
    status: 'en-venta',
    stats: [
      { _key: 's1', label: 'Ubicación', value: 'Costa del Pacífico' },
      { _key: 's2', label: 'Tipo', value: 'Comunidad regenerativa' },
      { _key: 's3', label: 'Enfoque', value: 'Bienestar y mindfulness' },
      { _key: 's4', label: 'Estado', value: 'En venta' },
    ],
    amenities: ['Wellness Center', 'Club de Playa', 'Senderos naturales', 'Yoga Deck', 'Spa holístico'],
    coordinates: { lat: 23.806, lng: -110.707 },
    nearbyPlaces: [
      { _key: 'np1', name: 'La Paz', distance: '45 min' },
      { _key: 'np2', name: 'Aeropuerto Internacional', distance: '1 hr' },
    ],
    hasMap: true,
    mapImageOverlayCoords: [
      { _key: 'c1', lng: -110.70714266576692, lat: 23.81281604288452 },
      { _key: 'c2', lng: -110.69544243149925, lat: 23.80000604943828 },
      { _key: 'c3', lng: -110.70517181071799, lat: 23.792710712705727 },
      { _key: 'c4', lng: -110.71710045270571, lat: 23.8054396118674 },
    ],
  },
  {
    _type: 'project', _id: 'project-el-quelele',
    name: 'El Quelele', slug: { _type: 'slug', current: 'el-quelele' },
    location: 'Baja California Sur, México', region: 'baja-california-sur',
    tagline: 'Vida frente al mar',
    description: 'Baja lifestyle frente al mar, arquitectura integrada al paisaje y vida tranquila cerca de La Paz.',
    video: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
    status: 'en-venta',
    stats: [
      { _key: 's1', label: 'Ubicación', value: 'Frente al mar' },
      { _key: 's2', label: 'Tipo', value: 'Residencial costero' },
      { _key: 's3', label: 'Enfoque', value: 'Vida costera' },
      { _key: 's4', label: 'Estado', value: 'En venta' },
    ],
    amenities: ['Acceso a playa', 'Palapa comunitaria', 'Senderos', 'Kayak'],
    coordinates: { lat: 24.197, lng: -110.519 },
    nearbyPlaces: [
      { _key: 'np1', name: 'La Paz', distance: '35 min' },
    ],
    hasMap: true,
    mapImageOverlayCoords: [
      { _key: 'c1', lng: -110.52013342247271, lat: 24.198945723894923 },
      { _key: 'c2', lng: -110.51599195795393, lat: 24.19775905835681 },
      { _key: 'c3', lng: -110.51690308014788, lat: 24.195102133096967 },
      { _key: 'c4', lng: -110.52123091057005, lat: 24.196609920918107 },
    ],
  },
  {
    _type: 'project', _id: 'project-quintaesencia',
    name: 'Quintaesencia', slug: { _type: 'slug', current: 'quintaesencia' },
    location: 'Baja California Sur, México', region: 'baja-california-sur',
    tagline: 'Ranch living regenerativo',
    description: 'Eco ranch living para quienes buscan conexión profunda con la tierra, amplitud y naturaleza.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    status: 'preventa',
    stats: [
      { _key: 's1', label: 'Ubicación', value: 'Sierra de la Laguna' },
      { _key: 's2', label: 'Tipo', value: 'Eco Ranch' },
      { _key: 's3', label: 'Enfoque', value: 'Conexión con la tierra' },
      { _key: 's4', label: 'Estado', value: 'Preventa' },
    ],
    amenities: ['Huerto orgánico', 'Caballerizas', 'Senderos de montaña', 'Observatorio'],
    coordinates: { lat: 23.5126, lng: -109.7528 },
    nearbyPlaces: [
      { _key: 'np1', name: 'San José del Cabo', distance: '1 hr' },
    ],
    hasMap: true,
    mapImageOverlayCoords: [],
  },
  {
    _type: 'project', _id: 'project-quercus-baja',
    name: 'Quercus Baja', slug: { _type: 'slug', current: 'quercus-baja' },
    location: 'El Sargento, BCS, México', region: 'baja-california-sur',
    tagline: 'Comunidad sustentable',
    description: 'Comunidad sustentable en El Sargento, rodeada de vegetación endémica y vistas al Mar de Cortés.',
    video: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
    status: 'en-venta',
    stats: [{ _key: 's1', label: 'Ubicación', value: 'El Sargento' }],
    amenities: ['Kitesurf spot', 'Senderos ciclismo'],
    coordinates: { lat: 24.0926, lng: -109.9728 },
    nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '40 min' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-elemental',
    name: 'Elemental', slug: { _type: 'slug', current: 'elemental' },
    location: 'La Ventana, BCS, México', region: 'baja-california-sur',
    tagline: 'Arte y sustentabilidad',
    description: 'Comunidad artística y sustentable cerca de La Ventana.',
    video: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
    status: 'preventa',
    stats: [{ _key: 's1', label: 'Ubicación', value: 'La Ventana' }],
    amenities: ['Taller de arte', 'Kitesurf'],
    coordinates: { lat: 24.0526, lng: -109.9928 },
    nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '45 min' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-ventusbay',
    name: 'Ventusbay', slug: { _type: 'slug', current: 'ventusbay' },
    location: 'Baja California Sur, México', region: 'baja-california-sur',
    tagline: 'Hospitalidad boutique',
    description: 'Destino costero frente al mar con hospitalidad boutique y experiencias gourmet.',
    video: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
    status: 'preventa',
    stats: [{ _key: 's1', label: 'Tipo', value: 'Resort boutique' }],
    amenities: ['Beach Club', 'Spa'],
    coordinates: { lat: 24.1826, lng: -110.3528 },
    nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '1 hr' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-explora',
    name: 'Explora', slug: { _type: 'slug', current: 'explora' },
    location: 'Michoacán, México', region: 'michoacan',
    tagline: 'Naturaleza y aventura',
    description: 'Descubre la belleza del bosque michoacano.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    status: 'en-venta',
    stats: [{ _key: 's1', label: 'Ubicación', value: 'Bosque de Michoacán' }],
    amenities: ['Senderos', 'Miradores'],
    coordinates: { lat: 19.4326, lng: -102.0628 },
    nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '1 hr' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-mil-cumbres',
    name: 'Mil Cumbres', slug: { _type: 'slug', current: 'mil-cumbres' },
    location: 'Michoacán, México', region: 'michoacan',
    tagline: 'Vistas infinitas',
    description: 'Un santuario en las alturas de Michoacán.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    status: 'en-venta',
    stats: [{ _key: 's1', label: 'Ubicación', value: 'Sierra michoacana' }],
    amenities: ['Miradores panorámicos', 'Cabañas'],
    coordinates: { lat: 19.5126, lng: -101.9828 },
    nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '1.5 hr' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-quercus-i',
    name: 'Quercus I', slug: { _type: 'slug', current: 'quercus-i' },
    location: 'Michoacán, México', region: 'michoacan',
    tagline: 'El origen',
    description: 'El primer proyecto Quercus.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    status: 'en-venta',
    stats: [{ _key: 's1', label: 'Estado', value: 'Vendido' }],
    amenities: ['Áreas verdes', 'Casa club'],
    coordinates: { lat: 19.4026, lng: -102.0328 },
    nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '40 min' }],
    hasMap: false,
  },
  {
    _type: 'project', _id: 'project-quercus-ii',
    name: 'Quercus II', slug: { _type: 'slug', current: 'quercus-ii' },
    location: 'Michoacán, México', region: 'michoacan',
    tagline: 'La evolución',
    description: 'La segunda fase del legado Quercus en Michoacán.',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    status: 'en-venta',
    stats: [{ _key: 's1', label: 'Estado', value: 'Vendido' }],
    amenities: ['Lago artificial', 'Senderos'],
    coordinates: { lat: 19.4126, lng: -102.0428 },
    nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '45 min' }],
    hasMap: false,
  },
]

async function seed() {
  console.log('🌱 Iniciando seed de Sanity...\n')

  console.log('📋 Creando configuración global...')
  await client.createOrReplace(globalConfigData)
  console.log('  ✅ globalConfig\n')

  console.log('🏠 Creando página de inicio...')
  await client.createOrReplace(homePageData)
  console.log('  ✅ homePage\n')

  console.log('📖 Creando página de historia...')
  await client.createOrReplace(historiaPageData)
  console.log('  ✅ historiaPage\n')

  console.log('🏡 Creando proyectos...')
  for (const project of projectsData) {
    await client.createOrReplace(project)
    console.log(`  ✅ ${project.name}`)
  }

  console.log('\n🎉 ¡Seed completado exitosamente!')
  console.log(`\n📊 Resumen:`)
  console.log(`  - 1 globalConfig`)
  console.log(`  - 1 homePage`)
  console.log(`  - 1 historiaPage`)
  console.log(`  - ${projectsData.length} proyectos`)
  console.log(`\n🔗 Studio: http://localhost:3000/admin`)
}

seed().catch((err) => {
  console.error('\n❌ Error en seed:', err.message)
  process.exit(1)
})
