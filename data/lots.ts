import { LotFeatureCollection } from '@/components/maps/mapTypes';

// Coordenadas de prueba en Baja California Sur (zona DUNAH aprox)
export const lotsData: LotFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'lote-A1',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3130, 24.1426],
            [-110.3128, 24.1426],
            [-110.3128, 24.1429],
            [-110.3130, 24.1429],
            [-110.3130, 24.1426]
          ]
        ]
      },
      properties: {
        id: 'lote-A1',
        name: 'Lote A-1',
        status: 'available',
        area: '330 m²',
        price: '$65,000',
        description: 'Lote premium con vista al mar y fácil acceso a amenidades principales.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    },
    {
      type: 'Feature',
      id: 'lote-A2',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3128, 24.1426],
            [-110.3126, 24.1426],
            [-110.3126, 24.1429],
            [-110.3128, 24.1429],
            [-110.3128, 24.1426]
          ]
        ]
      },
      properties: {
        id: 'lote-A2',
        name: 'Lote A-2',
        status: 'occupied',
        area: '330 m²',
        price: '$65,000',
        description: 'Vendido. Lote central.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    },
    {
      type: 'Feature',
      id: 'lote-A3',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3126, 24.1426],
            [-110.3124, 24.1426],
            [-110.3124, 24.1429],
            [-110.3126, 24.1429],
            [-110.3126, 24.1426]
          ]
        ]
      },
      properties: {
        id: 'lote-A3',
        name: 'Lote A-3',
        status: 'occupied',
        area: '330 m²',
        price: '$65,000',
        description: 'Lote reservado, en proceso de documentación.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    },
    {
      type: 'Feature',
      id: 'lote-B1',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3130, 24.1422],
            [-110.3128, 24.1422],
            [-110.3128, 24.1425],
            [-110.3130, 24.1425],
            [-110.3130, 24.1422]
          ]
        ]
      },
      properties: {
        id: 'lote-B1',
        name: 'Lote B-1',
        status: 'occupied',
        area: '330 m²',
        price: '$60,000',
        description: 'Trámite notarial en curso. Excelente ubicación sur.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    },
    {
      type: 'Feature',
      id: 'lote-B2',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3128, 24.1422],
            [-110.3126, 24.1422],
            [-110.3126, 24.1425],
            [-110.3128, 24.1425],
            [-110.3128, 24.1422]
          ]
        ]
      },
      properties: {
        id: 'lote-B2',
        name: 'Lote B-2',
        status: 'available',
        area: '330 m²',
        price: '$60,000',
        description: 'Lote disponible. Acceso rápido a zona social.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    },
    {
      type: 'Feature',
      id: 'lote-B3',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3126, 24.1422],
            [-110.3124, 24.1422],
            [-110.3124, 24.1425],
            [-110.3126, 24.1425],
            [-110.3126, 24.1422]
          ]
        ]
      },
      properties: {
        id: 'lote-B3',
        name: 'Lote B-3',
        status: 'available',
        area: '330 m²',
        price: '$62,000',
        description: 'Lote esquinero con extra jardín trasero.',
        parentLotId: null,
        zoneType: 'main-lot'
      }
    }
  ]
};
