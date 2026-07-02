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
  const projects = await client.fetch('*[_type == "project"]{ _id, name, slug }')
  console.log("All projects:", projects)

  const lots = await client.fetch('*[_type == "projectLot" && project._ref != "project-dunah" && project._ref != "project-el-quelele" && project._ref != "project-quintaesencia"]{ _id, lotId, "projectRef": project._ref }')
  console.log("Lots not pointing to my seeded projects:", lots.length)
  if (lots.length > 0) console.log(lots.slice(0, 5))
}
check()
