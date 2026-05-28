"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

const communities = [
  {
    name: 'Quercus Baja',
    location: 'La Ventana, BCS',
    year: '2006',
    concept: 'Comunidad pionera junto al Mar de Cortés',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Quercus Elemental',
    location: 'El Sargento, BCS',
    year: '2019',
    concept: 'Vida de playa con espíritu de aventura',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Ventusbay',
    location: 'La Ventana, BCS',
    year: '2017',
    concept: 'El paraíso del kitesurf y la conexión',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'El Quelele',
    location: 'Los Barriles, BCS',
    year: '2021',
    concept: 'Refugio natural entre desierto y océano',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
  },
  {
    name: 'DUNAH',
    location: 'Pacífico Sur, BCS',
    year: '2024',
    concept: 'Bienestar en estado puro',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
  }
]

export function Communities() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white" id="comunidades">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
        >
          <div>
            <span className="text-xs tracking-luxury uppercase text-khaki">Portfolio</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.2]">
              Nuestras comunidades
            </h2>
          </div>
          <p className="mt-6 md:mt-0 text-rifle-green/70 max-w-md text-sm leading-relaxed">
            Cada proyecto nace del paisaje, la cultura local y una visión de largo plazo.
          </p>
        </motion.div>

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href="#" className="block">
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  {/* Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url('${community.image}')` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gunmetal/80 via-gunmetal/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="transform transition-all duration-500">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs tracking-luxury uppercase text-warm-white/60">{community.location}</span>
                        <span className="w-4 h-px bg-khaki" />
                        <span className="text-xs text-warm-white/60">{community.year}</span>
                      </div>
                      <h3 className={`font-serif text-warm-white ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                        {community.name}
                      </h3>
                      <motion.p 
                        className="mt-3 text-warm-white/70 text-sm max-w-xs overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: hoveredIndex === index ? 'auto' : 0, 
                          opacity: hoveredIndex === index ? 1 : 0 
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {community.concept}
                      </motion.p>
                      <motion.div 
                        className="mt-4 flex items-center gap-2 text-khaki text-xs tracking-luxury uppercase"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredIndex === index ? 1 : 0, 
                          y: hoveredIndex === index ? 0 : 10 
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        Descubrir
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
