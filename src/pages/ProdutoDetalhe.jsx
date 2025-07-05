import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { adicionarAoCarrinho, notificarAtualizacaoCarrinho } from '../utils/carrinhoUtils';
import './ProdutoDetalhe.css';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [imagemZoom, setImagemZoom] = useState(false);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        setCarregando(true);
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduto(res.data);
        setErro(null);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setErro('Produto não encontrado ou erro ao carregar.');
      } finally {
        setCarregando(false);
      }
    };

    buscarProduto();
  }, [id]);

  const ajustarQuantidade = (novaQuantidade) => {
    setQuantidade(Math.max(1, Math.min(99, novaQuantidade)));
  };

  const handleAdicionarAoCarrinho = async () => {
    if (!produto) return;

    try {
      const itemCarrinho = {
        id: produto.id,
        titulo: produto.title,
        preco: produto.price,
        imagem: produto.image,
        quantidade: quantidade,
      };

      await adicionarAoCarrinho(itemCarrinho);
      notificarAtualizacaoCarrinho();
      
      setFeedback({
        mensagem: `"${produto.title}" adicionado ao carrinho!`,
        tipo: 'sucesso'
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setFeedback({
        mensagem: 'Erro ao adicionar produto ao carrinho',
        tipo: 'erro'
      });
    }
  };

  const toggleZoomImagem = () => {
    setImagemZoom(!imagemZoom);
  };

  if (carregando) return (
    <div className="mensagem-container">
      <div className="loader"></div>
      <p className="mensagem-info">Carregando produto...</p>
    </div>
  );

  if (erro) return (
    <div className="mensagem-container">
      <p className="mensagem-erro">{erro}</p>
      <Link to="/produtos" className="botao-voltar">
        ← Voltar para produtos
      </Link>
    </div>
  );

  return (
    <div className="produto-detalhe-container">
      <div className="imagem-container">
        <img 
          src={produto.image} 
          alt={produto.title} 
          className={`imagem-produto ${imagemZoom ? 'zoomed' : ''}`}
          onClick={toggleZoomImagem}
          onError={(e) => {
            e.target.src = '/imagem-padrao.jpg';
            e.target.alt = 'Imagem não disponível';
          }}
          loading="lazy"
        />
        {imagemZoom && (
          <div className="zoom-overlay" onClick={toggleZoomImagem}>
            <span className="zoom-close">✕</span>
          </div>
        )}
      </div>

      <div className="info-produto">
        <h1 className="titulo-produto">{produto.title}</h1>
        <p className="categoria-produto">{produto.category}</p>
        
        <div className="avaliacao-container">
          <span className="estrelas">
            {'★'.repeat(Math.round(produto.rating?.rate || 0)).padEnd(5, '☆')}
          </span>
          <span className="contagem-avaliacoes">
            ({produto.rating?.count || 0} avaliações)
          </span>
        </div>

        <p className="descricao-produto">{produto.description}</p>
        
        <div className="preco-container">
          <span className="preco-produto">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(produto.price)}
          </span>
        </div>

        <div className="quantidade-container">
          <label htmlFor="quantidade" className="quantidade-label">Quantidade:</label>
          <div className="quantidade-controls">
            <button 
              onClick={() => ajustarQuantidade(quantidade - 1)}
              aria-label="Reduzir quantidade"
              disabled={quantidade <= 1}
              className="quantidade-botao"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="99"
              value={quantidade}
              onChange={(e) => ajustarQuantidade(parseInt(e.target.value) || 1)}
              className="quantidade-input"
              aria-label="Quantidade"
            />
            <button 
              onClick={() => ajustarQuantidade(quantidade + 1)}
              aria-label="Aumentar quantidade"
              disabled={quantidade >= 99}
              className="quantidade-botao"
            >
              +
            </button>
          </div>
        </div>

        <button
          className="botao-adicionar"
          onClick={handleAdicionarAoCarrinho}
          aria-label={`Adicionar ${quantidade} ${produto.title} ao carrinho`}
        >
          Adicionar ao carrinho
        </button>

        {feedback && (
          <div className={`feedback-message ${feedback.tipo}`}>
            {feedback.mensagem}
          </div>
        )}

        <Link to="/produtos" className="botao-voltar">
          ← Voltar para lista de produtos
        </Link>
      </div>
    </div>
  );
}