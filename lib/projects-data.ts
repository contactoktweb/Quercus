export interface Project {
  slug: string
  name: string
  location: string
  region: 'baja-california-sur' | 'michoacan'
  tagline: string
  description: string
  image: string
  video: string
  heroVideo: string
  logo?: string
  stats: {
    label: string
    value: string
  }[]
  amenities: string[]
  gallery: string[]
  renders: string[]
  coordinates: {
    lat: number
    lng: number
  }
  nearbyPlaces: {
    name: string
    distance: string
  }[]
  status: 'en-venta' | 'preventa' | 'proximos'
}

export interface Lot {
  id: string
  projectSlug: string
  status: 'available' | 'reserved' | 'sold'
  area: string
  price: string
  zone: string
  view: string
  coordinates: { x: number; y: number; width: number; height: number }
}

export const projectsData: Project[] = [
  // Baja California Sur
  {
    slug: 'dunah',
    name: 'DUNAH',
    location: 'Baja California Sur, México',
    region: 'baja-california-sur',
    tagline: 'Bienestar en la naturaleza',
    description: 'Una comunidad regenerativa orientada al bienestar, ubicada en un paisaje prístino del Pacífico. DUNAH ofrece un refugio donde la arquitectura, la naturaleza y el espíritu convergen para crear experiencias transformadoras.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
    logo: '/logos/DUNAH - Logo.png',
    stats: [
      { label: 'Ubicación', value: 'Costa del Pacífico' },
      { label: 'Tipo', value: 'Comunidad regenerativa' },
      { label: 'Enfoque', value: 'Bienestar y mindfulness' },
      { label: 'Estado', value: 'En venta' },
    ],
    amenities: ['Wellness Center', 'Club de Playa', 'Senderos naturales', 'Yoga Deck', 'Spa holístico', 'Restaurante orgánico', 'Huerto comunitario', 'Área de meditación'],
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
    ],
    coordinates: { lat: 24.1426, lng: -110.3128 },
    nearbyPlaces: [
      { name: 'La Paz', distance: '45 min' },
      { name: 'Aeropuerto Internacional', distance: '1 hr' },
      { name: 'Playa Balandra', distance: '30 min' },
      { name: 'Mar de Cortés', distance: '5 min' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'el-quelele',
    name: 'El Quelele',
    location: 'Baja California Sur, México',
    region: 'baja-california-sur',
    tagline: 'Vida frente al mar',
    description: 'Baja lifestyle frente al mar, arquitectura integrada al paisaje y vida tranquila cerca de La Paz. Un proyecto que celebra la simplicidad del desierto que encuentra el mar.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
    logo: '/logos/El Quelele - Logo.png',
    stats: [
      { label: 'Ubicación', value: 'Frente al mar' },
      { label: 'Tipo', value: 'Residencial costero' },
      { label: 'Enfoque', value: 'Vida costera' },
      { label: 'Estado', value: 'En venta' },
    ],
    amenities: ['Acceso a playa', 'Palapa comunitaria', 'Senderos', 'Kayak', 'Paddleboard', 'Área de fogata'],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2070&auto=format&fit=crop',
    ],
    coordinates: { lat: 24.0826, lng: -109.9928 },
    nearbyPlaces: [
      { name: 'La Paz', distance: '35 min' },
      { name: 'Aeropuerto', distance: '50 min' },
      { name: 'Playa El Tecolote', distance: '15 min' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'quintaesencia',
    name: 'Quintaesencia',
    location: 'Baja California Sur, México',
    region: 'baja-california-sur',
    tagline: 'Ranch living regenerativo',
    description: 'Eco ranch living para quienes buscan conexión profunda con la tierra, amplitud y naturaleza. Un espacio donde el silencio y el paisaje son protagonistas.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    logo: '/logos/Quintaesencia - Logo (blanco).png',
    stats: [
      { label: 'Ubicación', value: 'Sierra de la Laguna' },
      { label: 'Tipo', value: 'Eco Ranch' },
      { label: 'Enfoque', value: 'Conexión con la tierra' },
      { label: 'Estado', value: 'Preventa' },
    ],
    amenities: ['Huerto orgánico', 'Caballerizas', 'Senderos de montaña', 'Observatorio', 'Casa club'],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    ],
    coordinates: { lat: 23.5126, lng: -109.7528 },
    nearbyPlaces: [
      { name: 'San José del Cabo', distance: '1 hr' },
      { name: 'Todos Santos', distance: '45 min' },
    ],
    status: 'preventa',
  },
  {
    slug: 'quercus-baja',
    name: 'Quercus Baja',
    location: 'El Sargento, BCS, México',
    region: 'baja-california-sur',
    tagline: 'Comunidad sustentable',
    description: 'Comunidad sustentable en El Sargento, rodeada de vegetación endémica, aventura y vistas al Mar de Cortés.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_24fps.mp4',
    logo: '/logos/Quercus Baja - Logo.PNG',
    stats: [
      { label: 'Ubicación', value: 'El Sargento' },
      { label: 'Tipo', value: 'Comunidad sustentable' },
      { label: 'Enfoque', value: 'Aventura y naturaleza' },
      { label: 'Estado', value: 'En venta' },
    ],
    amenities: ['Kitesurf spot', 'Senderos ciclismo', 'Área de camping', 'Mirador', 'Palapa social'],
    gallery: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    ],
    coordinates: { lat: 24.0926, lng: -109.9728 },
    nearbyPlaces: [
      { name: 'La Ventana', distance: '10 min' },
      { name: 'La Paz', distance: '40 min' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'elemental',
    name: 'Elemental',
    location: 'La Ventana, BCS, México',
    region: 'baja-california-sur',
    tagline: 'Arte y sustentabilidad',
    description: 'Comunidad artística y sustentable cerca de La Ventana, diseñada para una vida activa, creativa y consciente.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
    logo: '/logos/Quercus Elemental - Logo.png',
    stats: [
      { label: 'Ubicación', value: 'La Ventana' },
      { label: 'Tipo', value: 'Comunidad artística' },
      { label: 'Enfoque', value: 'Creatividad y deporte' },
      { label: 'Estado', value: 'Preventa' },
    ],
    amenities: ['Taller de arte', 'Kitesurf', 'Yoga shala', 'Coworking', 'Galería'],
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    ],
    coordinates: { lat: 24.0526, lng: -109.9928 },
    nearbyPlaces: [
      { name: 'La Ventana Bay', distance: '5 min' },
      { name: 'La Paz', distance: '45 min' },
    ],
    status: 'preventa',
  },
  {
    slug: 'ventusbay',
    name: 'Ventusbay',
    location: 'Baja California Sur, México',
    region: 'baja-california-sur',
    tagline: 'Hospitalidad boutique',
    description: 'Destino costero frente al mar con hospitalidad boutique, club de playa, experiencias gourmet y aventuras acuáticas.',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/1093665/1093665-hd_1920_1080_30fps.mp4',
    logo: '/logos/Ventusbay - Logo.png',
    stats: [
      { label: 'Ubicación', value: 'Costa del Pacífico' },
      { label: 'Tipo', value: 'Resort boutique' },
      { label: 'Enfoque', value: 'Hospitalidad premium' },
      { label: 'Estado', value: 'En desarrollo' },
    ],
    amenities: ['Beach Club', 'Restaurante gourmet', 'Spa', 'Deportes acuáticos', 'Concierge'],
    gallery: [
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    ],
    coordinates: { lat: 24.1826, lng: -110.3528 },
    nearbyPlaces: [
      { name: 'Todos Santos', distance: '30 min' },
      { name: 'La Paz', distance: '1 hr' },
    ],
    status: 'preventa',
  },
  // Michoacán
  {
    slug: 'explora',
    name: 'Explora',
    location: 'Michoacán, México',
    region: 'michoacan',
    tagline: 'Naturaleza y aventura',
    description: 'Un proyecto que invita a descubrir la belleza del bosque michoacano, con senderos, miradores y espacios para reconectar.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    stats: [
      { label: 'Ubicación', value: 'Bosque de Michoacán' },
      { label: 'Tipo', value: 'Comunidad de montaña' },
      { label: 'Enfoque', value: 'Aventura y naturaleza' },
      { label: 'Estado', value: 'Vendido' },
    ],
    amenities: ['Senderos', 'Miradores', 'Área de camping', 'Casa club'],
    gallery: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop',
    ],
    renders: [],
    coordinates: { lat: 19.4326, lng: -102.0628 },
    nearbyPlaces: [
      { name: 'Morelia', distance: '1 hr' },
      { name: 'Pátzcuaro', distance: '45 min' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'mil-cumbres',
    name: 'Mil Cumbres',
    location: 'Michoacán, México',
    region: 'michoacan',
    tagline: 'Vistas infinitas',
    description: 'Un santuario en las alturas de Michoacán, donde cada amanecer revela nuevas perspectivas y la niebla del bosque crea paisajes mágicos.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    stats: [
      { label: 'Ubicación', value: 'Sierra michoacana' },
      { label: 'Tipo', value: 'Santuario de montaña' },
      { label: 'Enfoque', value: 'Contemplación' },
      { label: 'Estado', value: 'Vendido' },
    ],
    amenities: ['Miradores panorámicos', 'Senderos de bosque', 'Cabañas'],
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [],
    coordinates: { lat: 19.5126, lng: -101.9828 },
    nearbyPlaces: [
      { name: 'Morelia', distance: '1.5 hr' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'quercus-i',
    name: 'Quercus I',
    location: 'Michoacán, México',
    region: 'michoacan',
    tagline: 'El origen',
    description: 'El primer proyecto Quercus. Donde comenzó la visión de comunidades regenerativas que honran el territorio mexicano.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    stats: [
      { label: 'Ubicación', value: 'Michoacán' },
      { label: 'Tipo', value: 'Comunidad residencial' },
      { label: 'Enfoque', value: 'Vida en comunidad' },
      { label: 'Estado', value: 'Vendido' },
    ],
    amenities: ['Áreas verdes', 'Casa club', 'Seguridad'],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    ],
    renders: [],
    coordinates: { lat: 19.4026, lng: -102.0328 },
    nearbyPlaces: [
      { name: 'Morelia', distance: '40 min' },
    ],
    status: 'en-venta',
  },
  {
    slug: 'quercus-ii',
    name: 'Quercus II',
    location: 'Michoacán, México',
    region: 'michoacan',
    tagline: 'La evolución',
    description: 'La segunda fase del legado Quercus en Michoacán, expandiendo la visión con nuevas amenidades y más espacio para la comunidad.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    video: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    heroVideo: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
    stats: [
      { label: 'Ubicación', value: 'Michoacán' },
      { label: 'Tipo', value: 'Comunidad residencial' },
      { label: 'Enfoque', value: 'Expansión comunitaria' },
      { label: 'Estado', value: 'Vendido' },
    ],
    amenities: ['Áreas verdes expandidas', 'Lago artificial', 'Senderos', 'Casa club'],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    ],
    renders: [],
    coordinates: { lat: 19.4126, lng: -102.0428 },
    nearbyPlaces: [
      { name: 'Morelia', distance: '45 min' },
    ],
    status: 'en-venta',
  },
]

