"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { optimizeSanityUrl } from '@/sanity/lib/image'

const defaultPrinciples = [
  { title: 'Baja densidad', desc: 'Espacios amplios que respetan el entorno natural' },
  { title: 'Integración con el paisaje', desc: 'Arquitectura que dialoga con el territorio' },
  { title: 'Bajo impacto', desc: 'Construcción responsable y materiales locales' },
  { title: 'Bienestar comunitario', desc: 'Diseño pensado para la conexión humana' },
  { title: 'Conservación', desc: 'Protección de la vegetación endémica' },
]

const defaultStats = [
  { number: '20+', label: 'Años de experiencia' },
  { number: '5', label: 'Comunidades activas' },
  { number: '1000+', label: 'Hectáreas desarrolladas' },
  { number: '∞', label: 'Compromiso con la naturaleza' },
]

export function EditorialIntro({ data }: { data?: any }) {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const headline = data?.editorialHeadline || 'Quercus desarrolla comunidades de baja densidad donde la naturaleza, el bienestar y la inversión patrimonial conviven en equilibrio.'
  const paragraph = data?.editorialParagraph || 'Durante más de dos décadas, hemos creado entornos regenerativos diseñados para quienes buscan vivir con propósito, invertir con visión y formar parte de una comunidad consciente.'
  const rawImage = data?.editorialImage?.asset?.url || 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=2070&auto=format&fit=crop'
  const image = optimizeSanityUrl(rawImage, { width: 1200, quality: 85 })
  const sectionLabel = data?.editorialSectionLabel || 'Regeneración'
  const sectionTitle = data?.editorialSectionTitle || 'Diseñar con respeto por el territorio'
  const sectionText = data?.editorialSectionText || 'Cada comunidad se concibe desde una relación consciente con el paisaje, promoviendo baja densidad, integración arquitectónica, respeto por la vegetación endémica y una forma de habitar más responsable.'
  const principles = data?.principles?.length ? data.principles : defaultPrinciples
  const stats = data?.stats?.length ? data.stats : defaultStats

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-warm-white" id="filosofia">
      
      {/* Part 1: Editorial Statement */}
      <div className="max-w-5xl mx-auto text-center mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative Element */}
          <div className="flex justify-center mb-12">
            <div className="w-px h-16 bg-khaki" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gunmetal leading-[1.3] text-balance">
            {headline}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-lg md:text-xl text-rifle-green/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          {paragraph}
        </motion.p>
      </div>

      {/* Part 2: The Grid (Image + Content) */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden z-10">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${image}')`,
                }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-khaki/20 z-0 md:block hidden" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-luxury uppercase text-khaki">{sectionLabel}</span>
            <h3 className="mt-6 font-serif text-4xl md:text-5xl text-gunmetal leading-[1.2]">
              {/* Manejar los saltos de línea permitidos por el usuario */}
              {sectionTitle.split('\\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < sectionTitle.split('\\n').length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p className="mt-8 text-rifle-green/80 leading-relaxed font-light">
              {sectionText}
            </p>

            {/* Principles List */}
            <div className="mt-12 space-y-6">
              {principles.map((principle: any, index: number) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="w-1.5 h-1.5 bg-khaki mt-2.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-gunmetal group-hover:text-khaki transition-colors duration-300">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-rifle-green/60 mt-1 font-light">{principle.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Part 3: Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-32 max-w-[1400px] mx-auto pt-16 border-t border-silver-sand/30 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {stats.map((stat: any) => (
          <div key={stat.label} className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-gunmetal">{stat.number}</div>
            <div className="mt-2 text-xs tracking-luxury uppercase text-rifle-green/60">{stat.label}</div>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
