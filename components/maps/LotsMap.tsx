'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Map, { Source, Layer, MapLayerMouseEvent, FullscreenControl, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { baseFillLayer, borderLayer, hoverHighlightLayer, selectedBorderLayer, selectedFillLayer, hitTestLayer } from './mapLayers';
import { lotsData } from '@/data/lots';
import { LotProperties } from './mapTypes';
import { LotTooltip } from './LotTooltip';
import { dunahKmlGeoJson } from './dunahKml';
import { queleleKmlGeoJson } from './queleleKml';
import { quintaesenciaKmlGeoJson } from './quintaesenciaKml';
import DrawControl from './DrawControl';

export interface LotsMapProps {
  onSelectLot?: (lot: LotProperties | null) => void;
  className?: string;
  hideSidebar?: boolean;
  projectSlug?: string;
}

// Función para determinar el criterio de highlight basado en las propiedades del feature
function getHighlightFilter(feature: GeoJSON.Feature) {
  const properties = feature.properties as LotProperties | null;
  if (!properties) return null;

  if (properties.parentLotId) {
    return {
      key: 'parentLotId',
      value: properties.parentLotId
    };
  }

  if (properties.blockId) {
    return {
      key: 'blockId',
      value: properties.blockId
    };
  }

  return {
    key: 'id',
    value: properties.id
  };
}

