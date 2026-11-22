interface ProductoProps {
  nombre: string
  precio: number
  stock: number
  oferta?: boolean
}

function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <div style={{ border: '1px solid #9bb4d1', borderRadius: 10, padding: 10, margin: 5, backgroundColor: 'white' }}>
      <h3>{nombre}</h3>
      {oferta && <strong>¡Oferta!</strong>}
      <p>${precio}</p>
      <p>{stock === 0 ? 'Sin stock' : 'Stock: ' + stock}</p>
    </div>
  )
}

function Ej7() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Producto nombre="Teclado" precio={45000} stock={12} oferta={true} />
      <Producto nombre="Mouse" precio={18000} stock={0} />
    </div>
  )
}

export default Ej7   