export const lotsData: Lot[] = [
  // Example lots for DUNAH
  { id: 'A-01', projectSlug: 'dunah', status: 'available', area: '450 m²', price: 'Consultar', zone: 'Zona A', view: 'Vista al mar', coordinates: { x: 10, y: 20, width: 8, height: 12 } },
  { id: 'A-02', projectSlug: 'dunah', status: 'available', area: '520 m²', price: 'Consultar', zone: 'Zona A', view: 'Vista al mar', coordinates: { x: 18, y: 20, width: 8, height: 12 } },
  { id: 'A-03', projectSlug: 'dunah', status: 'reserved', area: '480 m²', price: 'Consultar', zone: 'Zona A', view: 'Vista al mar', coordinates: { x: 26, y: 20, width: 8, height: 12 } },
  { id: 'B-01', projectSlug: 'dunah', status: 'available', area: '600 m²', price: 'Consultar', zone: 'Zona B', view: 'Vista jardín', coordinates: { x: 10, y: 35, width: 10, height: 10 } },
  { id: 'B-02', projectSlug: 'dunah', status: 'sold', area: '550 m²', price: 'Vendido', zone: 'Zona B', view: 'Vista jardín', coordinates: { x: 20, y: 35, width: 10, height: 10 } },
  { id: 'B-03', projectSlug: 'dunah', status: 'available', area: '580 m²', price: 'Consultar', zone: 'Zona B', view: 'Vista jardín', coordinates: { x: 30, y: 35, width: 10, height: 10 } },
  { id: 'C-01', projectSlug: 'dunah', status: 'available', area: '700 m²', price: 'Consultar', zone: 'Zona C', view: 'Vista panorámica', coordinates: { x: 45, y: 15, width: 12, height: 15 } },
  { id: 'C-02', projectSlug: 'dunah', status: 'reserved', area: '650 m²', price: 'Consultar', zone: 'Zona C', view: 'Vista panorámica', coordinates: { x: 57, y: 15, width: 12, height: 15 } },
  { id: 'D-01', projectSlug: 'dunah', status: 'available', area: '800 m²', price: 'Consultar', zone: 'Zona Premium', view: 'Vista 360°', coordinates: { x: 70, y: 25, width: 15, height: 18 } },
]

