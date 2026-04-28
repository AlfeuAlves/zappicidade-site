import { useState, useEffect, useCallback } from "react";
import { Search, MessageCircle, MapPin, X, Loader2, Star, Phone, Info, SlidersHorizontal } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import { DirectoryHeader } from "@/components/directory/DirectoryHeader";
import { DirectoryFooter } from "@/components/directory/DirectoryFooter";
import { ModalComercio } from "@/components/sections/SearchResultsSection";
import { useCidadeStats } from "@/hooks/useCidadeStats";
import { api, type Comercio } from "@/lib/api";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";
const PAGE_SIZE = 24;

function linkWhatsApp(numero: string, msg: string) {
  const limpo = numero.replace(/\D/g, "");
  const num = limpo.startsWith("55") ? limpo : `55${limpo}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

function ResultCard({ c, onVerInfo }: { c: Comercio; onVerInfo: () => void }) {
  const numero = c.whatsapp || c.telefone;
  const wa = numero ? linkWhatsApp(numero, `Olá! Vi o ${c.nome} no ZappiCidade e quero saber mais.`) : null;

  const handleWaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    api.leads.whatsappClick(c.id);
    if (wa) window.open(wa, "_blank");
    else window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Quero mais informações sobre ${c.nome}`)}`, "_blank");
  };

  return (
    <article
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(31,41,55,0.10)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
    >
      {/* Capa clicável */}
      <div
        onClick={onVerInfo}
        style={{
          height: 110,
          position: "relative",
          background: c.foto_capa_url
            ? `url(${c.foto_capa_url}) center/cover`
            : "linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 38, cursor: "pointer",
        }}
      >
        {!c.foto_capa_url && (c.categoria_icone || "🏪")}

        {/* Status */}
        <div style={{
          position: "absolute", top: 7, right: 7,
          background: c.aberto_agora ? "#DCFCE7" : "#FEE2E2",
          color: c.aberto_agora ? "#15803D" : "#DC2626",
          fontSize: 10, fontWeight: 700, padding: "2px 7px",
          borderRadius: 99, display: "flex", alignItems: "center", gap: 3,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.aberto_agora ? "#22c55e" : "#ef4444", display: "inline-block" }} />
          {c.aberto_agora ? "Aberto" : "Fechado"}
        </div>

        {c.destaque && (
          <div style={{ position: "absolute", top: 7, left: 7, background: "#FEF3C7", color: "#92400E", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, border: "1px solid #FDE68A" }}>
            ⭐
          </div>
        )}
      </div>

      {/* Info */}
      <div onClick={onVerInfo} style={{ padding: "10px 12px 6px", flex: 1, display: "flex", flexDirection: "column", gap: 4, cursor: "pointer" }}>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: "#111827", margin: 0, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.nome}
        </h3>

        {c.tem_fundador_ativo && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#FEF3C7", color: "#92400E", borderRadius: 99, padding: "2px 7px", fontSize: 10, fontWeight: 700, border: "1px solid #FDE68A", alignSelf: "flex-start" }}>
            🥇 Fundador
          </span>
        )}

        <span style={{ fontSize: 11, color: "#6B7280" }}>{c.categoria_icone} {c.categoria_nome}</span>

        {c.total_avaliacoes > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Star size={10} fill="#FBBF24" color="#FBBF24" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>{c.avaliacao?.toFixed(1)}</span>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>({c.total_avaliacoes})</span>
          </div>
        )}

        {c.bairro && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={10} color="#9CA3AF" />
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c.bairro}</span>
          </div>
        )}
      </div>

      {/* Botões */}
      <div style={{ padding: "8px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          onClick={handleWaClick}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 5, background: "#25D366", color: "white",
            fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 12,
            padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
            boxShadow: "0 2px 8px rgba(37,211,102,0.25)",
          }}
        >
          <Phone size={12} /> Falar no WhatsApp
        </button>
        <button
          onClick={onVerInfo}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 5, background: "white", color: "#374151",
            fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 11,
            padding: "7px", borderRadius: 8,
            border: "1.5px solid #E5E7EB", cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#16A34A"; e.currentTarget.style.color = "#16A34A"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#374151"; }}
        >
          <Info size={11} /> Ver mais
        </button>
      </div>
    </article>
  );
}

export function ResultsPage() {
  const searchString = useSearch();
  const [, navigate] = useLocation();
  const { resumo, bairros } = useCidadeStats();
  const params = new URLSearchParams(searchString);

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [bairroSel, setBairroSel] = useState(params.get("bairro") ?? "");
  const [categoriaSel, setCategoriaSel] = useState(params.get("categoria") ?? "");
  const [abertoAgora, setAbertoAgora] = useState(params.get("aberto") === "true");

  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalComercio, setModalComercio] = useState<Comercio | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchResults = useCallback(async (q: string, categoria: string, bairro: string, aberto: boolean) => {
    setLoading(true);
    try {
      const p: Record<string, string | number | boolean> = { limit: PAGE_SIZE };
      if (q) p.busca = q;
      if (categoria) p.categoria = categoria;
      if (bairro) p.bairro = bairro;
      if (aberto) p.aberto_agora = true;
      const res = await api.comercios.listar(p);
      setComercios(res.data);
      setTotal(res.meta.total);
    } catch {
      setComercios([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount and when URL changes
  useEffect(() => {
    const p = new URLSearchParams(searchString);
    const q = p.get("q") ?? "";
    const categoria = p.get("categoria") ?? "";
    const bairro = p.get("bairro") ?? "";
    const aberto = p.get("aberto") === "true";
    setQuery(q);
    setCategoriaSel(categoria);
    setBairroSel(bairro);
    setAbertoAgora(aberto);
    fetchResults(q, categoria, bairro, aberto);
  }, [searchString]);

  const applyFilters = () => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (categoriaSel) p.set("categoria", categoriaSel);
    if (bairroSel) p.set("bairro", bairroSel);
    if (abertoAgora) p.set("aberto", "true");
    navigate(`/busca?${p.toString()}`);
    setShowFilters(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") applyFilters();
  };

  const clearFilters = () => {
    navigate("/busca");
  };

  const hasFilters = !!(categoriaSel || bairroSel || abertoAgora);

  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Não encontrei o que procurava. Quero buscar: ${query || "comércios"}${bairroSel ? ` em ${bairroSel}` : ""} em Barcarena.`
  )}`;

  const categorias = resumo?.stats.categorias ?? [];
  const bairrosList = ["", ...(bairros ?? [])];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F9FAFB", fontFamily: "Inter, system-ui, sans-serif" }}>
      <DirectoryHeader />

      {/* ── STICKY SEARCH BAR ─────────────────────────────── */}
      <div style={{
        position: "sticky", top: 60, zIndex: 90,
        background: "white", borderBottom: "1px solid #E5E7EB",
        padding: "10px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 10, alignItems: "center" }}>
          {/* Search input */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "8px 12px" }}>
            <Search size={16} color="#9CA3AF" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar em Barcarena..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: "#111827", fontFamily: "Inter, sans-serif" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtros toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 10, cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13,
              background: hasFilters ? "#F0FDF4" : "white",
              border: `1.5px solid ${hasFilters ? "#16A34A" : "#E5E7EB"}`,
              color: hasFilters ? "#16A34A" : "#374151",
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal size={14} />
            Filtros
            {hasFilters && <span style={{ background: "#16A34A", color: "white", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>!</span>}
          </button>

          {/* Buscar */}
          <button
            onClick={applyFilters}
            style={{
              padding: "8px 18px", borderRadius: 10, border: "none",
              background: "#16A34A", color: "white",
              fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13,
              cursor: "pointer", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
            }}
          >
            Buscar
          </button>
        </div>

        {/* Painel de filtros */}
        {showFilters && (
          <div style={{ maxWidth: 1200, margin: "10px auto 0", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>

            {/* Bairro */}
            <select
              value={bairroSel}
              onChange={e => setBairroSel(e.target.value)}
              style={{ padding: "7px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#374151", background: "white", cursor: "pointer" }}
            >
              <option value="">Todos os bairros</option>
              {bairrosList.filter(Boolean).map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            {/* Categoria */}
            <select
              value={categoriaSel}
              onChange={e => setCategoriaSel(e.target.value)}
              style={{ padding: "7px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#374151", background: "white", cursor: "pointer" }}
            >
              <option value="">Todas as categorias</option>
              {categorias.map(c => <option key={c.slug} value={c.slug}>{c.icone} {c.nome}</option>)}
            </select>

            {/* Aberto agora */}
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#374151" }}>
              <div
                onClick={() => setAbertoAgora(!abertoAgora)}
                style={{
                  width: 38, height: 22, borderRadius: 99,
                  background: abertoAgora ? "#16A34A" : "#D1D5DB",
                  position: "relative", transition: "background 0.2s", cursor: "pointer",
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", background: "white",
                  position: "absolute", top: 3, left: abertoAgora ? 19 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }} />
              </div>
              Aberto agora
            </label>

            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#DC2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
              >
                <X size={13} /> Limpar filtros
              </button>
            )}
          </div>
        )}
      </div>

      <main style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "28px 20px 48px" }}>

        {/* Header de resultados */}
        <div style={{ marginBottom: 20 }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Loader2 size={18} color="#16A34A" style={{ animation: "spin 1s linear infinite" }} />
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 16, color: "#6B7280" }}>Buscando...</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, color: "#111827", margin: 0 }}>
                {total > 0
                  ? `${total.toLocaleString("pt-BR")} resultado${total !== 1 ? "s" : ""}${query ? ` para "${query}"` : ""}`
                  : query ? `Nenhum resultado para "${query}"` : "Nenhum resultado"}
              </h2>
              {hasFilters && (
                <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
                  <X size={12} /> Limpar filtros
                </button>
              )}
            </div>
          )}

          {!loading && total > 0 && (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
              Fale direto pelo WhatsApp ou veja mais detalhes do estabelecimento
            </p>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ height: 260, background: "#F3F4F6", borderRadius: 14, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        )}

        {/* Sem resultados */}
        {!loading && comercios.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 20, color: "#111827", margin: "0 0 8px" }}>
              Não encontramos nada
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280", margin: "0 0 28px", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
              Tente outros termos ou pergunte ao Zappi — ele conhece todos os comércios de Barcarena!
            </p>
            <a
              href={zappiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "white",
                fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14,
                padding: "13px 28px", borderRadius: 999, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
              }}
            >
              <MessageCircle size={16} /> Não encontrou? Fale com o Zappi
            </a>
          </div>
        )}

        {/* Grid de resultados */}
        {!loading && comercios.length > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {comercios.map(c => (
                <ResultCard key={c.id} c={c} onVerInfo={() => setModalComercio(c)} />
              ))}
            </div>

            {/* CTA Zappi no final */}
            <div style={{
              marginTop: 40, padding: "22px 24px",
              background: "white", border: "1px solid #E5E7EB",
              borderRadius: 16, display: "flex",
              alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16,
            }}>
              <div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#111827", margin: 0 }}>
                  Não achou o que procurava?
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
                  O Zappi pode te ajudar a encontrar qualquer coisa em Barcarena via WhatsApp.
                </p>
              </div>
              <a
                href={zappiLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25D366", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13,
                  padding: "10px 22px", borderRadius: 999, textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <MessageCircle size={14} /> Perguntar ao Zappi
              </a>
            </div>
          </>
        )}
      </main>

      <DirectoryFooter />

      {/* Modal */}
      {modalComercio && (
        <ModalComercio c={modalComercio} onClose={() => setModalComercio(null)} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
