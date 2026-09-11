import { notFound } from 'next/navigation'
import { ProjectPageTemplate } from '@/components/project-page-template'
import { projectsData, getProjectBySlug } from '@/lib/projects-data'
import { sanityFetch, PROJECT_BY_SLUG_QUERY, ALL_PROJECTS_QUERY, GLOBAL_CONFIG_QUERY, optimizeSanityUrl } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  try {
    const projects = await sanityFetch<any[]>({ query: ALL_PROJECTS_QUERY })
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    return projectsData.map((project) => ({
      slug: project.slug,
    }))
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })
  if (!project) {
    if (slug === 'quercus-mil-cumbres' || slug === 'mil-cumbres') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'querucs-mil-cumbres' } })
    } else if (slug === 'querucs-mil-cumbres') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'mil-cumbres' } })
    } else if (slug === 'quercus-baja') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'quercus-origen' } })
    }
  }
  if (!project) {
    project = getProjectBySlug(slug)
  }
  
  if (!project) {
    return { title: 'Proyecto no encontrado | Quercus' }
  }

  const ogImage = optimizeSanityUrl(project.image, { width: 1200, height: 630, quality: 85 })

  return {
    title: `${project.name} | Quercus`,
    description: project.description,
    openGraph: {
      title: `${project.name} - ${project.tagline}`,
      description: project.description,
      images: [ogImage || project.image],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })
  if (!project) {
    if (slug === 'quercus-mil-cumbres' || slug === 'mil-cumbres') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'querucs-mil-cumbres' } })
    } else if (slug === 'querucs-mil-cumbres') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'mil-cumbres' } })
    } else if (slug === 'quercus-baja') {
      project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug: 'quercus-origen' } })
    }
  }
  
  // Format and optimize Sanity data
  if (project) {
    if (project.image) project.image = optimizeSanityUrl(project.image, { width: 1920, quality: 85 })
    if (project.logo) project.logo = optimizeSanityUrl(project.logo)
    if (project.gallery) project.gallery = project.gallery.map((img: any) => optimizeSanityUrl(img, { width: 1600, quality: 85 }))
    if (project.renders) project.renders = project.renders.map((img: any) => optimizeSanityUrl(img, { width: 1600, quality: 85 }))
    if (project.masterPlanImage) project.masterPlanImage = optimizeSanityUrl(project.masterPlanImage, { width: 2000, quality: 90 })
  } else {
    // Fallback
    project = getProjectBySlug(slug)
  }

  if (!project) {
    notFound()
  }

  // Fetch lots, config & all projects for header
  let sanityLots: any[] = []
  let configData: any = null
  let allProjectsList: any[] = []
  
  const { LOTS_BY_PROJECT_QUERY } = await import('@/sanity/lib/queries')
  const [lots, config, allProjects] = await Promise.all([
    project._id ? sanityFetch<any[]>({ query: LOTS_BY_PROJECT_QUERY, params: { projectId: project._id } }) : Promise.resolve([]),
    sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY }),
    sanityFetch<any[]>({ query: ALL_PROJECTS_QUERY }),
  ])
  sanityLots = lots || []
  configData = config
  allProjectsList = allProjects || []

  return (
    <ProjectPageTemplate 
      project={project} 
      sanityLots={sanityLots}
      config={configData}
      projects={allProjectsList}
    />
  )
}
