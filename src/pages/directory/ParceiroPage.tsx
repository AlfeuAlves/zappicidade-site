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

        {/* ── COMO FUNCIONA ─────────────────────────────────── */}
        <section id="cadastrar" style={{ background: "white", padding: "56px 20px", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 24, color: "#111827", margin: "0 0 8px" }}>
                Como funciona o cadastro
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280", margin: 0 }}>
                Simples e rápido — leva menos de 2 minutos
              </p>
            </div>

            {/* Passo a passo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 40 }}>
              {[
                {
                  num: "1",
                  titulo: "Crie sua conta de comerciante",
                  desc: "Informe seu nome e WhatsApp para criar sua conta no painel ZappiCidade.",
                  icon: "👤",
                },
                {
                  num: "2",
                  titulo: "Encontre seu estabelecimento",
                  desc: "Busque o nome do seu negócio — temos mais de 1.300 estabelecimentos já cadastrados em Barcarena.",
                  icon: "🔍",
                },
                {
                  num: "3",
                  titulo: "Não encontrou? Cadastre um novo",
                  desc: "Se seu estabelecimento ainda não está na base, basta clicar em \"Cadastrar novo\" e preencher as informações.",
                  icon: "➕",
                },
                {
                  num: "4",
                  titulo: "Aguarde a aprovação",
                  desc: "Nossa equipe valida a solicitação e aprova a associação do seu perfil ao estabelecimento. Em geral, aprovamos em menos de 24h.",
                  icon: "✅",
                },
              ].map((step, i, arr) => (
                <div key={step.num} style={{ display: "flex", gap: 16, position: "relative" }}>
                  {/* Linha conectora */}
                  {i < arr.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 44, width: 2, height: "calc(100% - 12px)", background: "#E5E7EB", zIndex: 0 }} />
                  )}

                  {/* Círculo numerado */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: "#16A34A", color: "white", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 15,
                  }}>
                    {step.num}
                  </div>

                  {/* Conteúdo */}
                  <div style={{ paddingBottom: i < arr.length - 1 ? 28 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 18 }}>{step.icon}</span>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15, color: "#111827", margin: 0 }}>
                        {step.titulo}
                      </p>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA principal */}
            <div style={{ textAlign: "center" }}>
              <a
                href={ONBOARDING_URL}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  gap: 8, background: "#16A34A", color: "white",
                  fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15,
                  padding: "15px 36px", borderRadius: 12, textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(22,163,74,0.35)",
                  width: "100%", boxSizing: "border-box",
                }}
              >
                Começar agora — é grátis <ArrowRight size={16} />
              </a>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 10 }}>
                Sem contrato · Cancele quando quiser
              </p>
            </div>

            {/* Alt: WhatsApp */}
            <div style={{ marginTop: 28, borderTop: "1px solid #E5E7EB", paddingTop: 24, textAlign: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: "0 0 12px" }}>
                Ficou com dúvida? Fale com nossa equipe
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
                <MessageCircle size={15} /> Falar pelo WhatsApp
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