export const historyTimeline = [
  { year: '2001', title: 'El inicio', description: 'Nace la visión de crear comunidades que honren el territorio mexicano.' },
  { year: '2003', title: 'Quercus I', description: 'Primer proyecto en Michoacán, sentando las bases de nuestra filosofía.' },
  { year: '2004', title: 'Crecimiento', description: 'Expansión de la comunidad original con nuevas familias.' },
  { year: '2006', title: 'Quercus II', description: 'Segunda fase del legado en Michoacán.' },
  { year: '2011', title: 'Nuevos horizontes', description: 'Exploración de territorios en Baja California Sur.' },
  { year: '2013', title: 'Mil Cumbres', description: 'Proyecto en las alturas de la sierra michoacana.' },
  { year: '2017', title: 'Llegada a Baja', description: 'Primeras adquisiciones de tierra en el Mar de Cortés.' },
  { year: '2019', title: 'El Quelele', description: 'Lanzamiento del primer proyecto costero en BCS.' },
  { year: '2021', title: 'DUNAH', description: 'Comunidad regenerativa orientada al bienestar.' },
  { year: '2022', title: 'Quercus Baja', description: 'Comunidad sustentable en El Sargento.' },
  { year: '2024', title: 'Elemental', description: 'Comunidad artística cerca de La Ventana.' },
  { year: '2025', title: 'El futuro', description: 'Nuevos proyectos en desarrollo y una visión que continúa expandiéndose.' },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(p => p.slug === slug)
}

export function getProjectsByRegion(region: 'baja-california-sur' | 'michoacan'): Project[] {
  return projectsData.filter(p => p.region === region)
}

export function getLotsByProject(projectSlug: string): Lot[] {
  return lotsData.filter(l => l.projectSlug === projectSlug)
}
