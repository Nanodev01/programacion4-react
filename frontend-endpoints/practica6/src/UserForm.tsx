import { useState } from 'react'

const API = import.meta.env.VITE_API_URL

interface Props {
  token: string
  onCreated: (user: { id: number; name: string }) => void
}

function UserForm({ token, onCreated }: Props) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [countryId, setCountryId] = useState('1')
  const [mensaje, setMensaje] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMensaje('')

    const response = await fetch(`${API}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        email,
        password,
        country_id: Number(countryId),
      }),
    })
    const data = await response.json()

    if (!response.ok) {
      setMensaje(typeof data.detail === 'string' ? data.detail : 'Datos inválidos')
      return
    }

    onCreated({ id: data.id, name })
    setMensaje('Usuario creado')
    setName('')
    setAge('')
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo usuario</h3>
      <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Contraseña"
        minLength={4}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
        <option value="1">Argentina</option>
        <option value="2">Brasil</option>
      </select>
      <button type="submit">Crear</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  )
}

export default UserForm
