import { PortableText } from '@portabletext/react'
import { sanityFetch, BLOG_BY_SLUG_QUERY, GLOBAL_CONFIG_QUERY, urlFor, optimizeSanityUrl } from '@/sanity/lib/queries'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60

// Componentes personalizados para el Portable Text (WYSIWYG)
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref && !value?.asset?.url) {
        return null
      }
      
      const width = value.width || '100%'
      const imageUrl = value.asset?._ref 
        ? urlFor(value).auto('format').quality(85).url() 
        : optimizeSanityUrl(value.asset?.url, { quality: 85 })
      
      return (
        <div className="my-10 flex flex-col items-center">
          <img
            alt={value.alt || 'Imagen del artículo'}
            loading="lazy"
            src={imageUrl}
            className="h-auto object-cover rounded-sm"
            style={{ width, maxWidth: '100%' }}
          />
          {value.alt && <p className="text-sm text-center mt-2 text-silver-sand/70">{value.alt}</p>}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="font-serif text-4xl md:text-5xl text-gunmetal mt-16 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-serif text-3xl md:text-4xl text-gunmetal mt-12 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-serif text-2xl md:text-3xl text-gunmetal mt-10 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-rifle-green/80 text-lg leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-khaki pl-6 my-10 italic text-xl text-gunmetal font-serif">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#'
      const isExternal = !href.startsWith('/') && !href.startsWith('#')
      const rel = isExternal ? 'noreferrer noopener' : undefined
      const target = isExternal ? '_blank' : undefined
      
      return (
        <a href={href} rel={rel} target={target} className="text-khaki hover:underline decoration-1 underline-offset-4 transition-all">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-rifle-green/80 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-rifle-green/80 text-lg">{children}</ol>,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = await sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY })
  const post = await sanityFetch<any>({ 
    query: BLOG_BY_SLUG_QUERY, 
    params: { slug } 
  })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-warm-white">
      <Header config={config} forceDarkText={true} />
      
      <article className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/sostenibilidad"
            className="inline-flex items-center gap-2 text-sm tracking-wider-luxury uppercase text-silver-sand/70 hover:text-gunmetal transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al listado
          </Link>

          {/* Header */}
          <header className="mb-12 md:mb-16">
            <div className="text-sm tracking-luxury uppercase text-khaki mb-6">
              {new Date(post.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gunmetal leading-tight mb-8">
              {post.title}
            </h1>
          </header>
        </div>

        {/* Cover Image */}
        {(post.coverImage?.asset?.url || post.coverImage?.asset?._ref) && (
          <div className="w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] bg-silver-sand/10 mb-12 md:mb-20 overflow-hidden">
            <img 
              src={optimizeSanityUrl(post.coverImage, { width: 1600, quality: 85 })} 
              alt={post.coverImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose-container">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        </div>
      </article>

      <Footer config={config} />
    </main>
  )
}
