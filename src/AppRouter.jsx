import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe"; // <-- importado!
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import MeusDados from "./pages/MeusDados";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/produtos/:id" element={<ProdutoDetalhe />} /> {/* <-- agora vem antes */}
  <Route path="/produtos" element={<Produtos />} />
  <Route path="/cadastro" element={<Cadastro />} />
  <Route path="/carrinho" element={<Carrinho />} />
  <Route path="/meus-dados" element={<MeusDados />} />
  <Route path="*" element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
}

