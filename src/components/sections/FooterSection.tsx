export function FooterSection() {
  return (
    <footer className="bg-[#111827] py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1F2937]">
          {/* Col 1 */}
          <div>
            <img src="/logo_principal.png" alt="ZappiCidade" className="h-12 w-auto object-contain mb-4" />
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs font-['Inter']">
              O assistente digital da cidade de Barcarena, PA. Encontre qualquer comércio, veja promoções e fale pelo WhatsApp.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-4 bg-[#1F2937] px-3 py-1.5 rounded-full text-[#4ADE80] text-xs font-semibold tracking-wide">
              📍 Barcarena, Pará
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explorar</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Todos os comércios</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Restaurantes</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Farmácias</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Salões</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Ver categorias</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Para Comerciantes</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Ativar meu negócio</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Ver planos</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Login</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Barcarena</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Sobre o projeto</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">Imprensa</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <div className="text-[#4B5563] text-xs font-['Inter']">
            © 2026 ZappiCidade · Barcarena, Pará · Todos os direitos reservados
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-[#4B5563] text-xs hover:text-[#9CA3AF] transition-colors">Política de Privacidade</a>
            <a href="#" className="text-[#4B5563] text-xs hover:text-[#9CA3AF] transition-colors">Termos de Uso</a>
            <a href="#" className="text-[#4B5563] text-xs hover:text-[#9CA3AF] transition-colors">LGPD</a>
            <a href="https://zappicidade-painel.vercel.app/comerciante/login" target="_blank" rel="noopener noreferrer" className="text-[#4B5563] text-xs hover:text-[#FACC15] transition-colors">⚙️ Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
