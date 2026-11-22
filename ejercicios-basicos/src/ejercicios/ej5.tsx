import { useState } from 'react'

function Ej5() {
  const [texto, setTexto] = useState('')
  const [items, setItems] = useState<{ id: number; texto: string }[]>([])

  function agregar() {
    if (texto.trim() === '') return
    const nuevo = { id: Date.now(), texto: texto }
    setItems([...items, nuevo])
    setTexto('')
  }

  function eliminar(id: number) {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Ej: yerba"
      />
      <button onClick={agregar}>Agregar</button>

      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul style={{ display: 'inline-block', textAlign: 'left' }}>
          {items.map((item) => (
            <li key={item.id}>
              {item.texto}
              <button onClick={() => eliminar(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Ej5
