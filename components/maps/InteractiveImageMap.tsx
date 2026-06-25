import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LotProperties } from './mapTypes';

interface InteractiveImageMapProps {
  imageUrl: string;
  lots: any[];
  onSelectLot?: (lot: LotProperties | null) => void;
  className?: string;
}

export default function InteractiveImageMap({ imageUrl, lots, onSelectLot, className }: InteractiveImageMapProps) {
  const [hoveredLot, setHoveredLot] = useState<any | null>(null);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [draftLots, setDraftLots] = useState<any[]>(lots);
  const [drawingBox, setDrawingBox] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null);
  const [selectedEditLotId, setSelectedEditLotId] = useState<string | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<{ lotId: string, pointIndex: number } | null>(null);
  const [svgSize, setSvgSize] = useState({ w: 1000, h: 500 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setScale(2.5); // Starts larger on mobile
    }
  }, []);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const lastPanPoint = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
        lastPanPoint.current = null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      setDraftLots(lots);
      setSelectedEditLotId(null);
    }
  }, [lots, isEditMode]);

  useEffect(() => {
    if (!imageContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      if (rect.width > 0 && rect.height > 0) {
        setSvgSize({ w: rect.width, h: rect.height });
      }
    });
    observer.observe(imageContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleHover = (lot: any) => {
    if (isEditMode) return;
    setHoveredLot(lot);
  };

  const handleLeave = () => {
    setHoveredLot(null);
  };

  const handleClick = (lot: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditMode) {
      setSelectedEditLotId(lot.id);
      return;
    }
    setSelectedLotId(lot.id);
    if (onSelectLot) {
      onSelectLot(lot as any);
    }
  };

  // --- Drawing logic ---
  const getPointerPercents = (e: React.PointerEvent | React.MouseEvent) => {
    if (!imageContainerRef.current) return { x: 0, y: 0 };
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSpacePressed) {
      setIsPanning(true);
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }

    if (!isEditMode) return;
    if ((e.target as HTMLElement).closest('.lot-shape') || (e.target as HTMLElement).closest('.point-handle')) return;
    
    const { x, y } = getPointerPercents(e);
    setStartPoint({ x, y });
    setDrawingBox({ x, y, w: 0, h: 0 });
    setSelectedEditLotId(null);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning && lastPanPoint.current && scrollContainerRef.current) {
      const dx = e.clientX - lastPanPoint.current.x;
      const dy = e.clientY - lastPanPoint.current.y;
      scrollContainerRef.current.scrollLeft -= dx;
      scrollContainerRef.current.scrollTop -= dy;
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (!isEditMode || !startPoint || !drawingBox) return;
    const { x, y } = getPointerPercents(e);
    
    const minX = Math.min(startPoint.x, x);
    const minY = Math.min(startPoint.y, y);
    const w = Math.abs(x - startPoint.x);
    const h = Math.abs(y - startPoint.y);
    
    setDrawingBox({ x: minX, y: minY, w, h });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      setIsPanning(false);
      lastPanPoint.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
      return;
    }

    if (!isEditMode || !startPoint || !drawingBox) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (drawingBox.w > 1 && drawingBox.h > 1) {
      const newLot = {
        id: `LOTE-${Date.now().toString().slice(-4)}`,
        projectSlug: 'quintaesencia',
        status: 'available',
        area: '1,000 m²',
        price: 'Consultar',
        zone: 'Nueva Zona',
        view: 'Vista al desarrollo',
        shape: 'polygon',
        coordinates: { 
          // We keep center x,y just in case
          x: Number((drawingBox.x + drawingBox.w / 2).toFixed(2)), 
          y: Number((drawingBox.y + drawingBox.h / 2).toFixed(2)), 
          width: Number(drawingBox.w.toFixed(2)), 
          height: Number(drawingBox.h.toFixed(2)),
          points: [
            { x: Number(drawingBox.x.toFixed(2)), y: Number(drawingBox.y.toFixed(2)) },
            { x: Number((drawingBox.x + drawingBox.w).toFixed(2)), y: Number(drawingBox.y.toFixed(2)) },
            { x: Number((drawingBox.x + drawingBox.w).toFixed(2)), y: Number((drawingBox.y + drawingBox.h).toFixed(2)) },
            { x: Number(drawingBox.x.toFixed(2)), y: Number((drawingBox.y + drawingBox.h).toFixed(2)) }
          ]
        }
      };
      setDraftLots([...draftLots, newLot]);
      setSelectedEditLotId(newLot.id);
    }
    
    setStartPoint(null);
    setDrawingBox(null);
  };

  const updateSelectedLot = (updates: any) => {
    setDraftLots(prev => prev.map(lot => {
      if (lot.id === selectedEditLotId) {
        return {
          ...lot,
          ...updates,
          coordinates: {
            ...lot.coordinates,
            ...(updates.coordinates || {})
          }
        };
      }
      return lot;
    }));
  };

  const convertToPolygon = () => {
    const lot = draftLots.find(l => l.id === selectedEditLotId);
    if (!lot) return;
    const { x, y, width, height } = lot.coordinates;
    const left = x - width / 2;
    const right = x + width / 2;
    const top = y - height / 2;
    const bottom = y + height / 2;
    
    updateSelectedLot({
      shape: 'polygon',
      coordinates: {
        points: [
          { x: Number(left.toFixed(2)), y: Number(top.toFixed(2)) },
          { x: Number(right.toFixed(2)), y: Number(top.toFixed(2)) },
          { x: Number(right.toFixed(2)), y: Number(bottom.toFixed(2)) },
          { x: Number(left.toFixed(2)), y: Number(bottom.toFixed(2)) }
        ]
      }
    });
  };

  const deleteSelectedLot = () => {
    setDraftLots(prev => prev.filter(lot => lot.id !== selectedEditLotId));
    setSelectedEditLotId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'rgba(74, 222, 128, 0.4)';
      case 'occupied': return 'rgba(248, 113, 113, 0.4)';
      case 'reserved': return 'rgba(250, 204, 21, 0.4)';
      default: return 'rgba(255, 255, 255, 0.4)';
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'available': return '#4ade80';
      case 'occupied': return '#f87171';
      case 'reserved': return '#facc15';
      default: return '#ffffff';
    }
  };

  const getPolygonCenter = (points: {x: number, y: number}[]) => {
    if (!points || points.length === 0) return { x: 50, y: 50 };
    let minX = 100, maxX = 0, minY = 100, maxY = 0;
    points.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  };

  const displayLots = isEditMode ? draftLots : lots;
  const selectedEditLot = draftLots.find(l => l.id === selectedEditLotId);

  const getExportJSON = () => {
    const output = draftLots.map(lot => {
      const rot = lot.coordinates.rotation ? `, rotation: ${lot.coordinates.rotation}` : '';
      const shapeStr = lot.shape ? `, shape: '${lot.shape}'` : '';
      let pointsStr = '';
      if (lot.shape === 'polygon' && lot.coordinates.points) {
        const pts = lot.coordinates.points.map((p: any) => `{ x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)} }`).join(', ');
        pointsStr = `, points: [${pts}]`;
      }
      return `{ id: '${lot.id}', projectSlug: '${lot.projectSlug}', status: '${lot.status}', area: '${lot.area}', price: '${lot.price}', zone: '${lot.zone}', view: '${lot.view}'${shapeStr}, coordinates: { x: ${lot.coordinates.x}, y: ${lot.coordinates.y}, width: ${lot.coordinates.width}, height: ${lot.coordinates.height}${rot}${pointsStr} } }`;
    });
    return output.join(',\n  ');
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Editor Controls */}
      <div className="flex justify-between items-center bg-gunmetal p-4 rounded-xl shadow-lg border border-silver-sand/20">
        <div>
          <h3 className="text-warm-white font-serif text-lg mb-1">Mapa Interactivo</h3>
          <p className="text-silver-sand/60 text-sm">
            {isEditMode ? 'Dibuja haciendo clic y arrastrando. Selecciona un lote y arrastra sus puntos.' : 'Pasa el cursor o dale clic a un lote para ver más información.'}
          </p>
        </div>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
            isEditMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-khaki text-gunmetal hover:bg-khaki/80'
          }`}
        >
          {isEditMode ? 'Salir de Edición' : 'Activar Modo Editor'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <div className={`relative ${isEditMode && selectedEditLotId ? 'lg:w-3/4' : 'w-full'} h-full min-h-[400px] max-h-[800px] transition-all duration-300 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-[#EFEFE8]`}>
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-md border border-gray-200">
            <button onClick={() => setScale(prev => Math.min(prev + 0.5, 5))} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-khaki hover:text-white rounded text-gunmetal font-bold transition-colors">+</button>
            <div className="text-[10px] font-bold text-center text-gray-500">{Math.round(scale * 100)}%</div>
            <button onClick={() => setScale(prev => Math.max(prev - 0.5, 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-khaki hover:text-white rounded text-gunmetal font-bold transition-colors">-</button>
          </div>

          <AnimatePresence>
            {scale > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-gunmetal/90 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 border border-white/10 pointer-events-none"
              >
                <kbd className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">Espacio + Clic</kbd>
                <span>para mover el mapa</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            ref={scrollContainerRef}
            className="w-full h-full overflow-auto"
          >
            <div 
              ref={imageContainerRef}
              className={`relative h-auto transition-all duration-300 origin-top-left md:min-w-full min-w-[700px] ${isSpacePressed ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-crosshair'}`}
            style={{ width: `${scale * 100}%` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img 
              src={imageUrl} 
              alt="Master Plan" 
              className="w-full h-auto block select-none pointer-events-none"
              draggable={false}
            />

            {/* Render Drawn Box in progress */}
            {drawingBox && (
              <div 
                className="absolute bg-blue-500/30 border-2 border-blue-500 border-dashed pointer-events-none z-30"
                style={{
                  left: `${drawingBox.x}%`,
                  top: `${drawingBox.y}%`,
                  width: `${drawingBox.w}%`,
                  height: `${drawingBox.h}%`
                }}
              />
            )}

            {/* SVG overlay for polygons and borders */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
              {displayLots.map((lot) => {
                if (lot.shape !== 'polygon' || !lot.coordinates.points) return null;
                const isSelected = selectedLotId === lot.id || selectedEditLotId === lot.id;
                const isHovered = hoveredLot?.id === lot.id;
                const pointsPx = lot.coordinates.points.map((p: any) => `${(p.x * svgSize.w) / 100},${(p.y * svgSize.h) / 100}`).join(' ');

                return (
                  <g key={lot.id}>
                    <polygon
                      points={pointsPx}
                      fill={isEditMode || isSelected || isHovered ? getStatusColor(lot.status) : 'transparent'}
                      stroke={isEditMode || isSelected || isHovered ? getBorderColor(lot.status) : 'transparent'}
                      strokeWidth={isSelected ? "3" : "2"}
                      strokeDasharray={isEditMode && selectedEditLotId === lot.id ? "4 4" : "0"}
                      className={`lot-shape transition-colors duration-300 ${isSpacePressed ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}
                      onMouseEnter={() => handleHover(lot)}
                      onMouseLeave={handleLeave}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        handleClick(lot, e as any);
                      }}
                    />
                    
                    {/* Handles for selected polygon in edit mode */}
                    {isEditMode && selectedEditLotId === lot.id && lot.coordinates.points.map((p: any, index: number) => (
                      <circle
                        key={index}
                        cx={(p.x * svgSize.w) / 100}
                        cy={(p.y * svgSize.h) / 100}
                        r={draggingPoint?.pointIndex === index ? "8" : "6"}
                        fill="white"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        className={`point-handle transition-all ${isSpacePressed ? 'pointer-events-none' : 'pointer-events-auto cursor-move'}`}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          setDraggingPoint({ lotId: lot.id, pointIndex: index });
                          e.currentTarget.setPointerCapture(e.pointerId);
                        }}
                        onPointerMove={(e) => {
                          if (draggingPoint?.pointIndex === index) {
                            const { x, y } = getPointerPercents(e);
                            setDraftLots(prev => prev.map(l => {
                              if (l.id === lot.id) {
                                const newPoints = [...(l.coordinates.points || [])];
                                newPoints[index] = { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
                                return { ...l, coordinates: { ...l.coordinates, points: newPoints } };
                              }
                              return l;
                            }));
                          }
                        }}
                        onPointerUp={(e) => {
                          setDraggingPoint(null);
                          e.currentTarget.releasePointerCapture(e.pointerId);
                        }}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* Render Legacy Div Lots (circles/rectangles) */}
            {displayLots.map((lot) => {
              if (lot.shape === 'polygon') return null;
              const isSelected = selectedLotId === lot.id || selectedEditLotId === lot.id;
              const isHovered = hoveredLot?.id === lot.id;
              const rotation = lot.coordinates.rotation || 0;
              
              return (
                <div
                  key={lot.id}
                  className={`lot-shape absolute transition-all duration-300 group flex items-center justify-center ${isSpacePressed ? 'pointer-events-none' : 'cursor-pointer'}`}
                  style={{
                    left: `${lot.coordinates?.x}%`,
                    top: `${lot.coordinates?.y}%`,
                    width: `${lot.coordinates?.width}%`,
                    height: `${lot.coordinates?.height}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    backgroundColor: isEditMode || isSelected || isHovered ? getStatusColor(lot.status) : 'transparent',
                    border: `2px solid ${isEditMode || isSelected || isHovered ? getBorderColor(lot.status) : 'transparent'}`,
                    borderRadius: lot.shape === 'circle' ? '50%' : '4px',
                    zIndex: isSelected || isHovered ? 20 : 10,
                  }}
                  onMouseEnter={() => handleHover(lot)}
                  onMouseLeave={handleLeave}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handleClick(lot, e as any);
                  }}
                >
                  {isEditMode && selectedEditLotId === lot.id && (
                    <div className="absolute -inset-1 border-2 border-dashed border-blue-500 pointer-events-none rounded-[inherit]" />
                  )}
                  {!isEditMode && lot.status === 'available' && !isSelected && !isHovered && (
                    <div className="absolute inset-0 border border-[#4ade80]/30 rounded-full animate-ping opacity-20" />
                  )}
                </div>
              );
            })}

            {/* Hover Tooltip inside the map area */}
            <AnimatePresence>
              {hoveredLot && !selectedLotId && !isEditMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-30 bg-gray-900/90 backdrop-blur-md border border-gray-700 p-4 rounded-xl shadow-xl min-w-[200px] pointer-events-none"
                  style={{
                    left: hoveredLot.shape === 'polygon' 
                            ? `${getPolygonCenter(hoveredLot.coordinates.points).x}%` 
                            : `${hoveredLot.coordinates?.x}%`,
                    top: hoveredLot.shape === 'polygon' 
                            ? `${getPolygonCenter(hoveredLot.coordinates.points).y}%` 
                            : `${hoveredLot.coordinates?.y}%`,
                    transform: 'translate(-50%, -130%)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg text-white">{hoveredLot.name || hoveredLot.id}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getBorderColor(hoveredLot.status) }} />
                  </div>
                  <div className="text-gray-300 text-sm mb-1">{hoveredLot.area}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">
                    {hoveredLot.status === 'available' ? 'Disponible' : hoveredLot.status === 'reserved' ? 'Apartado' : 'Vendido'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>

        {/* Edit Panel Sidebar */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: '25%', x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[250px]"
            >
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-bold text-gray-800">Editar Lote</h4>
                <button onClick={() => setSelectedEditLotId(null)} className="text-gray-500 hover:text-gray-800">✕</button>
              </div>
              
              <div className="p-4 flex flex-col gap-4">
                {selectedEditLot ? (
                  <>
                    <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID</label>
                  <input 
                    type="text" 
                    value={selectedEditLot.id}
                    onChange={(e) => updateSelectedLot({ id: e.target.value })}
                    className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-khaki focus:ring-khaki p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Estado</label>
                  <select 
                    value={selectedEditLot.status}
                    onChange={(e) => updateSelectedLot({ status: e.target.value })}
                    className="w-full text-sm border-gray-300 rounded-md shadow-sm p-2 border bg-white"
                  >
                    <option value="available">Disponible</option>
                    <option value="reserved">Apartado</option>
                    <option value="occupied">Vendido</option>
                  </select>
                </div>

                {selectedEditLot.shape !== 'polygon' ? (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Forma</label>
                    <button 
                      onClick={convertToPolygon}
                      className="w-full bg-blue-50 text-blue-600 border border-blue-200 py-2 rounded font-bold text-sm"
                    >
                      Convertir a Polígono Deformable
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Los polígonos tienen 4 puntos que puedes arrastrar libremente para adaptar a cualquier forma irregular.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium">✅ Polígono Deformable</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Arrastra los 4 puntos blancos sobre el mapa para deformarlo.
                    </p>
                  </div>
                )}

                <button
                  onClick={deleteSelectedLot}
                  className="mt-4 w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-2 rounded-md font-bold text-sm transition-colors"
                >
                  Eliminar Lote
                </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                    <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500">Ningún lote seleccionado</p>
                    <p className="text-xs mt-2">Selecciona un lote en el mapa para editar sus propiedades o dibuja uno nuevo.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Code Export */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gunmetal p-6 rounded-xl border border-silver-sand/20 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-khaki font-serif text-lg">Configuración a copiar (lots.ts)</h4>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(getExportJSON());
                  alert('¡Código copiado al portapapeles!');
                }}
                className="bg-warm-white text-gunmetal px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-silver-sand transition-colors rounded"
              >
                Copiar Código
              </button>
            </div>
            <textarea
              readOnly
              value={getExportJSON()}
              className="w-full h-48 bg-black/50 text-[#4ade80] font-mono text-xs p-4 rounded-lg focus:outline-none border border-silver-sand/10 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
