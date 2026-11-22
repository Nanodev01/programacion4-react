import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL

interface UserDetalle {
  id: number
  name: string
  email: string
  age: number
  country: { id: number; name: string } | null
  roles: { id: number; name: string }[]
}

interface Props {
  id: number
  token: string
  onUnauthorized: () => void
}

function UserDetail({ id, token, onUnauthorized }: Props) {
  const [user, setUser] = useState<UserDetalle | null>(null)

  useEffect(() => {
    async function cargar() {
      const response = await fetch(`${API}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 401) {
        onUnauthorized()
        return
      }
      if (!response.ok) return
      setUser(await response.json())
    }

    cargar()
  }, [id, token])

  if (!user) return <p>Cargando detalle...</p>

  return (
    <div style={{ border: '1px solid #9bb4d1', borderRadius: 10, padding: 10, backgroundColor: 'white' }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Edad: {user.age}</p>
      <p>País: {user.country ? user.country.name : '-'}</p>
      <p>Roles: {user.roles.map((r) => r.name).join(', ')}</p>
    </div>
  )
}

export default UserDetail
