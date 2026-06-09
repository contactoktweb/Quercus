'use client';

import { useState, useMemo, useCallback } from 'react';
import Map, { Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { lotFillLayer, lotLineLayer } from './mapLayers';
import { lotsData } from '@/data/lots';
import { LotProperties } from './mapTypes';
import { LotTooltip } from './LotTooltip';

export interface LotsMapProps {
  onSelectLot?: (lot: LotProperties | null) => void;
  className?: string;
  hideSidebar?: boolean;
}

export default function LotsMap({ onSelectLot, className, hideSidebar = false }: LotsMapProps = {}) {
  const [hoverInfo, setHoverInfo] = useState<{
    feature: GeoJSON.Feature;
    lngLat: [number, number];
  } | null>(null);
  
  const [selectedLot, setSelectedLot] = useState<LotProperties | null>(null);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const { features, lngLat } = event;
    const hoveredFeature = features && features[0];

    if (hoveredFeature && hoveredFeature.properties) {
      setHoverInfo({
        feature: hoveredFeature,
        lngLat: [lngLat.lng, lngLat.lat]
      });
    } else {
      setHoverInfo(null);
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

  // Extraemos el ID para los filtros de las capas dinámicas
  const selectedLotId = selectedLot?.id || '';
  const hoveredLotId = hoverInfo?.feature?.properties?.id || hoverInfo?.feature?.id || '';

  // Filtros para las capas interactivas (hover y selección) usando el id de las properties
  const filterHover = useMemo(() => ['in', 'id', hoveredLotId], [hoveredLotId]);
  const filterSelect = useMemo(() => ['in', 'id', selectedLotId], [selectedLotId]);

  return (
    <div className={className || "w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative bg-gray-50"}>
      <Map
        initialViewState={{
          longitude: -110.3127,
          latitude: 24.1425,
          zoom: 18,
          pitch: 45, // Ángulo más inmersivo
          bearing: -15 // Ligera rotación
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" // Estilo oscuro que encaja perfecto con MASTER PLAN
        interactiveLayerIds={['lot-fill']} // Definimos qué capa reacciona a los eventos del mouse
        onMouseMove={onHover}
        onClick={onClick}
        onMouseLeave={() => setHoverInfo(null)}
        cursor={hoverInfo ? 'pointer' : 'grab'}
      >
        <Source type="geojson" data={lotsData}>
          {/* 1. Capa base de relleno coloreada por estado */}
          <Layer {...lotFillLayer} />
          
          {/* 2. Capa base de bordes */}
          <Layer {...lotLineLayer} />
          
          {/* 3. Capa extra para Hover (Aumenta el brillo del polígono) */}
          <Layer 
            id="lot-hover-fill"
            type="fill"
            paint={{
              'fill-color': '#ffffff',
              'fill-opacity': 0.3
            }}
            filter={filterHover}
          />
          
          {/* 4. Capa extra para Selección (Borde más grueso y color Khaki/Dorado) */}
          <Layer 
            id="lot-selected-line"
            type="line"
            paint={{
              'line-color': '#c2a67e', // Color Khaki del proyecto
              'line-width': 4
            }}
            filter={filterSelect}
          />
        </Source>

        {/* Renderizado del Popup de Hover */}
        {hoverInfo && hoverInfo.feature.properties && (
          <LotTooltip 
            properties={hoverInfo.feature.properties as LotProperties}
            longitude={hoverInfo.lngLat[0]}
            latitude={hoverInfo.lngLat[1]}
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
