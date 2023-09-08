
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const CargarSubcategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const navigate = useNavigate();


  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('https://server-0ugo.onrender.com/categories');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handleSubcategoriaChange = (event) => {
    setNuevaSubcategoria(event.target.value);
    setMensajeError('');
  };

  const agregarSubcategoria = async () => {
    // Verificar si la subcategoría ya existe en la categoría seleccionada
    const categoria = categorias.find((categoria) => categoria._id === categoriaSeleccionada);
    if (categoria.subcategories.includes(nuevaSubcategoria)) {
      setMensajeError('¡La subcategoría ya existe!');
      return;
    }

    try {
      await axios.patch(`https://server-0ugo.onrender.com/categories/${categoriaSeleccionada}`, {
        subcategory: nuevaSubcategoria
      });

      // Volver a llamar a la API para obtener los datos actualizados
      obtenerCategorias();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className='titulosubcategorias'>Cargar Subcategorías</h2>
      <div className='subgruposubcatego'>
        <select className='form-control center-select' value={categoriaSeleccionada} onChange={handleCategoriaChange}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.name}
            </option>
          ))}
        </select>
        <input className="input-group-text center" type="text" value={nuevaSubcategoria} onChange={handleSubcategoriaChange} />
        <button className='btn btn-success center' onClick={agregarSubcategoria}>Agregar Subcategoría</button>
        {mensajeError && <p>{mensajeError}</p>}
      </div>
      <table className='table-bordered subcategorias responsive'>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Subcategorías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria._id}>
              <td>{categoria.name}</td>
              <td>
                {categoria.subcategories.map((subcategoria, index) => (
                  <span key={index}>{subcategoria}</span>
                ))}
              </td>
              <td>
                <div className='botonestablas'>
                  <Link to={`/eliminar-subcategorias/${categoria._id}`}>
                    <button className='btn btn-danger eliminar'>Eliminar Subcategoría</button>
                  </Link>
                  <Link to={`/editar-subcategorias/${categoria._id}`}>
                    <button className='btn btn-success editar'>Editar Subcategoría</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CargarSubcategorias;
