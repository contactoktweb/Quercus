# Changelog AI

## [2026-09-18] - Correcciones UI, Footer Dinámico, Timeline y Estadísticas de Sanity

### Corregido
- **Centrado de métricas en EditorialIntro**: El contenedor de estadísticas ahora se adapta dinámicamente (`flex justify-center` cuando hay una sola métrica como los 25 años) en vez de forzar una grilla de 4 columnas que lo desplazaba a la izquierda.
- **Bug visual de comillas en Reseñas (Testimonios)**:
  - Se eliminaron las comillas duplicadas (`''''`) mediante sanitización automática en frontend (`cleanQuote`) y limpieza directa en Sanity.
  - Se resolvió el problema de corte de contenido (`overflow-hidden` con altura fija) para que el autor y rol (`Cliente`, `Reseña de Google`, etc.) siempre sean visibles.
  - Se agregó soporte nativo de gestos táctiles (swipe/drag horizontal en móviles y cursor de agarre) y pausa al interactuar con el cursor.
- **Imágenes en la línea de tiempo (/historia)**: El componente `TimelineSection` ahora renderiza correctamente las imágenes (`item.image`) subidas en Sanity con relación de aspecto `aspect-[16/10]`, bordes sutiles y animación de escala al interactuar.

### Añadido
- **Footer 100% dinámico con proyectos**: La columna *Comunidades* del pie de página ahora lee automáticamente todos los proyectos de Sanity (`ALL_PROJECTS_QUERY`), mostrando sus nombres actualizados y conectando directamente a `/proyectos/${slug}` en todas las páginas.
- **Estadísticas editables en Nuestro Legado**: Se añadió el campo `sustainabilityStats` en el esquema de Sanity (`historiaPage.ts`), se incluyó en `HISTORIA_PAGE_QUERY` y se inicializaron los valores por defecto (20+ Años, 10 Comunidades, 2 Estados) en el CMS para que sean editables en tiempo real desde Sanity Studio.

## [2026-09-17] - Integración de Skiper54 en Galería de Proyectos

### Añadido
- Instalación de la dependencia `embla-carousel-autoplay` para compatibilidad completa con el carrusel Skiper54.
- Creación del componente `Skiper54Gallery` (`components/skiper54-gallery.tsx`) adaptado de [skiper-ui.com/v1/skiper54](https://skiper-ui.com/v1/skiper54):
  - Efecto de `clipPath` animado con Framer Motion (expansión vertical al centrarse y reducción con perspectiva al alejarse).
  - Animación de títulos con desenfoque (`blur`) y aparición suave.
  - Soporte completo responsive para dispositivos móviles (deslizamiento horizontal táctil con el dedo, centrado `basis-[78%]`) y computadoras de escritorio (arrastre con mouse, flechas de navegación y controles de teclado).
  - Modal Lightbox integrado a pantalla completa al hacer clic en las imágenes.
  - Soporte de temas Claro (`light`) y Oscuro (`dark`).
- Actualización de `components/project-page-template.tsx` para usar `Skiper54Gallery` tanto en la sección de **Galería** (`project.gallery`) como en la sección de **Renders** (`project.renders`).
- Eliminación de la implementación obsoleta `components/masonry-gallery.tsx`.
- Creación de `PROJECT_CONTEXT.md` y `CHANGELOG_AI.md`.
