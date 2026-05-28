"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { historyTimeline } from '@/lib/projects-data'

function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-soft-black/60 via-soft-black/40 to-soft-black/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block text-xs tracking-luxury uppercase text-khaki mb-6"
        >
          Nuestra trayectoria
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-4xl md:text-5xl lg:text-7xl text-warm-white leading-[1.1] mb-6"
        >
          Nuestra Historia
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-warm-white/70 text-lg md:text-xl font-light"
        >
          Más de dos décadas creando comunidades regenerativas en México.
        </motion.p>
      </div>
    </section>
  )
}

function IntroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-serif text-2xl md:text-3xl text-gunmetal leading-relaxed">
            Quercus nace de una visión profunda: crear comunidades donde la naturaleza, la arquitectura y las personas convivan en equilibrio.
          </p>
          <div className="w-16 h-px bg-khaki mx-auto my-10" />
          <p className="text-rifle-green/70 text-base md:text-lg leading-relaxed font-light">
            A lo largo de más de veinte años, esta visión ha evolucionado desde proyectos en Michoacán hasta desarrollos regenerativos en Baja California Sur. Cada comunidad representa un capítulo en nuestra historia de conexión con el territorio mexicano.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gunmetal">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Línea del tiempo</span>
          <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-warm-white">
            Hitos de nuestra evolución
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-silver-sand/20 -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-0">
            {historyTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`relative md:flex md:items-center md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className="bg-soft-black/30 p-6 md:p-8 border border-silver-sand/10 hover:border-khaki/30 transition-colors duration-500">
                    <span className="text-khaki text-3xl md:text-4xl font-serif">{item.year}</span>
                    <h3 className="font-serif text-xl text-warm-white mt-3 mb-2">{item.title}</h3>
                    <p className="text-silver-sand/60 text-sm font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gunmetal border-2 border-khaki rounded-full" />

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LegacySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop')` 
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki">Nuestro legado</span>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl text-gunmetal leading-[1.2] mb-6">
              Un legado en evolución
            </h2>
            <p className="text-rifle-green/70 text-base leading-relaxed font-light mb-8">
              Cada comunidad representa una forma distinta de entender el territorio: desde el bosque y la montaña hasta el desierto, la playa y el Mar de Cortés. Nuestra historia es un testimonio de respeto por la naturaleza y compromiso con el bienestar humano.
            </p>
            <div className="flex flex-wrap gap-6 text-center">
              <div>
                <span className="block font-serif text-3xl text-gunmetal">20+</span>
                <span className="text-xs tracking-luxury uppercase text-rifle-green/50">Años</span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-gunmetal">10</span>
                <span className="text-xs tracking-luxury uppercase text-rifle-green/50">Comunidades</span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-gunmetal">2</span>
                <span className="text-xs tracking-luxury uppercase text-rifle-green/50">Estados</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-soft-black/90 via-soft-black/70 to-soft-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-white leading-[1.2] mb-6">
            El futuro de Quercus apenas comienza
          </h2>
          <p className="text-warm-white/70 text-base md:text-lg font-light mb-10 max-w-[600px] mx-auto">
            Descubre las comunidades que hoy continúan esta visión de desarrollo regenerativo y bienestar.
          </p>
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-3 bg-warm-white text-gunmetal text-sm tracking-luxury uppercase px-8 py-4 hover:bg-khaki transition-colors duration-300"
          >
            Explorar comunidades
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export function HistoriaPage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <IntroSection />
      <TimelineSection />
      <LegacySection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
