import { readFileSync, writeFileSync } from 'fs';
import { kml } from '@tmcw/togeojson';
import { DOMParser } from '@xmldom/xmldom';

const kmlContent = readFileSync('public/quercus.kml', 'utf-8');
const kmlDoc = new DOMParser().parseFromString(kmlContent, 'text/xml');
const geoJson = kml(kmlDoc);

const output = `export const quercusKmlGeoJson = ${JSON.stringify(geoJson, null, 2)};`;
writeFileSync('components/maps/quercusKml.ts', output);
console.log('Conversion successful!');
