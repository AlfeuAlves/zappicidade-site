import { useState } from "react";
import { MessageCircle, Menu, X, LogIn } from "lucide-react";
import { Link, useLocation } from "wouter";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "https://zappicidade-painel.vercel.app";
const ONBOARDING_URL = `${FRONTEND_URL}/comerciante/onboarding`;

export function DirectoryHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/busca", label: "Buscar" },
    { href: "/seja-parceiro", label: "Seja Parceiro" },
  ];

  const zappiLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero buscar comércios em Barcarena.")}`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/logo_principal.png"
            alt="ZappiCidade Barcarena"
            style={{ height: 40, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: location === link.href ? "#16A34A" : "#374151",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                background: location === link.href ? "#F0FDF4" : "transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Seja parceiro — desktop */}
          <a
            href={ONBOARDING_URL}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#16A34A",
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: 8,
              border: "1.5px solid #16A34A",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
            className="hidden-mobile"
          >
            Cadastrar negócio
          </a>

          {/* Entrar — desktop e mobile */}
          <a
            href={FRONTEND_URL}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#374151",
              textDecoration: "none",
              padding: "7px 14px",
              borderRadius: 8,
              border: "1.5px solid #E5E7EB",
              whiteSpace: "nowrap",
              background: "white",
            }}
          >
            <LogIn size={13} />
            Entrar
          </a>

          {/* WhatsApp bot — sempre visível */}
          <a
            href={zappiLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#25D366",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              padding: "7px 14px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
            }}
          >
            <MessageCircle size={14} />
            <span className="hidden-mobile">Falar com Zappi</span>
            <span className="show-mobile">Zappi</span>
          </a>

          {/* Hamburguer mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "#374151",
            }}
            className="show-mobile-flex"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid #F3F4F6",
            padding: "12px 20px 16px",
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: location === link.href ? "#16A34A" : "#111827",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={ONBOARDING_URL}
            style={{
              display: "block",
              marginTop: 12,
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "white",
              background: "#16A34A",
              padding: "12px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Cadastrar meu negócio
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: inline !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .show-mobile-flex { display: none !important; }
        }
      `}</style>
    </header>
  );
}
