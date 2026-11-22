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
  const [soloMayores, setSoloMayores] = useState(false)
  const [mensaje, setMensaje] = useState('')

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
    cargar(soloMayores ? '/user_mayores' : '/user')
  }, [token, soloMayores])

  function buscar() {
    if (busqueda.trim() === '') return
    cargar(`/user/search/${encodeURIComponent(busqueda)}`)
  }

  function limpiar() {
    setBusqueda('')
    cargar(soloMayores ? '/user_mayores' : '/user')
  }

  async function borrar(id: number) {
    if (!window.confirm('¿Seguro que querés borrar este usuario?')) return
    setMensaje('')

    const response = await fetch(`${API}/user/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()

    if (!response.ok) {
      setMensaje(data.detail)
      return
    }

    setUsers(users.filter((u) => u.id !== id))
    if (selectedId === id) setSelectedId(null)
    setMensaje(data.msg)
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
      <button onClick={() => setSoloMayores(!soloMayores)}>
        {soloMayores ? 'Todos' : 'Solo mayores'}
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {mensaje && <p>{mensaje}</p>}

      {!loading && !error && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <span onClick={() => setSelectedId(u.id)} style={{ cursor: 'pointer' }}>
                {u.name}
              </span>
              <button onClick={() => borrar(u.id)}>Borrar</button>
            </li>
          ))}
        </ul>
      )}

      {selectedId && <UserDetail id={selectedId} token={token} />}
    </div>
  )
}

export default UserList
