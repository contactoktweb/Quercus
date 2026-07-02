import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { lotsData as mapboxLots } from '../data/lots'
import { lotsData as imageLots } from '../lib/projects-data'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadEnv() {
  try {
    const env = readFileSync(path.join(__dirname, '../.env.local'), 'utf-8')
    for (const line of env.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let value = trimmed.slice(eqIdx + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  } catch (e) {}
}
loadEnv()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seedRealLots() {
  console.log('🔄 Borrando lotes actuales de Sanity...')
  
  const existingLots = await client.fetch('*[_type == "projectLot"]{ _id }')
  for (const lot of existingLots) {
    await client.delete(lot._id)
  }
  console.log(`✅ ${existingLots.length} lotes borrados.`)

  console.log('🗺️  Subiendo lotes de Dunah y Quelele (desde data/lots.ts)...')
  let countMapbox = 0
  
  if (mapboxLots && mapboxLots.features) {
    for (const feature of mapboxLots.features) {
      const props = feature.properties
      if (!props) continue
      
      const sanityLot = {
        _type: 'projectLot',
        lotId: props.id || props.name || `LOT-${countMapbox}`,
        project: {
          _type: 'reference',
          _ref: `project-${props.groupId}`
        },
        geoJsonFeature: JSON.stringify(feature),
        status: props.status || 'available',
        area: props.area || 'Consultar',
        price: props.price || 'Consultar',
        zone: props.zoneType === 'main-lot' ? 'Lote Principal' : 'Sub Zona',
        view: props.description || 'Vista al desarrollo',
      }
      await client.create(sanityLot)
      countMapbox++
    }
  }
  
  console.log(`✅ ${countMapbox} lotes subidos para Dunah y Quelele.`)

  console.log('🖼️  Subiendo lotes de Quintaesencia (desde lib/projects-data.ts)...')
  let countImage = 0
  
  // Filter only Quintaesencia lots from lib/projects-data.ts
  const quintaLots = imageLots.filter((l: any) => l.projectSlug === 'quintaesencia')
  
  for (const lot of quintaLots) {
    const featureObj = {
      type: "Feature",
      shape: lot.shape || 'circle',
      coordinates: lot.coordinates,
      properties: {
        id: lot.id,
        status: lot.status,
        area: lot.area,
        price: lot.price,
        zone: lot.zone,
        view: lot.view
      }
    }

    const sanityLot = {
      _type: 'projectLot',
      lotId: lot.id,
      project: {
        _type: 'reference',
        _ref: `project-${lot.projectSlug}`
      },
      geoJsonFeature: JSON.stringify(featureObj),
      status: lot.status || 'available',
      area: lot.area || 'Consultar',
      price: lot.price || 'Consultar',
      zone: lot.zone || 'Lote Principal',
      view: lot.view || 'Vista panorámica',
    }
    await client.create(sanityLot)
    countImage++
  }
  
  console.log(`✅ ${countImage} lotes subidos para Quintaesencia.`)
  console.log(`\n🎉 Proceso completado.`)
}

seedRealLots().catch(console.error)
