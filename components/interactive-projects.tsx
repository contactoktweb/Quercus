"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { projectsData, getProjectsByRegion } from '@/lib/projects-data'

type Region = 'baja-california-sur' | 'michoacan'

const regionLabels: Record<Region, string> = {
  'baja-california-sur': 'Baja California Sur',
  'michoacan': 'Michoacán'
}

function ProjectColumn({ 
  project, 
  isHovered, 
  onHover, 
  onLeave,
  index 
}: { 
  project: typeof projectsData[0]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = useCallback(() => {
    onHover()
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [onHover])

  const handleMouseLeave = useCallback(() => {
    onLeave()
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [onLeave])

  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      initial={{ flex: 1 }}
      animate={{ 
        flex: isHovered ? 2.5 : 1,
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{ 
          backgroundImage: `url('${project.image}')`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      {/* Video (shown on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-soft-black/90 via-soft-black/40 to-soft-black/20"
        animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10">
        {/* Top - Index */}
        <motion.span 
          className="text-warm-white/40 text-xs tracking-luxury"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: isHovered ? 0.3 : 0 }}
        >
          0{index + 1}
        </motion.span>

        {/* Center - Logo/Name */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center justify-center"
          >
            {project.logo ? (
              <img src={project.logo} alt={project.name} className="h-20 md:h-28 lg:h-32 object-contain" />
            ) : (
              <h3 className="font-serif text-warm-white text-2xl md:text-3xl lg:text-4xl text-center">
                {project.name}
              </h3>
            )}
          </motion.div>
        </div>

        {/* Bottom - Description & CTA */}
        <div className="space-y-4">
          {/* Location */}
          <motion.p
            className="text-warm-white/50 text-xs tracking-luxury uppercase text-center"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: isHovered ? 0.3 : 0 }}
          >
            {project.location}
          </motion.p>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0, transition: { duration: 0 } }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-4"
              >
                <p className="text-warm-white/80 text-sm leading-relaxed max-w-xs">
                  {project.description}
                </p>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="inline-flex items-center gap-2 bg-warm-white/10 backdrop-blur-sm border border-warm-white/20 text-warm-white text-xs tracking-luxury uppercase px-5 py-3 hover:bg-warm-white hover:text-gunmetal transition-all duration-300"
                >
                  Ver más
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!isHovered && (
            <motion.div
              className="flex items-center justify-center gap-2"
            >
              <span className="text-khaki text-xs tracking-luxury uppercase">Descubre</span>
              <svg className="w-4 h-4 text-khaki" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>

      {/* Vertical Separator */}
      <div className="absolute top-0 right-0 w-px h-full bg-warm-white/10" />
    </motion.div>
  )
}

function MobileProjectCard({ project, index }: { project: typeof projectsData[0], index: number }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[85vw] max-w-[400px] snap-center"
    >
      <div 
        className="relative aspect-[3/4] overflow-hidden group"
        onClick={toggleVideo}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.image}')` }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-soft-black/90 via-soft-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <span className="text-warm-white/50 text-xs tracking-luxury mb-2">0{index + 1}</span>
          {project.logo ? (
            <img src={project.logo} alt={project.name} className="h-12 object-contain mb-4 self-start" />
          ) : (
            <h3 className="font-serif text-warm-white text-2xl mb-2">{project.name}</h3>
          )}
          <p className="text-warm-white/50 text-xs tracking-luxury uppercase mb-3">{project.location}</p>
          <p className="text-warm-white/70 text-sm leading-relaxed mb-4">{project.description}</p>
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-2 self-start bg-warm-white/10 backdrop-blur-sm border border-warm-white/20 text-warm-white text-xs tracking-luxury uppercase px-4 py-2.5 hover:bg-warm-white hover:text-gunmetal transition-all duration-300"
          >
            Ver más
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Play indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-10 h-10 rounded-full border border-warm-white/30 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-warm-white/20' : 'bg-transparent'}`}>
            {isPlaying ? (
              <svg className="w-4 h-4 text-warm-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-warm-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function InteractiveProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeRegion, setActiveRegion] = useState<Region>('baja-california-sur')

  const filteredProjects = getProjectsByRegion(activeRegion)

  return (
    <section ref={ref} className="bg-soft-black" id="proyectos">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-xs tracking-luxury uppercase text-khaki">Portfolio</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white leading-[1.2]">
              Nuestras comunidades
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-4">
            <p className="text-warm-white/60 max-w-md text-sm leading-relaxed md:text-right">
              Cada proyecto nace del paisaje, la cultura local y una visión de largo plazo.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-1 mt-12 bg-soft-black/50 border border-silver-sand/10 p-1.5 w-fit"
        >
          {(Object.keys(regionLabels) as Region[]).map((region) => (
            <button
              key={region}
              onClick={() => {
                setActiveRegion(region)
                setHoveredIndex(null)
              }}
              className={`text-xs tracking-luxury uppercase px-6 py-3 transition-all duration-300 ${
                activeRegion === region
                  ? 'bg-khaki/20 text-khaki'
                  : 'text-warm-white/50 hover:text-warm-white'
              }`}
            >
              {regionLabels[region]}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Desktop: Full-height columns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex h-[85vh] min-h-[600px] max-h-[900px]"
        >
          {filteredProjects.map((project, index) => (
            <ProjectColumn
              key={project.slug}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mobile/Tablet: Horizontal scrolling cards */}
      <div className="lg:hidden pb-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeRegion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {filteredProjects.map((project, index) => (
              <MobileProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
