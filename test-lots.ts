import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8')
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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function check() {
  const lots = await client.fetch('*[_type == "projectLot"]{ _id, lotId, "projectId": project._ref }')
  console.log("Total lots in entire DB:", lots.length)
  const unknown = lots.filter(l => !l.projectId?.startsWith('project-dunah') && !l.projectId?.startsWith('project-el-quelele') && !l.projectId?.startsWith('project-quintaesencia'))
  console.log("Lots with unknown project refs:", unknown.slice(0, 10))

  const dunahOld = lots.filter(l => l.lotId.toLowerCase().includes('macro'))
  console.log("Lots with 'macro' in lotId:", dunahOld)
}
check()
