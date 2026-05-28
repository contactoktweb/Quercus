"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function HistoryTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-40 bg-gunmetal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-warm-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-warm-white" />
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-xs tracking-luxury uppercase text-khaki mb-8"
        >
          Nuestra trayectoria
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-white leading-[1.2] mb-8"
        >
          Más de dos décadas creando comunidades regenerativas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-silver-sand/70 text-base md:text-lg leading-relaxed mb-12 max-w-[700px] mx-auto font-light"
        >
          Desde sus primeros proyectos en Michoacán hasta las comunidades frente al mar en Baja California Sur, Quercus ha construido una visión de desarrollo basada en naturaleza, bienestar y conexión humana.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/historia"
            className="inline-flex items-center gap-3 text-warm-white text-sm tracking-luxury uppercase border-b border-warm-white/30 pb-2 hover:border-khaki hover:text-khaki transition-colors duration-300 group"
          >
            Conocer nuestra historia
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
