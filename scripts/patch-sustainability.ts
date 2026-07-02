import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

async function fetchAssetBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function uploadAsset(url) {
  console.log(`Descargando asset remoto: ${url.split('?')[0]}`)
  const buffer = await fetchAssetBuffer(url)
  const filename = 'sustainability.jpg'
  
  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(`✅ Asset subido: ${asset.url}`)
  
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function patchSustainability() {
  console.log('Parcheando historiaPage sustainability...')
  
  const imageUrl = 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=987&auto=format&fit=crop'
  const imageAsset = await uploadAsset(imageUrl)

  await client
    .patch('historiaPage')
    .set({
      sustainabilityLabel: 'Nuestro legado',
      sustainabilityTitle: 'Un legado en evolución',
      sustainabilityText: 'Cada comunidad representa una forma distinta de entender el territorio: desde el bosque y la montaña hasta el desierto, la playa y el Mar de Cortés. Nuestra historia es un testimonio de respeto por la naturaleza y compromiso con el bienestar humano.',
      sustainabilityImage: imageAsset
    })
    .commit()

  console.log('✅ Información de sostenibilidad subida a Sanity')
}

patchSustainability().catch(console.error)
