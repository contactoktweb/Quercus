import { defineType, defineField } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog / Sostenibilidad',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Artículo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Identificador único para la URL del artículo (ej: mi-primer-articulo)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo (Alt)',
          type: 'string',
          description: 'Importante para SEO y accesibilidad',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen (Excerpt)',
      description: 'Breve resumen del artículo que aparecerá en las tarjetas del listado principal.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: 'Contenido del Artículo',
      description: 'Editor de texto enriquecido para escribir el artículo.',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
              description: 'Importante para accesibilidad y SEO.',
            },
            {
              name: 'width',
              type: 'string',
              title: 'Ancho de la imagen',
              description: 'Ejemplo: 100%, 500px, 50vw. Si se deja en blanco, usará 100%.',
            },
          ]
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishedAt'
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('es-ES') : ''
      }
    }
  }
})
