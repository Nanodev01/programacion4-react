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

  useEffect(() => {
    async function cargar() {
      const response = await fetch(`${API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setUsers(data)
    }

    cargar()
  }, [token])

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
