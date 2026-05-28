"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center" id="contacto">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=2159&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gunmetal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-32 md:py-48">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-16 bg-khaki" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-white leading-[1.2]">
              Únete a la familia Quercus
            </h2>
            <p className="mt-6 text-warm-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Descubre comunidades diseñadas para una vida más humana, consciente y conectada con la naturaleza.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="group px-8 py-4 bg-khaki text-gunmetal text-sm tracking-luxury uppercase transition-all duration-500 hover:bg-warm-white"
              >
                <span className="flex items-center gap-3">
                  Solicitar información
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#"
                className="px-8 py-4 border border-warm-white/50 text-warm-white text-sm tracking-luxury uppercase transition-all duration-500 hover:bg-warm-white/10"
              >
                Agendar una llamada
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
