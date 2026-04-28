import { useState } from "react";
import { CheckCircle2, ArrowRight, MessageCircle, TrendingUp, Users, Star, Zap } from "lucide-react";
import { DirectoryHeader } from "@/components/directory/DirectoryHeader";
import { DirectoryFooter } from "@/components/directory/DirectoryFooter";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "https://zappicidade-painel.vercel.app";
const ONBOARDING_URL = `${FRONTEND_URL}/comerciante/onboarding`;

const PROBLEMS = [
  { icon: "😟", text: "Seu cliente não te encontra no digital" },
  { icon: "💸", text: "Você perde vendas todos os dias sem saber" },
  { icon: "📵", text: "Depender só de indicação limita seu crescimento" },
  { icon: "🏪", text: "Concorrentes com presença online saem na frente" },
];

const BENEFITS = [
  { icon: <MessageCircle size={22} color="#16A34A" />, title: "Mais clientes no WhatsApp", desc: "Clientes prontos para comprar chegam direto no seu WhatsApp" },
  { icon: <TrendingUp size={22} color="#16A34A" />, title: "Presença digital na cidade", desc: "Seu negócio aparece nas buscas do ZappiCidade 24h por dia" },
  { icon: <Zap size={22} color="#16A34A" />, title: "Resultado rápido", desc: "Cadastro simples, já aparece nas buscas em minutos" },
  { icon: <Star size={22} color="#16A34A" />, title: "Destaque na busca", desc: "Com o plano PRO, seu negócio aparece antes dos concorrentes" },
  { icon: <Users size={22} color="#16A34A" />, title: "Avaliações de clientes", desc: "Construa reputação com avaliações verificadas dos seus clientes" },
];

const CATEGORIAS_FORM = [
  "Restaurante", "Farmácia", "Mercado", "Salão de Beleza", "Mecânica",
  "Padaria", "Lanchonete", "Clínica", "Academia", "Eletrônicos",
  "Materiais de Construção", "Pet Shop", "Outro",
];

