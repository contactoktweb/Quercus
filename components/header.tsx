"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getProjectsByRegion } from '@/lib/projects-data'

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Comunidades', href: '#', hasMegaMenu: true },
  { name: 'Historia', href: '/historia' },
  { name: 'Sostenibilidad', href: '/#sostenibilidad' },
]

const bcsProjects = getProjectsByRegion('baja-california-sur')
const michoacanProjects = getProjectsByRegion('michoacan')

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMegaMenu = () => setIsMegaMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || isMegaMenuOpen
            ? 'bg-warm-white/95 backdrop-blur-md border-b border-silver-sand/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-40 h-10 md:w-48 md:h-12">
                <img 
                  src="/logos/Recurso 14.png" 
                  alt="Quercus Logo" 
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isScrolled || isMegaMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
                />
                <img 
                  src="/logos/Recurso 9 (1).png" 
                  alt="Quercus Logo" 
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isScrolled || isMegaMenuOpen ? 'opacity-0' : 'opacity-100'}`} 
                />
              </div>
              <span className="sr-only">QUERCUS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => item.hasMegaMenu && setIsMegaMenuOpen(false)}
                >
                  {item.hasMegaMenu ? (
                    <button
                      className={`flex items-center gap-1 text-sm tracking-luxury uppercase transition-all duration-300 hover:opacity-60 ${
                        isScrolled || isMegaMenuOpen ? 'text-gunmetal' : 'text-warm-white'
                      }`}
                    >
                      {item.name}
                      <svg 
                        className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm tracking-luxury uppercase transition-all duration-300 hover:opacity-60 ${
                        isScrolled || isMegaMenuOpen ? 'text-gunmetal' : 'text-warm-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/#contacto"
                className={`text-sm tracking-wider-luxury uppercase px-6 py-3 border transition-all duration-300 hover:bg-gunmetal hover:text-warm-white ${
                  isScrolled || isMegaMenuOpen
                    ? 'border-gunmetal text-gunmetal' 
                    : 'border-warm-white/50 text-warm-white hover:border-warm-white'
                }`}
              >
                Solicitar información
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-gunmetal' : 'text-warm-white'
              }`}
              aria-label="Abrir menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 bg-warm-white border-b border-silver-sand/30 shadow-lg"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Baja California Sur */}
                  <div>
                    <h3 className="text-xs tracking-luxury uppercase text-khaki mb-6">
                      Baja California Sur
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {bcsProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/proyectos/${project.slug}`}
                          onClick={closeMegaMenu}
                          className="group p-4 hover:bg-silver-sand/10 transition-colors duration-300"
                        >
                          <span className="block font-serif text-lg text-gunmetal group-hover:text-khaki transition-colors duration-300">
                            {project.name}
                          </span>
                          <span className="text-xs text-rifle-green/50">{project.tagline}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Michoacán */}
                  <div>
                    <h3 className="text-xs tracking-luxury uppercase text-khaki mb-6">
                      Michoacán
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {michoacanProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/proyectos/${project.slug}`}
                          onClick={closeMegaMenu}
                          className="group p-4 hover:bg-silver-sand/10 transition-colors duration-300"
                        >
                          <span className="block font-serif text-lg text-gunmetal group-hover:text-khaki transition-colors duration-300">
                            {project.name}
                          </span>
                          <span className="text-xs text-rifle-green/50">{project.tagline}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* All communities link */}
                <div className="mt-8 pt-8 border-t border-silver-sand/20 text-center">
                  <Link
                    href="/#proyectos"
                    onClick={closeMegaMenu}
                    className="inline-flex items-center gap-2 text-sm tracking-luxury uppercase text-gunmetal hover:text-khaki transition-colors duration-300"
                  >
                    Ver todas las comunidades
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-gunmetal/98 backdrop-blur-lg overflow-y-auto"
          >
            <div className="min-h-full flex flex-col px-6 py-20">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-warm-white"
                aria-label="Cerrar menú"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>

              <nav className="flex-1 flex flex-col justify-center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="border-b border-warm-white/10"
                  >
                    {item.hasMegaMenu ? (
                      <div>
                        <button
                          onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                          className="w-full flex items-center justify-between py-6 font-serif text-3xl text-warm-white"
                        >
                          {item.name}
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {mobileSubmenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-6 space-y-6">
                                {/* BCS */}
                                <div>
                                  <h4 className="text-xs tracking-luxury uppercase text-khaki mb-4">
                                    Baja California Sur
                                  </h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    {bcsProjects.map((project) => (
                                      <Link
                                        key={project.slug}
                                        href={`/proyectos/${project.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-warm-white/70 hover:text-khaki transition-colors duration-300"
                                      >
                                        {project.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                                {/* Michoacán */}
                                <div>
                                  <h4 className="text-xs tracking-luxury uppercase text-khaki mb-4">
                                    Michoacán
                                  </h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    {michoacanProjects.map((project) => (
                                      <Link
                                        key={project.slug}
                                        href={`/proyectos/${project.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-warm-white/70 hover:text-khaki transition-colors duration-300"
                                      >
                                        {project.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-6 font-serif text-3xl text-warm-white hover:text-khaki transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/#contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center text-sm tracking-luxury uppercase px-8 py-4 border border-warm-white/50 text-warm-white hover:bg-warm-white hover:text-gunmetal transition-all duration-300"
                  >
                    Solicitar información
                  </Link>
                </motion.div>
              </nav>

              <div className="text-center mt-12">
                <p className="text-silver-sand text-xs tracking-luxury uppercase">
                  Baja California Sur · México
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

