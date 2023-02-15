import { Route, Routes } from 'react-router-dom';
import './App.css';
import AlumnoAgregar from './pages/alumnos/AlumnoAgregar';
import Alumnos from './pages/alumnos/Alumnos';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import BarraSuperior from "./components/BarraSuperior";
import AlumnoEliminar from './pages/alumnos/AlumnoEliminar';
import AlumnoModificar from './pages/alumnos/AlumnoModificar';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={ <BarraSuperior /> }>
        <Route index element={ <Home /> } />
        <Route path="alumnos">
          <Route index element={ <Alumnos /> } />
          <Route path='agregar' element={ <AlumnoAgregar /> } />
          <Route path='eliminar/:m' element= { <AlumnoEliminar /> } />
          <Route path='modificar/:m' element= { <AlumnoModificar /> } />
        </Route>
      </Route>       
      <Route path='*' element= { <NotFound /> } />
     </Routes>
    </div>
  );
}

export default App;
