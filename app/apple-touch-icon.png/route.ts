import { NextResponse } from 'next/server'
import { sanityFetch, GLOBAL_CONFIG_QUERY } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const config = await sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY })
    const faviconUrl = config?.favicon?.asset?.url

    if (faviconUrl) {
      const res = await fetch(faviconUrl)
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer()
        const contentType = res.headers.get('content-type') || 'image/png'
        
        return new NextResponse(Buffer.from(arrayBuffer), {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        })
      }
    }
  } catch (error) {
    console.error('Error serving dynamic apple-touch-icon:', error)
  }

  // Fallback redirect
  return NextResponse.redirect(new URL('/apple-icon.png', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
