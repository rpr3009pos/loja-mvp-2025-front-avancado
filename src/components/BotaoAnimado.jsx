export default function BotaoAnimado({ texto, onClick }) {
  return (
    <button className="botao-animado" onClick={onClick}>
      {texto}
    </button>
  );
}
