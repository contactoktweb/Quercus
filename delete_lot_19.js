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
  
  // Filter out lote-19
  lotsData.features = lotsData.features.filter(f => {
    const id = f.id || (f.properties && f.properties.id);
    if (id === 'lote-19') {
      return false; // delete it
    }
    return true; // keep it
  });
  
  const newContent = "import { LotFeatureCollection } from '@/components/maps/mapTypes';\n\nexport const lotsData: LotFeatureCollection = " + JSON.stringify(lotsData, null, 2) + " as unknown as LotFeatureCollection;\n";
  
  fs.writeFileSync(lotsFile, newContent);
  console.log("Success! Deleted lote-19.");
} catch(e) {
  console.error("Error parsing/writing:", e);
}
