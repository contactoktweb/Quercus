import { defineType, defineField } from 'sanity'

/**
 * SCHEMA: projectLot
 * Colección — Un documento por cada lote de un proyecto.
 * Los lotes se editan desde el Modo Editor del mapa en el sitio web
 * y también se pueden editar manualmente desde Sanity Studio.
 */
export const projectLot = defineType({
  name: 'projectLot',
  title: 'Lotes de Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'lotId',
      title: 'ID del Lote',
      description: 'Identificador único del lote (ej: "A-01", "LOTE-4357", "QE-ESSENTIA"). No cambiar una vez creado.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Proyecto',
      description: 'Proyecto al que pertenece este lote. Debe referenciar un documento de tipo "project".',
      type: 'reference',
      to: [{ type: 'project' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado del Lote',
      description: 'Estado actual de disponibilidad del lote',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Disponible', value: 'available' },
          { title: '🟡 Apartado / Reservado', value: 'reserved' },
          { title: '🔴 Vendido / Ocupado', value: 'occupied' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Superficie del Lote',
      description: 'Área total del lote con unidad (ej: "450 m²", "1,200 m²")',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      description: 'Precio del lote o texto de precio (ej: "USD $85,000", "Consultar", "Vendido")',
      type: 'string',
    }),
    defineField({
      name: 'zone',
      title: 'Zona',
      description: 'Zona o sección del proyecto a la que pertenece el lote (ej: "Zona A", "Frente de Playa")',
      type: 'string',
    }),
    defineField({
      name: 'view',
      title: 'Vista',
      description: 'Tipo de vista que tiene el lote (ej: "Vista al mar", "Vista al jardín", "Vista panorámica")',
      type: 'string',
    }),
    defineField({
      name: 'geoJsonFeature',
      title: 'GeoJSON del Polígono (Mapa)',
      description: 'Datos GeoJSON del polígono que delimita el lote en el mapa interactivo. Se actualiza automáticamente cuando el editor guarda desde el Modo Editor del mapa. No editar manualmente a menos que sea estrictamente necesario.',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'notes',
      title: 'Notas Internas',
      description: 'Notas o comentarios internos sobre este lote. No se muestran al público.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'lotId',
      subtitle: 'status',
      projectName: 'project.name',
    },
    prepare({ title, subtitle, projectName }) {
      const statusEmoji = subtitle === 'available' ? '🟢' : subtitle === 'reserved' ? '🟡' : '🔴'
      return {
        title: `${title}`,
        subtitle: `${projectName || 'Sin proyecto'} — ${statusEmoji} ${subtitle}`,
      }
    },
  },
  orderings: [
    {
      title: 'ID del Lote',
      name: 'lotIdAsc',
      by: [{ field: 'lotId', direction: 'asc' }],
    },
    {
      title: 'Estado',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
