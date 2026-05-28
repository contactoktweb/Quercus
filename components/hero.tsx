"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 animate-slow-zoom">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gunmetal/40 via-gunmetal/20 to-gunmetal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          {/* Decorative Line */}
          <motion.div 
            className="w-16 h-px bg-khaki mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 1 }}
          />

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-warm-white leading-[1.1] tracking-wide text-balance">
            Comunidades regenerativas en Baja California Sur
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              href="#comunidades"
              className="group px-8 py-4 bg-warm-white text-gunmetal text-sm tracking-luxury uppercase transition-all duration-500 hover:bg-khaki"
            >
              <span className="flex items-center gap-3">
                Explorar comunidades
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="#filosofia"
              className="px-8 py-4 border border-warm-white/50 text-warm-white text-sm tracking-luxury uppercase transition-all duration-500 hover:bg-warm-white/10"
            >
              Conocer la filosofía
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center"
        >
          <div className="flex items-center gap-4 text-warm-white/60">
            <span className="w-8 h-px bg-warm-white/40" />
            <span className="text-xs tracking-luxury uppercase">Baja California Sur · México</span>
            <span className="w-8 h-px bg-warm-white/40" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-warm-white/0 via-warm-white/50 to-warm-white/0"
          />
        </motion.div>
      </div>
    </section>
  )
}
