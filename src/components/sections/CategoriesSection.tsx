import { useReveal } from "@/hooks/useReveal";
import type { CidadeResumo } from "@/lib/api";

// Mapeamento de slug → estilo visual
const CAT_STYLES: Record<string, { color: string; bg: string }> = {
  "restaurantes":     { color: "#E11D48", bg: "#FFF1F2" },
  "supermercados":    { color: "#2563EB", bg: "#EFF6FF" },
  "farmacias":        { color: "#7C3AED", bg: "#F5F3FF" },
  "saloes-de-beleza": { color: "#DB2777", bg: "#FDF2F8" },
  "padarias":         { color: "#D97706", bg: "#FFFBEB" },
  "clinicas":         { color: "#0891B2", bg: "#ECFEFF" },
  "bares":            { color: "#9333EA", bg: "#FAF5FF" },
  "academias":        { color: "#16A34A", bg: "#F0FDF4" },
  "mecanicas":        { color: "#475569", bg: "#F8FAFC" },
  "barbearias":       { color: "#B45309", bg: "#FEF3C7" },
  "pet-shops":        { color: "#059669", bg: "#ECFDF5" },
  "dentistas":        { color: "#0EA5E9", bg: "#F0F9FF" },
  "escolas":          { color: "#6366F1", bg: "#EEF2FF" },
  "bancos":           { color: "#1D4ED8", bg: "#EFF6FF" },
  "cafes":            { color: "#92400E", bg: "#FEF9C3" },
  "lavanderias":      { color: "#0891B2", bg: "#ECFEFF" },
  "lava-rapidos":     { color: "#0E7490", bg: "#CFFAFE" },
  "veterinarios":     { color: "#15803D", bg: "#DCFCE7" },
  "lojas-de-roupa":      { color: "#BE185D", bg: "#FDF2F8" },
  "imobiliarias":        { color: "#0369A1", bg: "#F0F9FF" },
  "materiais-construcao":{ color: "#92400E", bg: "#FEF3C7" },
  "eletronicos":         { color: "#1D4ED8", bg: "#DBEAFE" },
  "oticas":              { color: "#6D28D9", bg: "#EDE9FE" },
  "joalherias":          { color: "#B45309", bg: "#FEF9C3" },
  "papelarias":          { color: "#0891B2", bg: "#CFFAFE" },
  "moveis":              { color: "#7C3AED", bg: "#F5F3FF" },
  "bicicletas":          { color: "#15803D", bg: "#DCFCE7" },
  "seguros":             { color: "#1E40AF", bg: "#EFF6FF" },
  "agencias-viagem":     { color: "#0E7490", bg: "#ECFEFF" },
  "fisioterapia":        { color: "#059669", bg: "#ECFDF5" },
  "psicologia":          { color: "#7C3AED", bg: "#F5F3FF" },
  "advocacia":           { color: "#1D4ED8", bg: "#EFF6FF" },
  "pintores":            { color: "#D97706", bg: "#FFFBEB" },
  "encanadores":         { color: "#0369A1", bg: "#E0F2FE" },
  "eletricistas":        { color: "#CA8A04", bg: "#FEFCE8" },
  "concessionarias":     { color: "#475569", bg: "#F1F5F9" },
  "cinemas":             { color: "#9333EA", bg: "#FAF5FF" },
  "outros":              { color: "#6B7280", bg: "#F9FAFB" },
};

interface CategoriesSectionProps {
  categorias?: CidadeResumo["stats"]["categorias"];
  loading?: boolean;
}

export function CategoriesSection({ categorias = [], loading = false }: CategoriesSectionProps) {
  const { ref, isVisible } = useReveal();

  // Exclui "outros" e ordena por total desc, mostra até 12
  const cats = categorias
    .filter(c => c.slug !== "outros")
    .sort((a, b) => b.total - a.total)
    .slice(0, 12);

  return (
    <section
      id="categorias"
      ref={ref}
      className={`bg-white py-20 lg:py-24 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[#111827]">
            O que você procura <span className="text-[#16A34A]">hoje?</span>
          </h2>
          <a href="#" className="text-[#16A34A] font-semibold text-sm hover:text-[#15803D] transition-colors">
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white border-[1.5px] border-[#E5E7EB] rounded-[20px] animate-pulse">
                  <div className="w-14 h-14 rounded-xl bg-gray-100" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                  <div className="h-3 w-10 bg-gray-100 rounded" />
                </div>
              ))
            : cats.map((cat, idx) => {
                const style = CAT_STYLES[cat.slug] ?? CAT_STYLES["outros"];
                return (
                  <div
                    key={cat.slug}
                    className="flex flex-col items-center gap-3 p-6 bg-white border-[1.5px] border-[#E5E7EB] rounded-[20px] cursor-pointer hover:border-[#16A34A] hover:shadow-[0_12px_40px_rgba(31,41,55,0.12)] hover:-translate-y-1 transition-all duration-200 group text-center"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 text-2xl"
                      style={{ backgroundColor: style.bg }}
                    >
                      {cat.icone}
                    </div>
                    <div className="text-sm font-semibold text-[#111827] font-['Poppins'] leading-tight">
                      {cat.nome}
                    </div>
                    <div className="text-xs text-[#9CA3AF]">{cat.total}+</div>
                  </div>
                );
              })
          }
        </div>
      </div>
    </section>
  );
}
