"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { InteractiveMasterPlan } from '@/components/interactive-master-plan'
import { Investment } from '@/components/investment'
import { MasonryGallery } from '@/components/masonry-gallery'
import { ProjectContactForm } from '@/components/project-contact-form'
import { Project } from '@/lib/projects-data'

interface ProjectPageTemplateProps {
  project: Project
}

function HeroSection({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={project.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={project.image}
      />
      
      {/* Fallback Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${project.image}')` }}
      />
      
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
            <span className="text-xs tracking-luxury uppercase text-khaki mb-6 block">Acerca del proyecto</span>
            <h2 className="font-serif text-3xl md:text-4xl text-gunmetal leading-[1.2] mb-6">
              Un refugio diseñado para el bienestar y la conexión con la naturaleza
            </h2>
            <p className="text-rifle-green/70 text-base leading-relaxed font-light">
              {project.description} Cada espacio ha sido cuidadosamente pensado para crear armonía entre la arquitectura contemporánea y el entorno natural que lo rodea.
            </p>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {project.stats.map((stat, index) => (
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
          {project.amenities.map((amenity, index) => (
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

function LocationSection({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square bg-rifle-green/10 overflow-hidden"
          >
            {/* Stylized map representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                {/* Map outline */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-rifle-green/30" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M20,100 Q40,60 80,80 T120,100 T160,80 T180,100" />
                  <path d="M40,120 Q60,100 100,120 T140,120 T180,140" />
                  <circle cx="100" cy="100" r="60" strokeDasharray="4 4" />
                </svg>
                {/* Location marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-khaki rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-khaki/50 rounded-full" />
                </div>
              </div>
            </div>
            {/* Coordinates */}
            <div className="absolute bottom-4 left-4 text-xs tracking-luxury text-rifle-green/50">
              {project.coordinates.lat.toFixed(4)}°N, {Math.abs(project.coordinates.lng).toFixed(4)}°W
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki mb-6 block">Ubicación</span>
            <h2 className="font-serif text-3xl md:text-4xl text-gunmetal leading-[1.2] mb-6">
              {project.location}
            </h2>
            <p className="text-rifle-green/70 text-base leading-relaxed font-light mb-8">
              Ubicado en un entorno natural privilegiado, el proyecto conecta paisaje, tranquilidad y acceso estratégico a los principales puntos de la región.
            </p>

            {/* Nearby places */}
            <div className="space-y-4">
              {project.nearbyPlaces.map((place) => (
                <div key={place.name} className="flex items-center justify-between py-3 border-b border-silver-sand/30">
                  <span className="text-gunmetal">{place.name}</span>
                  <span className="text-rifle-green/50 text-sm">{place.distance}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://www.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-khaki text-sm tracking-luxury uppercase mt-8 hover:text-gunmetal transition-colors duration-300"
            >
              Ver en Google Maps
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ProjectPageTemplate({ project }: ProjectPageTemplateProps) {
  const [selectedLot, setSelectedLot] = useState<string | null>(null)

  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection project={project} />
      <StatsSection project={project} />
      
      <Investment />

      {/* Master Plan Section */}
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
            onSelectLot={(lotId) => setSelectedLot(lotId)}
          />
        </div>
      </section>

      <AmenitiesSection project={project} />
      <LocationSection project={project} />

      {/* Gallery Section */}
      {project.gallery.length > 0 && (
        <section className="py-20 md:py-28 bg-warm-white">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <span className="text-xs tracking-luxury uppercase text-khaki">Galería</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-gunmetal">
                Descubre cada detalle
              </h2>
            </div>
            <MasonryGallery images={project.gallery} />
          </div>
        </section>
      )}

      {/* Renders Section */}
      {project.renders.length > 0 && (
        <section className="py-20 md:py-28 bg-gunmetal">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <span className="text-xs tracking-luxury uppercase text-khaki">Renders</span>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-warm-white">
                Visión arquitectónica
              </h2>
            </div>
            <MasonryGallery images={project.renders} theme="dark" />
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section id="contacto" className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 lg:px-20">
          <ProjectContactForm 
            projectName={project.name} 
            selectedLot={selectedLot}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
