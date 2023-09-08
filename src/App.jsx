import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/BarraDes'
import CargarLibros from './components/CargarLibros';
import TodosLibros from './components/TodosLibros';
import PrestarLibro from './components/PrestarLibro';
import Categorias from './components/Categorias';
import CargarSubcategorias from './components/CargarSubCategorias';
import EliminarSubcategorias from './components/EliminarSubCategorias';
import EditarSubcategorias from './components/EditarSubCategorias';
import CrearAutores from './components/CargarAutores';
import RegistroLibrosPrestados from './components/RegistroLibrosPrestados';
import Reportelibrosprestados from './components/Reporteslibrosprestados';

import './App.css';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
        <Route path="/reportelibrosprestados"element={<Reportelibrosprestados/> }/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/registroalquiler"element={<RegistroLibrosPrestados/> }/>
        <Route path="/crearautores"element={<CrearAutores/> }/>
          <Route path="/eliminar-subcategorias/:id"element={<EliminarSubcategorias/> }/>
          <Route path="/editar-subcategorias/:id"element={<EditarSubcategorias/> }/>
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/cargarsubcategorias" element={<CargarSubcategorias />} />
          <Route path="/inicio" element={<CargarLibros />} />
          <Route path="/todoslibros" element={<TodosLibros />} />
          <Route path="/prestarlibros" element={<PrestarLibro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
