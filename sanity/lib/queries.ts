import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

/**
 * Genera la URL de una imagen de Sanity.
 * Uso: urlFor(image).width(800).url()
 */
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Función de fetch desde Sanity con revalidación para ISR.
 * Usa el cache de Next.js con revalidación cada 60 segundos.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string
  params?: Record<string, any>
  revalidate?: number
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  })
}

// ─── GROQ QUERIES ────────────────────────────────────────────────────────────

/** Obtiene la configuración global del sitio (logo, contacto, footer, etc.) */
export const GLOBAL_CONFIG_QUERY = `*[_type == "globalConfig"][0]{
  siteName,
  logo{ asset->{url}, alt },
  favicon{ asset->{url} },
  contactEmail,
  notificationsEmail,
  phone,
  address,
  footerDescription,
  socialLinks[]{ platform, url }
}`

/** Obtiene el contenido de la página de inicio */
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroImage{ asset->{url}, alt },
  heroVideo{ asset->{url} },
  heroCta1Label,
  heroCta2Label,
  heroLocationBadge,
  editorialHeadline,
  editorialParagraph,
  editorialImage{ asset->{url}, alt },
  editorialSectionLabel,
  editorialSectionTitle,
  editorialSectionText,
  principles[]{ title, desc },
  stats[]{ number, label },
  testimonials[]{ quote, author, role, avatar{ asset->{url}, alt } },
  contactTitle,
  contactSubtitle,
  featuredProject->{
    name,
    "slug": slug.current,
    tagline,
    description,
    image{ asset->{url}, alt },
    stats[]{ label, value }
  }
}`

/** Obtiene todos los proyectos para listados */
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  location,
  region,
  tagline,
  description,
  image{ asset->{url}, alt },
  logo{ asset->{url}, alt },
  video{ asset->{url} },
  heroVideo{ asset->{url} },
  status,
  hasMap
}`

/** Obtiene un proyecto por su slug */
export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  location,
  region,
  tagline,
  description,
  image{ asset->{url}, alt },
  logo{ asset->{url}, alt },
  video{ asset->{url} },
  heroVideo{ asset->{url} },
  status,
  stats[]{ label, value },
  amenities,
  gallery[]{ asset->{url}, alt },
  renders[]{ asset->{url}, alt },
  nearbyPlaces[]{ name, distance },
  hasMap,
  masterPlanImage{ asset->{url}, alt }
}`

/** Obtiene todos los lotes de un proyecto por el ID del proyecto */
export const LOTS_BY_PROJECT_QUERY = `*[_type == "projectLot" && project._ref == $projectId] | order(lotId asc){
  _id,
  lotId,
  status,
  area,
  price,
  zone,
  view,
  geoJsonFeature,
  "projectSlug": project->slug.current
}`

/** Obtiene el contenido de la página /historia */
export const HISTORIA_PAGE_QUERY = `*[_type == "historiaPage"][0]{
  heroLabel,
  heroTitle,
  heroSubtitle,
  heroImage{ asset->{url}, alt },
  timelineLabel,
  timelineTitle,
  timelineItems[]{ year, title, description, image{ asset->{url}, alt } },
  valuesLabel,
  valuesTitle,
  valuesSubtitle,
  values[]{ title, description, icon },
  sustainabilityLabel,
  sustainabilityTitle,
  sustainabilityText,
  sustainabilityImage{ asset->{url}, alt }
}`

/** Obtiene todos los blogs */
export const ALL_BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  coverImage{ asset->{url}, alt },
  excerpt
}`

/** Obtiene un blog por su slug */
export const BLOG_BY_SLUG_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  coverImage{ asset->{url}, alt },
  excerpt,
  content
}`
