"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function EditorialIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-warm-white" id="filosofia">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative Element */}
          <div className="flex justify-center mb-12">
            <div className="w-px h-16 bg-khaki" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gunmetal leading-[1.3] text-balance">
            Quercus desarrolla comunidades de baja densidad donde la naturaleza, el bienestar y la inversión patrimonial conviven en equilibrio.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-lg md:text-xl text-rifle-green/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Durante más de dos décadas, hemos creado entornos regenerativos diseñados para quienes buscan vivir con propósito, invertir con visión y formar parte de una comunidad consciente.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {[
            { number: '20+', label: 'Años de experiencia' },
            { number: '5', label: 'Comunidades activas' },
            { number: '1000+', label: 'Hectáreas desarrolladas' },
            { number: '∞', label: 'Compromiso con la naturaleza' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-gunmetal">{stat.number}</div>
              <div className="mt-2 text-xs tracking-luxury uppercase text-rifle-green/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
