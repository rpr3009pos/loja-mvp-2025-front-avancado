import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

export default function Home() {
  const [hoverLogo, setHoverLogo] = useState(false);

  // URLs das imagens
  const productImages = {
    smartphone: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    headphones: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    smartwatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    heroMain: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    hero1: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
    hero2: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    hero3: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
  };

  return (
    <div className="home-container">
      {/* Logo com animação sutil e container dedicado */}
      <div className="logo-container">
        <img 
          src="/images/logo-bigstore.webp" 
          alt="BIG STORE MVP" 
          className={`logo-principal ${hoverLogo ? 'animate-logo' : ''}`}
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        />
      </div>

      {/* Banner Hero com Grid Moderno */}
      <section className="split-hero-banner">
        <div className="hero-text-side">
          <h1><span>BIG STORE MVP</span> MVP</h1>
          <p className="tagline">Produtos exclusivos com a qualidade que você merece</p>
          <Link to="/produtos" className="cta-button pulse-animation">
            Explorar Produtos
            <span className="cta-icon">→</span>
          </Link>
        </div>
        <div className="hero-image-side">
          <div className="image-grid">
            <div 
              className="grid-item main-item"
              style={{ backgroundImage: `url(${productImages.heroMain})` }}
            ></div>
            <div 
              className="grid-item"
              style={{ backgroundImage: `url(${productImages.hero1})` }}
            ></div>
            <div 
              className="grid-item"
              style={{ backgroundImage: `url(${productImages.hero2})` }}
            ></div>
            <div 
              className="grid-item"
              style={{ backgroundImage: `url(${productImages.hero3})` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Seção de Vantagens */}
      <section className="benefits-section">
        <h2 className="section-title">Por que escolher a Loja BIG STORE MVP?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Entrega Rápida</h3>
            <p>Entregamos em todo o Brasil em até 5 dias úteis</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Compra Segura</h3>
            <p>Pagamento criptografado e proteção de dados</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💙</div>
            <h3>Atendimento Personalizado</h3>
            <p>Suporte humanizado antes, durante e depois da compra</p>
          </div>
        </div>
      </section>

      {/* Destaques de Produtos */}
      <section className="featured-products">
        <h2 className="section-title">Destaques da Semana</h2>
        <p className="section-subtitle">Os queridinhos dos nossos clientes</p>
        
        <div className="products-grid">
          <div className="product-card">
            <div className="product-badge best-seller">Mais Vendido</div>
            <div className="product-image-container">
              <img 
                src={productImages.smartphone} 
                alt="Smartphone Premium" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Smartphone+Premium';
                }}
              />
            </div>
            <h3>Smartphone Premium</h3>
            <p className="product-price">R$ 2.499,90</p>
            <Link to="/produtos/1" className="product-link">Ver detalhes</Link>
          </div>
          
          <div className="product-card">
            <div className="product-badge promotion">Promoção</div>
            <div className="product-image-container">
              <img 
                src={productImages.headphones} 
                alt="Fone Bluetooth" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Fone+Bluetooth';
                }}
              />
            </div>
            <h3>Fone Bluetooth</h3>
            <p className="product-price"><span className="old-price">de R$ 399,90</span> por apenas R$ 299,90</p>
            <Link to="/produtos/2" className="product-link">Ver detalhes</Link>
          </div>
          
          <div className="product-card">
            <div className="product-badge novelty">Novidade</div>
            <div className="product-image-container">
              <img 
                src={productImages.smartwatch} 
                alt="Smartwatch" 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Smartwatch';
                }}
              />
            </div>
            <h3>Smartwatch</h3>
            <p className="product-price">R$ 799,90</p>
            <Link to="/produtos/3" className="product-link">Ver detalhes</Link>
          </div>
        </div>
        
        <Link to="/produtos" className="cta-button secondary">
          Ver Todos os Produtos
          <span className="cta-icon">→</span>
        </Link>
      </section>

      {/* CTA de Cadastro */}
      <section className="signup-cta">
        <div className="cta-content">
          <h2>Cadastre-se e ganhe 10% OFF!</h2>
          <p>Além de ofertas exclusivas para membros</p>
          <Link to="/cadastro" className="cta-button white">
            Criar minha conta
            <span className="cta-icon">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}