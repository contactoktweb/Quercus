"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

interface MasonryGalleryProps {
  images: string[]
  theme?: 'light' | 'dark'
}

function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-soft-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-warm-white/60 hover:text-warm-white transition-colors duration-300 z-10"
        aria-label="Cerrar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 p-3 text-warm-white/60 hover:text-warm-white transition-colors duration-300"
        aria-label="Anterior"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 p-3 text-warm-white/60 hover:text-warm-white transition-colors duration-300"
        aria-label="Siguiente"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90vw] h-[80vh] max-w-[1400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-warm-white/60 text-sm tracking-luxury">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  )
}

export function MasonryGallery({ images, theme = 'light' }: MasonryGalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(i => i !== null ? (i === 0 ? images.length - 1 : i - 1) : null)
  const nextImage = () => setLightboxIndex(i => i !== null ? (i === images.length - 1 ? 0 : i + 1) : null)

  // Create masonry layout pattern
  const getGridClass = (index: number) => {
    const pattern = index % 6
    switch (pattern) {
      case 0: return 'col-span-2 row-span-2'
      case 1: return 'col-span-1 row-span-1'
      case 2: return 'col-span-1 row-span-2'
      case 3: return 'col-span-1 row-span-1'
      case 4: return 'col-span-2 row-span-1'
      case 5: return 'col-span-1 row-span-1'
      default: return 'col-span-1 row-span-1'
    }
  }

  const getAspectClass = (index: number) => {
    const pattern = index % 6
    switch (pattern) {
      case 0: return 'aspect-square'
      case 1: return 'aspect-square'
      case 2: return 'aspect-[3/4]'
      case 3: return 'aspect-square'
      case 4: return 'aspect-[2/1]'
      case 5: return 'aspect-square'
      default: return 'aspect-square'
    }
  }

  return (
    <>
      <div 
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className={`${getGridClass(index)} overflow-hidden cursor-pointer group`}
            onClick={() => openLightbox(index)}
          >
            <div className={`relative w-full h-full ${getAspectClass(index)}`}>
              <Image
                src={image}
                alt={`Galería imagen ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-soft-black/0 group-hover:bg-soft-black/30' : 'bg-gunmetal/0 group-hover:bg-gunmetal/20'} transition-colors duration-300 flex items-center justify-center`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 rounded-full border border-warm-white/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
