// src/components/CardProduto.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarAoCarrinho } from '../utils/carrinhoUtils';
import QuantidadeSelector from './QuantidadeSelector';
import './CardProduto.css';

export default function CardProduto({ id, imagem, titulo, preco }) {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);

  const irParaDetalhes = () => {
    navigate(`/produtos/${id}`);
  };

  const handleAdicionar = (e) => {
    e.stopPropagation(); // evita navegação ao clicar no botão
    adicionarAoCarrinho({
      id,
      titulo,
      preco,
      imagem,
      quantidade,
    });
    alert(`"${titulo}" adicionado ao carrinho!`);
  };

  return (
    <div className="card-produto" onClick={irParaDetalhes} style={{ cursor: 'pointer' }}>
      <img src={imagem} alt={titulo} className="card-imagem" />
      <h3 className="card-titulo">{titulo}</h3>
      <p className="card-preco">R$ {preco.toFixed(2)}</p>

      {/* Seletor de quantidade */}
      <div onClick={(e) => e.stopPropagation()}>
        <QuantidadeSelector onChange={setQuantidade} />
      </div>

      {/* Botão de adicionar */}
      <button className="card-botao" onClick={handleAdicionar}>
        Adicionar ao carrinho
      </button>
    </div>
  );
}
