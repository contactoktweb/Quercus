"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const principles = [
  { title: 'Baja densidad', desc: 'Espacios amplios que respetan el entorno natural' },
  { title: 'Integración con el paisaje', desc: 'Arquitectura que dialoga con el territorio' },
  { title: 'Bajo impacto', desc: 'Construcción responsable y materiales locales' },
  { title: 'Bienestar comunitario', desc: 'Diseño pensado para la conexión humana' },
  { title: 'Conservación', desc: 'Protección de la vegetación endémica' },
]

export function Sustainability() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 md:py-48 bg-rifle-green/10" id="sostenibilidad">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=2070&auto=format&fit=crop')`,
                }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-khaki/20" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki">Regeneración</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-gunmetal leading-[1.2]">
              Diseñar con respeto<br />por el territorio
            </h2>
            <p className="mt-8 text-rifle-green/80 leading-relaxed">
              Cada comunidad se concibe desde una relación consciente con el paisaje, promoviendo baja densidad, integración arquitectónica, respeto por la vegetación endémica y una forma de habitar más responsable.
            </p>

            {/* Principles */}
            <div className="mt-12 space-y-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="w-1.5 h-1.5 bg-khaki mt-2.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg text-gunmetal">{principle.title}</h3>
                    <p className="text-sm text-rifle-green/60 mt-1">{principle.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
