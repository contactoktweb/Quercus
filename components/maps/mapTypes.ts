export type LotStatus = 'available' | 'occupied';
export type ZoneType = 'main-lot' | 'sub-zone';

export interface LotProperties {
  id: string;
  name: string;
  status: LotStatus;
  area: string;
  price?: string;
  description?: string;
  parentLotId?: string | null;
  groupId?: string | null;
  blockId?: string | null;
  phaseId?: string | null;
  zoneType: ZoneType;
}

// Interfaz para definir el GeoJSON específico de nuestros lotes
export interface LotFeature {
  type: 'Feature';
  id?: string | number; // Mapbox requiere id numérico o string en la raíz de Feature a veces para el hover/selected, lo usaremos a través del promoteId si es necesario, o lo metemos aquí.
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: LotProperties;
}

export interface LotFeatureCollection {
  type: 'FeatureCollection';
  features: LotFeature[];
}
