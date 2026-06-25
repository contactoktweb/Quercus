const fs = require('fs');

const lotsFile = 'data/lots.ts';
let content = fs.readFileSync(lotsFile, 'utf8');

// The user's new features
const userFeatures = [
    {
      "type": "Feature",
      "properties": {
        "id": "lote-19",
        "name": "Macrolote M-19",
        "status": "reserved",
        "area": "~53,789.41 m²",
        "price": "Consultar",
        "description": "Macrolote M-19 del proyecto DUNAH.",
        "parentLotId": null,
        "groupId": "dunah",
        "blockId": "manzana-a",
        "phaseId": "fase-1",
        "zoneType": "main-lot"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -110.71145550908,
              23.804586055527764
            ],
            [
              -110.7098615500924,
              23.802802511202216
            ],
            [
              -110.70773092062313,
              23.80439646769496
            ],
            [
              -110.7093248902151,
              23.806180029310273
            ],
            [
              -110.71145550908,
              23.804586055527764
            ]
          ]
        ]
      }
    },
    {
      "id": "clQtcUUE5C9wYSRee8FzJObejeH6sVmB",
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              -110.71190731253847,
              23.807087591000638
            ],
            [
              -110.71121219796575,
              23.80626991644813
            ],
            [
              -110.70508856958564,
              23.810691354528288
            ],
            [
              -110.70601538901637,
              23.811690699809134
            ],
            [
              -110.71190731253847,
              23.807087591000638
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
];

let jsonStr = content.replace("import { LotFeatureCollection } from '@/components/maps/mapTypes';", "")
                   .replace("export const lotsData: LotFeatureCollection = ", "")
                   .replace(" as unknown as LotFeatureCollection;", "")
                   .replace(";", "")
                   .trim();

try {
  let lotsData = JSON.parse(jsonStr);
  
  // Merge user features
  for (const newF of userFeatures) {
    const idToMatch = newF.id || (newF.properties && newF.properties.id);
    const existingIndex = lotsData.features.findIndex(f => {
      const fId = f.id || (f.properties && f.properties.id);
      return fId === idToMatch;
    });
    
    if (existingIndex !== -1) {
      lotsData.features[existingIndex] = newF;
    } else {
      lotsData.features.push(newF);
    }
  }
  
  const newContent = "import { LotFeatureCollection } from '@/components/maps/mapTypes';\n\nexport const lotsData: LotFeatureCollection = " + JSON.stringify(lotsData, null, 2) + " as unknown as LotFeatureCollection;\n";
  
  fs.writeFileSync(lotsFile, newContent);
  console.log("Success!");
} catch(e) {
  console.error("Error parsing/writing:", e);
}
