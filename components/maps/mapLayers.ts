import type { FillLayer, LineLayer } from 'react-map-gl/maplibre';

// Colores según estado del lote
const statusColors = {
  available: '#4ade80', // verde suave
  occupied: '#f87171',  // rojo suave
};

// Capa base de relleno para los polígonos
export const baseFillLayer: FillLayer = {
  id: 'lot-base-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      statusColors.occupied
    ],
    'fill-opacity': 0.4
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

// Capa de highlight dinámico basada en filtros
export const hoverHighlightLayer: FillLayer = {
  id: 'lot-hover-highlight',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      statusColors.occupied
    ],
    'fill-opacity': 0.9 // Más opaco al hacer hover para resaltar
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
