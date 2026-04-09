import { useState, useEffect } from "react";
import { MessageCircle, MapPin, Star, Phone, Loader2, X, Clock, ExternalLink, Info, Bell, Share2, CheckCircle2 } from "lucide-react";
import { api, type Comercio } from "@/lib/api";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "559291234567";

const ICONES: Record<string, string> = {
  restaurantes: "🍽️", mercados: "🛒", farmacias: "💊", saloes: "💇",
  bares: "🍺", pizzarias: "🍕", padarias: "🥖", lanchonetes: "🍔",
  clinicas: "🏥", academias: "💪", mecanicas: "🔧", eletronicos: "📱",
  supermercados: "🛒", escolas: "📚", outros: "🏪",
};

const DIAS: Record<string, string> = {
  segunda: "Segunda", terca: "Terça", quarta: "Quarta",
  quinta: "Quinta", sexta: "Sexta", sabado: "Sábado", domingo: "Domingo",
};

function formatHora(h: string) {
  return h.replace(/(\d{2})(\d{2})/, "$1:$2");
}

function linkWhatsApp(numero: string, msg: string) {
  const limpo = numero.replace(/\D/g, "");
  const num = limpo.startsWith("55") ? limpo : `55${limpo}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

// ── Modal de detalhes ──────────────────────────────────────────
type OptinState = "idle" | "input" | "loading" | "success";

function ModalComercio({ c, onClose }: { c: Comercio; onClose: () => void }) {
  const icone = ICONES[c.categoria_slug] || c.categoria_icone || "🏪";
  const numero = c.whatsapp || c.telefone;
  const wa = numero
    ? linkWhatsApp(numero, `Olá! Vi o ${c.nome} no ZappiCidade e quero saber mais.`)
    : null;

  const horarios = (c as any).horarios as Record<string, { abre: string; fecha: string }> | null;
  const diasComHorario = horarios ? Object.entries(horarios) : [];

  // Comentários state
  const [comentarios, setComentarios] = useState<{ id: string; nome: string | null; texto: string; estrelas: number; criado_em: string }[]>([]);
  const [comentariosCarregados, setComentariosCarregados] = useState(false);
  const [novaEstrela, setNovaEstrela] = useState(0);
  const [novoWa, setNovoWa] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoTexto, setNovoTexto] = useState("");
  const [comentErro, setComentErro] = useState("");
  const [comentStatus, setComentStatus] = useState<"idle"|"loading"|"success">("idle");

  const carregarComentarios = async () => {
    if (comentariosCarregados) return;
    setComentariosCarregados(true);
    const res = await api.comentarios.listar(c.id).catch(() => ({ data: [] }));
    setComentarios(res.data || []);
  };

  useEffect(() => { carregarComentarios(); }, []);

  const handleComentar = async () => {
    setComentErro("");
    const waLimpo = novoWa.replace(/\D/g, "");
    if (waLimpo.length < 10) { setComentErro("Digite seu WhatsApp com DDD"); return; }
    if (!novaEstrela) { setComentErro("Selecione uma avaliação"); return; }
    if (novoTexto.trim().length < 5) { setComentErro("Escreva ao menos 5 caracteres"); return; }
    setComentStatus("loading");
    const res = await api.comentarios.criar({ comercio_id: c.id, whatsapp: waLimpo, nome: novoNome.trim() || undefined, texto: novoTexto.trim(), estrelas: novaEstrela });
    if (res.ok) {
      setComentStatus("success");
      if (res.status === "aprovado") {
        setComentarios(prev => [{ id: res.id, nome: novoNome.trim() || null, texto: novoTexto.trim(), estrelas: novaEstrela, criado_em: new Date().toISOString() }, ...prev]);
      }
    } else {
      setComentErro(res.erro || "Erro ao publicar. Tente novamente.");
      setComentStatus("idle");
    }
  };

  // Opt-in state
  const [optinState, setOptinState] = useState<OptinState>("idle");
  const [waInput, setWaInput] = useState("");
  const [optinErro, setOptinErro] = useState("");

  const handleOptin = async () => {
    const limpo = waInput.replace(/\D/g, "");
    if (limpo.length < 10) { setOptinErro("Digite um número válido com DDD"); return; }
    setOptinErro("");
    setOptinState("loading");
    try {
      await api.leads.optin(c.id, limpo);
      setOptinState("success");
    } catch {
      setOptinErro("Erro ao registrar. Tente novamente.");
      setOptinState("input");
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/c/${c.slug}`;
    if (navigator.share) {
      await navigator.share({ title: c.nome, text: `Vi o ${c.nome} no ZappiCidade!`, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      alert("Link copiado!");
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20, width: "100%", maxWidth: 480,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.20)",
          animation: "modalIn 0.2s ease-out",
        }}
      >
        {/* Capa */}
        <div style={{
          height: 160, position: "relative",
          background: c.foto_capa_url
            ? `url(${c.foto_capa_url}) center/cover`
            : "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 64, borderRadius: "20px 20px 0 0",
        }}>
          {!c.foto_capa_url && icone}

          {/* Botão fechar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(0,0,0,0.4)", border: "none",
              borderRadius: "50%", width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "white",
            }}
          >
            <X size={16} />
          </button>

          {/* Badge aberto/fechado */}
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: c.aberto_agora ? "#DCFCE7" : "#FEE2E2",
            color: c.aberto_agora ? "#15803D" : "#DC2626",
            fontSize: 11, fontWeight: 700, padding: "3px 10px",
            borderRadius: 99, display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: c.aberto_agora ? "#22c55e" : "#ef4444",
              display: "inline-block"
            }} />
            {c.aberto_agora ? "Aberto agora" : "Fechado"}
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ padding: "20px 24px 28px" }}>
          <h2 style={{
            fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 20,
            color: "#111827", margin: "0 0 4px",
          }}>
            {c.nome}
          </h2>
          <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
            {icone} {c.categoria_nome}
          </span>

          {/* Avaliação */}
          {c.total_avaliacoes > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14}
                  fill={i <= Math.round(c.avaliacao || 0) ? "#FBBF24" : "none"}
                  color="#FBBF24"
                />
              ))}
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
                {c.avaliacao?.toFixed(1)}
              </span>
              <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                ({c.total_avaliacoes} avaliações)
              </span>
            </div>
          )}

          <div style={{ height: 1, background: "#F3F4F6", margin: "16px 0" }} />

          {/* Endereço */}
          {c.endereco && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <MapPin size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <span style={{ fontSize: 13, color: "#374151" }}>{c.endereco}</span>
                {(c as any).maps_url && (
                  <a
                    href={(c as any).maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: 11, color: "#16A34A", fontWeight: 600,
                      textDecoration: "none", marginTop: 2,
                    }}
                  >
                    Ver no mapa <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Telefone */}
          {(c.telefone || c.whatsapp) && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
              <Phone size={15} color="#16A34A" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#374151" }}>{c.whatsapp || c.telefone}</span>
            </div>
          )}

          {/* Horários */}
          {diasComHorario.length > 0 && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <Clock size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                {diasComHorario.map(([dia, h]) => (
                  <div key={dia} style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: 12, color: "#374151", padding: "2px 0",
                  }}>
                    <span style={{ fontWeight: 500 }}>{DIAS[dia] || dia}</span>
                    <span style={{ color: "#6B7280" }}>{formatHora(h.abre)} – {formatHora(h.fecha)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 1, background: "#F3F4F6", margin: "16px 0" }} />

          {/* Botão WhatsApp principal */}
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, background: "#25D366", color: "white",
                fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14,
                padding: "13px 16px", borderRadius: 12, textDecoration: "none",
                boxShadow: "0 4px 16px rgba(37,211,102,0.35)", marginBottom: 10,
              }}
            >
              <Phone size={15} /> Chamar no WhatsApp
            </a>
          ) : (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Quero mais informações sobre ${c.nome} em Barcarena.`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, background: "#25D366", color: "white",
                fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14,
                padding: "13px 16px", borderRadius: 12, textDecoration: "none", marginBottom: 10,
              }}
            >
              <MessageCircle size={15} /> Perguntar ao Zappi
            </a>
          )}

          {/* Seguir + Compartilhar */}
          <div style={{ display: "flex", gap: 8 }}>

            {/* Seguir — opt-in */}
            {optinState === "success" ? (
              <div style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, background: "#F0FDF4", color: "#15803D",
                fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                padding: "10px 12px", borderRadius: 10, border: "1.5px solid #DCFCE7",
              }}>
                <CheckCircle2 size={15} /> Seguindo!
              </div>
            ) : optinState === "input" || optinState === "loading" ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="tel"
                    placeholder="(91) 99999-9999"
                    value={waInput}
                    onChange={e => setWaInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleOptin()}
                    autoFocus
                    style={{
                      flex: 1, padding: "9px 12px", borderRadius: 8,
                      border: "1.5px solid #D1D5DB", fontSize: 13,
                      fontFamily: "Inter, sans-serif", outline: "none",
                    }}
                  />
                  <button
                    onClick={handleOptin}
                    disabled={optinState === "loading"}
                    style={{
                      padding: "9px 14px", borderRadius: 8, border: "none",
                      background: "#16A34A", color: "white",
                      fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                      cursor: optinState === "loading" ? "wait" : "pointer",
                    }}
                  >
                    {optinState === "loading" ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : "OK"}
                  </button>
                </div>
                {optinErro && <span style={{ fontSize: 11, color: "#DC2626" }}>{optinErro}</span>}
              </div>
            ) : (
              <button
                onClick={() => setOptinState("input")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 6, background: "white", color: "#374151",
                  fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                  padding: "10px 12px", borderRadius: 10,
                  border: "1.5px solid #E5E7EB", cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#16A34A")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}
              >
                <Bell size={14} /> Seguir e receber promoções
              </button>
            )}

            {/* Compartilhar */}
            <button
              onClick={handleShare}
              title="Compartilhar"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "10px 14px", borderRadius: 10,
                border: "1.5px solid #E5E7EB", background: "white",
                color: "#6B7280", cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#16A34A";
                (e.currentTarget as HTMLElement).style.color = "#16A34A";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                (e.currentTarget as HTMLElement).style.color = "#6B7280";
              }}
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>{/* fecha conteúdo */}

        {/* ── Seção de comentários ── */}
        <div style={{ borderTop: "1px solid #F3F4F6", padding: "20px 24px 28px" }}>
          <button
            onClick={carregarComentarios}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "none",
              border: "none", cursor: "pointer", padding: 0, marginBottom: 16,
              fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#111827",
            }}
          >
            💬 Comentários {comentariosCarregados && `(${comentarios.length})`}
          </button>

          {comentariosCarregados && (
            <>
              {/* Lista */}
              {comentarios.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  {comentarios.map(cm => (
                    <div key={cm.id} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, color: "#111827" }}>
                          {cm.nome || "Cidadão anônimo"}
                        </span>
                        <div style={{ display: "flex", gap: 2 }}>
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={11} fill={i <= cm.estrelas ? "#FBBF24" : "none"} color="#FBBF24" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.5 }}>{cm.texto}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                          {new Date(cm.criado_em).toLocaleDateString("pt-BR")}
                        </span>
                        <button
                          onClick={() => api.comentarios.reportar(cm.id).catch(() => {})}
                          style={{ fontSize: 11, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                          Reportar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16, fontFamily: "Inter, sans-serif" }}>
                  Seja o primeiro a comentar!
                </p>
              )}

              {/* Formulário novo comentário */}
              {comentStatus === "success" ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, background: "#F0FDF4",
                  border: "1.5px solid #DCFCE7", borderRadius: 10, padding: "12px 14px",
                  color: "#15803D", fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                }}>
                  <CheckCircle2 size={16} /> Comentário enviado! Obrigado.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, color: "#111827", margin: 0 }}>
                    Deixe seu comentário
                  </p>

                  {/* Estrelas */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1,2,3,4,5].map(i => (
                      <button key={i} onClick={() => setNovaEstrela(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                        <Star size={22} fill={i <= novaEstrela ? "#FBBF24" : "none"} color={i <= novaEstrela ? "#FBBF24" : "#D1D5DB"} />
                      </button>
                    ))}
                  </div>

                  <input
                    type="text" placeholder="Seu nome (opcional)"
                    value={novoNome} onChange={e => setNovoNome(e.target.value)}
                    style={{ padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none" }}
                  />
                  <input
                    type="tel" placeholder="Seu WhatsApp com DDD (não será exibido)"
                    value={novoWa} onChange={e => setNovoWa(e.target.value)}
                    style={{ padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none" }}
                  />
                  <textarea
                    placeholder="O que achou deste estabelecimento?"
                    value={novoTexto} onChange={e => setNovoTexto(e.target.value)}
                    maxLength={500} rows={3}
                    style={{ padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none", resize: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{novoTexto.length}/500</span>
                    <span style={{ fontSize: 10, color: "#9CA3AF" }}>Seu número não será exibido · LGPD</span>
                  </div>
                  {comentErro && <span style={{ fontSize: 12, color: "#DC2626" }}>{comentErro}</span>}
                  <button
                    onClick={handleComentar}
                    disabled={comentStatus === "loading"}
                    style={{
                      background: "#16A34A", color: "white", border: "none",
                      fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                      padding: "10px 16px", borderRadius: 8, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}
                  >
                    {comentStatus === "loading"
                      ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      : "Publicar comentário"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Card do resultado ──────────────────────────────────────────
function CardResult({ c, onVerInfo }: { c: Comercio; onVerInfo: () => void }) {
  const icone = ICONES[c.categoria_slug] || c.categoria_icone || "🏪";
  const numero = c.whatsapp || c.telefone;
  const wa = numero
    ? linkWhatsApp(numero, `Olá! Vi o ${c.nome} no ZappiCidade e quero saber mais.`)
    : null;

  const handleWhatsAppClick = () => {
    api.leads.whatsappClick(c.id); // fire-and-forget
    if (wa) window.open(wa, "_blank");
  };

  return (
    <article
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
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
      <div style={{
        height: 120,
        background: c.foto_capa_url
          ? `url(${c.foto_capa_url}) center/cover`
          : "linear-gradient(135deg, #DCFCE7 0%, #D1FAE5 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40, position: "relative",
      }}>
        {!c.foto_capa_url && icone}
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: c.aberto_agora ? "#DCFCE7" : "#FEE2E2",
          color: c.aberto_agora ? "#15803D" : "#DC2626",
          fontSize: 10, fontWeight: 700, padding: "2px 8px",
          borderRadius: 99, display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: c.aberto_agora ? "#22c55e" : "#ef4444",
            display: "inline-block"
          }} />
          {c.aberto_agora ? "Aberto" : "Fechado"}
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <h3 style={{
          fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14,
          color: "#111827", lineHeight: 1.3, margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {c.nome}
        </h3>

        <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>
          {icone} {c.categoria_nome}
        </span>

        {c.total_avaliacoes > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Star size={11} fill="#FBBF24" color="#FBBF24" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>
              {c.avaliacao?.toFixed(1)}
            </span>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>
              ({c.total_avaliacoes})
            </span>
          </div>
        )}

        {c.bairro && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={11} color="#9CA3AF" />
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c.bairro}</span>
          </div>
        )}

        {/* Botões */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto", paddingTop: 8 }}>
          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 5, background: "#25D366", color: "white",
              fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12,
              padding: "8px 10px", borderRadius: 8, border: "none",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1ebe5d")}
            onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
          >
            <Phone size={12} /> WhatsApp
          </button>

          {/* Ver informações */}
          <button
            onClick={onVerInfo}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 5, background: "white", color: "#374151",
              fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12,
              padding: "7px 10px", borderRadius: 8,
              border: "1.5px solid #E5E7EB", cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#16A34A";
              (e.currentTarget as HTMLElement).style.color = "#16A34A";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            <Info size={12} /> Ver informações
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Seção principal ────────────────────────────────────────────
interface Props {
  query: string
  comercios: Comercio[]
  total: number
  loading: boolean
  onLimpar: () => void
  zappiQuery: string
}

export function SearchResultsSection({ query, comercios, total, loading, onLimpar, zappiQuery }: Props) {
  const [selecionado, setSelecionado] = useState<Comercio | null>(null);

  if (!query && !loading) return null;

  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    zappiQuery || `Olá! Quero buscar comércios em Barcarena.`
  )}`;

  return (
    <section style={{ background: "#F9FAFB", borderTop: "1px solid #E5E7EB", padding: "40px 0 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 20, color: "#111827", margin: 0 }}>
              {loading ? "Buscando..." : total > 0
                ? `${total} resultado${total !== 1 ? "s" : ""} para "${query}"`
                : `Nenhum resultado para "${query}"`}
            </h2>
            {!loading && total > 0 && (
              <p style={{ color: "#6B7280", fontSize: 14, margin: "4px 0 0" }}>
                Fale direto pelo WhatsApp ou veja as informações do estabelecimento
              </p>
            )}
          </div>
          <button
            onClick={onLimpar}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 8,
              border: "1.5px solid #E5E7EB", background: "white",
              color: "#6B7280", fontSize: 13, cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontWeight: 500,
            }}
          >
            <X size={13} /> Limpar busca
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200, gap: 12 }}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite", color: "#16A34A" }} />
            <span style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>Buscando comércios...</span>
          </div>
        )}

        {/* Sem resultados */}
        {!loading && comercios.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 8 }}>
              Nenhum comércio encontrado
            </h3>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24, fontFamily: "Inter, sans-serif" }}>
              Tente outros termos ou pergunte ao Zappi — ele conhece Barcarena inteirinha!
            </p>
            <a
              href={zappiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "white",
                fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14,
                padding: "12px 28px", borderRadius: 999, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
              }}
            >
              <MessageCircle size={16} /> Perguntar ao Zappi
            </a>
          </div>
        )}

        {/* Grid */}
        {!loading && comercios.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}>
              {comercios.map(c => (
                <CardResult key={c.id} c={c} onVerInfo={() => setSelecionado(c)} />
              ))}
            </div>

            {/* CTA Zappi */}
            <div style={{
              marginTop: 40, padding: "24px 28px",
              background: "white", border: "1px solid #E5E7EB",
              borderRadius: 16, display: "flex",
              alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16,
            }}>
              <div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 15, color: "#111827", margin: 0 }}>
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
                  fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13,
                  padding: "10px 22px", borderRadius: 999, textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <MessageCircle size={14} /> Perguntar ao Zappi
              </a>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selecionado && (
        <ModalComercio c={selecionado} onClose={() => setSelecionado(null)} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
