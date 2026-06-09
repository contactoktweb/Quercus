import { Popup } from 'react-map-gl/maplibre';
import { LotProperties } from './mapTypes';

interface Props {
  properties: LotProperties;
  longitude: number;
  latitude: number;
  onClose?: () => void;
  closeButton?: boolean;
}

export function LotTooltip({ properties, longitude, latitude, onClose, closeButton = false }: Props) {
  // Simplificamos a 2 estados: Disponible (Verde) y Ocupado (Rojo)
  const isAvailable = properties.status === 'available';
  const statusBadgeColor = isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const statusLabel = isAvailable ? 'Disponible' : 'Ocupado';

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      closeButton={closeButton}
      closeOnClick={false}
      onClose={onClose}
      anchor="bottom"
      offset={15}
      className="z-50"
      maxWidth="250px"
    >
      <div className="p-1 font-sans">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-gray-900 text-base m-0 leading-none">{properties.name}</h3>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${statusBadgeColor}`}>
            {statusLabel}
          </span>
        </div>
        
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <p className="m-0"><span className="font-semibold text-gray-500">Área:</span> {properties.area}</p>
          {properties.price && (
            <p className="m-0"><span className="font-semibold text-gray-500">Precio:</span> {properties.price}</p>
          )}
        </div>
        
        {properties.description && (
          <p className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-2 m-0">
            {properties.description}
          </p>
        )}
      </div>
    </Popup>
  );
}