export default function LotsMap({ onSelectLot, className, hideSidebar = false, projectSlug }: LotsMapProps = {}) {
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSON.Feature | null>(null);
  const [hoverLngLat, setHoverLngLat] = useState<[number, number] | null>(null);
  const hoveredIdRef   = useRef<string | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedLot, setSelectedLot] = useState<LotProperties | null>(null);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState<'lotes' | 'imagen'>('lotes');
  const [editorMode, setEditorMode] = useState<'draw_polygon' | 'simple_select'>('draw_polygon');
  const [drawnFeatures, setDrawnFeatures] = useState<any>(() => {
    const initial: any = {};
    const features = (lotsData as any)?.features || [];
    for (const f of features) {
      initial[f.id] = f;
    }
    return initial;
  });
  
  const [dunahImgCoords, setDunahImgCoords] = useState<[[number, number], [number, number], [number, number], [number, number]]>([
    [-110.70714266576692, 23.81281604288452], // top-left
    [-110.69544243149925, 23.80000604943828], // top-right
    [-110.70517181071799, 23.792710712705727], // bottom-right
    [-110.71710045270571, 23.8054396118674]  // bottom-left
  ]);
  
  const [hasEditorAccess, setHasEditorAccess] = useState(false);

  useEffect(() => {
    try {
      const sessionDataStr = localStorage.getItem('quercus_auth_session');
      if (sessionDataStr) {
        const sessionData = JSON.parse(sessionDataStr);
        if (sessionData && sessionData.expiresAt > new Date().getTime()) {
          setHasEditorAccess(true);
        } else {
          localStorage.removeItem('quercus_auth_session');
        }
      }
    } catch (err) {}
  }, []);
  
  const onUpdateDraw = useCallback((e: any) => {
    setDrawnFeatures((curr: any) => {
      const newFeatures = { ...curr };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDeleteDraw = useCallback((e: any) => {
    setDrawnFeatures((curr: any) => {
      const newFeatures = { ...curr };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const clearShow = () => {
    if (showTimeoutRef.current) { clearTimeout(showTimeoutRef.current); showTimeoutRef.current = null; }
  };
  const clearHide = () => {
    if (hideTimeoutRef.current) { clearTimeout(hideTimeoutRef.current); hideTimeoutRef.current = null; }
  };

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const { features, lngLat } = event;
    const feature = features && features[0];

    if (feature && feature.properties) {
      // Cancelar cualquier "ocultar" pendiente — seguimos sobre un lote
      clearHide();

      const newId = feature.properties.id;

      if (hoveredIdRef.current !== newId) {
        // Cambiamos de lote: cancelar el show anterior y arrancar uno nuevo
        clearShow();
        hoveredIdRef.current = newId;

        // Pequeño delay antes de mostrar el tooltip (evita flash al pasar rápido)
        showTimeoutRef.current = setTimeout(() => {
          setHoveredFeature(feature);
          setHoverLngLat([lngLat.lng, lngLat.lat]);
          showTimeoutRef.current = null;
        }, 300);
      }
    } else {
      // Micro-gap en borde: esperar 80ms antes de ocultar
      clearShow(); // cancelar show pendiente si aún no apareció
      if (hoveredIdRef.current !== null && !hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          hoveredIdRef.current = null;
          setHoveredFeature(null);
          setHoverLngLat(null);
          hideTimeoutRef.current = null;
        }, 80);
      }
    }
  }, []);

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    if (isEditMode) return; // Prevent losing selection/interaction logic during edit mode
    const { features } = event;
    const clickedFeature = features && features[0];
    if (clickedFeature && clickedFeature.properties) {
      const lot = clickedFeature.properties as LotProperties;
      setSelectedLot(lot);
      if (onSelectLot) onSelectLot(lot);
    } else {
      setSelectedLot(null);
      if (onSelectLot) onSelectLot(null);
    }
  }, [onSelectLot, isEditMode]);

  // Filtros dinámicos para Hover (Highlight By Filter)
  const hoverFilter = useMemo(() => {
    if (!hoveredFeature) return ['in', 'id', '']; // No mostrar nada si no hay hover

    // Solo resaltamos el lote individual sobre el que estamos parados
    const properties = hoveredFeature.properties as LotProperties | null;
    if (!properties || !properties.id) return ['in', 'id', ''];

    return ['in', 'id', properties.id];
  }, [hoveredFeature]);

  // Filtro para el elemento seleccionado (usamos el id único)
  const selectedLotId = selectedLot?.id || '';
  const filterSelect = useMemo(() => ['in', 'id', selectedLotId], [selectedLotId]);

  return (
    <div className={className || "w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative bg-gray-50"}>
      
      {/* Editor Controls Panel */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="flex flex-col bg-gunmetal p-4 rounded-xl shadow-lg border border-silver-sand/20 min-w-[300px]">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-warm-white font-serif text-lg mb-1">Mapa Interactivo</h3>
              <p className="text-silver-sand/60 text-sm">
                {isEditMode ? 'Edición de polígonos.' : 'Pasa el cursor o dale clic a un lote para ver más información.'}
              </p>
            </div>
            {hasEditorAccess && (
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`ml-4 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  isEditMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-khaki text-gunmetal hover:bg-khaki/80'
                }`}
              >
                {isEditMode ? 'Salir Edición' : 'Modo Editor'}
              </button>
            )}
          </div>
          
          {isEditMode && hasEditorAccess && (
            <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-silver-sand/20">
               
               {/* Selector de Objetivo de Edición */}
               <div className="flex items-center gap-2 mb-2 p-1 bg-black/20 rounded-lg">
                 <button
                   onClick={() => setEditTarget('lotes')}
                   className={`flex-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${editTarget === 'lotes' ? 'bg-khaki text-gunmetal shadow-md' : 'text-warm-white hover:bg-silver-sand/20'}`}
                 >
                   🟩 Lotes
                 </button>
                 {projectSlug === 'dunah' && (
                   <button
                     onClick={() => setEditTarget('imagen')}
                     className={`flex-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${editTarget === 'imagen' ? 'bg-khaki text-gunmetal shadow-md' : 'text-warm-white hover:bg-silver-sand/20'}`}
                   >
                     🖼️ Imagen
                   </button>
                 )}
               </div>

               {editTarget === 'lotes' && (
                 <>
                   <div className="flex items-center gap-2">
                     <button
                       onClick={() => setEditorMode('draw_polygon')}
                       className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ${editorMode === 'draw_polygon' ? 'bg-khaki text-gunmetal' : 'bg-black/40 text-warm-white hover:bg-silver-sand/20'}`}
                     >
                       ✏️ Dibujar
                     </button>
                     <button
                       onClick={() => setEditorMode('simple_select')}
                       className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors ${editorMode === 'simple_select' ? 'bg-khaki text-gunmetal' : 'bg-black/40 text-warm-white hover:bg-silver-sand/20'}`}
                     >
                       👆 Seleccionar
                     </button>
                   </div>
                   
                   {editorMode === 'simple_select' && (
                     <button
                       onClick={() => window.dispatchEvent(new CustomEvent('draw-trash'))}
                       className="w-full mt-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30"
                     >
                       🗑️ Eliminar Lote Seleccionado
                     </button>
                   )}
                 </>
               )}

               
               
               {isEditMode && editTarget === 'imagen' && projectSlug === 'dunah' && (
                 <button 
                   onClick={() => {
                     navigator.clipboard.writeText(JSON.stringify(dunahImgCoords, null, 2));
                     alert('Coordenadas de imagen copiadas al portapapeles. ¡Mira también la consola!');
                     console.log('Nuevas coordenadas de imagen DUNAH:', JSON.stringify(dunahImgCoords, null, 2));
                   }}
                   className="w-full mt-2 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/30"
                 >
                   📋 Copiar Coords Imagen
                 </button>
               )}
            </div>
          )}
        </div>
        
        {isEditMode && editTarget === 'lotes' && Object.keys(drawnFeatures).length > 0 && (
          <div className="bg-gunmetal p-4 rounded-xl shadow-lg border border-silver-sand/20 w-full max-w-[400px]">
            <div className="flex justify-between items-center mb-2">
               <h4 className="text-khaki font-serif text-sm">GeoJSON Generado</h4>
               <button 
                 onClick={() => {
                   const fc = { type: 'FeatureCollection', features: Object.values(drawnFeatures) };
                   navigator.clipboard.writeText(JSON.stringify(fc, null, 2));
                   alert('GeoJSON copiado');
                 }}
                 className="bg-warm-white text-gunmetal px-2 py-1 text-xs font-bold uppercase tracking-wider hover:bg-silver-sand transition-colors rounded"
               >
                 Copiar
               </button>
            </div>
            <textarea
               readOnly
               value={JSON.stringify({ type: 'FeatureCollection', features: Object.values(drawnFeatures) }, null, 2)}
               className="w-full h-32 bg-black/50 text-[#4ade80] font-mono text-[10px] p-2 rounded-lg focus:outline-none border border-silver-sand/10 resize-none"
            />
          </div>
        )}
      </div>

      {/* Inyectamos CSS global para forzar que el popup NUNCA robe el clic del mouse */}
      <style dangerouslySetInnerHTML={{__html: `
        .maplibregl-popup, .mapboxgl-popup {
          pointer-events: none !important;
        }
      `}} />
      
      <Map
        initialViewState={{
          longitude: projectSlug === 'el-quelele' ? -110.5185 : projectSlug === 'quintaesencia' ? -110.517 : -110.7059,
          latitude: projectSlug === 'el-quelele' ? 24.1975 : projectSlug === 'quintaesencia' ? 24.179 : 23.8060,
          zoom: projectSlug === 'el-quelele' ? 16 : projectSlug === 'quintaesencia' ? 14 : 14,
          pitch: 0, // Vista 2D
          bearing: 0 // Vista norte arriba
        }}
        mapStyle={{
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256,
              attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 20
            }
          ]
        }}
        interactiveLayerIds={['lot-hit']}
        onMouseMove={onHover}
        onClick={onClick}
        onMouseLeave={() => {
          if (isEditMode) return;
          clearShow();
          clearHide();
          hoveredIdRef.current = null;
          setHoveredFeature(null);
          setHoverLngLat(null);
        }}
        cursor={hoveredFeature ? 'pointer' : 'grab'}
      >
        <FullscreenControl position="bottom-right" />
        
        {isEditMode && editTarget === 'lotes' && (
          <DrawControl
            position="top-right"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true
            }}
            drawMode={editorMode}
            onModeChange={(m) => {
               if (m === 'draw_polygon' || m === 'simple_select') {
                 setEditorMode(m);
               }
            }}
            initialFeatures={{ type: 'FeatureCollection', features: Object.values(drawnFeatures) } as any}
            onCreate={onUpdateDraw}
            onUpdate={onUpdateDraw}
            onDelete={onDeleteDraw}
          />
        )}
        {projectSlug === 'dunah' && (
          <>
            <Source 
              id="dunah-image-source" 
              type="image" 
              url="/DUNAH.jpg" 
              coordinates={dunahImgCoords}
            >
              <Layer
                id="dunah-image-layer"
                type="raster"
                paint={{
                  'raster-opacity': 1,
                  'raster-fade-duration': 0
                }}
              />
            </Source>
            <Source id="dunah-kml-source" type="geojson" data={dunahKmlGeoJson as any}>
              <Layer
                id="dunah-kml-line"
                type="line"
                paint={{
                  'line-color': '#22c55e',
                  'line-width': 2,
                  'line-dasharray': [2, 2]
                }}
              />
              <Layer
                id="dunah-kml-fill"
                type="fill"
                paint={{
                  'fill-color': '#22c55e',
                  'fill-opacity': 0
                }}
              />
            </Source>
            {isEditMode && editTarget === 'imagen' && dunahImgCoords.map((coord, index) => (
              <Marker
                key={`corner-${index}`}
                longitude={coord[0]}
                latitude={coord[1]}
                draggable
                onDrag={(e) => {
                  const newCoords = [...dunahImgCoords] as [[number, number], [number, number], [number, number], [number, number]];
                  newCoords[index] = [e.lngLat.lng, e.lngLat.lat];
                  setDunahImgCoords(newCoords);
                }}
                color={['#ff0000', '#00ff00', '#0000ff', '#eab308'][index]}
              />
            ))}
          </>
        )}
        
        {projectSlug === 'el-quelele' && (
          <Source id="quelele-kml-source" type="geojson" data={queleleKmlGeoJson as any}>
            <Layer
              id="quelele-kml-line"
              type="line"
              paint={{
                'line-color': '#22c55e',
                'line-width': 2,
                'line-dasharray': [2, 2]
              }}
            />
            <Layer
              id="quelele-kml-fill"
              type="fill"
              paint={{
                'fill-color': '#22c55e',
                'fill-opacity': 0.1
              }}
            />
          </Source>
        )}
        
        {projectSlug === 'quintaesencia' && (
          <Source id="quintaesencia-kml-source" type="geojson" data={quintaesenciaKmlGeoJson as any}>
            <Layer
              id="quintaesencia-kml-line"
              type="line"
              paint={{
                'line-color': '#22c55e',
                'line-width': 2,
                'line-dasharray': [2, 2]
              }}
            />
            <Layer
              id="quintaesencia-kml-fill"
              type="fill"
              paint={{
                'fill-color': '#22c55e',
                'fill-opacity': 0.1
              }}
            />
          </Source>
        )}

        {!isEditMode && (
          <Source type="geojson" data={{ type: 'FeatureCollection', features: Object.values(drawnFeatures) } as any}>
            {/* 1. Capa base de relleno con baja opacidad */}
            <Layer {...baseFillLayer} />

            {/* 2. Capa base de bordes */}
            <Layer {...borderLayer} />

            {/* 3. Highlight al hacer hover */}
            <Layer {...hoverHighlightLayer} filter={hoverFilter} />

            {/* 4. Relleno verde para el lote seleccionado */}
            <Layer {...selectedFillLayer} filter={filterSelect} />

            {/* 5. Borde dorado para el lote seleccionado */}
            <Layer {...selectedBorderLayer} filter={filterSelect} />

            {/* 6. Capa INVISIBLE encima de todo — única fuente de eventos de mouse */}
            <Layer {...hitTestLayer} />
          </Source>
        )}

        {/* Renderizado del Popup de Hover */}
        {hoveredFeature && hoveredFeature.properties && hoverLngLat && (
          <LotTooltip 
            properties={hoveredFeature.properties as LotProperties}
            longitude={hoverLngLat[0]}
            latitude={hoverLngLat[1]}
          />
        )}
      </Map>

      {/* Panel Lateral Flotante para Detalles del Lote Seleccionado */}
      {!hideSidebar && selectedLot && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/50 w-[320px] z-10 transition-all animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{selectedLot.name}</h2>
            <button 
              onClick={() => {
                setSelectedLot(null);
                if (onSelectLot) onSelectLot(null);
              }} 
              className="text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-bold"
              aria-label="Cerrar detalles"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="font-semibold text-gray-500">Estado</span> 
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                selectedLot.status === 'available' ? 'bg-green-100 text-green-800' :
                selectedLot.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedLot.status === 'available' ? 'Disponible' : selectedLot.status === 'reserved' ? 'Apartado' : 'Vendido'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="font-semibold text-gray-500">Área</span> 
              <span className="font-bold text-gray-900 text-base">{selectedLot.area}</span>
            </div>
            {selectedLot.price && (
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-500">Precio</span> 
                <span className="font-bold text-gray-900 text-base">{selectedLot.price}</span>
              </div>
            )}
            {selectedLot.description && (
              <div className="pt-2">
                <span className="font-semibold text-gray-500 block mb-1.5">Descripción</span>
                <p className="text-gray-600 text-sm leading-relaxed">{selectedLot.description}</p>
              </div>
            )}
          </div>
          
          <button className="w-full mt-6 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            Me interesa
          </button>
        </div>
      )}
    </div>
  );
}
