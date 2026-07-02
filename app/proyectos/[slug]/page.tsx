import { notFound } from 'next/navigation'
import { ProjectPageTemplate } from '@/components/project-page-template'
import { projectsData, getProjectBySlug } from '@/lib/projects-data'
import { sanityFetch, PROJECT_BY_SLUG_QUERY, ALL_PROJECTS_QUERY, GLOBAL_CONFIG_QUERY } from '@/sanity/lib/queries'

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
    project = getProjectBySlug(slug)
  }
  
  if (!project) {
    return { title: 'Proyecto no encontrado | Quercus' }
  }

  return {
    title: `${project.name} | Quercus`,
    description: project.description,
    openGraph: {
      title: `${project.name} - ${project.tagline}`,
      description: project.description,
      images: [project.image?.asset?.url || project.image],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let project = await sanityFetch<any>({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })
  
  // Format Sanity data to match local structure if needed
  if (project) {
    if (project.image?.asset?.url) project.image = project.image.asset.url
    if (project.logo?.asset?.url) project.logo = project.logo.asset.url
    if (project.gallery) project.gallery = project.gallery.map((img: any) => img.asset?.url || img)
    if (project.renders) project.renders = project.renders.map((img: any) => img.asset?.url || img)
  } else {
    // Fallback
    project = getProjectBySlug(slug)
  }

  if (!project) {
    notFound()
  }

  // Fetch lots & config
  let sanityLots: any[] = []
  let configData: any = null
  if (project._id) {
    const { LOTS_BY_PROJECT_QUERY } = await import('@/sanity/lib/queries')
    const [lots, config] = await Promise.all([
      sanityFetch<any[]>({ query: LOTS_BY_PROJECT_QUERY, params: { projectId: project._id } }),
      sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY })
    ])
    sanityLots = lots
    configData = config
  }

  return (
    <ProjectPageTemplate 
      project={project} 
      sanityLots={sanityLots}
      config={configData}
    />
  )
}
