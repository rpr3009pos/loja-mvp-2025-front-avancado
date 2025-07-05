import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './NotFound.css';
import logo from '../assets/preview.webp';

export default function NotFound() {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let position = 0;
    let direction = 1;
    const speed = 1.5;
    const maxPosition = 80;

    const animateLogo = () => {
      position += direction * speed;
      
      if (position > maxPosition || position < -maxPosition) {
        direction *= -1;
      }
      
      logo.style.transform = `translateX(${position}px) scaleX(${direction > 0 ? 1 : -1})`;
      requestAnimationFrame(animateLogo);
    };

    const animationId = requestAnimationFrame(animateLogo);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Seção de logo aprimorada */}
        <div className="logo-display">
          <img 
            src={logo} 
            alt="BIG STORE MVP" 
            className="static-logo" 
          />
          <div className="error-animation">
            <span className="error-code">4</span>
            <div className="error-icon">
              <img 
                ref={logoRef}
                src={logo} 
                alt="" 
                className="animated-logo" 
              />
            </div>
            <span className="error-code">4</span>
          </div>
        </div>

        {/* Conteúdo de erro */}
        <div className="error-content">
          <h1 className="error-title">Página não encontrada</h1>
          <h2 className="error-subtitle">Erro 404 NotFound</h2>
          <p className="error-message">
            Não conseguimos encontrar o que você procura. Talvez o produto tenha sido movido ou esteja temporariamente indisponível.
          </p>
        </div>
        
        {/* Ações */}
        <div className="error-actions">
          <Link to="/" className="action-button primary">
            ← Voltar à página inicial
          </Link>
          <Link to="/produtos" className="action-button secondary">
            Abrir Produtos
          </Link>
        </div>
        
        {/* Ajuda */}
        <div className="help-section">
          <p>Precisa de ajuda?</p>
          <div className="help-links">
            <Link to="/contato" className="help-link">Central de atendimento</Link>
            <span className="divider">|</span>
            <a href="mailto:suporte@mvpstore.com" className="help-link">suporte@mvpstore.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}