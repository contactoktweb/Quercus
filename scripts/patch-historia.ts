import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { historyTimeline } from '../lib/projects-data'

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

async function patchHistoria() {
  console.log('Parcheando historiaPage...')
  const timelineItems = historyTimeline.map((item, i) => ({
    _key: `t${i}`,
    year: item.year,
    title: item.title,
    description: item.description,
  }))

  await client
    .patch('historiaPage')
    .set({ timelineItems })
    .commit()

  console.log('✅ Línea de tiempo actualizada en Sanity')
}

patchHistoria().catch(console.error)
