import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/** Cliente de lectura — seguro para usar en el navegador */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

/**
 * Cliente de ESCRITURA — solo usar en Server Actions o API Routes (server-side).
 * El token NUNCA debe llegar al navegador.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
