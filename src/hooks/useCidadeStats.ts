import { useEffect, useState } from 'react'
import { api, type CidadeResumo } from '@/lib/api'

interface UseCidadeStatsResult {
  resumo: CidadeResumo | null
  bairros: string[]
  loading: boolean
}

export function useCidadeStats(): UseCidadeStatsResult {
  const [resumo, setResumo] = useState<CidadeResumo | null>(null)
  const [bairros, setBairros] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.cidade.resumo(), api.cidade.bairros()])
      .then(([r, b]) => {
        setResumo(r)
        setBairros(b)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { resumo, bairros, loading }
}
