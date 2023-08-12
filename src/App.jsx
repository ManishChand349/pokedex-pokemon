import './App.css'
import CustomRoutes from './router/CustomRoutes'
import { Link } from 'react-router-dom'


function App() {

  return (
    <>
     <h1 id="pokedex-heading">
   
     <Link to="/" >  Pokedex</Link>
     </h1>
      <CustomRoutes/>
    </>
  )
}

export default App
