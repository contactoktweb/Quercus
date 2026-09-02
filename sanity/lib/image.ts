import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Genera el builder de URL para una imagen de Sanity con auto-format (WebP/AVIF por defecto).
 * Uso: urlFor(image).width(1200).quality(85).url()
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format').fit('max')
}

export interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'png' | 'jpg' | 'avif'
}

/**
 * Optimiza cualquier fuente de imagen (objeto Sanity o URL string)
 * garantizando la compresión y entrega en WebP/AVIF para reducir consumo de ancho de banda.
 */
export function optimizeSanityUrl(
  source: any,
  options: ImageOptimizationOptions = {}
): string {
  if (!source) return ''

  // 1. Si es un objeto de imagen de Sanity con referencia válida
  if (typeof source === 'object') {
    const hasRef = source?._ref || source?.asset?._ref
    if (hasRef) {
      let imgBuilder = builder.image(source).auto('format').fit('max')
      if (options.width) imgBuilder = imgBuilder.width(options.width)
      if (options.height) imgBuilder = imgBuilder.height(options.height)
      if (options.quality) imgBuilder = imgBuilder.quality(options.quality)
      else imgBuilder = imgBuilder.quality(85)
      if (options.format) imgBuilder = imgBuilder.format(options.format)
      return imgBuilder.url()
    }

    // Si tiene URL directa dentro del objeto
    if (source?.asset?.url) {
      return optimizeUrlString(source.asset.url, options)
    }
    if (source?.url) {
      return optimizeUrlString(source.url, options)
    }
  }

  // 2. Si es una URL string
  if (typeof source === 'string') {
    return optimizeUrlString(source, options)
  }

  return ''
}

function optimizeUrlString(url: string, options: ImageOptimizationOptions): string {
  if (!url) return ''

  // Optimización para Sanity CDN
  if (url.includes('cdn.sanity.io/images/')) {
    try {
      const urlObj = new URL(url)
      if (!urlObj.searchParams.has('auto')) {
        urlObj.searchParams.set('auto', 'format')
      }
      if (options.width && !urlObj.searchParams.has('w')) {
        urlObj.searchParams.set('w', options.width.toString())
      }
      if (options.height && !urlObj.searchParams.has('h')) {
        urlObj.searchParams.set('h', options.height.toString())
      }
      if (options.quality && !urlObj.searchParams.has('q')) {
        urlObj.searchParams.set('q', options.quality.toString())
      } else if (!urlObj.searchParams.has('q')) {
        urlObj.searchParams.set('q', '85')
      }
      if (options.format) {
        urlObj.searchParams.set('fm', options.format)
      }
      return urlObj.toString()
    } catch {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}auto=format&q=${options.quality || 85}`
    }
  }

  // Optimización para Unsplash
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url)
      if (!urlObj.searchParams.has('auto')) {
        urlObj.searchParams.set('auto', 'format')
      }
      if (options.width && !urlObj.searchParams.has('w')) {
        urlObj.searchParams.set('w', options.width.toString())
      }
      if (options.quality && !urlObj.searchParams.has('q')) {
        urlObj.searchParams.set('q', options.quality.toString())
      }
      return urlObj.toString()
    } catch {
      return url
    }
  }

  return url
}
