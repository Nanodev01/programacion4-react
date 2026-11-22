import { useEffect, useState } from 'react'
import Login from './Login'
import UserList from './UserList'

const API = import.meta.env.VITE_API_URL

interface User {
  id: number
  name: string
  roles: { id: number; name: string }[]
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [me, setMe] = useState<User | null>(null)
  const [mensajeLogin, setMensajeLogin] = useState('')

  function handleLogin(nuevoToken: string) {
    localStorage.setItem('token', nuevoToken)
    setToken(nuevoToken)
    setMensajeLogin('')
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setToken('')
    setMe(null)
  }

  function handleUnauthorized() {
    handleLogout()
    setMensajeLogin('Tu sesión venció')
  }

  useEffect(() => {
    if (!token) return

    async function cargarMe() {
      const headers = { Authorization: `Bearer ${token}` }

      const resId = await fetch(`${API}/user/me/id`, { headers })
      if (resId.status === 401) {
        handleUnauthorized()
        return
      }
      if (!resId.ok) return
      const dataId = await resId.json()

      const resUser = await fetch(`${API}/user/${dataId.id}`, { headers })
      if (!resUser.ok) return
      setMe(await resUser.json())
    }

    cargarMe()
  }, [token])

  if (!token) {
    return <Login onLogin={handleLogin} mensaje={mensajeLogin} />
  }

  return (
    <div>
      <h1>
        Hola, {me ? `${me.name} (${me.roles.map((r) => r.name).join(', ')})` : '...'}
      </h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <UserList token={token} onUnauthorized={handleUnauthorized} />
    </div>
  )
}

export default App
