'use client';

import { useState, useMemo, useCallback } from 'react';
import Map, { Source, Layer, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { baseFillLayer, borderLayer, hoverHighlightLayer, selectedBorderLayer } from './mapLayers';
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

  // Filtros dinámicos para Hover (Highlight By Filter)
  const hoverFilter = useMemo(() => {
    if (!hoverInfo) return ['in', 'id', '']; // No mostrar nada si no hay hover

    const filterCriteria = getHighlightFilter(hoverInfo.feature);
    if (!filterCriteria) return ['in', 'id', ''];

    return ['in', filterCriteria.key, filterCriteria.value];
  }, [hoverInfo]);

  // Filtro para el elemento seleccionado (usamos el id único)
  const selectedLotId = selectedLot?.id || '';
  const filterSelect = useMemo(() => ['in', 'id', selectedLotId], [selectedLotId]);

  return (
    <div className={className || "w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative bg-gray-50"}>
      <Map
        initialViewState={{
          longitude: -109.9728, // Zona rural (El Sargento / La Ventana)
          latitude: 24.0926,
          zoom: 18,
          pitch: 0,
          bearing: 0
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // Estilo claro (blanco)
        interactiveLayerIds={['lot-base-fill', 'lot-hover-highlight', 'lot-selected-border']} // Definimos qué capas reaccionan a los eventos del mouse
        onMouseMove={onHover}
        onClick={onClick}
        onMouseLeave={() => setHoverInfo(null)}
        cursor={hoverInfo ? 'pointer' : 'grab'}
      >
        <Source type="geojson" data={lotsData}>
          {/* 1. Capa base de relleno con baja opacidad */}
          <Layer {...baseFillLayer} />
          
          {/* 2. Capa base de bordes */}
          <Layer {...borderLayer} />
          
          {/* 3. Capa de highlight dinámico basada en filtros */}
          <Layer {...hoverHighlightLayer} filter={hoverFilter} />
          
          {/* 4. Capa extra para Selección (Borde más grueso y color Khaki/Dorado) */}
          <Layer {...selectedBorderLayer} filter={filterSelect} />
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
