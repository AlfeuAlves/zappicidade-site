import { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, MapPin, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Star, Phone } from "lucide-react";
import { useLocation } from "wouter";
import { DirectoryHeader } from "@/components/directory/DirectoryHeader";
import { DirectoryFooter } from "@/components/directory/DirectoryFooter";
import { ModalComercio } from "@/components/sections/SearchResultsSection";
import { useCidadeStats } from "@/hooks/useCidadeStats";
import { api, type Comercio } from "@/lib/api";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";

const QUICK_CATEGORIES = [
  { label: "🍦 Açaí", slug: "acai" },
  { label: "💊 Farmácia", slug: "farmacias" },
  { label: "🍽️ Restaurante", slug: "restaurantes" },
  { label: "🔧 Mecânico", slug: "mecanicas" },
  { label: "🛵 Delivery", slug: "delivery" },
  { label: "🛒 Mercado", slug: "mercados" },
  { label: "💇 Salão", slug: "saloes" },
  { label: "🏥 Clínica", slug: "clinicas" },
];

function linkWhatsApp(numero: string, msg: string) {
  const limpo = numero.replace(/\D/g, "");
  const num = limpo.startsWith("55") ? limpo : `55${limpo}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

function FeaturedCard({ c, onVerInfo }: { c: Comercio; onVerInfo: () => void }) {
  const numero = c.whatsapp || c.telefone;
  const wa = numero ? linkWhatsApp(numero, `Olá! Vi o ${c.nome} no ZappiCidade e quero saber mais.`) : null;

  const handleWaClick = () => {
    api.leads.whatsappClick(c.id);
    if (wa) window.open(wa, "_blank");
  };

  return (
    <article
      style={{
        background: "white",
        border: "1.5px solid #E5E7EB",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(31,41,55,0.12)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {/* Capa */}
      <div
        style={{
          height: 130,
          position: "relative",
          background: c.foto_capa_url
            ? `url(${c.foto_capa_url}) center/cover`
            : "linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
        }}
        onClick={onVerInfo}
      >
        {!c.foto_capa_url && (c.categoria_icone || "🏪")}

        {/* Status badge */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: c.aberto_agora ? "#DCFCE7" : "#FEE2E2",
          color: c.aberto_agora ? "#15803D" : "#DC2626",
          fontSize: 10, fontWeight: 700, padding: "2px 8px",
          borderRadius: 99, display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.aberto_agora ? "#22c55e" : "#ef4444", display: "inline-block" }} />
          {c.aberto_agora ? "Aberto" : "Fechado"}
        </div>

        {/* Destaque badge */}
        <div style={{
          position: "absolute", top: 8, left: 8,
          background: "#FEF3C7", color: "#92400E",
          fontSize: 10, fontWeight: 700, padding: "2px 8px",
          borderRadius: 99, border: "1px solid #FDE68A",
        }}>
          ⭐ Destaque
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }} onClick={onVerInfo}>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", margin: 0, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.nome}
        </h3>
        <span style={{ fontSize: 12, color: "#6B7280" }}>{c.categoria_icone} {c.categoria_nome}</span>

        {c.total_avaliacoes > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Star size={11} fill="#FBBF24" color="#FBBF24" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{c.avaliacao?.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>({c.total_avaliacoes})</span>
          </div>
        )}

        {c.bairro && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={10} color="#9CA3AF" />
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c.bairro}</span>
          </div>
        )}
      </div>

      {/* Botão WhatsApp */}
      <div style={{ padding: "0 14px 14px" }}>
        <button
          onClick={handleWaClick}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, background: "#25D366", color: "white",
            fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 12,
            padding: "9px", borderRadius: 10, border: "none", cursor: "pointer",
            boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
          }}
        >
          <Phone size={13} /> Falar no WhatsApp
        </button>
      </div>
    </article>
  );
}

export function HomePage() {
  const [, navigate] = useLocation();
  const { resumo, bairros, loading } = useCidadeStats();

  const [query, setQuery] = useState("");
  const [bairroSel, setBairroSel] = useState("Todos os bairros");
  const [showBairros, setShowBairros] = useState(false);
  const [destaques, setDestaques] = useState<Comercio[]>([]);
  const [loadingDestaques, setLoadingDestaques] = useState(true);
  const [modalComercio, setModalComercio] = useState<Comercio | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const bairrosList = ["Todos os bairros", ...(bairros ?? [])];

  useEffect(() => {
    api.comercios.listar({ destaque: true, limit: 6 })
      .then(res => setDestaques(res.data))
      .catch(() => setDestaques([]))
      .finally(() => setLoadingDestaques(false));
  }, []);

  const doSearch = (q: string, categoria?: string, bairro?: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categoria) params.set("categoria", categoria);
    if (bairro && bairro !== "Todos os bairros") params.set("bairro", bairro);
    navigate(`/busca?${params.toString()}`);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    doSearch(query.trim(), undefined, bairroSel);
  };

  const scrollChips = (dir: "left" | "right") => {
    chipsRef.current?.scrollBy({ left: dir === "right" ? 180 : -180, behavior: "smooth" });
  };

  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero buscar comércios em Barcarena.")}`;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F9FAFB", fontFamily: "Inter, system-ui, sans-serif" }}>
      <DirectoryHeader />

      <main style={{ flex: 1 }}>

        {/* ── BANNER MANUTENÇÃO ────────────────────────────── */}
        <div style={{ background: '#FEF3C7', borderBottom: '1px solid #FDE68A', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 18 }}>⚙️</span>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#92400E', textAlign: 'center' }}>
            <strong>Aviso:</strong> Nosso assistente pelo WhatsApp está temporariamente fora do ar. Em breve voltamos! Você pode usar o guia normalmente pelo site.
          </p>
        </div>

        {/* ── HERO / SEARCH ENGINE ─────────────────────────── */}
        <section style={{ background: "white", padding: "48px 20px 40px", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>

            {/* Logo grande centralizada */}
            <div style={{ marginBottom: 24 }}>
              <img
                src="/logo_principal.png"
                alt="ZappiCidade Barcarena"
                style={{ height: 120, width: "auto", objectFit: "contain", display: "inline-block" }}
              />
            </div>

            {/* Location pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 99, padding: "4px 14px", marginBottom: 20 }}>
              <MapPin size={12} color="#16A34A" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#15803D" }}>
                📍 Barcarena, PA · {loading ? "..." : (resumo?.stats.total_comercios ?? 0).toLocaleString("pt-BR")} comércios
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "#111827", lineHeight: 1.15, margin: "0 0 12px" }}>
              Encontre tudo em Barcarena<br />
              <span style={{ color: "#16A34A" }}>em segundos</span>
            </h1>
            <p style={{ fontSize: 16, color: "#6B7280", margin: "0 0 28px", lineHeight: 1.6 }}>
              Busque produtos, serviços e empresas perto de você
            </p>

            {/* Search bar */}
            <form onSubmit={handleSubmit}>
              <div style={{
                background: "white",
                border: "2px solid #E5E7EB",
                borderRadius: 16,
                overflow: "visible",
                boxShadow: "0 4px 24px rgba(31,41,55,0.08)",
                transition: "border-color 0.2s",
              }}
                onFocus={() => {}}
              >
                {/* Input row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                  <Search size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Ex: açaí, farmácia, mecânico..."
                    autoComplete="off"
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      outline: "none",
                      fontSize: 15,
                      color: "#111827",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#16A34A",
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      padding: "9px 20px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      flexShrink: 0,
                      boxShadow: "0 2px 12px rgba(22,163,74,0.35)",
                    }}
                  >
                    <Search size={14} /> Buscar
                  </button>
                </div>

                {/* Bairro filter */}
                <div style={{ borderTop: "1px solid #F3F4F6", padding: "8px 14px", position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setShowBairros(!showBairros)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                      color: "#4B5563", padding: 0,
                    }}
                  >
                    <MapPin size={12} color="#9CA3AF" />
                    {bairroSel}
                    <ChevronDown size={12} style={{ transform: showBairros ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {showBairros && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 4px)", left: 0,
                      background: "white", border: "1px solid #E5E7EB",
                      borderRadius: 12, boxShadow: "0 8px 32px rgba(31,41,55,0.12)",
                      zIndex: 50, minWidth: 200, maxHeight: 220, overflowY: "auto",
                      padding: "6px 0",
                    }}>
                      {bairrosList.map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => { setBairroSel(b); setShowBairros(false); }}
                          style={{
                            width: "100%", textAlign: "left",
                            background: bairroSel === b ? "#F0FDF4" : "none",
                            border: "none", cursor: "pointer",
                            fontFamily: "Inter, sans-serif", fontSize: 13,
                            color: bairroSel === b ? "#16A34A" : "#374151",
                            fontWeight: bairroSel === b ? 600 : 400,
                            padding: "9px 16px",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </form>

            {/* Quick categories */}
            <div style={{ marginTop: 16, position: "relative", display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => scrollChips("left")}
                style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "white", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <ChevronLeft size={14} color="#6B7280" />
              </button>

              <div
                ref={chipsRef}
                style={{ display: "flex", gap: 8, overflowX: "auto", flex: 1, scrollbarWidth: "none" }}
              >
                {QUICK_CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => doSearch("", cat.slug, bairroSel)}
                    style={{
                      flexShrink: 0,
                      background: "white",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 99,
                      padding: "6px 14px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#16A34A"; e.currentTarget.style.color = "#16A34A"; e.currentTarget.style.background = "#F0FDF4"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "white"; }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollChips("right")}
                style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "white", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <ChevronRight size={14} color="#6B7280" />
              </button>
            </div>

            {/* Secondary CTA — WhatsApp bot */}
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "#9CA3AF" }}>Prefere buscar pelo WhatsApp?</span>
              <a
                href={zappiLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#25D366", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13,
                  padding: "8px 18px", borderRadius: 99, textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                }}
              >
                <MessageCircle size={14} /> Falar com o Zappi
              </a>
            </div>
          </div>
        </section>

        {/* ── BOTÃO GRANDE ZAPPI ───────────────────────────── */}
        <section style={{ background: "#F0FDF4", borderBottom: "1px solid #BBF7D0", padding: "24px 20px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: "#111827" }}>
                🤖 Conheça o Zappi — seu assistente de Barcarena
              </div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                Pergunte qualquer coisa pelo WhatsApp. Gratuito, sem cadastro.
              </div>
            </div>
            <a
              href={zappiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "white",
                fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 14,
                padding: "14px 28px", borderRadius: 14, textDecoration: "none",
                boxShadow: "0 6px 24px rgba(37,211,102,0.4)",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={18} />
              Falar com o Zappi agora
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* ── EMPRESAS EM DESTAQUE ─────────────────────────── */}
        <section style={{ padding: "48px 20px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22, color: "#111827", margin: 0 }}>
                  Empresas em destaque
                </h2>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
                  Estabelecimentos parceiros com presença digital completa
                </p>
              </div>
              <button
                onClick={() => navigate("/busca")}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "1.5px solid #E5E7EB",
                  borderRadius: 8, padding: "7px 14px", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#374151",
                }}
              >
                Ver todos <ArrowRight size={13} />
              </button>
            </div>

            {loadingDestaques ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ height: 280, background: "#F3F4F6", borderRadius: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
                ))}
              </div>
            ) : destaques.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {destaques.map(c => (
                  <FeaturedCard key={c.id} c={c} onVerInfo={() => setModalComercio(c)} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                Em breve, os melhores estabelecimentos de Barcarena aqui.
              </div>
            )}
          </div>
        </section>

        {/* ── CATEGORIAS ──────────────────────────────────── */}
        {resumo?.stats.categorias && resumo.stats.categorias.length > 0 && (
          <section style={{ background: "white", padding: "48px 20px", borderTop: "1px solid #E5E7EB" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22, color: "#111827", margin: "0 0 24px", textAlign: "center" }}>
                Explore por categoria
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
                {resumo.stats.categorias.slice(0, 12).map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => doSearch("", cat.slug)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      gap: 8, padding: "18px 12px",
                      background: "white", border: "1.5px solid #E5E7EB",
                      borderRadius: 14, cursor: "pointer",
                      transition: "all 0.15s", textAlign: "center",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#16A34A"; e.currentTarget.style.background = "#F0FDF4"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "white"; }}
                  >
                    <span style={{ fontSize: 28 }}>{cat.icone}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#374151" }}>{cat.nome}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>{cat.total} locais</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── STATS ────────────────────────────────────────── */}
        <section style={{ background: "#111827", padding: "48px 20px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
            {[
              { value: loading ? "..." : (resumo?.stats.total_comercios ?? 0).toLocaleString("pt-BR"), label: "Estabelecimentos" },
              { value: resumo?.stats.categorias?.length ?? "20+", label: "Categorias" },
              { value: "100%", label: "Gratuito para cidadãos" },
              { value: "< 10s", label: "Para falar com o negócio" },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 32, color: "#4ADE80" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", marginTop: 6, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <DirectoryFooter />

      {/* Modal */}
      {modalComercio && (
        <ModalComercio
          c={modalComercio}
          onClose={() => setModalComercio(null)}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        input:focus { outline: none; }
      `}</style>
    </div>
  );
}
