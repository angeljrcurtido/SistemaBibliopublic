import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import './style.css'

const CrearAutores = () => {
  const [nombre, setNombre] = useState('');
  const [autores, setAutores] = useState([]);
  const [autorEditado, setAutorEditado] = useState(null);
  const navigate = useNavigate();


    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
      }, [token, navigate]);

  //Llamado inicial a get autores para rellenar tablas
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await axios.get('https://server-0ugo.onrender.com/autores');
        setAutores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutores();
  }, []);

  //Se vuelve a llamar a get autores para actualizar la table sin actualizar la pagina
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await axios.get('https://server-0ugo.onrender.com/autores');
        setAutores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutores();
  }, [autores]);

  const handleEliminar = async (id) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de eliminar este autor?");
      if (confirmacion) {
        await axios.delete(`https://server-0ugo.onrender.com/autores/${id}`);
        console.log('Autor eliminado exitosamente');
        // Puedes agregar aquí cualquier lógica adicional después de eliminar el autor
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEditar = (autor) => {
    setAutorEditado(autor);
    setNombre(autor.nombre);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (autorEditado) {
        await axios.put(`https://server-0ugo.onrender.comautores/${autorEditado._id}`, { nombre });
        console.log('Autor editado exitosamente');
        setAutorEditado(null);
      } else {
        await axios.post('https://server-0ugo.onrender.com/autores', { nombre });
        console.log('Autor creado exitosamente');
        alert("Guardado exitosamente");
      }
      setNombre('');
      // Puedes agregar aquí cualquier lógica adicional después de crear o editar el autor
    } catch (error) {
      console.error(error);
      alert("Error al Guardar");
    }
  };

  return (
    <div>
      <h2>Crear Autor</h2>
      <form onSubmit={handleSubmit}>
        <div className='subgruposubcatego autores'>
          <label>
            <strong>Nombre:</strong>
            <input className='form-control' type="text" value={nombre} onChange={handleNombreChange} />
          </label>

          <button className='btn btn-success autores' type="submit">Guardar Autor</button>
        </div>
      </form>
      <div>
        <h2 className='listadoautores'>Listado de Autores</h2>
        <table className='table-bordered subcategorias autores'>
          <thead>
            <tr>
              <th>N°</th>
              <th>Autor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor, index) => (
              <tr key={autor.id}>
                <td>{index + 1}</td>
                <td>{autor.nombre}</td>
                <td>
                  <div className='botonestablas'>
                    <button className='btn btn-danger eliminar' onClick={() => handleEliminar(autor._id)}>Eliminar</button>
                    <button className='btn btn-success editar' onClick={() => handleEditar(autor)}>Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CrearAutores;
