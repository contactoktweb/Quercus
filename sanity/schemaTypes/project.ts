import { defineType, defineField } from 'sanity'

/**
 * SCHEMA: project
 * Colección — Un documento por cada proyecto inmobiliario de Quercus.
 * Controla toda la info de la página /proyectos/[slug].
 */
export const project = defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  groups: [
    { name: 'info', title: '📋 Información General' },
    { name: 'media', title: '🖼️ Media (Imágenes y Video)' },
    { name: 'details', title: '📍 Detalles y Amenidades' },
    { name: 'map', title: '🗺️ Configuración del Mapa' },
  ],
  fields: [
    // ─── INFO GENERAL ─────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Nombre del Proyecto',
      description: 'Nombre completo del proyecto (ej: "DUNAH", "El Quelele")',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'La URL del proyecto. Ej: "dunah" → /proyectos/dunah. No usar espacios ni acentos.',
      type: 'slug',
      group: 'info',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      description: 'Texto de ubicación visible al público (ej: "Baja California Sur, México")',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'region',
      title: 'Región',
      description: 'Región geográfica del proyecto. Afecta la agrupación en el mapa y los filtros.',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Baja California Sur', value: 'baja-california-sur' },
          { title: 'Michoacán', value: 'michoacan' },
        ],
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Frase corta y memorable del proyecto (ej: "Bienestar en la naturaleza")',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      description: 'Descripción completa del proyecto. Aparece en el hero y en la sección de texto del proyecto.',
      type: 'text',
      rows: 5,
      group: 'info',
    }),
    defineField({
      name: 'status',
      title: 'Estado del Proyecto',
      description: 'El estado actual de comercialización del proyecto',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'En Venta', value: 'en-venta' },
          { title: 'Preventa', value: 'preventa' },
          { title: 'Próximamente', value: 'proximos' },
        ],
        layout: 'radio',
      },
    }),

    // ─── MEDIA ───────────────────────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      description: 'Imagen destacada del proyecto. Aparece en la tarjeta del proyecto y como og:image.',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string', description: 'Descripción accesible de la imagen. Importante para SEO.' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Proyecto',
      description: 'Logo específico del proyecto (no el logo de Quercus). Aparece en el header al entrar al proyecto.',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video de Presentación',
      description: 'Sube un archivo de video (.mp4). Aparece en la galería del proyecto y al hacer hover.',
      type: 'file',
      options: { accept: 'video/mp4,video/quicktime' },
      group: 'media',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Video del Hero',
      description: 'Sube un archivo de video (.mp4) que se reproduce como fondo del hero del proyecto.',
      type: 'file',
      options: { accept: 'video/mp4,video/quicktime' },
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      description: 'Colección de imágenes para la galería del proyecto. Cada imagen debe tener un alt descriptivo.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'renders',
      title: 'Renders Arquitectónicos',
      description: 'Imágenes de renders o visualizaciones arquitectónicas del proyecto.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
          ],
        },
      ],
    }),

    // ─── DETALLES ─────────────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Estadísticas del Proyecto',
      description: 'Datos clave del proyecto que aparecen en el bloque de estadísticas (ej: Ubicación, Tipo, Enfoque, Estado)',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Etiqueta', type: 'string', description: 'ej: "Ubicación", "Tipo", "Estado"' }),
            defineField({ name: 'value', title: 'Valor', type: 'string', description: 'ej: "Costa del Pacífico", "Comunidad regenerativa"' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenidades',
      description: 'Lista de servicios y amenidades que ofrece el proyecto (ej: "Wellness Center", "Club de Playa")',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordenadas Geográficas',
      description: 'Coordenadas geográficas del proyecto para el mapa de ubicación. Latitud y Longitud.',
      type: 'object',
      group: 'details',
      fields: [
        defineField({ name: 'lat', title: 'Latitud', type: 'number' }),
        defineField({ name: 'lng', title: 'Longitud', type: 'number' }),
      ],
    }),
    defineField({
      name: 'nearbyPlaces',
      title: 'Lugares Cercanos',
      description: 'Lista de puntos de referencia cercanos con distancia aproximada (ej: La Paz - 45 min)',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nombre del Lugar', type: 'string' }),
            defineField({ name: 'distance', title: 'Distancia', type: 'string', description: 'ej: "45 min", "30 km"' }),
          ],
          preview: { select: { title: 'name', subtitle: 'distance' } },
        },
      ],
    }),

    // ─── MAPA ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'mapImageOverlayCoords',
      title: 'Coordenadas de la Imagen Overlay del Mapa',
      description: 'Array de 4 puntos [lng, lat] que definen la posición de la imagen master plan sobre el mapa satelital. Esquinas: top-left, top-right, bottom-right, bottom-left. Se actualiza automáticamente al pulsar "Guardar en Sanity" en el Modo Editor del mapa.',
      type: 'array',
      group: 'map',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'lng', title: 'Longitud', type: 'number' }),
            defineField({ name: 'lat', title: 'Latitud', type: 'number' }),
          ],
          preview: { select: { title: 'lng', subtitle: 'lat' } },
        },
      ],
      validation: (Rule) => Rule.max(4).min(4).custom((value: any) => {
        if (value && value.length !== 4) return 'Deben ser exactamente 4 puntos (esquinas del rectángulo)'
        return true
      }),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location', media: 'image' },
  },
  orderings: [
    {
      title: 'Nombre del Proyecto',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
