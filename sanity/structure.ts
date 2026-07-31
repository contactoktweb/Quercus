import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Contenido del Sitio')
    .items([
      // ─── SINGLETONS ───────────────────────────────────────────────────────
      S.listItem()
        .title('⚙️ Configuración Global')
        .child(
          S.document()
            .schemaType('globalConfig')
            .documentId('globalConfig')
        ),
      S.divider(),
      S.listItem()
        .title('🏠 Página de Inicio')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('📖 Página: Nuestra Historia')
        .child(
          S.document()
            .schemaType('historiaPage')
            .documentId('historiaPage')
        ),
      S.divider(),
      // ─── COLECCIONES ─────────────────────────────────────────────────────
      S.listItem()
        .title('🏡 Proyectos')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Proyectos')),
      S.listItem()
        .title('🗺️ Lotes de Proyectos')
        .schemaType('projectLot')
        .child(S.documentTypeList('projectLot').title('Lotes')),
      S.listItem()
        .title('📝 Blog / Sostenibilidad')
        .schemaType('blog')
        .child(S.documentTypeList('blog').title('Artículos')),
    ])
