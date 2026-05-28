"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const paths = [
  {
    title: 'Vivir',
    description: 'Encuentra tu hogar en una comunidad consciente, rodeado de naturaleza y personas con valores afines.',
    cta: 'Explorar residencias'
  },
  {
    title: 'Invertir',
    description: 'Oportunidades de inversión patrimonial en ubicaciones estratégicas con visión de largo plazo.',
    cta: 'Conocer oportunidades'
  },
  {
    title: 'Crear un santuario',
    description: 'Diseña tu refugio personal, un espacio íntimo para desconectar y reconectar con lo esencial.',
    cta: 'Iniciar proyecto'
  }
]

export function Investment() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Opciones</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.2]">
            Vivir, invertir o crear<br />un refugio propio
          </h2>
          <p className="mt-6 text-rifle-green/70 max-w-2xl mx-auto">
            Quercus ofrece oportunidades para quienes buscan formar parte de comunidades naturales con visión de largo plazo.
          </p>
        </motion.div>

        {/* Paths Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group p-8 md:p-10 border border-silver-sand/30 hover:border-khaki/50 transition-all duration-500 hover:bg-rifle-green/5"
            >
              <span className="text-xs text-khaki tracking-luxury">0{index + 1}</span>
              <h3 className="mt-6 font-serif text-3xl text-gunmetal">{path.title}</h3>
              <p className="mt-4 text-rifle-green/70 text-sm leading-relaxed">{path.description}</p>
              <Link
                href="#contacto"
                className="mt-8 inline-flex items-center gap-2 text-sm text-gunmetal tracking-wider-luxury uppercase group-hover:text-khaki transition-colors duration-300"
              >
                {path.cta}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
