import { Check, Zap, TrendingUp, Star, Crown } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL ?? "https://painel.zappicidadebarcarena.com.br";
const ONBOARDING_URL = `${FRONTEND_URL}/comerciante/onboarding`;

const plans = [
  {
    id: "basico",
    icon: <Zap className="w-5 h-5 text-[#6B7280]" />,
    name: "Básico",
    badge: null as string | null,
    price: "0",
    period: "para sempre",
    desc: "Cadastro gratuito",
    featured: false,
    features: [
      "Sua empresa aparece nas buscas",
      "Presença básica na plataforma",
      "Link WhatsApp para clientes",
      "QR Code do seu negócio",
    ],
    cta: "Começar grátis",
  },
  {
    id: "pro_mensal",
    icon: <TrendingUp className="w-5 h-5 text-[#16A34A]" />,
    name: "PRO Mensal",
    badge: null as string | null,
    price: "59,90",
    period: "/mês",
    desc: "Ideal para testar",
    featured: false,
    features: [
      "Mais visibilidade",
      "Melhor posicionamento nas buscas",
      "Promoções e ofertas ilimitadas",
      "Analytics de visitas",
    ],
    cta: "Ativar plano PRO",
  },
  {
    id: "pro_3meses",
    icon: <Star className="w-5 h-5 text-[#16A34A]" />,
    name: "PRO – 3 Meses",
    badge: null as string | null,
    price: "149,90",
    period: "3 meses",
    desc: "Economia em relação ao mensal",
    featured: false,
    features: [
      "Mais tempo aparecendo para clientes",
      "Mais chances de contato",
      "Tudo do PRO Mensal",
      "Suporte via WhatsApp",
    ],
    cta: "Escolher plano",
  },
  {
    id: "pro_6meses",
    icon: <Crown className="w-5 h-5 text-white" />,
    name: "PRO – 6 Meses",
    badge: "MAIS ESCOLHIDO" as string | null,
    price: "269,90",
    period: "6 meses",
    desc: "Melhor custo-benefício",
    featured: true,
    features: [
      "Destaque nas buscas",
      "Maior geração de clientes",
      "Tudo do PRO 3 Meses",
      "Prioridade no suporte",
    ],
    cta: "Quero mais clientes",
  },
  {
    id: "pro_12meses",
    icon: <Crown className="w-5 h-5 text-[#16A34A]" />,
    name: "PRO – 12 Meses",
    badge: "MELHOR CUSTO" as string | null,
    price: "479,90",
    period: "12 meses",
    desc: "Máxima economia",
    featured: false,
    features: [
      "Presença contínua o ano todo",
      "Prioridade na plataforma",
      "Tudo do PRO 6 Meses",
      "Maior visibilidade garantida",
    ],
    cta: "Quero o melhor plano",
  },
];

export function PlansSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="planos"
      ref={ref}
      className={`bg-[#F9FAFB] py-20 lg:py-28 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Cabeçalho */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] rounded-full px-4 py-1 mb-4">
            <Zap className="w-3 h-3 text-[#16A34A]" />
            <span className="text-[#16A34A] text-xs font-bold tracking-wider uppercase font-['Poppins']">
              Planos ZappiCidade
            </span>
          </div>
          <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[#111827]">
            Escolha como sua empresa vai{" "}
            <span className="text-[#16A34A]">aparecer</span>
          </h2>
          <p className="text-[#4B5563] text-lg leading-relaxed mt-4 font-['Inter']">
            Mais visibilidade, mais contatos e mais vendas todos os dias
          </p>
        </div>

        {/* Grade de planos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-[20px] p-6 ${
                plan.featured
                  ? "bg-gradient-to-br from-[#16A34A] to-[#15803D] shadow-[0_12px_40px_rgba(22,163,74,0.3)] scale-[1.03]"
                  : "bg-white border-[2px] border-[#E5E7EB]"
              }`}
            >
              {/* Selo */}
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3.5 py-1 rounded-full whitespace-nowrap shadow-md font-['Poppins'] tracking-wider ${
                    plan.featured
                      ? "bg-white text-[#16A34A]"
                      : "bg-[#16A34A] text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Ícone + nome */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    plan.featured ? "bg-white/20" : "bg-[#F0FDF4]"
                  }`}
                >
                  {plan.icon}
                </div>
                <div>
                  <div
                    className={`font-['Poppins'] font-bold text-sm leading-tight ${
                      plan.featured ? "text-white" : "text-[#16A34A]"
                    }`}
                  >
                    {plan.name}
                  </div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      plan.featured ? "text-white/70" : "text-[#9CA3AF]"
                    }`}
                  >
                    {plan.desc}
                  </div>
                </div>
              </div>

              {/* Preço */}
              <div className="mb-5">
                <span
                  className={`font-['Poppins'] font-extrabold text-3xl leading-none ${
                    plan.featured ? "text-white" : "text-[#16A34A]"
                  }`}
                >
                  R${plan.price}
                </span>
                <span
                  className={`text-xs ml-1 ${
                    plan.featured ? "text-white/70" : "text-[#9CA3AF]"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Recursos */}
              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        plan.featured ? "bg-white/25" : "bg-[#DCFCE7]"
                      }`}
                    >
                      <Check
                        className={`w-2.5 h-2.5 ${
                          plan.featured ? "text-white" : "text-[#16A34A]"
                        }`}
                        strokeWidth={3}
                      />
                    </div>
                    <span
                      className={`text-xs leading-snug ${
                        plan.featured ? "text-white/90" : "text-[#374151]"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Botão */}
              <a
                href={ONBOARDING_URL}
                className={`w-full py-3 rounded-xl text-xs font-bold font-['Poppins'] transition-opacity hover:opacity-90 text-center block ${
                  plan.featured
                    ? "bg-white text-[#16A34A]"
                    : plan.id === "basico"
                    ? "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]"
                    : "bg-[#16A34A] text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[#9CA3AF] text-sm font-['Inter'] italic">
            "Quanto mais tempo sua empresa aparece, mais clientes você conquista — e menos você paga por isso."
          </p>
        </div>
      </div>
    </section>
  );
}
