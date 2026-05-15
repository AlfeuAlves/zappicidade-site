import { useState, useEffect } from 'react'
import { Info, Send, ChevronDown, ChevronUp, MessageSquarePlus } from 'lucide-react'
import { api, type InfoItem } from '../../lib/api'

const CATEGORIAS = [
  { v: '',           l: 'Todas',      icone: '🗂️' },
  { v: 'transporte', l: 'Transporte', icone: '🚢' },
  { v: 'saude',      l: 'Saúde',      icone: '🏥' },
  { v: 'documentos', l: 'Documentos', icone: '📄' },
  { v: 'eventos',    l: 'Eventos',    icone: '🎉' },
  { v: 'servicos',   l: 'Serviços',   icone: '🔧' },
  { v: 'outros',     l: 'Outros',     icone: '📌' },
]

function CardInfo({ item }: { item: InfoItem }) {
  const [expandido, setExpandido] = useState(false)
  const cat = CATEGORIAS.find(c => c.v === item.categoria) || CATEGORIAS[CATEGORIAS.length - 1]
  const conteudoCurto = item.conteudo.length > 120 && !expandido
    ? item.conteudo.slice(0, 120) + '…'
    : item.conteudo

  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-2xl p-5 hover:shadow-[0_8px_24px_rgba(31,41,55,0.10)] hover:-translate-y-0.5 transition-all duration-200"
      onClick={() => setExpandido(e => !e)}
      style={{ cursor: item.conteudo.length > 120 ? 'pointer' : 'default' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-xl flex-shrink-0">
          {item.icone || cat.icone}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-['Poppins'] font-bold text-sm text-[#111827]">{item.titulo}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] bg-[#F3F4F6] rounded-full px-2 py-0.5">
              {cat.l}
            </span>
          </div>
          <p className="font-['Inter'] text-sm text-[#4B5563] leading-relaxed">{conteudoCurto}</p>
          {item.fonte && (
            <p className="font-['Inter'] text-xs text-[#9CA3AF] mt-1.5">🔗 {item.fonte}</p>
          )}
          {item.valido_ate && (
            <p className="font-['Inter'] text-xs text-[#9CA3AF] mt-1">
              📅 Válido até {new Date(item.valido_ate).toLocaleDateString('pt-BR')}
            </p>
          )}
          {item.conteudo.length > 120 && (
            <button className="mt-2 text-[#16A34A] text-xs font-semibold flex items-center gap-1 font-['Inter']">
              {expandido ? <><ChevronUp size={12} /> Ver menos</> : <><ChevronDown size={12} /> Ver mais</>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function FormularioEnvio({ onSucesso }: { onSucesso: () => void }) {
  const [aberto, setAberto] = useState(false)
  const [form, setForm] = useState({
    titulo: '', conteudo: '', categoria: 'outros',
    fonte: '', whatsapp_colaborador: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.titulo.trim() || !form.conteudo.trim()) {
      setErro('Título e conteúdo são obrigatórios.')
      return
    }
    setEnviando(true)
    setErro('')
    try {
      const r = await api.informacoes.enviar({
        titulo:    form.titulo.trim(),
        conteudo:  form.conteudo.trim(),
        categoria: form.categoria,
        fonte:     form.fonte.trim() || undefined,
        whatsapp_colaborador: form.whatsapp_colaborador.trim() || undefined,
      })
      if (r.ok) {
        setForm({ titulo: '', conteudo: '', categoria: 'outros', fonte: '', whatsapp_colaborador: '' })
        setAberto(false)
        onSucesso()
      } else {
        setErro(r.erro || 'Erro ao enviar.')
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="flex items-center gap-2 bg-white border-2 border-dashed border-[#BBF7D0] text-[#16A34A] hover:bg-[#F0FDF4] hover:border-[#16A34A] rounded-2xl px-6 py-4 font-['Poppins'] font-semibold text-sm transition-all w-full justify-center"
      >
        <MessageSquarePlus size={18} />
        Sabe de algo útil para a cidade? Compartilhe aqui!
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-[#DCFCE7] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 bg-[#DCFCE7] rounded-xl flex items-center justify-center">
          <MessageSquarePlus size={18} className="text-[#16A34A]" />
        </div>
        <div>
          <div className="font-['Poppins'] font-bold text-[#111827] text-sm">Compartilhar informação</div>
          <div className="font-['Inter'] text-xs text-[#9CA3AF]">Será revisada antes de aparecer para todos</div>
        </div>
        <button type="button" onClick={() => setAberto(false)} className="ml-auto text-[#9CA3AF] hover:text-[#374151] transition-colors">✕</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5 font-['Poppins']">Título *</label>
          <input
            type="text"
            value={form.titulo}
            onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
            placeholder="Ex: Horário da lancha para Belém"
            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-['Inter'] text-[#111827] outline-none focus:border-[#16A34A] transition-colors"
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5 font-['Poppins']">Categoria *</label>
          <select
            value={form.categoria}
            onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-['Inter'] text-[#111827] outline-none focus:border-[#16A34A] transition-colors bg-white"
          >
            {CATEGORIAS.filter(c => c.v).map(c => (
              <option key={c.v} value={c.v}>{c.icone} {c.l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5 font-['Poppins']">Seu WhatsApp (opcional)</label>
          <input
            type="tel"
            value={form.whatsapp_colaborador}
            onChange={e => setForm(f => ({ ...f, whatsapp_colaborador: e.target.value }))}
            placeholder="(91) 99999-0000"
            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-['Inter'] text-[#111827] outline-none focus:border-[#16A34A] transition-colors"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5 font-['Poppins']">Conteúdo *</label>
          <textarea
            rows={3}
            value={form.conteudo}
            onChange={e => setForm(f => ({ ...f, conteudo: e.target.value }))}
            placeholder="Descreva a informação com detalhes (horários, endereço, dicas...)"
            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-['Inter'] text-[#111827] outline-none focus:border-[#16A34A] transition-colors resize-none"
            maxLength={1000}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5 font-['Poppins']">Fonte (opcional)</label>
          <input
            type="text"
            value={form.fonte}
            onChange={e => setForm(f => ({ ...f, fonte: e.target.value }))}
            placeholder="Ex: Prefeitura de Barcarena, Facebook oficial..."
            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-['Inter'] text-[#111827] outline-none focus:border-[#16A34A] transition-colors"
          />
        </div>
      </div>

      {erro && (
        <p className="text-sm text-[#DC2626] bg-[#FEE2E2] border border-[#FECACA] rounded-xl px-4 py-2.5 mb-4 font-['Inter']">{erro}</p>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => setAberto(false)}
          className="flex-1 py-2.5 rounded-full border-2 border-[#E5E7EB] text-[#4B5563] text-sm font-semibold font-['Poppins'] transition-all hover:border-[#9CA3AF]">
          Cancelar
        </button>
        <button type="submit" disabled={enviando}
          className="flex-1 py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold font-['Poppins'] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(22,163,74,0.3)] transition-all disabled:opacity-60">
          {enviando ? 'Enviando…' : <><Send size={14} /> Enviar</>}
        </button>
      </div>
    </form>
  )
}

export default function InformacoesSection() {
  const [items, setItems]           = useState<InfoItem[]>([])
  const [carregando, setCarregando] = useState(true)
  const [categoria, setCategoria]   = useState('')
  const [enviado, setEnviado]       = useState(false)

  const carregar = async (cat = categoria) => {
    setCarregando(true)
    try {
      const r = await api.informacoes.listar({ categoria: cat || undefined })
      setItems(r.data)
    } catch {
      setItems([])
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregar() }, []) // eslint-disable-line

  const handleCategoria = (c: string) => {
    setCategoria(c)
    carregar(c)
  }

  return (
    <section className="bg-[#F9FAFB] py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[#16A34A] text-xs font-bold tracking-wider uppercase mb-3 font-['Inter']">
            COMUNIDADE
          </div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] text-[#111827] mb-4">
            Informações Úteis da Cidade
          </h2>
          <p className="font-['Inter'] text-lg text-[#4B5563] max-w-xl mx-auto">
            Horários de transporte, eventos, serviços públicos e muito mais —
            mantidos pela própria comunidade de Barcarena.
          </p>
        </div>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIAS.map(c => (
            <button
              key={c.v}
              onClick={() => handleCategoria(c.v)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-['Poppins'] border-2 transition-all ${
                categoria === c.v
                  ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_14px_rgba(22,163,74,0.3)]'
                  : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#16A34A] hover:text-[#16A34A]'
              }`}
            >
              <span>{c.icone}</span> {c.l}
            </button>
          ))}
        </div>

        {/* Aviso de sucesso */}
        {enviado && (
          <div className="bg-[#DCFCE7] border-2 border-[#BBF7D0] rounded-2xl px-5 py-3.5 mb-6 flex items-center gap-3">
            <span className="text-xl">🎉</span>
            <div>
              <div className="font-['Poppins'] font-bold text-[#15803D] text-sm">Obrigado pela contribuição!</div>
              <div className="font-['Inter'] text-xs text-[#166534]">Sua informação foi recebida e será revisada em breve.</div>
            </div>
            <button onClick={() => setEnviado(false)} className="ml-auto text-[#15803D] hover:text-[#166534]">✕</button>
          </div>
        )}

        {/* Grid de informações */}
        {carregando ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-3.5 bg-[#F3F4F6] rounded mb-2 w-3/4" />
                    <div className="h-3 bg-[#F3F4F6] rounded mb-1.5 w-full" />
                    <div className="h-3 bg-[#F3F4F6] rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#E5E7EB] rounded-2xl mb-8">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-['Poppins'] font-semibold text-[#4B5563]">
              {categoria ? 'Nenhuma informação nessa categoria ainda.' : 'Nenhuma informação disponível ainda.'}
            </p>
            <p className="font-['Inter'] text-sm text-[#9CA3AF] mt-1">Seja o primeiro a contribuir!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {items.map(item => <CardInfo key={item.id} item={item} />)}
          </div>
        )}

        {/* Formulário de envio */}
        <div className="max-w-2xl mx-auto">
          <FormularioEnvio onSucesso={() => { setEnviado(true); carregar() }} />
        </div>

        {/* Info nota */}
        <p className="text-center font-['Inter'] text-xs text-[#9CA3AF] mt-6 flex items-center justify-center gap-1.5">
          <Info size={12} />
          Informações enviadas passam por revisão antes de aparecer aqui e no bot do WhatsApp.
        </p>

      </div>
    </section>
  )
}
