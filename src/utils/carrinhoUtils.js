/**
 * Utilitários para gerenciamento do carrinho de compras
 * @module carrinhoUtils
 */

/**
 * Adiciona um produto ao carrinho ou atualiza sua quantidade se já existir
 * @param {Object} produto - O produto a ser adicionado
 * @param {number} produto.id - ID do produto
 * @param {string} produto.titulo - Nome do produto
 * @param {number} produto.preco - Preço unitário
 * @param {string} produto.imagem - URL da imagem
 * @param {number} [produto.quantidade=1] - Quantidade a adicionar
 * @returns {Promise<boolean>} Retorna true se bem sucedido
 * @throws {Error} Se ocorrer erro ao acessar localStorage
 */
export const adicionarAoCarrinho = (produto) => {
  try {
    // Validar dados do produto
    if (!produto?.id || !produto.titulo || produto.preco === undefined) {
      throw new Error('Dados do produto incompletos');
    }

    // Garantir quantidade mínima de 1
    const quantidade = Math.max(1, produto.quantidade || 1);

    // Obter carrinho atual
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verificar se produto já existe
    const itemExistenteIndex = carrinhoAtual.findIndex(item => item.id === produto.id);
    
    const novoCarrinho = [...carrinhoAtual];
    
    if (itemExistenteIndex >= 0) {
      // Atualizar quantidade do produto existente
      novoCarrinho[itemExistenteIndex] = { 
        ...novoCarrinho[itemExistenteIndex],
        quantidade: novoCarrinho[itemExistenteIndex].quantidade + quantidade
      };
    } else {
      // Adicionar novo produto
      novoCarrinho.push({ 
        ...produto,
        quantidade
      });
    }

    // Salvar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    
    return true;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    throw error;
  }
};

/**
 * Notifica os componentes sobre atualização no carrinho
 * Dispara eventos customizados para atualização em tempo real
 */
export const notificarAtualizacaoCarrinho = () => {
  try {
    // Dispara evento customizado com detalhes
    const event = new CustomEvent('carrinhoAtualizado', {
      detail: {
        timestamp: Date.now(),
        origem: 'carrinhoUtils'
      }
    });
    window.dispatchEvent(event);
    
    // Dispara evento storage para compatibilidade
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'carrinho',
      newValue: localStorage.getItem('carrinho'),
      storageArea: localStorage
    }));
  } catch (error) {
    console.error('Erro ao notificar atualização:', error);
  }
};

/**
 * Obtém a quantidade total de itens no carrinho
 * @returns {number} Quantidade total de itens
 */
export const getQuantidadeTotalItens = () => {
  try {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    return carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
  } catch (error) {
    console.error('Erro ao obter quantidade:', error);
    return 0;
  }
};

/**
 * Remove um item do carrinho pelo ID
 * @param {number} produtoId - ID do produto a remover
 * @returns {boolean} True se removido com sucesso
 */
export const removerItemCarrinho = (produtoId) => {
  try {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    const novoCarrinho = carrinhoAtual.filter(item => item.id !== produtoId);
    
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    notificarAtualizacaoCarrinho();
    
    return true;
  } catch (error) {
    console.error('Erro ao remover item:', error);
    throw error;
  }
};

/**
 * Limpa completamente o carrinho
 * @returns {boolean} True se bem sucedido
 */
export const esvaziarCarrinho = () => {
  try {
    localStorage.removeItem('carrinho');
    notificarAtualizacaoCarrinho();
    return true;
  } catch (error) {
    console.error('Erro ao esvaziar carrinho:', error);
    throw error;
  }
};