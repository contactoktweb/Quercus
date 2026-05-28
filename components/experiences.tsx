"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: 'Yoga y meditación',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop'
  },
  {
    title: 'Kitesurf',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop'
  },
  {
    title: 'Ciclismo de montaña',
    image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Kayak y exploración',
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Glamping',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2005&auto=format&fit=crop'
  },
  {
    title: 'Retiros wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop'
  }
]

export function Experiences() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white overflow-hidden" id="experiencias">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Estilo de vida</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.2]">
            El lujo de vivir cerca<br />de lo esencial
          </h2>
        </motion.div>

        {/* Experiences Mosaic */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${
                index === 0 || index === 5 ? 'aspect-[4/5] md:row-span-2' : 'aspect-square'
              }`}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url('${experience.image}')` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gunmetal/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex items-end">
                <div>
                  <div className="w-6 h-px bg-khaki mb-3 transform origin-left transition-all duration-500 group-hover:w-10" />
                  <h3 className="font-serif text-lg md:text-xl text-warm-white">{experience.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
