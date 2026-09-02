import { defineType, defineField } from 'sanity'

/**
 * SCHEMA: homePage
 * Singleton — Controla todo el contenido de la página principal (/).
 * Cubre: Hero, Editorial/Filosofía, Proyectos Interactivos, Testimonios, Sección Contacto.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  groups: [
    { name: 'hero', title: '🏞️ Hero' },
    { name: 'editorial', title: '📖 Sección Editorial (Filosofía)' },
    { name: 'projects', title: '🏗️ Proyectos' },
    { name: 'testimonials', title: '💬 Testimonios' },
    { name: 'contact', title: '📬 Sección Contacto' },
  ],
  fields: [
    defineField({
      name: 'featuredProject',
      title: 'Proyecto Destacado',
      description: 'Selecciona el proyecto que aparecerá como destacado en la página de inicio (ej: DUNAH)',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'projects',
    }),
    // ─── HERO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Título Principal (H1)',
      description: 'El texto principal que aparece en grande en el Hero. Es el H1 de la página.',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo del Hero',
      description: 'Párrafo descriptivo que aparece debajo del H1',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen de Fondo del Hero',
      description: 'Imagen de alta resolución que ocupa toda la pantalla detrás del título',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroVideo',
      title: 'Video de Fondo del Hero',
      description: 'Video de fondo (.webm o .mp4) que ocupará toda la pantalla. Si se provee, tendrá prioridad sobre la imagen.',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Texto del Botón Principal (CTA 1)',
      description: 'Texto del primer botón de llamada a la acción en el Hero (ej: "Explorar comunidades")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Texto del Botón Secundario (CTA 2)',
      description: 'Texto del segundo botón de llamada a la acción (ej: "Conocer la filosofía")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroLocationBadge',
      title: 'Badge de Ubicación',
      description: 'Texto del badge en la parte inferior del hero (ej: "Baja California Sur · México")',
      type: 'string',
      group: 'hero',
    }),

    // ─── EDITORIAL (FILOSOFÍA) ────────────────────────────────────────────────
    defineField({
      name: 'editorialHeadline',
      title: 'Frase Editorial Principal (H2)',
      description: 'La frase grande centrada al inicio de la sección de Filosofía',
      type: 'text',
      rows: 3,
      group: 'editorial',
    }),
    defineField({
      name: 'editorialParagraph',
      title: 'Párrafo Introductorio de Filosofía',
      description: 'Párrafo de apoyo debajo de la frase editorial',
      type: 'text',
      rows: 4,
      group: 'editorial',
    }),
    defineField({
      name: 'editorialImage',
      title: 'Imagen de la Sección Editorial',
      description: 'Imagen rectangular (proporción 4:5) que acompaña los principios',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'editorialSectionLabel',
      title: 'Label de la Sub-sección (texto pequeño)',
      description: 'Texto pequeño en mayúsculas encima del título de la sub-sección (ej: "Regeneración")',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'editorialSectionTitle',
      title: 'Título de la Sub-sección (H3)',
      description: 'Título H3 de la parte derecha de la sección editorial (ej: "Diseñar con respeto por el territorio")',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'editorialSectionText',
      title: 'Texto de la Sub-sección',
      description: 'Párrafo que explica el enfoque de diseño regenerativo',
      type: 'text',
      rows: 4,
      group: 'editorial',
    }),
    defineField({
      name: 'philosophyLabel',
      title: 'Label de Filosofía (Pillars)',
      description: 'Texto pequeño en mayúsculas (ej: "Nuestra filosofía")',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Título de Filosofía (Pillars)',
      description: 'Título principal de la sección de pilares (ej: "Un estilo de vida guiado por la naturaleza")',
      type: 'text',
      rows: 2,
      group: 'editorial',
    }),
    defineField({
      name: 'principles',
      title: 'Lista de Principios (Pillars)',
      description: 'Los principios de diseño que aparecen en la sección editorial / filosofía',
      type: 'array',
      group: 'editorial',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título del Principio', type: 'string', description: 'ej: "Baja densidad"' }),
            defineField({ name: 'desc', title: 'Descripción', type: 'string', description: 'Una frase breve que explica el principio' }),
            defineField({
              name: 'image',
              title: 'Imagen del Principio',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      description: 'Números/estadísticas destacadas al pie de la sección editorial (ej: "20+ Años de experiencia")',
      type: 'array',
      group: 'editorial',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Número / Valor', type: 'string', description: 'ej: "20+", "1000+", "∞"' }),
            defineField({ name: 'label', title: 'Etiqueta', type: 'string', description: 'ej: "Años de experiencia"' }),
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
    }),

    // ─── TESTIMONIOS ─────────────────────────────────────────────────────────
    defineField({
      name: 'testimonials',
      title: 'Testimonios',
      description: 'Lista de testimonios que aparecen en el carrusel de la home',
      type: 'array',
      group: 'testimonials',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Cita / Testimonio', type: 'text', rows: 4, description: 'El texto del testimonio del cliente' }),
            defineField({ name: 'author', title: 'Autor', type: 'string', description: 'Nombre completo del autor del testimonio' }),
            defineField({ name: 'role', title: 'Cargo / Descripción', type: 'string', description: 'ej: "Propietario en DUNAH", "Inversionista"' }),
            defineField({ name: 'avatar', title: 'Foto del Autor', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })] }),
          ],
          preview: {
            select: { title: 'author', subtitle: 'role', media: 'avatar' },
          },
        },
      ],
    }),

    // ─── CONTACTO ─────────────────────────────────────────────────────────────
    defineField({
      name: 'contactTitle',
      title: 'Título de la Sección Contacto (H2)',
      description: 'Título H2 encima del formulario de contacto (ej: "Encuentra tu lugar en Quercus")',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Subtítulo / Intro del Formulario',
      description: 'Párrafo explicativo encima del formulario multi-paso',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página de Inicio', subtitle: 'Singleton — /' }
    },
  },
})
