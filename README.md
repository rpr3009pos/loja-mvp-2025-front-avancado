# 🛍️ Loja Virtual — MVP Front-end Avançado

Este projeto é parte do material didático da disciplina **Desenvolvimento Front-end Avançado**, com foco em conceitos como componentização, consumo de APIs e gerenciamento de estado utilizando **React**.

---

## 📚 Índice

- [🧩 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏗️ Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [🔍 Funcionalidades Principais](#-funcionalidades-principais)
- [🗂️ Mapa Interativo das Páginas](#-mapa-interativo-das-páginas)
- [🎥 Demonstração](#-demonstração)
- [🧑‍💻 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)
- [📬 Contato](#-contato)

---

## 🧩 Tecnologias Utilizadas

- React 18+
- Vite
- Axios
- React Router DOM
- localStorage
- ViaCEP API
- Fake Store API

---

## 🏗️ Estrutura do Projeto
loja-mvp-2025-front-avancado/ 
├── public/ # Arquivos estáticos 
├── src/ 
│   
├── assets/ # Imagens e ícones 
│   
├── components/ # Componentes reutilizáveis 
│   │   
├── Alerta/ 
│   
│   ├── Botao/ 
│   │   
├── CardProduto/ 
│   │   
└── Header/ 
│   ├── pages/  # Páginas da aplicação 
│   │   ├── Cadastro/ 
│   │   ├── Carrinho/ 
│   │   ├── Produtos/ 
│   │   ├── ProdutoDetalhes/ 
│   │   └── NotFound_404/ 
│   ├── utils/              # Funções utilitárias 
│   │   ├── AppRouter.jsx 
│   │   └── validarCPF.js 
│   └── App.jsx             # Componente principal 
├── package.json            # Dependências e scripts 
└── vite.config.js          # Configuração do Vite

---
## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

- Node.js v18+
- npm v9+

### 📦 Instalação

```bash
git clone https://github.com/rpr3009pos/loja-mvp-2025-front-avancado.git
cd loja-mvp-2025-front-avancado
npm install


```bash
▶️ Execução
npm run dev
```

---
#### 
Acesse a aplicação em: http://localhost:5173


🔍 Funcionalidades Principais
- Listagem dinâmica de produtos
- Visualização de detalhes individuais
- Formulário de cadastro com validação
- Armazenamento de informações no localStorage
- Gerenciamento do carrinho de compras
- Página 404 personalizada
- mudança de tema (claro / ecuro) automatica baseada nas cinfigurações do dispositivo


### 🗂️ Mapa Interativo das Páginas

🏠 01 -Home
**Descrição:**  
Página inicial da loja, com destaque para promoções e navegação rápida.
**✨ Destaques:**
- Primeira impressão profissional  
- Banner com chamada para ação  
- Layout responsivo  


🛒 02 - Produtos
**Descrição:**  
Exibição de produtos obtidos via API externa, organizados em cards interativos.
**✨ Destaques:**
- Consumo da Fake Store API  
- Visual em grade (grid) responsiva  
- Componentes reutilizáveis  


🔍 03- ProdutoDetalhe
**Descrição:**  
Mostra detalhes completos do produto selecionado, com opção de compra.
**✨ Destaques:**
- Roteamento dinâmico via URL  
- Integração com o carrinho  
- Apresentação visual atrativa  


🧾 04- Cadastro
**Descrição:**  
Formulário de registro com validação e preenchimento automático de endereço.
**✨ Destaques:**
- Validação de CPF e campos obrigatórios  
- Integração com API ViaCEP  
- Armazenamento dos dados no navegador  



🛍️ 05 - Carrinho>
**Descrição:**  
Central de controle de compras, com listagem e remoção de itens.
**✨ Destaques:**
- Estado persistente no localStorage  
- Cálculo automático do total  
- Interface simples e funcional  

👤 06 - MeusDados
**Descrição:**  
Exibe os dados do cliente para conferência.
**✨ Destaques:**
- Transparência nas informações  
- Interface clara e objetiva  
- Integração com os dados do cadastro  


🚫 07 - NotFound (404)
**Descrição:**  
Página exibida quando a rota digitada não existe.
**✨ Destaques:**
- Experiência amigável mesmo em erro  
- Redirecionamento para Home  
- Design coerente com a aplicação