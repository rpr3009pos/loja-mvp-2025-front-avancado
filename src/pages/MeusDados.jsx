import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MeusDados.css';

export default function MeusDados() {
  const [dados, setDados] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [statusCep, setStatusCep] = useState('');
  const [erroFormulario, setErroFormulario] = useState('');

  useEffect(() => {
    const info = localStorage.getItem('cadastroCliente');
    if (info) {
      setDados(JSON.parse(info));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  async function buscarEndereco() {
    const cepLimpo = dados.cep.replace(/\D/g, '');
    if (!cepLimpo || cepLimpo.length !== 8) {
      setStatusCep('CEP inválido.');
      return;
    }

    setStatusCep('Buscando endereço...');
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (data.erro) {
        setStatusCep('CEP não encontrado.');
        return;
      }
      setDados((prev) => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        numero: '',
        complemento: ''
      }));
      setStatusCep('CEP encontrado com sucesso.');
    } catch {
      setStatusCep('Erro ao consultar o CEP.');
    }
  }

  const salvarEdicao = () => {
    const obrigatorios = ['cep', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado'];
    const faltando = obrigatorios.filter((campo) => !dados[campo]?.trim());

    if (faltando.length > 0) {
      setErroFormulario('Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    localStorage.setItem('cadastroCliente', JSON.stringify(dados));
    setModoEdicao(false);
    setStatusCep('');
    setErroFormulario('');
  };

  return (
    <div className="meus-dados-container">
      <h2>Meus Dados</h2>

      {dados ? (
        <ul>
          <li><strong>Nome:</strong> {dados.nome} {dados.sobrenome}</li>
          <li><strong>Email:</strong> {dados.email}</li>
          <li><strong>CPF:</strong> {dados.cpf}</li>

          {modoEdicao ? (
            <>
              <li>
                <strong>CEP:</strong>
                <input name="cep" value={dados.cep || ''} onChange={handleChange} />
                <button onClick={buscarEndereco} className="cta-button mini">Pesquisar CEP 🔎</button>
                {statusCep && <p className="status-cep">{statusCep}</p>}
              </li>
              <li><strong>Rua:</strong> <input name="rua" value={dados.rua || ''} onChange={handleChange} /></li>
              <li><strong>Número:</strong> <input name="numero" value={dados.numero || ''} onChange={handleChange} /></li>
              <li><strong>Complemento:</strong> <input name="complemento" value={dados.complemento || ''} onChange={handleChange} /></li>
              <li><strong>Bairro:</strong> <input name="bairro" value={dados.bairro || ''} onChange={handleChange} /></li>
              <li><strong>Cidade:</strong> <input name="cidade" value={dados.cidade || ''} onChange={handleChange} /></li>
              <li><strong>Estado:</strong> <input name="estado" value={dados.estado || ''} onChange={handleChange} /></li>
            </>
          ) : (
            <>
              <li><strong>CEP:</strong> {dados.cep}</li>
              <li><strong>Rua:</strong> {dados.rua}, {dados.numero}</li>
              <li><strong>Complemento:</strong> {dados.complemento}</li>
              <li><strong>Bairro:</strong> {dados.bairro}</li>
              <li><strong>Cidade:</strong> {dados.cidade} - {dados.estado}</li>
            </>
          )}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>Nenhum dado cadastrado ainda.</p>
      )}

      {/* Botão salvar separado e acima dos demais */}
      {dados && modoEdicao && (
        <div className="botoes-salvar">
          <button onClick={salvarEdicao} className="cta-button primary">
            Salvar Alterações <span className="cta-icon">✔</span>
          </button>
          {erroFormulario && <p className="mensagem-erro">{erroFormulario}</p>}
        </div>
      )}

      {/* Botões secundários visíveis sempre */}
      <div className="botoes-acao">
        <Link to="/produtos" className="cta-button secondary">
          Ver Todos os Produtos <span className="cta-icon">→</span>
        </Link>
        <Link to="/cadastro" className="cta-button secondary">
          Cadastro <span className="cta-icon">→</span>
        </Link>
        {dados && !modoEdicao && (
          <button onClick={() => setModoEdicao(true)} className="cta-button secondary">
            Editar Endereço <span className="cta-icon">✎</span>
          </button>
        )}
      </div>
    </div>
  );
}
