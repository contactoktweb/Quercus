"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    number: '01',
    title: 'Comunidades Integrales',
    description: 'Diseñamos espacios que nutren el cuerpo, la mente y el espíritu, promoviendo estilos de vida equilibrados.',
  },
  {
    number: '02',
    title: 'Conexión Cultural',
    description: 'Honramos las raíces culturales que nos inspiran, fusionando tradición, territorio y modernidad.',
  },
  {
    number: '03',
    title: 'Sentido de Fraternidad',
    description: 'Promovemos relaciones auténticas con un sentido de pertenencia entre las personas, la comunidad y su entorno.',
  },
  {
    number: '04',
    title: 'Innovación con Propósito',
    description: 'Somos pioneros en modelos de desarrollo que transforman la calidad de vida con una visión consciente de prosperidad.',
  },
]

export function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.1]">
            Nuestros Valores
          </h2>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 md:mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group text-center md:text-left"
            >
              {/* Number */}
              <span className="inline-block text-xs text-khaki tracking-luxury mb-6 transition-colors duration-300">
                {value.number}
              </span>
              
              {/* Subtle line */}
              <div className="w-12 h-px bg-silver-sand/50 mx-auto md:mx-0 mb-6 group-hover:bg-khaki group-hover:w-16 transition-all duration-500" />
              
              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl text-gunmetal mb-4 leading-tight">
                {value.title}
              </h3>
              
              {/* Description */}
              <p className="text-rifle-green/70 text-sm leading-relaxed font-light">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom phrase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-6">
            <div className="w-16 h-px bg-khaki/50" />
            <p className="text-xs tracking-luxury uppercase text-rifle-green/60">
              Un acto de amor por el presente y responsabilidad con el futuro
            </p>
            <div className="w-16 h-px bg-khaki/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
