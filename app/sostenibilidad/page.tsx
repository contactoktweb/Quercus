import Link from 'next/link'
import { sanityFetch, ALL_BLOGS_QUERY, GLOBAL_CONFIG_QUERY, ALL_PROJECTS_QUERY, optimizeSanityUrl } from '@/sanity/lib/queries'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight } from 'lucide-react'

// Forzar la regeneración si se cambia contenido en Sanity
export const revalidate = 60 

export default async function SostenibilidadPage() {
  const [blogs, config, projects] = await Promise.all([
    sanityFetch<any[]>({ query: ALL_BLOGS_QUERY }),
    sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY }),
    sanityFetch<any[]>({ query: ALL_PROJECTS_QUERY }),
  ])

  return (
    <main className="min-h-screen bg-warm-white">
      <Header config={config} forceDarkText={true} projects={projects} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-gunmetal mb-6">
            Sostenibilidad
          </h1>
          <p className="text-rifle-green/80 text-lg leading-relaxed">
            Explora nuestros artículos, guías y reflexiones sobre cómo construir y habitar en equilibrio con la naturaleza.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 max-w-[1800px] mx-auto">
        {blogs.length === 0 ? (
          <div className="py-20 text-center border border-silver-sand/20 bg-black/5">
            <p className="text-rifle-green/70">Aún no hay artículos publicados en esta sección.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {blogs.map((blog) => {
              const coverUrl = optimizeSanityUrl(blog.coverImage, { width: 800, quality: 85 })
              return (
                <Link 
                  key={blog._id} 
                  href={`/sostenibilidad/${blog.slug}`}
                  className="group flex flex-col h-full bg-white border border-silver-sand/20 hover:border-gunmetal/30 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-silver-sand/10">
                    {coverUrl ? (
                      <img 
                        src={coverUrl} 
                        alt={blog.coverImage?.alt || blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-silver-sand/50">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="text-xs tracking-luxury uppercase text-khaki mb-4">
                    {new Date(blog.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h2 className="font-serif text-2xl text-gunmetal mb-4 group-hover:text-khaki transition-colors duration-300">
                    {blog.title}
                  </h2>
                  <p className="text-rifle-green/70 text-sm leading-relaxed mb-8 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm tracking-wider-luxury uppercase text-gunmetal font-medium group-hover:text-khaki transition-colors duration-300">
                    Leer más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
          </div>
        )}
      </section>

      <Footer config={config} projects={projects} />
    </main>
  )
}
