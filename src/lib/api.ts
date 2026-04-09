const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const CIDADE  = import.meta.env.VITE_CIDADE  ?? 'barcarena'

export interface CidadeResumo {
  cidade: { id: string; nome: string; estado: string }
  stats: {
    total_comercios: number
    verificados: number
    categorias: { slug: string; nome: string; icone: string; total: number }[]
  }
}

export interface Comercio {
  id: string
  nome: string
  slug: string
  categoria_nome: string
  categoria_slug: string
  categoria_icone: string
  bairro: string | null
  endereco: string | null
  telefone: string | null
  whatsapp: string | null
  avaliacao: number | null
  total_avaliacoes: number
  foto_capa_url: string | null
  logo_url?: string | null
  aberto_agora: boolean
  destaque: boolean
  verificado: boolean
}

export interface ListaComercios {
  data: Comercio[]
  meta: { total: number; page: number; limit: number; paginas: number }
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  cidade: {
    resumo: () => get<CidadeResumo>(`/cidades/${CIDADE}/resumo`),
    bairros: () => get<string[]>(`/cidades/${CIDADE}/bairros`),
  },
  comercios: {
    listar: (params: Record<string, string | number | boolean>) => {
      const qs = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => { if (v !== '' && v !== undefined) qs.set(k, String(v)) })
      return get<ListaComercios>(`/comercios?${qs.toString()}`)
    },
  },
  comentarios: {
    listar: (comercio_id: string) =>
      get<{ data: { id: string; nome: string | null; texto: string; estrelas: number; criado_em: string }[] }>(
        `/comentarios/${comercio_id}`
      ),
    criar: (body: { comercio_id: string; whatsapp: string; nome?: string; texto: string; estrelas: number }) =>
      fetch(`${API_URL}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(r => r.json()),
    reportar: (id: string) =>
      fetch(`${API_URL}/comentarios/${id}/reportar`, { method: 'POST' }).then(r => r.json()),
  },
  leads: {
    whatsappClick: (comercio_id: string) =>
      fetch(`${API_URL}/leads/whatsapp-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comercio_id, origem: 'landing_page' }),
      }).catch(() => {}),
    optin: (comercio_id: string, whatsapp: string) =>
      fetch(`${API_URL}/leads/optin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comercio_id, whatsapp, origem: 'landing_page' }),
      }).then(r => { if (!r.ok) throw new Error('Erro ao registrar'); return r.json(); }),
  },
}
