import { useState } from 'react'

const lenguajes = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'Go', 'Rust']

function Ej6() {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = lenguajes.filter((l) =>
    l.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar..."
      />
      <p>{filtrados.length} resultados</p>
      <ul style={{ display: 'inline-block', textAlign: 'left' }}>
        {filtrados.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

export default Ej6
