"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

const testimonials = [
  {
    quote: "Encontramos en Quercus algo más que un terreno. Fue la posibilidad de construir un refugio conectado con la naturaleza y con una comunidad que comparte nuestra visión.",
    name: "Mariana & Andrés",
    project: "Quercus Baja",
  },
  {
    quote: "Lo que más nos atrajo fue la tranquilidad del entorno, la baja densidad y la forma en que cada proyecto respeta el paisaje.",
    name: "Carlos R.",
    project: "El Quelele",
  },
  {
    quote: "DUNAH representa exactamente lo que buscábamos: naturaleza, bienestar y una oportunidad de crear algo con propósito a largo plazo.",
    name: "Valeria M.",
    project: "DUNAH",
  },
  {
    quote: "Cada visita nos confirmó que no era solo una inversión, sino una decisión de vida.",
    name: "Sofía L.",
    project: "Elemental",
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = testimonials.length - 1
      if (next >= testimonials.length) next = 0
      return next
    })
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 7000)
    return () => clearInterval(timer)
  }, [paginate])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="py-32 md:py-48 bg-warm-white" id="testimonios">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Testimonios</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-[1.2]">
            Voces de la comunidad
          </h2>
          <p className="mt-6 text-rifle-green/70 max-w-2xl mx-auto text-sm leading-relaxed">
            Historias de personas que encontraron en Quercus una forma distinta de vivir, invertir y reconectar con la naturaleza.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-khaki/20">
            <svg className="w-20 h-20 md:w-28 md:h-28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Carousel Container */}
          <div className="relative min-h-[300px] md:min-h-[280px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                {/* Quote */}
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-gunmetal leading-[1.4] max-w-4xl text-balance">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="mt-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-px bg-khaki" />
                  <p className="text-gunmetal font-medium mt-4">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-rifle-green/60 text-sm">
                    {testimonials[currentIndex].project}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => paginate(-1)}
              className="group p-3 border border-silver-sand/50 hover:border-gunmetal transition-colors duration-300"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 text-gunmetal transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className="group p-1"
                  aria-label={`Ir al testimonio ${index + 1}`}
                >
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex 
                        ? 'bg-khaki scale-125' 
                        : 'bg-silver-sand/50 group-hover:bg-silver-sand'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => paginate(1)}
              className="group p-3 border border-silver-sand/50 hover:border-gunmetal transition-colors duration-300"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5 text-gunmetal transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Desktop: Three visible cards alternative view */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:grid grid-cols-3 gap-8 mt-24"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              className="group p-8 border border-silver-sand/30 hover:border-khaki/50 transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="text-khaki/30 mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gunmetal text-base leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="pt-6 border-t border-silver-sand/30">
                <p className="text-gunmetal font-medium text-sm">{testimonial.name}</p>
                <p className="text-rifle-green/60 text-xs mt-1">{testimonial.project}</p>
              </div>

              {/* Hover accent line */}
              <div className="h-0.5 w-0 bg-khaki mt-6 transition-all duration-500 group-hover:w-12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
