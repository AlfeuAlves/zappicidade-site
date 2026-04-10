import { Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export function MerchantsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="comerciantes" ref={ref} className={`bg-[#1F2937] py-20 lg:py-28 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px] mx-auto px-6">
        
        {/* Left Column - Image */}
        <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" 
            alt="Comerciante local" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent"></div>
          
          <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-5 shadow-xl w-64">
            <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Métricas do mês</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-['Poppins'] font-extrabold text-xl text-[#111827]">1.240</div>
                <div className="text-xs text-[#9CA3AF]">Visualizações</div>
              </div>
              <div>
                <div className="font-['Poppins'] font-extrabold text-xl text-[#111827]">87</div>
                <div className="text-xs text-[#9CA3AF]">Cliques WhatsApp</div>
              </div>
              <div>
                <div className="font-['Poppins'] font-extrabold text-xl text-[#111827]">23</div>
                <div className="text-xs text-[#9CA3AF]">Leads</div>
              </div>
              <div>
                <div className="font-['Poppins'] font-extrabold text-xl text-[#111827]">4.8⭐</div>
                <div className="text-xs text-[#9CA3AF]">Avaliação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col items-start">
          <div className="text-[#FACC15] text-xs font-bold tracking-wider uppercase mb-4">Para comerciantes</div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-white">
            Seu negócio visto por <span className="text-[#FACC15]">toda Barcarena</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg leading-relaxed mt-4 mb-8 font-['Inter']">
            Mais de 900 estabelecimentos já estão cadastrados. Ative o seu perfil, publique promoções e comece a receber clientes pelo WhatsApp.
          </p>

          <div className="flex flex-col gap-4 mb-10 w-full">
            {[
              "Perfil completo com horários, telefone, endereço e fotos",
              "Analytics: veja quantas pessoas visualizaram seu negócio",
              "Promoções com destaque na busca (plano Pro)",
              "Broadcast direto para clientes via WhatsApp",
              "QR Code personalizado para o seu estabelecimento"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3} />
                </div>
                <span className="text-[#D1D5DB] text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href={`${import.meta.env.VITE_FRONTEND_URL ?? 'https://zappicidade-painel.vercel.app'}/comerciante/login`} className="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827] font-semibold px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(250,204,21,0.40)] hover:-translate-y-0.5 transition-all text-center">
              Ativar meu negócio
            </a>
            <a href="#planos" className="border-2 border-[#374151] hover:border-[#FACC15] text-[#9CA3AF] hover:text-[#FACC15] px-8 py-4 rounded-full transition-all font-semibold text-center">
              Ver planos e preços
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
