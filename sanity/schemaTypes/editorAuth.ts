import { defineType, defineField } from 'sanity'

export const editorAuth = defineType({
  name: 'editorAuth',
  title: 'Credenciales de Editor',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Usuario',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Contraseña',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'username',
    },
    prepare({ title }) {
      return {
        title: `Editor: ${title}`,
      }
    },
  },
})
