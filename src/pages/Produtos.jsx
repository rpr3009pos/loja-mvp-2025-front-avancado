import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adicionarAoCarrinho, notificarAtualizacaoCarrinho } from '../utils/carrinhoUtils';
import './Produtos.css';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [quantidades, setQuantidades] = useState({}); // Estado para armazenar quantidades por produto

  // Carrega os produtos da API
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const resposta = await fetch('https://fakestoreapi.com/products');
        const dados = await resposta.json();
        setProdutos(dados);
        
        // Inicializa as quantidades como 1 para cada produto
        const quantidadesIniciais = {};
        dados.forEach(produto => {
          quantidadesIniciais[produto.id] = 1;
        });
        setQuantidades(quantidadesIniciais);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  // Filtra os produtos baseado na busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  // Atualiza a quantidade para um produto específico
  const atualizarQuantidade = (produtoId, novaQuantidade) => {
    setQuantidades(prev => ({
      ...prev,
      [produtoId]: Math.max(1, novaQuantidade) // Garante que a quantidade nunca seja menor que 1
    }));
  };

  // Função para adicionar ao carrinho
  const handleAdicionarAoCarrinho = async (produto) => {
    try {
      await adicionarAoCarrinho({
        id: produto.id,
        titulo: produto.title,
        preco: produto.price,
        imagem: produto.image,
        quantidade: quantidades[produto.id] || 1 // Usa a quantidade específica do produto
      });
      
      notificarAtualizacaoCarrinho();
      
      setFeedback(`${produto.title} (${quantidades[produto.id]}x) adicionado ao carrinho!`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setFeedback('Erro ao adicionar produto');
    }
  };

  if (carregando) return <div className="loading">Carregando produtos...</div>;

  return (
    <div className="produtos-container">
      <h1>Nossos Produtos</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar produto por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {feedback && (
        <div className="feedback-message">
          {feedback}
        </div>
      )}

      <div className="produtos-grid">
        {produtosFiltrados.map(produto => (
          <div key={produto.id} className="produto-card">
            <Link to={`/produtos/${produto.id}`} className="produto-link">
              <div className="produto-imagem-container">
                <img 
                  src={produto.image} 
                  alt={produto.title} 
                  onError={(e) => {
                    e.target.src = '/imagem-padrao.jpg';
                    e.target.alt = 'Imagem não disponível';
                  }}
                />
              </div>
              <h3>{produto.title}</h3>
              <p className="produto-descricao">{produto.description.substring(0, 60)}...</p>
            </Link>
            
            <div className="produto-info">
              <p className="produto-preco">R$ {produto.price.toFixed(2)}</p>
              
              {/* Controles de quantidade */}
              <div className="quantidade-controls">
                <button
                  onClick={() => atualizarQuantidade(produto.id, (quantidades[produto.id] || 1) - 1)}
                  disabled={(quantidades[produto.id] || 1) <= 1}
                  aria-label="Reduzir quantidade"
                >
                  −
                </button>
                <span className="quantidade-value">{quantidades[produto.id] || 1}</span>
                <button
                  onClick={() => atualizarQuantidade(produto.id, (quantidades[produto.id] || 1) + 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
              
              <button
                className="botao-adicionar"
                onClick={() => handleAdicionarAoCarrinho(produto)}
                aria-label={`Adicionar ${produto.title} ao carrinho`}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}