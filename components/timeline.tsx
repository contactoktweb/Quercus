"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const timelineEvents = [
  { year: '2001', title: 'Fundación', desc: 'Inicio de la visión regenerativa' },
  { year: '2003', title: 'La Ventana', desc: 'Primera exploración del territorio' },
  { year: '2006', title: 'Quercus Baja', desc: 'Primera comunidad establecida' },
  { year: '2011', title: 'Expansión', desc: 'Nuevas ubicaciones identificadas' },
  { year: '2017', title: 'Ventusbay', desc: 'Comunidad de deportes acuáticos' },
  { year: '2019', title: 'Quercus Elemental', desc: 'Vida de playa consciente' },
  { year: '2021', title: 'El Quelele', desc: 'Entre desierto y océano' },
  { year: '2024', title: 'DUNAH', desc: 'Enfoque en bienestar holístico' },
  { year: '2025', title: 'Futuro', desc: 'Nuevos horizontes regenerativos' },
]

export function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white" id="historia">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Trayectoria</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.2]">
            Más de dos décadas creando comunidades
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-silver-sand/50 transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative md:flex ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`pl-8 md:pl-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <div className="mb-2">
                    <span className="font-serif text-3xl md:text-4xl text-khaki">{event.year}</span>
                  </div>
                  <h3 className="font-serif text-xl text-gunmetal">{event.title}</h3>
                  <p className="text-sm text-rifle-green/60 mt-1">{event.desc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 bg-khaki transform -translate-x-1/2 md:-translate-x-1/2" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
