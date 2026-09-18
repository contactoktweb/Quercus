import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { EditorialIntro } from '@/components/editorial-intro'
import { ValuesSection } from '@/components/values-section'
import { Pillars } from '@/components/pillars'
import { InteractiveProjects } from '@/components/interactive-projects'
import { FeaturedProject } from '@/components/featured-project'
import { HistoryTeaser } from '@/components/history-teaser'
import { Testimonials } from '@/components/testimonials'

import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

import { sanityFetch, HOME_PAGE_QUERY, GLOBAL_CONFIG_QUERY, ALL_PROJECTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function Home() {
  const [homeData, configData, projectsData] = await Promise.all([
    sanityFetch<any>({ query: HOME_PAGE_QUERY }),
    sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY }),
    sanityFetch<any[]>({ query: ALL_PROJECTS_QUERY })
  ])

  return (
    <main className="overflow-x-hidden">
      <Header config={configData} projects={projectsData} />
      <Hero data={homeData} />
      <EditorialIntro data={homeData} />
      <InteractiveProjects projects={projectsData} />
      <FeaturedProject projects={projectsData} data={homeData} />
      <ValuesSection />
      <Pillars data={homeData} />
      <HistoryTeaser />
      <Testimonials data={homeData} />

      <ContactForm data={homeData} config={configData} />
      <Footer config={configData} projects={projectsData} />
    </main>
  )
}
