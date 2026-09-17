"use client"

/**
 * Skiper 54 Carousel_006 — React + Framer Motion
 * Built with shadcn/ui and Embla Carousel (https://skiper-ui.com/v1/skiper54)
 * Adapted for Quercus Luxury Real Estate:
 * - Full responsive design (Mobile touch/swipe gestures + Desktop arrows & drag)
 * - Dynamic clipPath reveal transitions
 * - Light & Dark theme support (Warm-white & Gunmetal)
 * - Fullscreen Lightbox integration
 */

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export interface GalleryItem {
  src: string
  alt?: string
  title?: string
}

export interface Skiper54GalleryProps {
  images: (string | GalleryItem | any)[]
  projectName?: string
  theme?: 'light' | 'dark'
  className?: string
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  showNavigation?: boolean
  showPagination?: boolean
}

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-soft-black/95 backdrop-blur-md flex items-center justify-center select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-warm-white/70 hover:text-warm-white transition-colors duration-300 z-10 rounded-full hover:bg-warm-white/10"
        aria-label="Cerrar vista ampliada"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 md:left-8 p-3 text-warm-white/70 hover:text-warm-white transition-colors duration-300 rounded-full hover:bg-warm-white/10 z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 md:right-8 p-3 text-warm-white/70 hover:text-warm-white transition-colors duration-300 rounded-full hover:bg-warm-white/10 z-10"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Active Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="relative w-[92vw] h-[80vh] max-w-[1400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || `Imagen ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />
      </motion.div>

      {/* Caption & Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-warm-white/70 text-sm tracking-luxury">
        <p className="font-serif text-warm-white mb-1">
          {images[currentIndex].title}
        </p>
        <span>
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </motion.div>
  )
}

export function Skiper54Gallery({
  images = [],
  projectName = '',
  theme = 'light',
  className = '',
  autoplay = true,
  autoplayDelay = 4000,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Skiper54GalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Normalize images
  const normalizedImages: GalleryItem[] = React.useMemo(() => {
    return images
      .map((item, index) => {
        if (!item) return null
        if (typeof item === 'string') {
          return {
            src: item,
            alt: `${projectName ? projectName + ' - ' : ''}Imagen ${index + 1}`,
            title: `${projectName ? projectName + ' · ' : ''}Detalle 0${index + 1}`,
          }
        }
        const src = item.src || item.asset?.url || item.url || ''
        if (!src) return null
        return {
          src,
          alt: item.alt || `${projectName ? projectName + ' - ' : ''}Imagen ${index + 1}`,
          title: item.title || item.alt || `${projectName ? projectName + ' · ' : ''}Detalle 0${index + 1}`,
        }
      })
      .filter(Boolean) as GalleryItem[]
  }, [images, projectName])

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()
    api.on('select', updateCurrent)
    api.on('reInit', updateCurrent)

    return () => {
      api.off('select', updateCurrent)
    }
  }, [api])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? prev === 0
          ? normalizedImages.length - 1
          : prev - 1
        : null
    )
  }, [normalizedImages.length])

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? prev === normalizedImages.length - 1
          ? 0
          : prev + 1
        : null
    )
  }, [normalizedImages.length])

  if (!normalizedImages.length) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div className={cn('relative w-full overflow-hidden select-none py-4', className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop,
          align: 'center',
          slidesToScroll: 1,
          containScroll: 'trimSnaps',
        }}
        plugins={
          autoplay
            ? [
                Autoplay({
                  delay: autoplayDelay,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]
            : []
        }
      >
        <CarouselContent className="flex items-center h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px] w-full -ml-3 md:-ml-4">
          {normalizedImages.map((img, index) => {
            const isActive = current === index

            return (
              <CarouselItem
                key={index}
                className={cn(
                  'relative h-full flex items-center justify-center pl-3 md:pl-4 transition-all duration-500',
                  // Responsiveness:
                  // Mobile: 78% width with center alignment so adjacent slides peek in
                  // Tablet: 48% - 36%
                  // Desktop / PC: 28% - 22%
                  'basis-[78%] sm:basis-[48%] md:basis-[36%] lg:basis-[28%] xl:basis-[22%]'
                )}
              >
                <div
                  className="relative w-full h-[85%] cursor-pointer group"
                  onClick={() => {
                    if (isActive) {
                      openLightbox(index)
                    } else {
                      api?.scrollTo(index)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver imagen ${index + 1}: ${img.title || ''}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      if (isActive) openLightbox(index)
                      else api?.scrollTo(index)
                    }
                  }}
                >
                  {/* ClipPath animated card container */}
                  <motion.div
                    initial={false}
                    animate={{
                      clipPath: isActive
                        ? 'inset(0% 0% 0% 0% round 1.5rem)'
                        : 'inset(13% 0% 13% 0% round 1.5rem)',
                      scale: isActive ? 1 : 0.96,
                      opacity: isActive ? 1 : 0.65,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      'relative h-full w-full overflow-hidden shadow-lg transition-shadow duration-500',
                      isActive ? 'shadow-2xl' : 'shadow-md',
                      isDark ? 'border border-warm-white/10' : 'border border-gunmetal/10'
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `Imagen ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />

                    {/* Subtle Overlay gradient */}
                    <div
                      className={cn(
                        'absolute inset-0 transition-opacity duration-500',
                        isActive
                          ? 'bg-gradient-to-t from-soft-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90'
                          : 'bg-soft-black/25 opacity-100'
                      )}
                    />

                    {/* Magnify icon for active slide */}
                    {isActive && (
                      <div className="absolute top-4 right-4 p-2.5 rounded-full bg-soft-black/40 backdrop-blur-sm text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>

                  {/* Animated caption below card for active slide */}
                  <AnimatePresence mode="wait">
                    {isActive && img.title && (
                      <motion.div
                        initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="absolute -bottom-7 left-0 right-0 text-center pointer-events-none"
                      >
                        <p
                          className={cn(
                            'text-xs tracking-luxury uppercase font-medium line-clamp-1',
                            isDark ? 'text-khaki' : 'text-gunmetal/80'
                          )}
                        >
                          {img.title}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* Controls Bar: Navigation and Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8">
          {/* Navigation Arrows */}
          {showNavigation && (
            <div className="flex items-center gap-3 order-2 sm:order-1">
              <button
                type="button"
                aria-label="Diapositiva anterior"
                onClick={() => api?.scrollPrev()}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300',
                  'active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-khaki',
                  isDark
                    ? 'bg-warm-white/10 hover:bg-warm-white/20 text-warm-white border border-warm-white/15'
                    : 'bg-gunmetal/5 hover:bg-gunmetal/15 text-gunmetal border border-gunmetal/10'
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                aria-label="Diapositiva siguiente"
                onClick={() => api?.scrollNext()}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300',
                  'active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-khaki',
                  isDark
                    ? 'bg-warm-white/10 hover:bg-warm-white/20 text-warm-white border border-warm-white/15'
                    : 'bg-gunmetal/5 hover:bg-gunmetal/15 text-gunmetal border border-gunmetal/10'
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Pagination Indicators */}
          {showPagination && (
            <div className="flex items-center justify-center gap-2 order-1 sm:order-2 flex-wrap max-w-full py-1">
              {normalizedImages.map((_, index) => {
                const isSelected = current === index
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 cursor-pointer',
                      isSelected
                        ? cn('w-8', isDark ? 'bg-khaki' : 'bg-gunmetal')
                        : cn(
                            'w-2 hover:w-3',
                            isDark
                              ? 'bg-warm-white/25 hover:bg-warm-white/40'
                              : 'bg-gunmetal/20 hover:bg-gunmetal/40'
                          )
                    )}
                  />
                )
              })}
            </div>
          )}

          {/* Counter info */}
          <div className="hidden sm:block order-3 text-xs tracking-luxury uppercase">
            <span className={isDark ? 'text-warm-white/50' : 'text-gunmetal/50'}>
              0{current + 1} / 0{normalizedImages.length}
            </span>
          </div>
        </div>
      </Carousel>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            images={normalizedImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightboxImage}
            onNext={nextLightboxImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
