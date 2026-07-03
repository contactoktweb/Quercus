import { type SchemaTypeDefinition } from 'sanity'
import { globalConfig } from './globalConfig'
import { homePage } from './homePage'
import { project } from './project'
import { projectLot } from './projectLot'
import { historiaPage } from './historiaPage'
import { editorAuth } from './editorAuth'
import { blog } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalConfig, homePage, project, projectLot, historiaPage, editorAuth, blog],
}
