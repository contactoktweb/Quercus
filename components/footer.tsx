import Link from 'next/link'

const footerLinks = {
  comunidades: [
    { name: 'Quercus Baja', href: '#' },
    { name: 'Quercus Elemental', href: '#' },
    { name: 'Ventusbay', href: '#' },
    { name: 'El Quelele', href: '#' },
    { name: 'DUNAH', href: '#' },
  ],
  empresa: [
    { name: 'Historia', href: '#historia' },
    { name: 'Sostenibilidad', href: '#sostenibilidad' },
    { name: 'Experiencias', href: '#experiencias' },
    { name: 'Contacto', href: '#contacto' },
  ],
  social: [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'YouTube', href: '#' },
  ]
}

export function Footer() {
  return (
    <footer className="bg-gunmetal py-20 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logos/Recurso 9 (1).png" alt="Quercus Logo" className="h-8 object-contain" />
              <span className="sr-only">QUERCUS</span>
            </Link>
            <p className="mt-6 text-silver-sand/70 text-sm leading-relaxed max-w-xs">
              Creando comunidades regenerativas en Baja California Sur.
            </p>
            <p className="mt-4 text-silver-sand/50 text-xs">
              Baja California Sur · México
            </p>
          </div>

          {/* Comunidades */}
          <div>
            <h3 className="text-xs tracking-luxury uppercase text-khaki mb-6">Comunidades</h3>
            <ul className="space-y-3">
              {footerLinks.comunidades.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-silver-sand/70 text-sm hover:text-warm-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-xs tracking-luxury uppercase text-khaki mb-6">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-silver-sand/70 text-sm hover:text-warm-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-xs tracking-luxury uppercase text-khaki mb-6">Conectar</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-silver-sand/70 text-sm hover:text-warm-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="#contacto"
                className="text-sm text-warm-white border border-warm-white/30 px-6 py-3 inline-block hover:bg-warm-white hover:text-gunmetal transition-all duration-300 tracking-wider-luxury uppercase"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-silver-sand/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-silver-sand/50 text-xs">
              © {new Date().getFullYear()} Quercus. Todos los derechos reservados.
            </p>
            <a 
              href="https://www.kytcode.lat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-silver-sand/50 text-xs hover:text-warm-white transition-colors duration-300 flex items-center gap-1.5"
            >
              Desarrollado por K&T
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white inline-block">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-silver-sand/50 text-xs hover:text-warm-white transition-colors duration-300">
              Política de privacidad
            </Link>
            <Link href="#" className="text-silver-sand/50 text-xs hover:text-warm-white transition-colors duration-300">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

