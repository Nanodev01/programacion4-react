import { useEffect, useState } from 'react'
import UserDetail from './UserDetail'
import UserForm from './UserForm'

const API = import.meta.env.VITE_API_URL

interface User {
  id: number
  name: string
}

function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')

  async function cargar(url: string) {
    setLoading(true)
    setError('')

    const response = await fetch(`${API}${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()

    if (!response.ok) {
      setError(data.detail)
    } else {
      setUsers(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    cargar('/user')
  }, [token])

  function buscar() {
    if (busqueda.trim() === '') return
    cargar(`/user/search/${encodeURIComponent(busqueda)}`)
  }

  function limpiar() {
    setBusqueda('')
    cargar('/user')
  }

  return (
    <div>
      <UserForm token={token} onCreated={(u) => setUsers([...users, u])} />

      <h2>Usuarios</h2>

      <input
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>
      <button onClick={limpiar}>Limpiar</button>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((u) => (
            <li key={u.id} onClick={() => setSelectedId(u.id)} style={{ cursor: 'pointer' }}>
              {u.name}
            </li>
          ))}
        </ul>
      )}

      {selectedId && <UserDetail id={selectedId} token={token} />}
    </div>
  )
}

export default UserList
