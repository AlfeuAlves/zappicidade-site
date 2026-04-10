import { MessageCircle, Store } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface CtaSectionProps { totalComercios?: number }

export function CtaSection({ totalComercios }: CtaSectionProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section ref={ref} className={`bg-[#1F2937] py-20 lg:py-28 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[#FACC15] text-xs font-bold tracking-wider uppercase mb-4">Comece hoje — é grátis</div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-white">
            Barcarena inteira na <span className="text-[#FACC15]">palma da mão</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg leading-relaxed mt-4 mb-10 max-w-lg mx-auto font-['Inter']">
            Cidadão ou comerciante — o ZappiCidade foi feito pra você. Sem complicação, sem cadastro obrigatório.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
              <MessageCircle className="w-5 h-5" /> Buscar agora — é grátis
            </button>
            <a href={`${import.meta.env.VITE_FRONTEND_URL ?? 'https://frontend-two-indol-36.vercel.app'}/comerciante/login`} className="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827] font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
              <Store className="w-5 h-5" /> Ativar meu negócio
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto mt-12 pt-12 border-t border-[#374151]">
            <div>
              <div className="font-['Poppins'] font-extrabold text-3xl text-white">{(totalComercios ?? 927).toLocaleString("pt-BR")}</div>
              <div className="text-xs text-[#6B7280] mt-1 font-semibold uppercase tracking-wider">Comércios cadastrados</div>
            </div>
            <div>
              <div className="font-['Poppins'] font-extrabold text-3xl text-white">20</div>
              <div className="text-xs text-[#6B7280] mt-1 font-semibold uppercase tracking-wider">Categorias</div>
            </div>
            <div>
              <div className="font-['Poppins'] font-extrabold text-3xl text-white">100%</div>
              <div className="text-xs text-[#6B7280] mt-1 font-semibold uppercase tracking-wider">Gratuito para você</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
