import { Router, Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/directory/HomePage";
import { ResultsPage } from "./pages/directory/ResultsPage";
import { ParceiroPage } from "./pages/directory/ParceiroPage";
import { ModalComercio } from "./components/sections/SearchResultsSection";
import { api, type Comercio } from "./lib/api";

function AppRoutes() {
  const [location] = useLocation();
  const [slugModal, setSlugModal] = useState<Comercio | null>(null);

  // Abre o modal automaticamente quando a URL é /c/:slug
  useEffect(() => {
    const match = location.match(/^\/c\/([^/]+)/);
    if (!match) {
      setSlugModal(null);
      return;
    }
    const slug = match[1];
    api.comercios.porSlug(slug)
      .then(c => { if (c) setSlugModal(c); })
      .catch(() => {});
  }, [location]);

  return (
    <>
      <Switch>
        <Route path="/seja-parceiro" component={ParceiroPage} />
        <Route path="/busca" component={ResultsPage} />
        <Route component={HomePage} />
      </Switch>

      {slugModal && (
        <ModalComercio
          c={slugModal}
          onClose={() => {
            setSlugModal(null);
            window.history.pushState({}, "", "/");
          }}
        />
      )}
    </>
  );
}

export default function AppDirectory() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
