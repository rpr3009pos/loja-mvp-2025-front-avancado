// src/components/QuantidadeSelector.jsx
import { useState } from 'react';
import './QuantidadeSelector.css';

export default function QuantidadeSelector({ onChange }) {
  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => {
    const nova = quantidade + 1;
    setQuantidade(nova);
    onChange(nova);
  };

  const diminuir = () => {
    if (quantidade > 1) {
      const nova = quantidade - 1;
      setQuantidade(nova);
      onChange(nova);
    }
  };

  return (
    <div className="quantidade-selector">
      <button onClick={diminuir}>−</button>
      <span>{quantidade}</span>
      <button onClick={aumentar}>+</button>
    </div>
  );
}