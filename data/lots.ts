import { LotFeatureCollection } from '@/components/maps/mapTypes';

export const lotsData: LotFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'lote-A1-zona-1',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3130, 24.1426],
            [-110.3129, 24.1426],
            [-110.3129, 24.1429],
            [-110.3130, 24.1429],
            [-110.3130, 24.1426]
          ]
        ]
      },
      properties: {
        id: 'lote-A1-zona-1',
        name: 'Zona 1 - Lote A1',
        status: 'available',
        area: '165 m²',
        price: '$35,000',
        description: 'Subdivisión oeste del Lote A1.',
        parentLotId: 'lote-A1',
        groupId: 'grupo-norte',
        blockId: 'manzana-a',
        phaseId: 'fase-1',
        zoneType: 'sub-zone'
      }
    },
    {
      type: 'Feature',
      id: 'lote-A1-zona-2',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-110.3129, 24.1426],
            [-110.3128, 24.1426],
            [-110.3128, 24.1429],
            [-110.3129, 24.1429],
            [-110.3129, 24.1426]
          ]
        ]
      },
      properties: {
        id: 'lote-A1-zona-2',
        name: 'Zona 2 - Lote A1',
        status: 'available',
        area: '165 m²',
        price: '$35,000',
        description: 'Subdivisión este del Lote A1.',
        parentLotId: 'lote-A1',
        groupId: 'grupo-norte',
        blockId: 'manzana-a',
        phaseId: 'fase-1',
        zoneType: 'sub-zone'
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
        groupId: 'grupo-norte',
        blockId: 'manzana-a',
        phaseId: 'fase-1',
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
        groupId: 'grupo-norte',
        blockId: 'manzana-a',
        phaseId: 'fase-1',
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
        groupId: 'grupo-sur',
        blockId: 'manzana-b',
        phaseId: 'fase-1',
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
        groupId: 'grupo-sur',
        blockId: 'manzana-b',
        phaseId: 'fase-1',
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
        groupId: 'grupo-sur',
        blockId: 'manzana-b',
        phaseId: 'fase-1',
        zoneType: 'main-lot'
      }
    }
  ]
};
