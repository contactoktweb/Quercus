"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const highlights = [
  { label: '1.4 km', desc: 'de playa prístina' },
  { label: '1 hora', desc: 'de La Paz' },
  { label: 'Wellness', desc: 'enfoque holístico' },
  { label: 'Valor', desc: 'a largo plazo' },
]

export function FeaturedProject() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gunmetal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-32 md:py-48">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs tracking-luxury uppercase text-khaki">Proyecto destacado</span>
              <h2 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl text-warm-white leading-[1.1]">
                DUNAH
              </h2>
              <p className="mt-2 font-serif text-2xl text-khaki italic">
                Bienestar en la naturaleza
              </p>
              <p className="mt-8 text-warm-white/80 leading-relaxed max-w-lg">
                Una comunidad regenerativa orientada al bienestar, ubicada en un paisaje prístino del Pacífico, creada para retiros, santuarios personales y experiencias de mindfulness.
              </p>

              {/* Highlights */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className="border-l border-khaki/30 pl-4"
                  >
                    <div className="font-serif text-2xl text-warm-white">{item.label}</div>
                    <div className="text-xs text-warm-white/60 mt-1">{item.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12"
              >
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-khaki text-gunmetal text-sm tracking-luxury uppercase transition-all duration-500 hover:bg-warm-white group"
                >
                  Conocer DUNAH
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="relative aspect-[3/4]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
                  }}
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-khaki/30" />
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-khaki/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
