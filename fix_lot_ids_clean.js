const fs = require('fs');

const lotsFile = 'data/lots.ts';
let content = fs.readFileSync(lotsFile, 'utf8');

let jsonStr = content.replace("import { LotFeatureCollection } from '@/components/maps/mapTypes';", "")
                   .replace("export const lotsData: LotFeatureCollection = ", "")
                   .replace(" as unknown as LotFeatureCollection;", "")
                   .replace(";", "")
                   .trim();

try {
  let lotsData = JSON.parse(jsonStr);
  
  lotsData.features.forEach((feature, index) => {
    const cleanId = `M-${index + 1}`;
    feature.id = cleanId;
    if (feature.properties) {
      feature.properties.id = cleanId;
      feature.properties.name = `Macrolote ${cleanId}`;
    }
  });
  
  const newContent = "import { LotFeatureCollection } from '@/components/maps/mapTypes';\n\nexport const lotsData: LotFeatureCollection = " + JSON.stringify(lotsData, null, 2) + " as unknown as LotFeatureCollection;\n";
  
  fs.writeFileSync(lotsFile, newContent);
  console.log("Success! Cleaned lot IDs.");
} catch(e) {
  console.error("Error parsing/writing:", e);
}
