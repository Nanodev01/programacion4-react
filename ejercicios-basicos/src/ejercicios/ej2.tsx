import { useState } from 'react'

function Ej2() {
  const [valor, setValor] = useState(0)

  function restar() {
    if (valor > 0) {
      setValor(valor - 1)
    }
  }

  function sumar() {
    if (valor < 10) {
      setValor(valor + 1)
    }
  }

  return (
    <div>
      <h1>{valor}</h1>
      <button onClick={restar} disabled={valor === 0}>-</button>
      <button onClick={sumar} disabled={valor === 10}>+</button>
      <button onClick={() => setValor(0)}>Reiniciar</button>
      {valor === 10 && <p>Llegaste al máximo</p>}
    </div>
  )
}

export default Ej2
