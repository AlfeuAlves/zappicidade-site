import { Search, MapPin, MessageCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export function HowItWorksSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="como-funciona" ref={ref} className={`bg-[#F9FAFB] py-20 lg:py-28 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-[#16A34A] text-xs font-bold tracking-wider uppercase mb-3">Para cidadãos</div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[#111827]">
            Simples como mandar <span className="text-[#16A34A]">uma mensagem</span>
          </h2>
          <p className="text-[#4B5563] text-lg leading-relaxed mt-4 font-['Inter']">
            Sem app para instalar, sem cadastro, sem complicação. Só pesquise e fale com o comércio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 relative hover:shadow-[0_12px_40px_rgba(31,41,55,0.12)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#16A34A] text-white text-sm font-bold flex items-center justify-center shadow-[0_4px_20px_rgba(22,163,74,0.35)]">1</div>
            <div className="w-14 h-14 rounded-xl bg-[#DCFCE7] flex items-center justify-center mb-5 text-[#16A34A]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-['Poppins'] font-bold text-lg text-[#111827] mb-2">Pesquise o que precisa</h3>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Digite 'farmácia aberta agora' ou 'pizza delivery' e encontre opções pertinho de você em Barcarena.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 relative hover:shadow-[0_12px_40px_rgba(31,41,55,0.12)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#16A34A] text-white text-sm font-bold flex items-center justify-center shadow-[0_4px_20px_rgba(22,163,74,0.35)]">2</div>
            <div className="w-14 h-14 rounded-xl bg-[#DCFCE7] flex items-center justify-center mb-5 text-[#16A34A]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-['Poppins'] font-bold text-lg text-[#111827] mb-2">Veja informações completas</h3>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Horários, endereço, telefone, avaliações e promoções ativas — tudo em um só lugar, sempre atualizado.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 relative hover:shadow-[0_12px_40px_rgba(31,41,55,0.12)] hover:-translate-y-1 transition-all duration-200">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#16A34A] text-white text-sm font-bold flex items-center justify-center shadow-[0_4px_20px_rgba(22,163,74,0.35)]">3</div>
            <div className="w-14 h-14 rounded-xl bg-[#DCFCE7] flex items-center justify-center mb-5 text-[#16A34A]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-['Poppins'] font-bold text-lg text-[#111827] mb-2">Fale direto pelo WhatsApp</h3>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Um clique e você já está falando com o estabelecimento. Sem intermediários, sem espera.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
