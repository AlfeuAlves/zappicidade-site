import { useState, useRef } from "react";
import { MessageCircle, Search, MapPin, ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:3000";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5591993870599";

const TIPO_TODOS = { label: "Todos os tipos", slug: "" };

interface Categoria {
  slug: string;
  nome: string;
  icone: string;
  total: number;
}

interface HeroSectionProps {
  totalComercios?: number;
  bairros?: string[];
  categorias?: Categoria[];
  loading?: boolean;
  onSearch?: (params: { busca: string; categoria: string; bairro: string }) => void;
}

export function HeroSection({ totalComercios, bairros = [], categorias = [], loading = false, onSearch }: HeroSectionProps) {
  const { ref, isVisible } = useReveal();
  const [query, setQuery] = useState("");
  const [bairroSel, setBairroSel] = useState("Todos os bairros");
  const tipos = [TIPO_TODOS, ...categorias.map(c => ({ label: `${c.icone} ${c.nome}`, slug: c.slug }))];
  const [tipoSel, setTipoSel] = useState(TIPO_TODOS);
  const bairrosList = ["Todos os bairros", ...bairros];
  const [showBairros, setShowBairros] = useState(false);
  const [showTipos, setShowTipos] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  const scrollChips = (dir: "left" | "right") => {
    if (chipsRef.current) {
      chipsRef.current.scrollBy({ left: dir === "right" ? 160 : -160, behavior: "smooth" });
    }
  };

  // ── Busca principal → inline na página ──
  const handleSearch = () => {
    if (onSearch) {
      onSearch({ busca: query.trim(), categoria: tipoSel.slug, bairro: bairroSel });
    }
  };

  // ── CTA secundário → bot Zappi no WhatsApp ──
  const handleZappi = () => {
    const msg = `Olá! Quero buscar: ${query || "comércios"}${bairroSel !== "Todos os bairros" ? ` em ${bairroSel}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      ref={ref}
      className={`bg-white py-20 lg:py-28 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-[1200px] mx-auto px-6">

        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FEF9C3] text-[#854D0E] border border-[#FDE68A] mb-6">
            📍 Barcarena, Pará · {loading ? "..." : (totalComercios ?? 927).toLocaleString("pt-BR")} comércios
          </div>

          <h1 className="font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[#111827] font-['Poppins']">
            Tudo o que você precisa em <span className="text-[#16A34A]">Barcarena,</span><br />
            a um clique de distância.
          </h1>

          <p className="font-['Inter'] text-lg text-[#4B5563] leading-relaxed max-w-lg mt-5 mb-7">
            Encontre restaurantes, farmácias, salões e qualquer comércio de Barcarena. Veja fotos, horários e fale direto pelo WhatsApp.
          </p>

          {/* ── SEARCH BAR ── */}
          <div className="w-full bg-white border-2 border-[#E5E7EB] rounded-2xl shadow-[0_8px_32px_rgba(31,41,55,0.10)] overflow-visible focus-within:border-[#16A34A] transition-colors duration-200">
            {/* Main input row */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Search className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Busque restaurantes, farmácias, salões..."
                className="flex-1 bg-transparent text-[#111827] placeholder-[#9CA3AF] text-sm font-['Inter'] outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(22,163,74,0.35)] hover:shadow-[0_6px_28px_rgba(22,163,74,0.50)] hover:-translate-y-0.5 flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>

            {/* Filters row — bairro dropdown + category chips */}
            <div className="border-t border-[#F3F4F6]">
              {/* Bairro selector */}
              <div className="relative px-4 py-2 border-b border-[#F3F4F6]">
                <button
                  onClick={() => { setShowBairros(!showBairros); setShowTipos(false); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#16A34A] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#9CA3AF]" />
                  <span>{bairroSel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${showBairros ? "rotate-180" : ""}`} />
                </button>
                {showBairros && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_8px_32px_rgba(31,41,55,0.12)] z-50 min-w-[200px] max-h-52 overflow-y-auto py-1">
                    {bairrosList.map((b) => (
                      <button
                        key={b}
                        onClick={() => { setBairroSel(b); setShowBairros(false); }}
                        className={`w-full text-left text-xs px-4 py-2.5 hover:bg-[#F0FDF4] hover:text-[#16A34A] transition-colors font-['Inter'] ${
                          bairroSel === b ? "text-[#16A34A] font-semibold bg-[#F0FDF4]" : "text-[#4B5563]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category chips — horizontal scroll with desktop arrows */}
              <div className="relative flex items-center">
                {/* Left arrow — desktop only */}
                <button
                  onClick={() => scrollChips("left")}
                  className="hidden lg:flex absolute left-0 z-10 w-7 h-7 items-center justify-center bg-white border border-[#E5E7EB] rounded-full shadow-sm hover:border-[#16A34A] hover:text-[#16A34A] transition-colors flex-shrink-0 ml-2"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div
                  ref={chipsRef}
                  className="flex gap-2 px-4 lg:px-10 py-2.5 overflow-x-auto"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
                >
                  {tipos.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => setTipoSel(t)}
                      className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-['Inter'] ${
                        tipoSel.slug === t.slug
                          ? "bg-[#16A34A] text-white border-[#16A34A] shadow-sm"
                          : "bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#16A34A] hover:text-[#16A34A]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Right arrow — desktop only */}
                <button
                  onClick={() => scrollChips("right")}
                  className="hidden lg:flex absolute right-0 z-10 w-7 h-7 items-center justify-center bg-white border border-[#E5E7EB] rounded-full shadow-sm hover:border-[#16A34A] hover:text-[#16A34A] transition-colors flex-shrink-0 mr-2"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── CTAs abaixo da busca ── */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Primário: ver resultados no site */}
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(22,163,74,0.35)]"
            >
              <ArrowRight className="w-4 h-4" />
              Ver resultados
            </button>

            {/* Divisor */}
            <span className="text-xs text-[#D1D5DB] font-['Inter']">ou</span>

            {/* Secundário: perguntar ao Zappi (bot) */}
            <button
              onClick={handleZappi}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Perguntar ao Zappi
            </button>

            <span className="text-xs text-[#9CA3AF] font-['Inter'] hidden sm:inline">Sem cadastro · Gratuito</span>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] text-xs font-semibold px-4 py-1.5 rounded-full">✓ 100% gratuito para cidadãos</span>
            <span className="bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] text-xs font-semibold px-4 py-1.5 rounded-full">✓ Sem cadastro necessário</span>
            <span className="bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] text-xs font-semibold px-4 py-1.5 rounded-full">✓ Atualizado em tempo real</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-8 pt-8 border-t border-[#E5E7EB] w-full">
            <div>
              <div className="font-['Poppins'] font-extrabold text-2xl text-[#111827]">
                {loading ? "..." : (totalComercios ?? 927).toLocaleString("pt-BR")}
              </div>
              <div className="text-xs text-[#9CA3AF] mt-1 font-semibold uppercase tracking-wider">Estabelecimentos</div>
            </div>
            <div>
              <div className="font-['Poppins'] font-extrabold text-2xl text-[#111827]">20</div>
              <div className="text-xs text-[#9CA3AF] mt-1 font-semibold uppercase tracking-wider">Categorias</div>
            </div>
            <div>
              <div className="font-['Poppins'] font-extrabold text-2xl text-[#111827]">Barcarena</div>
              <div className="text-xs text-[#9CA3AF] mt-1 font-semibold uppercase tracking-wider">Pará · PA</div>
            </div>
          </div>
        </div>

        {/* Right: image panel */}
        <div className="relative rounded-[24px] overflow-hidden bg-[#1F2937] aspect-[4/5] w-full shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
            alt="Comércio local em Barcarena"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
            <div>
              <div className="text-white font-semibold text-sm">Açaí da Praça — Aberto</div>
              <div className="text-[#4ADE80] text-xs">4.8 ⭐ · WhatsApp disponível</div>
            </div>
          </div>

          <div className="absolute top-6 right-6 bg-[#FACC15] rounded-full px-4 py-1.5 text-[#111827] text-xs font-bold">
            🏷️ 3 promoções ativas
          </div>
        </div>

      </div>
    </section>
  );
}
