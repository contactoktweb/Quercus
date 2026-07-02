import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const qara = localFont({
  src: '../public/fonts/qara.otf',
  variable: '--font-serif',
  display: 'swap',
});

const clarika = localFont({
  src: [
    {
      path: '../public/fonts/clarikageo-thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/clarikageo-light.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-sans',
  display: 'swap',
});

import { sanityFetch, GLOBAL_CONFIG_QUERY } from '@/sanity/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY })
    const faviconUrl = config?.favicon?.asset?.url || '/favicon.ico'
    const siteTitle = config?.siteName || 'Quercus'
    const description = config?.footerDescription || 'Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza. Comunidades regenerativas de baja densidad en Baja California Sur, México.'
    
    return {
      title: `${siteTitle} | Comunidades Regenerativas en Baja California Sur`,
      description,
      keywords: ['Quercus', 'comunidades regenerativas', 'Baja California Sur', 'wellness', 'real estate', 'bienestar', 'naturaleza', 'México'],
      authors: [{ name: siteTitle }],
      icons: {
        icon: [
          { url: faviconUrl, type: 'image/png' },
          { url: faviconUrl, sizes: '32x32', type: 'image/png' },
          { url: faviconUrl, sizes: '16x16', type: 'image/png' }
        ],
        shortcut: faviconUrl,
        apple: [
          { url: faviconUrl, sizes: '180x180', type: 'image/png' }
        ],
      },
      openGraph: {
        title: `${siteTitle} | Comunidades Regenerativas`,
        description,
        type: 'website',
      },
      other: {
        // GEO tags for Baja California Sur, Mexico
        'geo.region': 'MX-BCS',
        'geo.placename': 'Baja California Sur',
        'geo.position': '24.1826;-110.3528',
        'ICBM': '24.1826, -110.3528'
      }
    }
  } catch (error) {
    return {
      title: 'Quercus | Comunidades Regenerativas en Baja California Sur',
      description: 'Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza. Comunidades regenerativas de baja densidad en Baja California Sur, México.',
      keywords: ['Quercus', 'comunidades regenerativas', 'Baja California Sur', 'wellness', 'real estate', 'bienestar', 'naturaleza', 'México'],
      authors: [{ name: 'Quercus' }],
      icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
      openGraph: {
        title: 'Quercus | Comunidades Regenerativas',
        description: 'Comunidades regenerativas para vivir, invertir y reconectar con la naturaleza.',
        type: 'website',
      },
      other: {
        'geo.region': 'MX-BCS',
        'geo.placename': 'Baja California Sur',
        'geo.position': '24.1826;-110.3528',
        'ICBM': '24.1826, -110.3528'
      }
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#273538',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${qara.variable} ${clarika.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
