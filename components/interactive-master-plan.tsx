"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { getLotsByProject, Lot } from '@/lib/projects-data'
import LotsMap from './maps/LotsMap'
import InteractiveImageMap from './maps/InteractiveImageMap'
import { LotProperties } from './maps/mapTypes'

interface InteractiveMasterPlanProps {
  projectSlug: string
  onSelectLot?: (lotId: string | null) => void
  sanityLots?: any[]
  masterPlanImage?: string
}

const statusColors: Record<string, { bg: string; border: string; label: string }> = {
  available: { bg: 'rgba(74, 222, 128, 0.2)', border: '#4ade80', label: 'Disponible' },
  occupied: { bg: 'rgba(248, 113, 113, 0.2)', border: '#f87171', label: 'Vendido' },
  reserved: { bg: 'rgba(250, 204, 21, 0.2)', border: '#facc15', label: 'Apartado' },
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

export function InteractiveMasterPlan({ projectSlug, onSelectLot, sanityLots = [], masterPlanImage }: InteractiveMasterPlanProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null)
  
  // Determinar la vista por defecto:
  // Si tiene imagen de Master Plan, mostramos esa primero. Si no, mostramos el mapa.
  // Si projectSlug es quintaesencia (legacy fallback) y no se pasó imagen, también mostramos imagen.
  const hasImage = Boolean(masterPlanImage || projectSlug === 'quintaesencia')
  const hasMap = Boolean(projectSlug === 'dunah' || projectSlug === 'el-quelele')
  
  const [viewMode, setViewMode] = useState<'image' | 'map'>(hasImage ? 'image' : 'map')
  const projectLots = sanityLots.length > 0 ? sanityLots : getLotsByProject(projectSlug)

  const handleLotClick = (lotProps: LotProperties | null) => {
    if (!lotProps) {
      setSelectedLot(null)
      onSelectLot?.(null)
      return
    }
    
    // Convert LotProperties to Lot
    const mappedLot: Lot = {
      id: lotProps.id || 'Nuevo',
      projectSlug: projectSlug,
      status: (lotProps.status || 'available') as any,
      area: lotProps.area || 'N/A',
      price: lotProps.price || 'Consultar',
      zone: lotProps.zone || (lotProps.zoneType === 'main-lot' ? 'Lote Principal' : 'Sub Zona'),
      view: lotProps.view || 'Vista panorámica', 
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
    <div className="relative w-full">
      {/* Toggle Buttons (Solo se muestran si existen AMBAS opciones) */}
      {hasImage && hasMap && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gunmetal rounded-lg p-1 border border-silver-sand/20">
            <button
              onClick={() => { setViewMode('image'); setSelectedLot(null); onSelectLot?.(null); }}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors duration-300 ${
                viewMode === 'image' ? 'bg-khaki text-gunmetal' : 'text-warm-white hover:bg-silver-sand/10'
              }`}
            >
              Master Plan
            </button>
            <button
              onClick={() => { setViewMode('map'); setSelectedLot(null); onSelectLot?.(null); }}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors duration-300 ${
                viewMode === 'map' ? 'bg-khaki text-gunmetal' : 'text-warm-white hover:bg-silver-sand/10'
              }`}
            >
              Ubicación en el Mapa
            </button>
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className={`relative w-full ${viewMode === 'image' ? '' : 'h-[650px] lg:h-[750px] overflow-hidden'} bg-rifle-green/5 border border-silver-sand/10 rounded-2xl shadow-2xl`}>
        {viewMode === 'image' ? (
          <InteractiveImageMap 
            imageUrl={masterPlanImage || "/quintaesencia.png"}
            lots={projectLots}
            onSelectLot={handleLotClick}
            className="w-full h-full"
          />
        ) : (
          <LotsMap 
            hideSidebar 
            className="w-full h-full"
            onSelectLot={handleLotClick}
            projectSlug={projectSlug}
            sanityLots={sanityLots}
          />
        )}

        {/* Detail Panel Overlay */}
        <AnimatePresence>
          {selectedLot && (
            <div className={`absolute right-4 md:right-6 z-10 w-full max-w-[320px] md:max-w-[360px] ${viewMode === 'image' ? 'top-28 md:top-32' : 'top-4 md:top-6'}`}>
              <LotDetailPanel 
                key={selectedLot.id}
                lot={selectedLot} 
                onClose={handleClose}
                onRequestInfo={handleRequestInfo}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
