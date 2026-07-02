/**
 * SEED SCRIPT — Sube el contenido inicial a Sanity
 * Ejecutar con: node scripts/seed-sanity.cjs
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createClient } = require('@sanity/client')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

function loadEnv() {
  try {
    const env = fs.readFileSync('.env.local', 'utf-8')
    for (const line of env.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let value = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
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

console.log(`🔗 Sanity: ${projectId} / ${dataset}`)

const client = createClient({ projectId, dataset, apiVersion: '2026-07-02', token, useCdn: false })

async function seed() {
  console.log('🌱 Iniciando seed...\n')

  // ─── globalConfig ─────────────────────────────────────────────────────────
  console.log('📋 globalConfig...')
  await client.createOrReplace({
    _type: 'globalConfig', _id: 'globalConfig',
    siteName: 'Quercus',
    contactEmail: 'info@quercus.mx',
    notificationsEmail: 'notificaciones@quercus.mx',
    footerDescription: 'Creando comunidades regenerativas en Baja California Sur.',
    socialLinks: [
      { _key: 'instagram', platform: 'Instagram', url: 'https://instagram.com/quercus' },
      { _key: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/quercus' },
      { _key: 'youtube', platform: 'YouTube', url: 'https://youtube.com/quercus' },
    ],
  })
  console.log('  ✅\n')

  // ─── homePage ─────────────────────────────────────────────────────────────
  console.log('🏠 homePage...')
  await client.createOrReplace({
    _type: 'homePage', _id: 'homePage',
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
    contactSubtitle: 'Gracias por tu interés en los desarrollos de Quercus. Completa tus datos y selecciona el proyecto que te interesa para enviarte información detallada.',
    testimonials: [],
  })
  console.log('  ✅\n')

  // ─── historiaPage ─────────────────────────────────────────────────────────
  console.log('📖 historiaPage...')
  await client.createOrReplace({
    _type: 'historiaPage', _id: 'historiaPage',
    heroLabel: 'Nuestra historia',
    heroTitle: 'Más de dos décadas creando comunidades regenerativas',
    heroSubtitle: 'Desde Michoacán hasta Baja California Sur, nuestra trayectoria es un testimonio del compromiso con la naturaleza.',
    timelineLabel: 'Trayectoria',
    timelineTitle: 'El camino que nos trajo aquí',
    timelineItems: [],
    valuesLabel: 'Filosofía',
    valuesTitle: 'Lo que nos guía',
    valuesSubtitle: 'Nuestros valores son la brújula que orienta cada decisión.',
    values: [
      { _key: 'v1', title: 'Regeneración', description: 'Construimos con la intención de devolver más de lo que tomamos.', icon: '🌿' },
      { _key: 'v2', title: 'Comunidad', description: 'Diseñamos espacios para la conexión profunda entre personas.', icon: '🏡' },
      { _key: 'v3', title: 'Bienestar', description: 'El bienestar del ser humano es el centro de cada proyecto.', icon: '✨' },
    ],
  })
  console.log('  ✅\n')

  // ─── Projects ─────────────────────────────────────────────────────────────
  const projects = [
    {
      _id: 'project-dunah', name: 'DUNAH', slug: { _type: 'slug', current: 'dunah' },
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
      amenities: ['Wellness Center', 'Club de Playa', 'Senderos naturales', 'Yoga Deck', 'Spa holístico', 'Restaurante orgánico'],
      coordinates: { lat: 23.806, lng: -110.707 },
      nearbyPlaces: [
        { _key: 'np1', name: 'La Paz', distance: '45 min' },
        { _key: 'np2', name: 'Aeropuerto Internacional', distance: '1 hr' },
        { _key: 'np3', name: 'Playa Balandra', distance: '30 min' },
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
      _id: 'project-el-quelele', name: 'El Quelele', slug: { _type: 'slug', current: 'el-quelele' },
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
      amenities: ['Acceso a playa', 'Palapa comunitaria', 'Senderos', 'Kayak', 'Paddleboard'],
      coordinates: { lat: 24.197, lng: -110.519 },
      nearbyPlaces: [
        { _key: 'np1', name: 'La Paz', distance: '35 min' },
        { _key: 'np2', name: 'Aeropuerto', distance: '50 min' },
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
      _id: 'project-quintaesencia', name: 'Quintaesencia', slug: { _type: 'slug', current: 'quintaesencia' },
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
      amenities: ['Huerto orgánico', 'Caballerizas', 'Senderos de montaña', 'Observatorio', 'Casa club'],
      coordinates: { lat: 23.5126, lng: -109.7528 },
      nearbyPlaces: [
        { _key: 'np1', name: 'San José del Cabo', distance: '1 hr' },
        { _key: 'np2', name: 'Todos Santos', distance: '45 min' },
      ],
      hasMap: true,
      mapImageOverlayCoords: [],
    },
    {
      _id: 'project-quercus-baja', name: 'Quercus Baja', slug: { _type: 'slug', current: 'quercus-baja' },
      location: 'El Sargento, BCS, México', region: 'baja-california-sur',
      tagline: 'Comunidad sustentable',
      description: 'Comunidad sustentable en El Sargento, rodeada de vegetación endémica y vistas al Mar de Cortés.',
      video: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
      status: 'en-venta',
      stats: [{ _key: 's1', label: 'Ubicación', value: 'El Sargento' }, { _key: 's2', label: 'Tipo', value: 'Comunidad sustentable' }],
      amenities: ['Kitesurf spot', 'Senderos ciclismo', 'Mirador'],
      coordinates: { lat: 24.0926, lng: -109.9728 },
      nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '40 min' }],
      hasMap: false,
    },
    {
      _id: 'project-elemental', name: 'Elemental', slug: { _type: 'slug', current: 'elemental' },
      location: 'La Ventana, BCS, México', region: 'baja-california-sur',
      tagline: 'Arte y sustentabilidad',
      description: 'Comunidad artística y sustentable cerca de La Ventana.',
      video: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
      status: 'preventa',
      stats: [{ _key: 's1', label: 'Ubicación', value: 'La Ventana' }],
      amenities: ['Taller de arte', 'Kitesurf', 'Yoga shala', 'Galería'],
      coordinates: { lat: 24.0526, lng: -109.9928 },
      nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '45 min' }],
      hasMap: false,
    },
    {
      _id: 'project-ventusbay', name: 'Ventusbay', slug: { _type: 'slug', current: 'ventusbay' },
      location: 'Baja California Sur, México', region: 'baja-california-sur',
      tagline: 'Hospitalidad boutique',
      description: 'Destino costero frente al mar con hospitalidad boutique y experiencias gourmet.',
      video: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
      status: 'preventa',
      stats: [{ _key: 's1', label: 'Tipo', value: 'Resort boutique' }],
      amenities: ['Beach Club', 'Restaurante gourmet', 'Spa'],
      coordinates: { lat: 24.1826, lng: -110.3528 },
      nearbyPlaces: [{ _key: 'np1', name: 'La Paz', distance: '1 hr' }],
      hasMap: false,
    },
    {
      _id: 'project-explora', name: 'Explora', slug: { _type: 'slug', current: 'explora' },
      location: 'Michoacán, México', region: 'michoacan',
      tagline: 'Naturaleza y aventura',
      description: 'Descubre la belleza del bosque michoacano, con senderos, miradores y espacios para reconectar.',
      video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      status: 'en-venta',
      stats: [{ _key: 's1', label: 'Ubicación', value: 'Bosque de Michoacán' }],
      amenities: ['Senderos', 'Miradores', 'Casa club'],
      coordinates: { lat: 19.4326, lng: -102.0628 },
      nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '1 hr' }],
      hasMap: false,
    },
    {
      _id: 'project-mil-cumbres', name: 'Mil Cumbres', slug: { _type: 'slug', current: 'mil-cumbres' },
      location: 'Michoacán, México', region: 'michoacan',
      tagline: 'Vistas infinitas',
      description: 'Un santuario en las alturas de Michoacán, donde cada amanecer revela nuevas perspectivas.',
      video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      status: 'en-venta',
      stats: [{ _key: 's1', label: 'Ubicación', value: 'Sierra michoacana' }],
      amenities: ['Miradores panorámicos', 'Senderos de bosque', 'Cabañas'],
      coordinates: { lat: 19.5126, lng: -101.9828 },
      nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '1.5 hr' }],
      hasMap: false,
    },
    {
      _id: 'project-quercus-i', name: 'Quercus I', slug: { _type: 'slug', current: 'quercus-i' },
      location: 'Michoacán, México', region: 'michoacan',
      tagline: 'El origen',
      description: 'El primer proyecto Quercus. Donde comenzó la visión de comunidades regenerativas.',
      video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      status: 'en-venta',
      stats: [{ _key: 's1', label: 'Estado', value: 'Vendido' }],
      amenities: ['Áreas verdes', 'Casa club', 'Seguridad'],
      coordinates: { lat: 19.4026, lng: -102.0328 },
      nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '40 min' }],
      hasMap: false,
    },
    {
      _id: 'project-quercus-ii', name: 'Quercus II', slug: { _type: 'slug', current: 'quercus-ii' },
      location: 'Michoacán, México', region: 'michoacan',
      tagline: 'La evolución',
      description: 'La segunda fase del legado Quercus en Michoacán.',
      video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
      status: 'en-venta',
      stats: [{ _key: 's1', label: 'Estado', value: 'Vendido' }],
      amenities: ['Lago artificial', 'Senderos', 'Casa club'],
      coordinates: { lat: 19.4126, lng: -102.0428 },
      nearbyPlaces: [{ _key: 'np1', name: 'Morelia', distance: '45 min' }],
      hasMap: false,
    },
  ]

  console.log('🏡 Proyectos...')
  for (const p of projects) {
    await client.createOrReplace({ _type: 'project', ...p })
    console.log(`  ✅ ${p.name}`)
  }

  console.log('\n🎉 Seed completado!')
  console.log(`\n📊 Resumen: 1 globalConfig | 1 homePage | 1 historiaPage | ${projects.length} proyectos`)
  console.log(`🔗 Studio: http://localhost:3000/admin`)
}

seed().catch(e => {
  console.error('\n❌ Error:', e.message)
  process.exit(1)
})
