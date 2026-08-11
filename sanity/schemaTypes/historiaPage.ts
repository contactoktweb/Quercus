import { defineType, defineField } from 'sanity'

/**
 * SCHEMA: historiaPage
 * Singleton — Controla todo el contenido de la página /historia.
 * Cubre: Hero, Timeline de Hitos, Sección de Valores.
 */
export const historiaPage = defineType({
  name: 'historiaPage',
  title: 'Página: Nuestra Historia',
  type: 'document',
  groups: [
    { name: 'hero', title: '🏞️ Hero de Historia' },
    { name: 'timeline', title: '📅 Timeline de Hitos' },
    { name: 'values', title: '💎 Sección de Valores' },
    { name: 'sustainability', title: '🌱 Sección Sostenibilidad' },
    { name: 'finalCta', title: '🚀 Llamado a la Acción (Final)' },
  ],
  fields: [
    // ─── HERO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroLabel',
      title: 'Label Superior del Hero',
      description: 'Texto pequeño en mayúsculas encima del título (ej: "Nuestra historia")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título Principal (H1)',
      description: 'El H1 de la página /historia',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo / Descripción del Hero',
      description: 'Párrafo introductorio debajo del H1',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen del Hero',
      description: 'Imagen de fondo o portada para el hero de la página de historia',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string' }),
      ],
    }),

    // ─── TIMELINE ─────────────────────────────────────────────────────────────
    defineField({
      name: 'timelineLabel',
      title: 'Label de la Sección Timeline',
      description: 'Texto pequeño encima del título de la timeline (ej: "Trayectoria")',
      type: 'string',
      group: 'timeline',
    }),
    defineField({
      name: 'timelineTitle',
      title: 'Título de la Sección Timeline (H2)',
      description: 'Título H2 de la sección de timeline de hitos',
      type: 'string',
      group: 'timeline',
    }),
    defineField({
      name: 'timelineItems',
      title: 'Hitos de la Timeline',
      description: 'Lista cronológica de los hitos más importantes de la historia de Quercus',
      type: 'array',
      group: 'timeline',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Año', type: 'string', description: 'El año del hito (ej: "2003", "2010")' }),
            defineField({ name: 'title', title: 'Título del Hito', type: 'string', description: 'Nombre o título breve del hito' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3, description: 'Descripción detallada de lo que ocurrió en este hito' }),
            defineField({
              name: 'image',
              title: 'Imagen del Hito',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: `${subtitle} — ${title}`, media }
            },
          },
        },
      ],
    }),

    // ─── VALORES ─────────────────────────────────────────────────────────────
    defineField({
      name: 'valuesLabel',
      title: 'Label de la Sección Valores',
      description: 'Texto pequeño encima del título de la sección de valores (ej: "Filosofía")',
      type: 'string',
      group: 'values',
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Título de la Sección Valores (H2)',
      description: 'Título H2 de la sección de valores corporativos',
      type: 'string',
      group: 'values',
    }),
    defineField({
      name: 'valuesSubtitle',
      title: 'Subtítulo de Valores',
      description: 'Párrafo de apoyo debajo del título de valores',
      type: 'text',
      rows: 3,
      group: 'values',
    }),
    defineField({
      name: 'values',
      title: 'Lista de Valores',
      description: 'Los valores y principios que guían a Quercus',
      type: 'array',
      group: 'values',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título del Valor', type: 'string', description: 'ej: "Regeneración", "Comunidad", "Bienestar"' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3, description: 'Explicación del valor corporativo' }),
            defineField({ name: 'icon', title: 'Ícono / Emoji', type: 'string', description: 'Emoji o código de ícono representativo (ej: 🌿, 🏡)' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),

    // ─── SOSTENIBILIDAD ──────────────────────────────────────────────────────
    defineField({
      name: 'sustainabilityLabel',
      title: 'Label de Sostenibilidad',
      type: 'string',
      group: 'sustainability',
    }),
    defineField({
      name: 'sustainabilityTitle',
      title: 'Título de la Sección Sostenibilidad (H2)',
      type: 'string',
      group: 'sustainability',
    }),
    defineField({
      name: 'sustainabilityText',
      title: 'Texto de Sostenibilidad',
      type: 'text',
      rows: 5,
      group: 'sustainability',
    }),
    defineField({
      name: 'sustainabilityImage',
      title: 'Imagen de Sostenibilidad',
      type: 'image',
      options: { hotspot: true },
      group: 'sustainability',
      fields: [
        defineField({ name: 'alt', title: 'Alt', type: 'string' }),
      ],
    }),

    // ─── FINAL CTA ───────────────────────────────────────────────────────────
    defineField({
      name: 'finalCtaTitle',
      title: 'Título del CTA Final (H2)',
      description: 'ej: "El futuro de Quercus apenas comienza"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaSubtitle',
      title: 'Subtítulo del CTA Final',
      description: 'Párrafo bajo el título',
      type: 'text',
      rows: 3,
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaButtonText',
      title: 'Texto del Botón',
      description: 'ej: "Explorar comunidades"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaButtonLink',
      title: 'Enlace del Botón',
      description: 'ej: "/#proyectos"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaImage',
      title: 'Imagen de Fondo',
      type: 'image',
      options: { hotspot: true },
      group: 'finalCta',
      fields: [
        defineField({ name: 'alt', title: 'Alt', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nuestra Historia', subtitle: 'Singleton — /historia' }
    },
  },
})
