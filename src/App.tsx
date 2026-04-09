import { useState, useCallback } from "react";
import Navbar from './components/Navbar';
import {
  HeroSection, HowItWorksSection, CategoriesSection,
  MerchantsSection, PlansSection, CtaSection, FooterSection,
  SearchResultsSection,
} from './components/sections';
import { useCidadeStats } from './hooks/useCidadeStats';
import { api, type Comercio } from './lib/api';

export default function App() {
  const { resumo, bairros, loading } = useCidadeStats();

  const [searchQuery, setSearchQuery] = useState("");
  const [zappiQuery, setZappiQuery] = useState("");
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [total, setTotal] = useState(0);
  const [searching, setSearching] = useState(false);

  const handleSearch = useCallback(async (params: { busca: string; categoria: string; bairro: string }) => {
    const { busca, categoria, bairro } = params;
    setSearchQuery(busca || categoria || bairro || "todos");
    setZappiQuery(
      `Olá! Quero buscar: ${busca || "comércios"}${bairro && bairro !== "Todos os bairros" ? ` em ${bairro}` : ""} em Barcarena.`
    );
    setSearching(true);

    // Scroll suave para os resultados
    setTimeout(() => {
      document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    try {
      const p: Record<string, string | number | boolean> = { limit: 24 };
      if (busca)     p.busca = busca;
      if (categoria) p.categoria = categoria;
      if (bairro && bairro !== "Todos os bairros") p.bairro = bairro;

      const res = await api.comercios.listar(p);
      setComercios(res.data);
      setTotal(res.meta.total);
    } catch (e) {
      console.error(e);
      setComercios([]);
      setTotal(0);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleLimpar = useCallback(() => {
    setSearchQuery("");
    setComercios([]);
    setTotal(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="antialiased bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar totalComercios={resumo?.stats.total_comercios} />
      <main>
        <HeroSection
          totalComercios={resumo?.stats.total_comercios}
          bairros={bairros}
          loading={loading}
          onSearch={handleSearch}
        />

        <div id="search-results">
          <SearchResultsSection
            query={searchQuery}
            comercios={comercios}
            total={total}
            loading={searching}
            onLimpar={handleLimpar}
            zappiQuery={zappiQuery}
          />
        </div>

        {!searchQuery && (
          <>
            <HowItWorksSection />
            <CategoriesSection
              categorias={resumo?.stats.categorias}
              loading={loading}
            />
            <MerchantsSection />
            <PlansSection />
            <CtaSection totalComercios={resumo?.stats.total_comercios} />
          </>
        )}
      </main>
      <FooterSection />
    </div>
  );
}
