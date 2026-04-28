import { MessageCircle, MapPin } from "lucide-react";
import { Link } from "wouter";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "https://zappicidade-painel.vercel.app";
const ONBOARDING_URL = `${FRONTEND_URL}/comerciante/onboarding`;

export function DirectoryFooter() {
  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero buscar comércios em Barcarena.")}`;

  return (
    <footer style={{ background: "#111827", color: "white", padding: "40px 20px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <img
                src="/logo_principal.png"
                alt="ZappiCidade Barcarena"
                style={{ height: 44, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
              Guia comercial digital de Barcarena. Encontre qualquer comércio e fale pelo WhatsApp.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
              <MapPin size={13} color="#9CA3AF" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}>Barcarena, Pará — Brasil</span>
            </div>
          </div>

          {/* Links cidadão */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: "white", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Para Cidadãos
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/", label: "Buscar comércios" },
                { href: "/busca", label: "Ver todos" },
                { href: zappiLink, label: "Falar com Zappi", external: true },
              ].map(link => (
                link.external
                  ? <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>{link.label} ↗</a>
                  : <Link key={link.label} href={link.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Links comerciante */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: "white", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Para Comerciantes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/seja-parceiro", label: "Seja parceiro", external: false },
                { href: ONBOARDING_URL, label: "Cadastrar negócio", external: true },
                { href: FRONTEND_URL, label: "Acessar painel", external: true },
              ].map(link => (
                link.external
                  ? <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>{link.label} ↗</a>
                  : <Link key={link.label} href={link.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>{link.label}</Link>
              ))}
            </div>
          </div>

          {/* CTA WhatsApp */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 13, color: "white", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Fale com o Zappi
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 14 }}>
              Não achou o que procurava? O Zappi conhece Barcarena inteirinha e te ajuda pelo WhatsApp.
            </p>
            <a
              href={zappiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#25D366",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                padding: "10px 20px",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
              }}
            >
              <MessageCircle size={15} />
              Conversar agora
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
            © {new Date().getFullYear()} ZappiCidade Barcarena. Todos os direitos reservados.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
              Feito com ❤️ em Barcarena, PA
            </span>
            <a
              href={`${FRONTEND_URL}/admin`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#374151", textDecoration: "none", opacity: 0.5 }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.5"}
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
