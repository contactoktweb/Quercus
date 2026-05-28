"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const pillars = [
  {
    number: '01',
    title: 'Regeneración',
    description: 'Diseñamos comunidades que buscan honrar el territorio y crear valor para las personas y el entorno.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop'
  },
  {
    number: '02',
    title: 'Bienestar holístico',
    description: 'Espacios que invitan al movimiento, la contemplación, el descanso y la claridad interior.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop'
  },
  {
    number: '03',
    title: 'Comunidad humana',
    description: 'Entornos pensados para conectar personas con valores afines, naturaleza y propósito.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    number: '04',
    title: 'Valor patrimonial',
    description: 'Proyectos con ubicación estratégica, visión de largo plazo y una relación profunda con el paisaje.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  }
]

export function Pillars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-gunmetal">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Nuestra filosofía</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white leading-[1.2]">
            Un estilo de vida guiado<br />por la naturaleza
          </h2>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${pillar.image}')` }}
                />
                <div className="absolute inset-0 bg-gunmetal/20 group-hover:bg-gunmetal/0 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex items-start gap-4">
                <span className="text-xs text-khaki font-light">{pillar.number}</span>
                <div className="flex-1">
                  <div className="w-8 h-px bg-silver-sand/30 mb-4" />
                  <h3 className="font-serif text-2xl text-warm-white mb-3">{pillar.title}</h3>
                  <p className="text-silver-sand/70 text-sm leading-relaxed font-light">{pillar.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
