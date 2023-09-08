import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import axios from 'axios';

function TodosLibros() {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [autores, setAutores] = useState([]);
    const [libros, setLibros] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [subcategoria, setSubcategoria] = useState('');
    const [autor, setAutor] = useState('');
    const [cantidadMax, setCantidadMax] = useState(3);
    const [busqueda, setBusqueda] = useState('');

    const navigate = useNavigate();


    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        axios.get('https://server-0ugo.onrender.com/libros')
            .then(res => {
                setLibros(res.data);
                // Obtener categorías, subcategorías y autores únicos
                const cats = res.data.map(l => l.categoria);
                const subcats = res.data.map(l => l.subcategoria);
                const authors = res.data.map(l => l.autor);
                setCategorias([...new Set(cats)]);
                setSubcategorias([...new Set(subcats)]);
                setAutores([...new Set(authors)]);
            })
            .catch(err => console.log(err));
    }, []);

    // Eliminar un libro
    const handleEliminarLibro = (id) => {
        if (window.confirm("¿Estás seguro que deseas eliminar este libro?")) {
            axios.delete(`https://server-0ugo.onrender.com/libros/${id}`)
                .then(response => {
                    // Llamar nuevamente a la API para obtener los datos actualizados
                    axios.get('https://server-0ugo.onrender.com/libros')
                        .then(response => {
                            setLibros(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const handleEditarLibro = (id) => {
        window.location.href = `/inicio?id=${id}`;
    };

    const librosFiltrados = libros.filter(l => {
        if (categoria && l.categoria !== categoria) return false;
        if (subcategoria && l.subcategoria !== subcategoria) return false;
        if (autor && l.autor !== autor) return false;
        if (cantidadMax > 0 && l.cantidad > cantidadMax) return false;
        if (busqueda && !l.titulo.toLowerCase().includes(busqueda.toLowerCase())) return false;
        return true;
    });

    return (
        <div>
            <div className="subgrupo3 todoslibros">
                <select className='form-control' value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">Todas las categorías</option>
                    {categorias.map(c => <option value={c}>{c}</option>)}
                </select>

                <select className='form-control' value={subcategoria} onChange={e => setSubcategoria(e.target.value)}>
                    <option value="">Todas las subcategorías</option>
                    {subcategorias.map(s => <option value={s}>{s}</option>)}
                </select>

                <select className='form-control' value={autor} onChange={e => setAutor(e.target.value)}>
                    <option value="">Todos los autores</option>
                    {autores.map(a => <option value={a}>{a}</option>)}
                </select>

                <input className='form-control'
                    placeholder='Ingrese cantidad'
                    type="number"
                    value={cantidadMax}
                    onChange={e => setCantidadMax(e.target.value)}
                />

                <input className='form-control'
                    placeholder='Buscar por título'
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>

            {librosFiltrados.length > 0 ? (
                <div className="tabla-scroll reporteslibrosprestados">
                    <div id="reporte">
                        <table className="table table-striped-columns">
                            <thead>
                                <tr>
                                
                                    <th>Título</th>
                                    <th>Categoría</th>
                                    <th>Subcategoría</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {librosFiltrados.map(libro => (
                                    <tr key={libro._id}>
                                       
                                        <td>{libro.titulo}</td>
                                        <td>{libro.categoria}</td>
                                        <td>{libro.subcategoria}</td>
                                        <td className="descripcionlibro">{libro.descripcion}</td>
                                        <td>{libro.cantidad}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => handleEditarLibro(libro._id)}>Editar</button>
                                            <button className="btn btn-danger" onClick={() => handleEliminarLibro(libro._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h3>No hay libros que coincidan con los filtros seleccionados</h3>
            )}
        </div>
    );
}

export default TodosLibros;
