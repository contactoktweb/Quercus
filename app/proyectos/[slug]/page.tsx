import { notFound } from 'next/navigation'
import { ProjectPageTemplate } from '@/components/project-page-template'
import { projectsData, getProjectBySlug } from '@/lib/projects-data'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return { title: 'Proyecto no encontrado | Quercus' }
  }

  return {
    title: `${project.name} | Quercus`,
    description: project.description,
    openGraph: {
      title: `${project.name} - ${project.tagline}`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectPageTemplate project={project} />
}
