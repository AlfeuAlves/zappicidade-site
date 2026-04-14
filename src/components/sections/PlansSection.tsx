import { Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "https://painel.zappicidadebarcarena.com.br";

export function PlansSection() {
  const { ref, isVisible } = useReveal();

  const plans = [
    {
      name: "Gratuito",
      price: null,
      desc: "Para seu negócio aparecer nas buscas da cidade",
      features: [
        "Perfil básico do comércio",
        "Aparece nas buscas do Zappi",
        "Link direto no WhatsApp",
        "Horários de funcionamento",
        "Localização no mapa",
      ],
      cta: "Cadastrar grátis",
      href: `${FRONTEND_URL}/comerciante/registro`,
      featured: false
    },
    {
      name: "Pro",
      price: "59",
      desc: "Para quem quer se destacar e atrair mais clientes",
      features: [
        "Tudo do plano Gratuito",
        "Destaque nas buscas",
        "Promoções ilimitadas",
        "Fotos e logo personalizados",
        "Analytics — veja quem te encontrou",
        "QR Code personalizado",
        "Suporte prioritário",
      ],
      cta: "Começar 30 dias grátis",
      href: `${FRONTEND_URL}/comerciante/registro`,
      featured: true
    },
  ];

  return (
    <section id="planos" ref={ref} className={`bg-[#F9FAFB] py-20 lg:py-28 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-[#16A34A] text-xs font-bold tracking-wider uppercase mb-3">Planos para comerciantes</div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[#111827]">
            Simples e <span className="text-[#16A34A]">transparente</span>
          </h2>
          <p className="text-[#4B5563] text-lg leading-relaxed mt-4 font-['Inter']">
            Comece grátis. Sem cartão de crédito. Cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={
              plan.featured
                ? "bg-[#16A34A] border-none rounded-[20px] p-8 shadow-[0_8px_32px_rgba(22,163,74,0.2)] relative flex flex-col"
                : "bg-white border-[1.5px] border-[#E5E7EB] rounded-[20px] p-8 flex flex-col"
            }>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  ⭐ Mais popular
                </div>
              )}

              <div className={`font-['Poppins'] font-bold text-xl ${plan.featured ? 'text-white' : 'text-[#111827]'}`}>
                {plan.name}
              </div>

              <div className={`flex items-baseline gap-1 mt-4 mb-1 ${plan.featured ? 'text-white' : 'text-[#111827]'}`}>
                {plan.price ? (
                  <>
                    <span className="text-sm">R$</span>
                    <span className="font-['Poppins'] font-extrabold text-4xl">{plan.price}</span>
                    <span className={`text-sm ${plan.featured ? 'text-white/80' : 'text-[#4B5563]'}`}>/mês</span>
                  </>
                ) : (
                  <span className="font-['Poppins'] font-extrabold text-4xl">R$ 0</span>
                )}
              </div>

              <p className={`text-sm leading-relaxed mt-2 mb-6 ${plan.featured ? 'text-white/90' : 'text-[#4B5563]'}`}>
                {plan.desc}
              </p>

              <div className={`border-t mb-6 ${plan.featured ? 'border-white/20' : 'border-[#E5E7EB]'}`}></div>

              <div className="flex-1 flex flex-col gap-3">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className={`flex items-center gap-2.5 text-sm ${plan.featured ? 'text-white' : 'text-[#4B5563]'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? 'bg-white/20' : 'bg-[#DCFCE7]'}`}>
                      <Check className={`w-3 h-3 ${plan.featured ? 'text-white' : 'text-[#16A34A]'}`} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a href={plan.href} className={
                plan.featured
                  ? "bg-white text-[#16A34A] font-semibold py-3 rounded-full w-full font-['Poppins'] hover:bg-[#F0FDF4] transition-colors mt-8 text-center block"
                  : "bg-[#16A34A] text-white font-semibold py-3 rounded-full w-full font-['Poppins'] hover:bg-[#15803D] shadow-[0_4px_20px_rgba(22,163,74,0.35)] transition-all mt-8 text-center block"
              }>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-[#9CA3AF] text-sm">Plano Pro inclui 30 dias grátis. Sem cartão de crédito necessário.</p>
        </div>
      </div>
    </section>
  );
}
