import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { EditorialIntro } from '@/components/editorial-intro'
import { ValuesSection } from '@/components/values-section'
import { Pillars } from '@/components/pillars'
import { InteractiveProjects } from '@/components/interactive-projects'
import { FeaturedProject } from '@/components/featured-project'
import { Experiences } from '@/components/experiences'
import { Sustainability } from '@/components/sustainability'
import { HistoryTeaser } from '@/components/history-teaser'
import { Testimonials } from '@/components/testimonials'
import { Location } from '@/components/location'
import { Investment } from '@/components/investment'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <EditorialIntro />
      <ValuesSection />
      <Pillars />
      <InteractiveProjects />
      <FeaturedProject />
      <Experiences />
      <Sustainability />
      <HistoryTeaser />
      <Testimonials />
      <Location />
      <Investment />
      <ContactForm />
      <Footer />
    </main>
  )
}
