import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./Header.css";

export default function Header() {
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const updateCartQuantity = useCallback(() => {
    try {
      const dados = localStorage.getItem("carrinho");
      const itens = dados ? JSON.parse(dados) : [];
      const totalItens = itens.reduce(
        (total, item) => total + Math.max(1, item.quantidade || 1),
        0
      );
      setQuantidadeCarrinho(totalItens);
    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error);
      setQuantidadeCarrinho(0);
    }
  }, []);

  useEffect(() => {
    updateCartQuantity();

    const handleCustomEvent = () => updateCartQuantity();
    const handleStorageEvent = (e) => {
      if (e.key === "carrinho") updateCartQuantity();
    };

    window.addEventListener("carrinhoAtualizado", handleCustomEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("carrinhoAtualizado", handleCustomEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [updateCartQuantity]);

  return (
    <header className="site-header">
      <nav className="nav-container">
        <h1 className="logo">
          <Link to="/">Loja BIG STORE MVP</Link>
        </h1>

        {/* Botão para abrir o menu no mobile */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menu de navegação">
          ☰
        </button>

        {/* Links em desktop */}
        <ul className="nav-links desktop">
          <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Início</Link></li>
          <li><Link to="/produtos" className={location.pathname === "/produtos" ? "active" : ""}>Produtos</Link></li>
          <li><Link to="/cadastro" className={location.pathname === "/cadastro" ? "active" : ""}>Cadastro</Link></li>
          <li>
            <Link
              to="/carrinho"
              className={`carrinho-link ${location.pathname === "/carrinho" ? "active" : ""}`}
              aria-label={`Carrinho com ${quantidadeCarrinho} itens`}
            >
              Carrinho
              <span className="badge" aria-live="polite">
                {quantidadeCarrinho > 0 ? quantidadeCarrinho : null}
              </span>
            </Link>
          </li>
          <li><Link to="/meus-dados" className={location.pathname === "/meus-dados" ? "active" : ""}>Meus Dados</Link></li>
        </ul>

        {/* Menu suspenso no mobile */}
        {menuAberto && (
          <ul className="nav-links mobile">
            <li><Link to="/" onClick={toggleMenu}>Início</Link></li>
            <li><Link to="/produtos" onClick={toggleMenu}>Produtos</Link></li>
            <li><Link to="/cadastro" onClick={toggleMenu}>Cadastro</Link></li>
            <li><Link to="/carrinho" onClick={toggleMenu}>Carrinho</Link></li>
            <li><Link to="/meus-dados" onClick={toggleMenu}>Meus Dados</Link></li>
          </ul>
        )}
      </nav>

      <div className="url-info" aria-hidden="true">
        (Você está em: {location.pathname})
      </div>
    </header>
  );
}