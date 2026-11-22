import Ej1 from './ejercicios/ej1'
import Ej2 from './ejercicios/ej2'
import Ej3 from './ejercicios/ej3'
import Ej4 from './ejercicios/ej4'
import Ej5 from './ejercicios/ej5'
import Ej6 from './ejercicios/ej6'
import Ej7 from './ejercicios/ej7'

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Ejercicios React</h1>

      <h2>1 - Tarjetas de producto</h2>
      <Ej1 />
      <hr />

      <h2>2 - Contador con límites</h2>
      <Ej2 />
      <hr />

      <h2>3 - Mostrar y ocultar</h2>
      <Ej3 />
      <hr />

      <h2>4 - Conversor de temperatura</h2>
      <Ej4 />
      <hr />

      <h2>5 - Lista de compras</h2>
      <Ej5 />
      <hr />

      <h2>6 - Buscador</h2>
      <Ej6 />
      <hr />

      <h2>7 - Tipar con TypeScript</h2>
      <Ej7 />
    </div>
  )
}

export default App
