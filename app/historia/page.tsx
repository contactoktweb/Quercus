import { HistoriaPage } from '@/components/historia-page'
import { sanityFetch, HISTORIA_PAGE_QUERY, GLOBAL_CONFIG_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata = {
  title: 'Nuestra Historia | Quercus',
  description: 'Más de dos décadas creando comunidades regenerativas en México. Conoce la trayectoria de Quercus desde Michoacán hasta Baja California Sur.',
}

export default async function Historia() {
  const [data, config] = await Promise.all([
    sanityFetch<any>({ query: HISTORIA_PAGE_QUERY }),
    sanityFetch<any>({ query: GLOBAL_CONFIG_QUERY }),
  ])
  
  return <HistoriaPage data={data} config={config} />
}
