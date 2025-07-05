export default function AlertaFeedback({ tipo, mensagem }) {
  const estilo = {
    color: tipo === "erro" ? "red" : "green",
    margin: "10px 0"
  };

  return <div style={estilo}>{mensagem}</div>;
}




