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

const defaultTestimonials = [
  {
    quote: "Encontramos en Quercus algo más que un terreno. Fue la posibilidad de construir un refugio conectado con la naturaleza y con una comunidad que comparte nuestra visión.",
    author: "Mariana & Andrés",
    role: "Propietarios en Quercus Baja",
  },
  {
    quote: "Lo que más nos atrajo fue la tranquilidad del entorno, la baja densidad y la forma en que cada proyecto respeta el paisaje.",
    author: "Carlos R.",
    role: "Propietario en El Quelele",
  },
  {
    quote: "DUNAH representa exactamente lo que buscábamos: naturaleza, bienestar y una oportunidad de crear algo con propósito a largo plazo.",
    author: "Valeria M.",
    role: "Propietaria en DUNAH",
  },
  {
    quote: "Cada visita nos confirmó que no era solo una inversión, sino una decisión de vida.",
    author: "Sofía L.",
    role: "Propietaria en Elemental",
  },
]

async function patchTestimonials() {
  console.log('Parcheando homePage testimonials...')
  const testimonials = defaultTestimonials.map((t, i) => ({
    _key: `testimonio${i}`,
    quote: t.quote,
    author: t.author,
    role: t.role,
  }))

  await client
    .patch('homePage')
    .set({ testimonials })
    .commit()

  console.log('✅ Testimonios subidos a Sanity')
}

patchTestimonials().catch(console.error)
