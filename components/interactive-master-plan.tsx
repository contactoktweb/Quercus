"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { getLotsByProject, Lot } from '@/lib/projects-data'
import LotsMap from './maps/LotsMap'
import { LotProperties } from './maps/mapTypes'

interface InteractiveMasterPlanProps {
  projectSlug: string
  onSelectLot?: (lotId: string | null) => void
}

const statusColors: Record<string, { bg: string; border: string; label: string }> = {
  available: { bg: 'rgba(74, 222, 128, 0.2)', border: '#4ade80', label: 'Disponible' },
  occupied: { bg: 'rgba(248, 113, 113, 0.2)', border: '#f87171', label: 'Ocupado' },
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
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null)

  const handleLotClick = (lotProps: LotProperties | null) => {
    if (!lotProps) {
      setSelectedLot(null)
      onSelectLot?.(null)
      return
    }
    
    // Convert LotProperties to Lot
    const mappedLot: Lot = {
      id: lotProps.id,
      projectSlug: projectSlug,
      status: lotProps.status as any,
      area: lotProps.area,
      price: lotProps.price || 'Consultar',
      zone: lotProps.zoneType === 'main-lot' ? 'Lote Principal' : 'Sub Zona',
      view: 'Vista panorámica', // fallback
      coordinates: { x: 0, y: 0, width: 0, height: 0 } // Not used by LotsMap
    }
    
    setSelectedLot(mappedLot)
    onSelectLot?.(mappedLot.id)
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

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-8">
      {/* Map Area */}
      <div className="relative">
        {/* Master Plan Map */}
        <div 
          className="relative aspect-[4/3] bg-rifle-green/5 border border-silver-sand/10 overflow-hidden"
        >
          <LotsMap 
            hideSidebar 
            className="w-full h-full"
            onSelectLot={handleLotClick}
          />
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
