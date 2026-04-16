import { Link } from "wouter";
import { Menu, LogIn } from "lucide-react";

const PAINEL_URL = "https://painel.zappicidadebarcarena.com.br/comerciante/login"

interface NavbarProps { totalComercios?: number }

export default function Navbar({ totalComercios }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] h-[76px] flex items-center">
      <div className="max-w-[1200px] w-full mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo_principal.png" alt="ZappiCidade" className="h-14 w-auto object-contain cursor-pointer" />
          </Link>
        </div>

        <div className="hidden lg:flex gap-8">
          <a href="/#categorias" className="font-['Inter'] font-medium text-[#4B5563] hover:text-[#111827] transition-colors">Explorar Comércios</a>
          <a href="/#comerciantes" className="font-['Inter'] font-medium text-[#4B5563] hover:text-[#111827] transition-colors">Para Comerciantes</a>
          <a href="/#planos" className="font-['Inter'] font-medium text-[#4B5563] hover:text-[#111827] transition-colors">Planos</a>
          <a href="/#cidade" className="font-['Inter'] font-medium text-[#4B5563] hover:text-[#111827] transition-colors">Barcarena</a>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-bold px-3 py-1 rounded-full">
            {(totalComercios ?? 927).toLocaleString("pt-BR")} negócios
          </span>
          <a
            href={PAINEL_URL}
            className="flex items-center gap-1.5 font-['Inter'] font-semibold text-sm text-[#4B5563] hover:text-[#16A34A] border border-[#E5E7EB] hover:border-[#16A34A] px-4 py-2 rounded-full transition-all"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </a>
          <button className="bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.35)] hover:-translate-y-0.5 transition-all">
            Buscar agora
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <a href={PAINEL_URL} className="flex items-center gap-1 text-sm font-semibold text-[#16A34A] border border-[#16A34A] px-3 py-1.5 rounded-full">
            <LogIn className="w-4 h-4" /> Entrar
          </a>
          <button className="p-2 text-[#4B5563] hover:bg-gray-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
