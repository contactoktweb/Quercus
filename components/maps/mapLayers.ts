import type { FillLayer, LineLayer } from 'react-map-gl/maplibre';

// Colores según estado del lote
const statusColors = {
  available: '#4ade80', // verde suave
  occupied: '#f87171',  // rojo suave
};

// Capa base de relleno para los polígonos
export const lotFillLayer: FillLayer = {
  id: 'lot-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'status'], 'available'], statusColors.available,
      statusColors.occupied // Cualquier otro estado (vendido, reservado, en proceso) se pinta rojo
    ],
    'fill-opacity': 0.6
  }
};

// Capa base de borde para los polígonos
export const lotLineLayer: LineLayer = {
  id: 'lot-line',
  type: 'line',
  paint: {
    'line-color': 'rgba(255, 255, 255, 0.6)', // Bordes claros para delimitar bien las zonas
    'line-width': 2
  }
};
