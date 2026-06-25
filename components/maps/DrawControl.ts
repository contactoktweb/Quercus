import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl/maplibre';
import { useEffect } from 'react';

const blue = '#3bb2d0';
const orange = '#fbb03b';
const white = '#fff';

const patchedTheme = [
  {
    'id': 'gl-draw-polygon-fill',
    'type': 'fill',
    'filter': ['all', ['==', '$type', 'Polygon']],
    'paint': {
      'fill-color': ['case', ['==', ['get', 'active'], 'true'], orange, blue],
      'fill-opacity': 0.1,
    },
  },
  {
    'id': 'gl-draw-lines',
    'type': 'line',
    'filter': ['any', ['==', '$type', 'LineString'], ['==', '$type', 'Polygon']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round',
    },
    'paint': {
      'line-color': ['case', ['==', ['get', 'active'], 'true'], orange, blue],
      'line-dasharray': [
        'case',
        ['==', ['get', 'active'], 'true'],
        ['literal', [0.2, 2]],
        ['literal', [2, 0]],
      ],
      'line-width': 2,
    },
  },
  {
    'id': 'gl-draw-point-outer',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature']],
    'paint': {
      'circle-radius': ['case', ['==', ['get', 'active'], 'true'], 7, 5],
      'circle-color': white,
    },
  },
  {
    'id': 'gl-draw-point-inner',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature']],
    'paint': {
      'circle-radius': ['case', ['==', ['get', 'active'], 'true'], 5, 3],
      'circle-color': ['case', ['==', ['get', 'active'], 'true'], orange, blue],
    },
  },
  {
    'id': 'gl-draw-vertex-outer',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'vertex'], ['!=', 'mode', 'simple_select']],
    'paint': {
      'circle-radius': ['case', ['==', ['get', 'active'], 'true'], 7, 5],
      'circle-color': white,
    },
  },
  {
    'id': 'gl-draw-vertex-inner',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'vertex'], ['!=', 'mode', 'simple_select']],
    'paint': {
      'circle-radius': ['case', ['==', ['get', 'active'], 'true'], 5, 3],
      'circle-color': orange,
    },
  },
  {
    'id': 'gl-draw-midpoint',
    'type': 'circle',
    'filter': ['all', ['==', 'meta', 'midpoint']],
    'paint': {
      'circle-radius': 3,
      'circle-color': orange,
    },
  },
];

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  drawMode?: 'draw_polygon' | 'simple_select' | 'splitPolygonMode';
  initialFeatures?: any;

  onCreate?: (evt: { features: GeoJSON.Feature[] }) => void;
  onUpdate?: (evt: { features: GeoJSON.Feature[]; action: string }) => void;
  onDelete?: (evt: { features: GeoJSON.Feature[] }) => void;
  onModeChange?: (mode: string) => void;
};

export default function DrawControl(props: DrawControlProps) {
  const draw = useControl<any>(
    () => new MapboxDraw({ 
      ...props, 
      styles: patchedTheme
    }),
    ({ map }) => {
      let clickCount = 0;

      const handleCreate = (e: any) => {
        if (props.onCreate) props.onCreate(e);
        // Start next polygon automatically ONLY if we are in draw mode
        if (props.drawMode === 'draw_polygon' || !props.drawMode) {
          setTimeout(() => {
            try {
              draw.changeMode('draw_polygon');
            } catch (err) {}
          }, 100);
        }
      };

      const handleModeChange = (e: any) => {
        if (e.mode === 'draw_polygon') {
          clickCount = 0;
        }
        if (props.onModeChange) {
          props.onModeChange(e.mode);
        }
      };

      const handleMapClick = () => {
        try {
          if (draw.getMode() === 'draw_polygon') {
            clickCount++;
            if (clickCount === 4) {
              setTimeout(() => {
                draw.changeMode('simple_select');
              }, 50);
            }
          }
        } catch (err) {}
      };

      map.on('draw.create', handleCreate);
      map.on('draw.modechange', handleModeChange);
      map.on('click', handleMapClick);
      map.on('draw.update', props.onUpdate!);
      map.on('draw.delete', props.onDelete!);

      const handleTrashEvent = () => {
        try {
          draw.trash();
        } catch (e) {}
      };
      window.addEventListener('draw-trash', handleTrashEvent);

      (draw as any)._customHandlers = { handleCreate, handleModeChange, handleMapClick, handleTrashEvent };

      // Load initial features if provided
      if (props.initialFeatures && props.initialFeatures.features) {
        draw.add(props.initialFeatures);
        // Report back the loaded features
        if (props.onCreate) {
           props.onCreate({ features: props.initialFeatures.features });
        }
      }
    },
    ({ map }) => {
      const { handleCreate, handleModeChange, handleMapClick, handleTrashEvent } = (draw as any)._customHandlers || {};
      if (handleCreate) map.off('draw.create', handleCreate);
      if (handleModeChange) map.off('draw.modechange', handleModeChange);
      if (handleMapClick) map.off('click', handleMapClick);
      if (handleTrashEvent) window.removeEventListener('draw-trash', handleTrashEvent);
      
      map.off('draw.update', props.onUpdate!);
      map.off('draw.delete', props.onDelete!);
    },
    {
      position: props.position || 'top-right'
    }
  );

  // Sync drawMode prop to MapboxDraw
  useEffect(() => {
    if (draw && props.drawMode) {
      try {
        if (draw.getMode() !== props.drawMode) {
          draw.changeMode(props.drawMode);
        }
      } catch (err) {}
    }
  }, [props.drawMode, draw]);

  return null;
}
