# Changelog AI

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