export function ParceiroPage() {
  const [formData, setFormData] = useState({ nome: "", categoria: "", whatsapp: "", bairro: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Redireciona para o onboarding com os dados pré-preenchidos via query params
    const p = new URLSearchParams();
    if (formData.nome) p.set("nome", formData.nome);
    if (formData.categoria) p.set("categoria", formData.categoria);
    if (formData.whatsapp) p.set("whatsapp", formData.whatsapp.replace(/\D/g, ""));
    if (formData.bairro) p.set("bairro", formData.bairro);
    setTimeout(() => {
      window.location.href = `${ONBOARDING_URL}?${p.toString()}`;
    }, 800);
  };

  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero cadastrar meu negócio no ZappiCidade.")}`;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F9FAFB", fontFamily: "Inter, system-ui, sans-serif" }}>
      <DirectoryHeader />

      <main style={{ flex: 1 }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)", padding: "64px 20px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#16A34A", borderRadius: 99, padding: "4px 14px", marginBottom: 20 }}>
              <Zap size={12} color="white" />
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.05em" }}>Seja parceiro ZappiCidade</span>
            </div>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "white", lineHeight: 1.15, margin: "0 0 16px" }}>
              Coloque seu negócio na frente de clientes{" "}
              <span style={{ color: "#4ADE80" }}>prontos para comprar</span>
            </h1>
            <p style={{ fontSize: 16, color: "#9CA3AF", margin: "0 0 32px", lineHeight: 1.6 }}>
              Milhares de moradores de Barcarena buscam produtos e serviços no ZappiCidade todos os dias. Esteja lá quando eles precisarem de você.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="#cadastrar"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#16A34A", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15,
                  padding: "14px 32px", borderRadius: 12, textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(22,163,74,0.4)",
                }}
              >
                Cadastrar meu negócio agora <ArrowRight size={16} />
              </a>
              <a
                href={zappiLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.1)", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14,
                  padding: "14px 24px", borderRadius: 12, textDecoration: "none",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                }}
              >
                <MessageCircle size={16} /> Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── PROBLEMAS ─────────────────────────────────────── */}
        <section style={{ background: "white", padding: "56px 20px", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22, color: "#111827", textAlign: "center", margin: "0 0 36px" }}>
              Você ainda não está no digital?
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {PROBLEMS.map(p => (
                <div key={p.text} style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 14, padding: "20px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#374151", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{p.text}</p>
                </div>
              ))}
            </div>

            {/* Solução */}
            <div style={{ marginTop: 32, background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 16, padding: "24px 28px", textAlign: "center" }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: "#15803D", margin: "0 0 8px" }}>
                ✅ O ZappiCidade resolve tudo isso
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                Quando um cliente busca seu produto ou serviço no ZappiCidade, seu negócio aparece. Um clique e ele já está falando com você no WhatsApp. Simples assim.
              </p>
            </div>
          </div>
        </section>

        {/* ── BENEFÍCIOS ────────────────────────────────────── */}
        <section style={{ padding: "56px 20px", background: "#F9FAFB" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22, color: "#111827", textAlign: "center", margin: "0 0 36px" }}>
              O que você ganha sendo parceiro
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {BENEFITS.map(b => (
                <div key={b.title} style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 14, padding: "22px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "#F0FDF4", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {b.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", margin: "0 0 4px" }}>{b.title}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO DE CADASTRO ─────────────────────────── */}
        <section id="cadastrar" style={{ background: "white", padding: "56px 20px", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 24, color: "#111827", margin: "0 0 8px" }}>
                Cadastre seu negócio agora
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280", margin: 0 }}>
                Leva menos de 2 minutos. Comece grátis.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: 64, height: 64, background: "#F0FDF4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle2 size={32} color="#16A34A" />
                </div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, color: "#111827", margin: "0 0 8px" }}>
                  Redirecionando para o cadastro...
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280" }}>
                  Você será levado para o painel de cadastro em instantes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Nome do negócio */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Nome do negócio *
                  </label>
                  <input
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Açaí da Praça"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#16A34A"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Categoria *
                  </label>
                  <select
                    name="categoria"
                    required
                    value={formData.categoria}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 14, color: formData.categoria ? "#111827" : "#9CA3AF", background: "white", cursor: "pointer", boxSizing: "border-box" }}
                  >
                    <option value="" disabled>Selecione uma categoria</option>
                    {CATEGORIAS_FORM.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* WhatsApp */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    WhatsApp do negócio *
                  </label>
                  <input
                    name="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(91) 99999-9999"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#16A34A"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>

                {/* Bairro */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Bairro
                  </label>
                  <input
                    name="bairro"
                    type="text"
                    value={formData.bairro}
                    onChange={handleChange}
                    placeholder="Ex: Centro, Murucupi..."
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#16A34A"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, background: "#16A34A", color: "white",
                    fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15,
                    padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(22,163,74,0.35)", marginTop: 4,
                  }}
                >
                  Cadastrar meu negócio agora <ArrowRight size={16} />
                </button>

                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>
                  Começar é grátis · Sem contrato · Cancele quando quiser
                </p>
              </form>
            )}

            {/* Alt: WhatsApp */}
            <div style={{ marginTop: 28, borderTop: "1px solid #E5E7EB", paddingTop: 24, textAlign: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: "0 0 12px" }}>
                Prefere tirar dúvidas primeiro?
              </p>
              <a
                href={zappiLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25D366", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13,
                  padding: "11px 22px", borderRadius: 10, textDecoration: "none",
                }}
              >
                <MessageCircle size={15} /> Falar com o Zappi
              </a>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────── */}
        <section style={{ background: "#F9FAFB", padding: "48px 20px", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, color: "#111827", margin: "0 0 28px" }}>
              Seu negócio merece estar onde os clientes buscam
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              {[
                { value: "1.300+", label: "Negócios cadastrados" },
                { value: "Gratuito", label: "Para começar" },
                { value: "Barcarena", label: "Cidade conectada" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 28, color: "#16A34A" }}>{s.value}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <DirectoryFooter />
    </div>
  );
}
