import { defineType, defineField } from 'sanity'

/**
 * SCHEMA: globalConfig
 * Singleton — Configuración global del sitio (logo, favicon, contacto, redes, footer).
 * Solo debe existir UN documento de este tipo.
 */
export const globalConfig = defineType({
  name: 'globalConfig',
  title: 'Configuración Global',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del Sitio',
      description: 'Nombre del sitio web (ej: "Quercus")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      description: 'Logo que aparece en el header y footer del sitio',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (alt)', type: 'string', description: 'Descripción accesible de la imagen' }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: 'Icono pequeño que aparece en la pestaña del navegador (idealmente 32x32 o 64x64 px)',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de Contacto (Público)',
      description: 'Email que se muestra al público en el sitio web',
      type: 'string',
    }),
    defineField({
      name: 'notificationsEmail',
      title: 'Email de Notificaciones (Resend)',
      description: 'Email donde se recibirán las notificaciones de los formularios de contacto. Usado por Resend.',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono de Contacto',
      description: 'Número de teléfono principal de la empresa',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      description: 'Dirección física de las oficinas',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'footerDescription',
      title: 'Descripción del Footer',
      description: 'Texto corto que aparece debajo del logo en el footer',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      description: 'Links a las redes sociales de Quercus',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Plataforma', type: 'string', description: 'ej: Instagram, LinkedIn, YouTube' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'editorUsername',
      title: 'Usuario del Mapa (Modo Editor)',
      description: 'Nombre de usuario para iniciar sesión en la página /login y habilitar la edición de lotes en el mapa',
      type: 'string',
    }),
    defineField({
      name: 'editorPassword',
      title: 'Contraseña del Mapa (Modo Editor)',
      description: 'Contraseña para iniciar sesión en el modo editor. (Por seguridad, esto solo debe ser visible por los administradores en Sanity)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title || 'Configuración Global', subtitle: 'Singleton' }
    },
  },
})
