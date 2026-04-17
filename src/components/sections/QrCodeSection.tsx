import { QRCodeSVG } from "qrcode.react";
import { useReveal } from "@/hooks/useReveal";

const BOT_NUMBER  = "5591993870599";
const BOT_MESSAGE = "Oi! Quero descobrir o que tem em Barcarena 👀";
const WA_LINK     = `https://wa.me/${BOT_NUMBER}?text=${encodeURIComponent(BOT_MESSAGE)}`;

export function QrCodeSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-20 lg:py-28 bg-white transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Texto */}
          <div className="flex-1 text-center lg:text-left">
            <div className="text-[#16A34A] text-xs font-bold tracking-wider uppercase mb-4 font-['Inter']">
              Acesso instantâneo
            </div>
            <h2 className="font-['Poppins'] font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-[#111827] mb-6">
              Aponte a câmera e<br />
              <span className="text-[#25D366]">entre no ZappiCidade</span>
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8 font-['Inter'] max-w-md mx-auto lg:mx-0">
              Sem baixar app, sem cadastro. Escaneie o QR Code e converse direto com o assistente pelo WhatsApp — encontre comércios, horários, promoções e muito mais.
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto lg:mx-0">
              {[
                { emoji: "🔍", texto: "Busque comércios por categoria ou nome" },
                { emoji: "⏰", texto: "Veja quem está aberto agora" },
                { emoji: "🏷️", texto: "Descubra promoções ativas na cidade" },
                { emoji: "📍", texto: "Encontre negócios perto de você" },
              ].map(({ emoji, texto }) => (
                <div key={texto} className="flex items-center gap-3 text-[#374151] font-['Inter'] text-sm">
                  <span className="text-xl flex-shrink-0">{emoji}</span>
                  <span>{texto}</span>
                </div>
              ))}
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 font-['Poppins'] text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Abrir no WhatsApp
            </a>
          </div>

          {/* QR Code */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            {/* Moldura */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-[#E5E7EB]">
              {/* Cantos decorativos */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-[#25D366] rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-[#25D366] rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-[3px] border-l-[3px] border-[#25D366] rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-[#25D366] rounded-br-lg" />

              <QRCodeSVG
                value={WA_LINK}
                size={220}
                bgColor="#FFFFFF"
                fgColor="#111827"
                level="M"
                imageSettings={{
                  src: "/logo_zappicidade.png",
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>

            {/* Label */}
            <div className="text-center">
              <div className="font-['Poppins'] font-bold text-[#111827] text-base">ZappiCidade Barcarena</div>
              <div className="font-['Inter'] text-[#6B7280] text-sm mt-1">Aponte a câmera do celular</div>
            </div>

            {/* Badge WhatsApp */}
            <div className="flex items-center gap-2 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-4 py-2 rounded-full font-['Inter']">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
              Gratuito · Sem cadastro · Abre direto no WhatsApp
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
