"use client"

import { motion } from 'framer-motion'
import { optimizeSanityUrl } from '@/sanity/lib/image'

export function Hero({ data }: { data?: any }) {
  // Fallbacks in case Sanity data is missing
  const title = data?.heroTitle || 'Comunidades regenerativas en Baja California Sur'
  const subtitle = data?.heroSubtitle || 'Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza.'
  const locationBadge = data?.heroLocationBadge || 'Baja California Sur · México'
  const bgVideo = data?.heroVideo?.asset?.url || (typeof data?.heroVideo === 'string' ? data.heroVideo : undefined)
  const rawBgImage = data?.heroImage?.asset?.url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
  const bgImage = optimizeSanityUrl(rawBgImage, { quality: 85 })

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image or Video with Slow Zoom */}
      <div className="absolute inset-0 animate-slow-zoom">
        {bgVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            src={bgVideo}
            poster={bgImage}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${bgImage}')`,
            }}
          />
        )}
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
            {title}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
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
            <span className="text-xs tracking-luxury uppercase">{locationBadge}</span>
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
