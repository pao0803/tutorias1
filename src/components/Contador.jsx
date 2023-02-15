import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);
  const incrementar = () => {
    setContador(contador + 1);
  };
  const decrementar = () => {
    setContador(contador - 1);
  };

  return (
    <>
      <h1>Raúl Herrera</h1>
      <h2>Contador: {contador}</h2>
      <br />
      <button onClick={() => incrementar()}>Incrementar</button>
      <button onClick={() => decrementar()}>Decrementar</button>
    </>
  );
}

export default Contador;
