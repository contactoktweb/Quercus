'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import Map, { Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { baseFillLayer, borderLayer, hoverHighlightLayer, selectedBorderLayer, hitTestLayer } from './mapLayers';
import { lotsData } from '@/data/lots';
import { LotProperties } from './mapTypes';
import { LotTooltip } from './LotTooltip';

export interface LotsMapProps {
  onSelectLot?: (lot: LotProperties | null) => void;
  className?: string;
  hideSidebar?: boolean;
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

export default function LotsMap({ onSelectLot, className, hideSidebar = false }: LotsMapProps = {}) {
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSON.Feature | null>(null);
  const [hoverLngLat, setHoverLngLat] = useState<[number, number] | null>(null);
  const hoveredIdRef   = useRef<string | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedLot, setSelectedLot] = useState<LotProperties | null>(null);

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
  }, [onSelectLot]);

  // Filtros dinámicos para Hover (Highlight By Filter)
  const hoverFilter = useMemo(() => {
    if (!hoveredFeature) return ['in', 'id', '']; // No mostrar nada si no hay hover

    // Solo resaltamos el lote individual sobre el que estamos parados
    const properties = hoveredFeature.properties as LotProperties | null;
    if (!properties) return ['in', 'id', ''];

    return ['in', 'id', properties.id];
  }, [hoveredFeature]);

  // Filtro para el elemento seleccionado (usamos el id único)
  const selectedLotId = selectedLot?.id || '';
  const filterSelect = useMemo(() => ['in', 'id', selectedLotId], [selectedLotId]);

  return (
    <div className={className || "w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative bg-gray-50"}>
      {/* Inyectamos CSS global para forzar que el popup NUNCA robe el clic del mouse */}
      <style dangerouslySetInnerHTML={{__html: `
        .maplibregl-popup, .mapboxgl-popup {
          pointer-events: none !important;
        }
      `}} />
      
      <Map
        initialViewState={{
          longitude: -110.7059, // Coordenada central del nuevo polígono
          latitude: 23.8060,
          zoom: 14,
          pitch: 0, // Vista 2D
          bearing: 0 // Vista norte arriba
        }}
        mapStyle={{
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
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
          clearShow();
          clearHide();
          hoveredIdRef.current = null;
          setHoveredFeature(null);
          setHoverLngLat(null);
        }}
        cursor={hoveredFeature ? 'pointer' : 'grab'}
      >
        <Source type="geojson" data={lotsData}>
          {/* 1. Capa base de relleno con baja opacidad */}
          <Layer {...baseFillLayer} />

          {/* 2. Capa base de bordes */}
          <Layer {...borderLayer} />

          {/* 3. Highlight al hacer hover */}
          <Layer {...hoverHighlightLayer} filter={hoverFilter} />

          {/* 4. Borde dorado para el lote seleccionado */}
          <Layer {...selectedBorderLayer} filter={filterSelect} />

          {/* 5. Capa INVISIBLE encima de todo — única fuente de eventos de mouse */}
          <Layer {...hitTestLayer} />
        </Source>

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
                selectedLot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedLot.status === 'available' ? 'Disponible' : 'Ocupado'}
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
