import { useState } from 'react'

function Ej3() {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ border: '1px solid #9bb4d1', borderRadius: 10, padding: 10, backgroundColor: 'white' }}>
      <h3>¿Qué es JSX?</h3>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>
      {visible && (
        <p>
          Una sintaxis que permite escribir estructura parecida a HTML dentro de
          JavaScript. Se transforma en llamadas a funciones de React.
        </p>
      )}
    </div>
  )
}

export default Ej3
