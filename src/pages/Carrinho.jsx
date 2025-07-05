import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Carrinho.css';

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem('carrinho');
    if (dados) {
      try {
        const carrinhoSalvo = JSON.parse(dados);
        const carrinhoValidado = carrinhoSalvo.map(item => ({
          ...item,
          quantidade: Math.max(1, item.quantidade || 1)
        }));
        setCarrinho(carrinhoValidado);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        localStorage.removeItem('carrinho');
        setCarrinho([]);
      }
    }
  }, []);

  const notificarAtualizacao = () => {
    const event = new CustomEvent('carrinhoAtualizado', {
      detail: {
        timestamp: Date.now(),
        quantidadeItens: carrinho.reduce((total, item) => total + item.quantidade, 0)
      }
    });
    window.dispatchEvent(event);

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'carrinho',
      newValue: JSON.stringify(carrinho),
      storageArea: localStorage
    }));
  };

  const atualizarCarrinho = (novoCarrinho) => {
    try {
      setCarrinho(novoCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      notificarAtualizacao();
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
    }
  };

  const removerItem = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    atualizarCarrinho(novoCarrinho);
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    const novoCarrinho = [...carrinho];
    novoCarrinho[index] = {
      ...novoCarrinho[index],
      quantidade: novaQuantidade
    };
    atualizarCarrinho(novoCarrinho);
  };

  const esvaziarCarrinho = () => {
    if (window.confirm('Deseja realmente esvaziar o carrinho?')) {
      atualizarCarrinho([]);
    }
  };

  const totalCompra = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="carrinho-lista">
            {carrinho.map((item, index) => (
              <li key={`${item.id}-${index}`} className="item-carrinho">
                {item.imagem && (
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}

                <div className="item-info">
                  <h3 className="item-titulo">{item.titulo}</h3>

                  <p className="item-preco-unitario">
                    Valor unitário: R$ {item.preco.toFixed(2)}
                  </p>

                  <div className="quantidade-controle">
                    <button
                      onClick={() => atualizarQuantidade(index, item.quantidade - 1)}
                      disabled={item.quantidade <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => atualizarQuantidade(index, item.quantidade + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="item-subtotal">
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>

                <button className="botao-remover" onClick={() => removerItem(index)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="total-container">
            <span>Total:</span>
            <span className="total-valor">R$ {totalCompra.toFixed(2)}</span>
          </div>
        </>
      )}

      {/* 🔁 Ações do carrinho sempre visíveis */}
      <div className="botoes-carrinho">
        <Link to="/produtos" className="botao-padrao">
          Ver Todos os Produtos <span className="cta-icon">→</span>
        </Link>
        <Link to="/cadastro" className="botao-padrao">
          Fazer Cadastro <span className="cta-icon">→</span>
        </Link>

        {carrinho.length > 0 && (
          <button className="botao-padrao" onClick={esvaziarCarrinho}>
            Esvaziar carrinho
          </button>
        )}
      </div>
    </div>
  );
}