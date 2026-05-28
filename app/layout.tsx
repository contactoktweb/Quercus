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

export const metadata: Metadata = {
  title: 'Quercus | Comunidades Regenerativas en Baja California Sur',
  description: 'Un nuevo paradigma para vivir, invertir y reconectar con la naturaleza. Comunidades regenerativas de baja densidad en Baja California Sur, México.',
  keywords: ['Quercus', 'comunidades regenerativas', 'Baja California Sur', 'wellness', 'real estate', 'bienestar', 'naturaleza', 'México'],
  authors: [{ name: 'Quercus' }],
  openGraph: {
    title: 'Quercus | Comunidades Regenerativas',
    description: 'Comunidades regenerativas para vivir, invertir y reconectar con la naturaleza.',
    type: 'website',
  },
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
