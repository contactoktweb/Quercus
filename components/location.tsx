"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const locations = [
  { name: 'La Paz', x: 35, y: 45 },
  { name: 'La Ventana', x: 42, y: 52 },
  { name: 'El Sargento', x: 45, y: 55 },
  { name: 'Los Barriles', x: 55, y: 65 },
  { name: 'La Ribera', x: 60, y: 72 },
  { name: 'Todos Santos', x: 25, y: 58 },
]

export function Location() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-gunmetal">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki">Ubicación</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-warm-white leading-[1.2]">
              Baja California Sur como territorio de vida
            </h2>
            <p className="mt-8 text-silver-sand/80 leading-relaxed">
              Entre el Mar de Cortés, el Pacífico y el desierto, Quercus desarrolla comunidades conectadas con uno de los paisajes más extraordinarios de México.
            </p>

            {/* Location List */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-1.5 h-1.5 bg-crystal-blue" />
                  <span className="text-warm-white/80 text-sm group-hover:text-khaki transition-colors duration-300">
                    {location.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square"
          >
            {/* Stylized Map Background */}
            <div className="absolute inset-0 bg-rifle-green/30 overflow-hidden">
              {/* Abstract peninsula shape */}
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
                <path
                  d="M30 10 Q35 20 32 35 Q28 50 35 65 Q42 80 30 95 L70 95 Q58 80 65 65 Q72 50 68 35 Q65 20 70 10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-khaki/40"
                />
              </svg>
            </div>

            {/* Location Points */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="absolute group cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <div className="relative">
                  <span className="absolute w-4 h-4 bg-crystal-blue/50 rounded-full animate-ping" />
                  <span className="relative block w-3 h-3 bg-crystal-blue rounded-full" />
                </div>
                <span className="absolute left-5 top-0 text-xs text-warm-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {location.name}
                </span>
              </motion.div>
            ))}

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 text-xs text-warm-white/40 tracking-luxury">
              MAR DE CORTÉS
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-warm-white/40 tracking-luxury">
              OCÉANO PACÍFICO
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
