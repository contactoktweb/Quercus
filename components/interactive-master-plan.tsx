"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { getLotsByProject, Lot } from '@/lib/projects-data'

interface InteractiveMasterPlanProps {
  projectSlug: string
  onSelectLot?: (lotId: string | null) => void
}

const statusColors = {
  available: { bg: 'rgba(102, 167, 174, 0.3)', border: '#66A7AE', label: 'Disponible' },
  reserved: { bg: 'rgba(192, 197, 198, 0.3)', border: '#C0C5C6', label: 'Reservado' },
  sold: { bg: 'rgba(39, 53, 56, 0.5)', border: '#273538', label: 'Vendido' },
}

function LotTooltip({ lot, position }: { lot: Lot; position: { x: number; y: number } }) {
  const status = statusColors[lot.status]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-30 bg-gunmetal border border-silver-sand/20 p-4 min-w-[200px] pointer-events-none"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -120%)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-serif text-lg text-warm-white">Lote {lot.id}</span>
        <span 
          className="text-xs tracking-luxury uppercase px-2 py-1"
          style={{ backgroundColor: status.bg, color: status.border }}
        >
          {status.label}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-silver-sand/60">Superficie</span>
          <span className="text-warm-white">{lot.area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-silver-sand/60">Zona</span>
          <span className="text-warm-white">{lot.zone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-silver-sand/60">Vista</span>
          <span className="text-warm-white">{lot.view}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-silver-sand/60">Precio</span>
          <span className="text-khaki">{lot.price}</span>
        </div>
      </div>
      {/* Arrow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gunmetal" />
    </motion.div>
  )
}

function LotDetailPanel({ 
  lot, 
  onClose, 
  onRequestInfo 
}: { 
  lot: Lot
  onClose: () => void
  onRequestInfo: () => void
}) {
  const status = statusColors[lot.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gunmetal border border-silver-sand/20 p-6 md:p-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-xs tracking-luxury uppercase text-khaki block mb-2">Detalle del lote</span>
          <h3 className="font-serif text-2xl text-warm-white">Lote {lot.id}</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-silver-sand/60 hover:text-warm-white transition-colors duration-300"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div 
        className="inline-flex items-center gap-2 px-3 py-1.5 mb-6"
        style={{ backgroundColor: status.bg }}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: status.border }}
        />
        <span className="text-xs tracking-luxury uppercase" style={{ color: status.border }}>
          {status.label}
        </span>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between py-3 border-b border-silver-sand/10">
          <span className="text-silver-sand/60">Superficie</span>
          <span className="text-warm-white font-medium">{lot.area}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-silver-sand/10">
          <span className="text-silver-sand/60">Zona</span>
          <span className="text-warm-white">{lot.zone}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-silver-sand/10">
          <span className="text-silver-sand/60">Vista</span>
          <span className="text-warm-white">{lot.view}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-silver-sand/10">
          <span className="text-silver-sand/60">Precio</span>
          <span className="text-khaki font-serif text-lg">{lot.price}</span>
        </div>
      </div>

      {lot.status === 'available' && (
        <button
          onClick={onRequestInfo}
          className="w-full bg-warm-white text-gunmetal text-sm tracking-luxury uppercase py-4 hover:bg-khaki transition-colors duration-300"
        >
          Solicitar información sobre este lote
        </button>
      )}
    </motion.div>
  )
}

export function InteractiveMasterPlan({ projectSlug, onSelectLot }: InteractiveMasterPlanProps) {
  const lots = getLotsByProject(projectSlug)
  const [hoveredLot, setHoveredLot] = useState<Lot | null>(null)
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLotClick = (lot: Lot) => {
    setSelectedLot(lot)
    onSelectLot?.(lot.id)
  }

  const handleClose = () => {
    setSelectedLot(null)
    onSelectLot?.(null)
  }

  const handleRequestInfo = () => {
    if (selectedLot) {
      onSelectLot?.(selectedLot.id)
      // Scroll to contact form
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const resetView = () => {
    setScale(1)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-8">
      {/* Map Area */}
      <div className="relative">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setScale(s => Math.min(s + 0.2, 2))}
            className="w-10 h-10 bg-gunmetal/80 backdrop-blur-sm border border-silver-sand/20 text-warm-white flex items-center justify-center hover:bg-gunmetal transition-colors duration-300"
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}
            className="w-10 h-10 bg-gunmetal/80 backdrop-blur-sm border border-silver-sand/20 text-warm-white flex items-center justify-center hover:bg-gunmetal transition-colors duration-300"
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={resetView}
            className="w-10 h-10 bg-gunmetal/80 backdrop-blur-sm border border-silver-sand/20 text-warm-white flex items-center justify-center hover:bg-gunmetal transition-colors duration-300"
            aria-label="Reset view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-4 bg-soft-black/80 backdrop-blur-sm p-3 border border-silver-sand/10">
          {Object.entries(statusColors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 border"
                style={{ backgroundColor: value.bg, borderColor: value.border }}
              />
              <span className="text-xs text-silver-sand/70">{value.label}</span>
            </div>
          ))}
        </div>

        {/* Master Plan Map */}
        <div 
          ref={containerRef}
          className="relative aspect-[4/3] bg-rifle-green/5 border border-silver-sand/10 overflow-hidden"
        >
          <div 
            className="absolute inset-0 transition-transform duration-300 origin-center"
            style={{ transform: `scale(${scale})` }}
          >
            {/* Background pattern - represents the master plan base */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="currentColor" strokeWidth="0.1" className="text-silver-sand" />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="currentColor" strokeWidth="0.1" className="text-silver-sand" />
                ))}
                {/* Roads/paths */}
                <path d="M5,50 L95,50" stroke="currentColor" strokeWidth="0.5" className="text-khaki/30" />
                <path d="M50,5 L50,95" stroke="currentColor" strokeWidth="0.3" className="text-khaki/30" />
                {/* Landscape elements */}
                <circle cx="15" cy="15" r="8" fill="currentColor" className="text-rifle-green/20" />
                <circle cx="85" cy="80" r="10" fill="currentColor" className="text-rifle-green/20" />
              </svg>
            </div>

            {/* Lot rectangles */}
            {lots.map((lot) => {
              const status = statusColors[lot.status]
              const isHovered = hoveredLot?.id === lot.id
              const isSelected = selectedLot?.id === lot.id

              return (
                <motion.div
                  key={lot.id}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${lot.coordinates.x}%`,
                    top: `${lot.coordinates.y}%`,
                    width: `${lot.coordinates.width}%`,
                    height: `${lot.coordinates.height}%`,
                    backgroundColor: status.bg,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: isHovered || isSelected ? '#BFA68C' : status.border,
                    boxShadow: isHovered || isSelected ? '0 0 20px rgba(191, 166, 140, 0.3)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredLot(lot)}
                  onMouseLeave={() => setHoveredLot(null)}
                  onClick={() => handleLotClick(lot)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-warm-white text-xs font-medium drop-shadow-lg">
                      {lot.id}
                    </span>
                  </div>
                </motion.div>
              )
            })}

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredLot && !selectedLot && (
                <LotTooltip 
                  lot={hoveredLot} 
                  position={{ 
                    x: hoveredLot.coordinates.x + hoveredLot.coordinates.width / 2,
                    y: hoveredLot.coordinates.y
                  }} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:min-h-[400px]">
        <AnimatePresence mode="wait">
          {selectedLot ? (
            <LotDetailPanel 
              key={selectedLot.id}
              lot={selectedLot} 
              onClose={handleClose}
              onRequestInfo={handleRequestInfo}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center bg-gunmetal/50 border border-silver-sand/10 p-8"
            >
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-silver-sand/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-silver-sand/60 text-sm">
                  Selecciona un lote en el mapa para ver sus detalles
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
