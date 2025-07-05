import { useState } from 'react';
import axios from 'axios';
import validarCPF from '../utils/validarCPF';
import './FormularioCadastro.css';

export default function FormularioCadastro() {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function buscarEndereco() {
    if (form.cep.length !== 8) return;
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
      if (data.erro) {
        setErro('CEP não encontrado.');
        return;
      }
      setForm(prev => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }));
      setErro('');
    } catch {
      setErro('Erro ao consultar o CEP.');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.nome.trim() === '' || form.sobrenome.trim() === '') {
      setErro('Informe nome e sobrenome.');
      return;
    }

    if (!validarCPF(form.cpf)) {
      setErro('CPF inválido.');
      return;
    }

    localStorage.setItem('cadastroCliente', JSON.stringify(form));
    setMensagem(`Seja bem-vindo, ${form.nome} ${form.sobrenome}!`);
    setErro('');
  }

  return (
    <div className="form-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Nome</label>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Sobrenome</label>
          <input type="text" name="sobrenome" value={form.sobrenome} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>CPF</label>
          <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>CEP</label>
          <input type="text" name="cep" value={form.cep} onChange={handleChange} onBlur={buscarEndereco} required />
        </div>

        <div className="form-control full">
          <label>Rua</label>
          <input type="text" name="rua" value={form.rua} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Bairro</label>
          <input type="text" name="bairro" value={form.bairro} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Cidade</label>
          <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Estado</label>
          <input type="text" name="estado" value={form.estado} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Número</label>
          <input type="text" name="numero" value={form.numero} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label>Complemento</label>
          <input type="text" name="complemento" value={form.complemento} onChange={handleChange} />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
    </div>
  );
}