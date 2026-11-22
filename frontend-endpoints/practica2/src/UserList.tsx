import { useEffect, useState } from 'react'
import UserDetail from './UserDetail'

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

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      setError('')

      const response = await fetch(`${API}/user`, {
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

    cargar()
  }, [token])

  if (loading) return <p>Cargando...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id} onClick={() => setSelectedId(u.id)} style={{ cursor: 'pointer' }}>
            {u.name}
          </li>
        ))}
      </ul>

      {selectedId && <UserDetail id={selectedId} token={token} />}
    </div>
  )
}

export default UserList
