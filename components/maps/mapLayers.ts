import type { FillLayer, LineLayer } from 'react-map-gl/maplibre';

// Colores según estado del lote
const statusColors = {
  available: '#4ade80', // verde suave
  occupied: '#f87171',  // rojo suave
  reserved: '#facc15',  // amarillo suave
};

// Capa base de relleno para los polígonos
export const baseFillLayer: FillLayer = {
  id: 'lot-base-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      ['==', ['get', 'status'], 'reserved'], statusColors.reserved,
      statusColors.occupied
    ],
    'fill-opacity': 0
  }
};

// Capa base de borde para los polígonos
export const borderLayer: LineLayer = {
  id: 'lot-border',
  type: 'line',
  paint: {
    'line-color': 'rgba(255, 255, 255, 0.6)',
    'line-width': 1
  }
};

// Capa INVISIBLE de hit-test — cubre el 100% de cada lote sin huecos para hover y clic
export const hitTestLayer: FillLayer = {
  id: 'lot-hit',
  type: 'fill',
  paint: {
    'fill-color': 'transparent',
    'fill-opacity': 0
  }
};

// Capa de highlight dinámico basada en filtros
export const hoverHighlightLayer: FillLayer = {
  id: 'lot-hover-highlight',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      ['==', ['get', 'status'], 'reserved'], statusColors.reserved,
      statusColors.occupied
    ],
    'fill-opacity': 0.3 // Hover muy tenue
  }
};

// Capa de relleno para el lote seleccionado
export const selectedFillLayer: FillLayer = {
  id: 'lot-selected-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      ['==', ['get', 'status'], 'reserved'], statusColors.reserved,
      statusColors.occupied
    ],
    'fill-opacity': 0.8
  }
};

// Capa para el borde del elemento seleccionado
export const selectedBorderLayer: LineLayer = {
  id: 'lot-selected-border',
  type: 'line',
  paint: {
    'line-color': '#c2a67e', // Color dorado/khaki
    'line-width': 3
  }
};
