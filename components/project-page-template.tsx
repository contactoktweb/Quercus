"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { InteractiveMasterPlan } from '@/components/interactive-master-plan'
import { Investment } from '@/components/investment'
import { Skiper54Gallery } from '@/components/skiper54-gallery'
import { ContactForm } from '@/components/contact-form'
import { Project } from '@/lib/projects-data'

interface ProjectPageTemplateProps {
  project: Project
  sanityLots?: any[]
  config?: any
  projects?: any[]
}

function HeroSection({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Fallback Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${project.image}')` }}
      />

      {/* Background Video */}
      {(project.heroVideo?.asset?.url || project.heroVideo) && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={project.heroVideo?.asset?.url || project.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={project.image}
          />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-soft-black via-soft-black/50 to-soft-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-luxury uppercase text-khaki mb-4 block">
            {project.location}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-warm-white mb-4">
            {project.logo ? (
              <>
                <img src={project.logo} alt={project.name} className="h-16 md:h-24 lg:h-32 object-contain" />
                <span className="sr-only">{project.name}</span>
              </>
            ) : (
              project.name
            )}
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-warm-white/70 mb-6">
            {project.tagline}
          </p>
          <p className="text-warm-white/60 text-base md:text-lg max-w-xl mb-10 font-light">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="#masterplan"
              className="inline-flex items-center gap-2 bg-warm-white text-gunmetal text-sm tracking-luxury uppercase px-6 py-4 hover:bg-khaki transition-colors duration-300"
            >
              Ver master plan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-warm-white/30 text-warm-white text-sm tracking-luxury uppercase px-6 py-4 hover:bg-warm-white/10 transition-colors duration-300"
            >
              Solicitar información
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const aboutLabel = project.aboutLabel || "Acerca del proyecto"
  const aboutTitle = project.aboutTitle || "Un refugio diseñado para el bienestar y la conexión con la naturaleza"
  const aboutDescription = project.aboutDescription || project.description

  return (
    <section ref={ref} className="py-20 md:py-28 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left - Editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki mb-6 block">{aboutLabel}</span>
            <h2 className="font-serif text-3xl md:text-4xl text-gunmetal leading-[1.2] mb-6">
              {aboutTitle}
            </h2>
            <p className="text-rifle-green/70 text-base leading-relaxed font-light whitespace-pre-line">
              {aboutDescription}
            </p>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {(project.stats || []).map((stat: any, index: number) => (
              <div key={stat.label} className="border-t border-silver-sand/30 pt-4">
                <span className="text-xs tracking-luxury uppercase text-rifle-green/50 block mb-2">
                  {stat.label}
                </span>
                <span className="font-serif text-xl text-gunmetal">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AmenitiesSection({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gunmetal">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Experiencias</span>
          <h2 className="mt-6 font-serif text-3xl md:text-4xl text-warm-white">
            Experiencias y amenidades
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(project.amenities || []).map((amenity: any, index: number) => (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border border-silver-sand/20 p-6 hover:border-khaki/50 transition-colors duration-300"
            >
              <span className="text-warm-white text-sm font-light">{amenity}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


export function ProjectPageTemplate({ project, sanityLots = [], config, projects = [] }: ProjectPageTemplateProps) {
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null)

  const showMasterPlan = Boolean(project.masterPlanImage || ['dunah', 'el-quelele', 'quintaesencia'].includes(project.slug))

  return (
    <main className="overflow-x-hidden">
      <Header config={config} projects={projects} />
      <HeroSection project={project} />
      <StatsSection project={project} />
      
      <Investment />

      {/* Master Plan Section */}
      {showMasterPlan && (
        <section id="masterplan" className="py-20 md:py-28 bg-soft-black">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <span className="text-xs tracking-luxury uppercase text-khaki">Master Plan</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-warm-white">
                Explora los lotes disponibles
              </h2>
              <p className="mt-4 text-warm-white/60 text-base max-w-xl mx-auto">
                Descubre los espacios que dan forma a la comunidad. Haz clic en un lote para ver sus detalles.
              </p>
            </div>
            <InteractiveMasterPlan 
              projectSlug={project.slug} 
              onSelectLot={setSelectedLotId}
              sanityLots={sanityLots}
              masterPlanImage={project.masterPlanImage?.asset?.url || project.masterPlanImage}
            />
          </div>
        </section>
      )}

      <AmenitiesSection project={project} />

      {/* Gallery Section */}
      {(project.gallery?.length || 0) > 0 && (
        <section className="py-20 md:py-28 bg-warm-white">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <span className="text-xs tracking-luxury uppercase text-khaki">Galería</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-gunmetal">
                Descubre cada detalle
              </h2>
            </div>
            <Skiper54Gallery 
              images={project.gallery} 
              projectName={project.name}
              theme="light"
            />
          </div>
        </section>
      )}

      {/* Renders Section */}
      {(project.renders?.length || 0) > 0 && (
        <section className="py-20 md:py-28 bg-gunmetal">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <span className="text-xs tracking-luxury uppercase text-khaki">Renders</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-warm-white">
                Visión arquitectónica
              </h2>
            </div>
            <Skiper54Gallery 
              images={project.renders} 
              projectName={project.name}
              theme="dark" 
            />
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <ContactForm />

      <Footer config={config} projects={projects} />
    </main>
  )
}
