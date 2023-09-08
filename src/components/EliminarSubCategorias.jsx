import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EliminarSubcategorias = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState({});
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');

  const navigate = useNavigate();

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const obtenerCategoria = async () => {
      try {
        const response = await axios.get(`https://server-0ugo.onrender.com/categories/${id}`);
        setCategoria(response.data);
        console.log("Funciono")
      } catch (error) {
        console.error(error);
        console.log("Error esta por aqui")
      }
    };

    obtenerCategoria();
  }, [id]);

  const handleChange = (event) => {
    setSubcategoriaSeleccionada(event.target.value);
  };

  const eliminarSubcategoria = async () => {
    try {
      await axios.put(`https://server-0ugo.onrender.com/categories/${id}/subcategories`, {
        subcategoryIndex: subcategoriaSeleccionada
      });

      // Recargar la página para mostrar los cambios
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Eliminar Subcategoría</h2>
      <div className='subgruposubcatego'>
        <p>Categoría: {categoria.name}</p>
        <select className='form-control' value={subcategoriaSeleccionada} onChange={handleChange}>
          {categoria.subcategories &&
            categoria.subcategories.map((subcategoria, index) => (
              <option key={index} value={index}>
                {subcategoria}
              </option>
            ))}
        </select>
        <button className='btn btn-success eliminar' onClick={eliminarSubcategoria}>Eliminar</button>
      </div>
    </div>
  );
};

export default EliminarSubcategorias;
