# Project Context: Quercus

## 🌲 Visión General
Quercus es una plataforma web para desarrollo inmobiliario de ultra lujo y sustentabilidad (comunidades ecológicas y residenciales en Baja California Sur y Michoacán).

## 🛠️ Tecnologías Principales
- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **CMS**: Sanity (Next-Sanity, schemas para proyectos, lotes, páginas y configuración global)
- **Estilos**: Tailwind CSS 4, Lucide Icons, Shadcn UI
- **Animaciones e Interactividad**: Framer Motion, Embla Carousel (`embla-carousel-react`, `embla-carousel-autoplay`)
- **Mapas**: MapLibre GL, Mapbox GL Draw, Turf.js

## 📁 Estructura del Proyecto
- `app/`: Rutas de la aplicación (`/`, `/proyectos/[slug]`, `/historia`, `/sostenibilidad`, `/admin`, etc.)
- `components/`: Componentes UI modulares (Header, Hero, Footer, InteractiveMasterPlan, Skiper54Gallery, ContactForm, etc.)
- `components/ui/`: Primitivas de UI basadas en Radix y Shadcn (carousel, button, dialog, etc.)
- `sanity/`: Esquemas de Sanity, queries y configuración de CMS
- `lib/`: Datos estáticos de respaldo (`projects-data.ts`), utilidades (`utils.ts`)

## 🎨 Normas y Estándares Críticos
1. **Carruseles Móviles**: Soporte obligatorio de gestos táctiles nativos (swipe horizontal con el dedo).
2. **Branding & Footer**: "Desarrollado por K&T" con enlace a `https://www.kytcode.lat` y corazón dinámico contrastante. Año generado dinámicamente (`new Date().getFullYear()`).
3. **SEO**: Estructura semántica estricta (un solo H1 por página, títulos descriptivos, textos alternativos en imágenes).
4. **Rendimiento**: Optimización de imágenes (WebP, dimensiones y calidades adaptadas), transiciones con `transform` y `opacity`.
