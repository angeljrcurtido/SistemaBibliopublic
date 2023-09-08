import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

const PrestarLibro = () => {
    const [libros, setLibros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [nombrePersona, setNombrePersona] = useState('');
    const [apellidoPersona, setApellidoPersona] = useState('');
    const [telefonoPersona, setTelefonoPersona] = useState('');
    const [fechaRetiro, setFechaRetiro] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');
    const [cantidadAlquilada, setCantidadAlquilada] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const formRef = useRef(null);
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
            .then(response => {
                setLibros(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setShowOptions(true);
    };

    const handleSelect = (libro) => {
        setTitulo(libro.titulo);
        setSearchTerm(libro.titulo);
        setShowOptions(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://server-0ugo.onrender.com/libros/alquilar', {
            titulo,
            nombreLibro: titulo,
            nombrePersona,
            apellidoPersona,
            telefonoPersona,
            cantidadAlquilada,
            fechaRetiro,
            fechaDevolucion
        })
            .then(response => {
                console.log("Se envió correctamente");
                alert("Libro Prestado con éxito");
            })
            .catch(error => {
                console.log(error);
                console.log("El error viene de aquí");
            });
    }

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <h2 className="titulodecarga prestamos">Prestamo de Libros</h2>
                <div className="subgrupoprestamo1">
                    <div className="form-group title">
                        <label htmlFor="titulo">Titulo del Libro:</label>
                        <div className="select-container">
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={handleSearch}
                                onBlur={() => setShowOptions(false)}
                                className="search-input"
                                placeholder="Buscar..."
                            />
                            {showOptions && (
                                <div className="options-container" style={{ maxHeight: '60px', overflowY: 'auto' }}>
                                    {libros
                                        .filter(libro => libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map(libro => (
                                            <div
                                                style={{ border: '1px solid black', padding: '1px' }}
                                                className="option"
                                                key={libro.id}
                                                onMouseDown={() => handleSelect(libro)}
                                            >
                                                {libro.titulo}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group1">
                        <label htmlFor="nombrePersona">Nombre:</label>
                        <input
                            type="text"
                            id="nombrePersona"
                            value={nombrePersona}
                            onChange={(e) => setNombrePersona(e.target.value)}
                        />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="apellidoPersona">Apellido:</label>
                        <input
                            type="text"
                            id="apellidoPersona"
                            value={apellidoPersona}
                            onChange={(e) => setApellidoPersona(e.target.value)}
                        />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="telefonoPersona">Telefono N°:</label>
                        <input
                            type="text"
                            id="telefonoPersona"
                            value={telefonoPersona}
                            onChange={(e) => setTelefonoPersona(e.target.value)}
                        />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="cantidadAlquilada">Cantidad:</label>
                        <input
                            type="text"
                            id="cantidadAlquilada"
                            value={cantidadAlquilada}
                            onChange={(e) => setCantidadAlquilada(e.target.value)}
                        />
                    </div>
                </div>
                <div className="subgrupoprestamo2">
                    <div className="form-groupdecantidad">
                        <label htmlFor="fechaRetiro">Fecha de Retiro:</label>
                        <input
                            type="date"
                            id="fechaRetiro"
                            value={fechaRetiro}
                            onChange={(e) => setFechaRetiro(e.target.value)}
                        />
                    </div>
                    <div className="form-groupdecantidad">
                        <label htmlFor="fechaDevolucion">Fecha de Devolución:</label>
                        <input
                            type="date"
                            id="fechaDevolucion"
                            value={fechaDevolucion}
                            onChange={(e) => setFechaDevolucion(e.target.value)}
                        />
                    </div>
                </div>
                <button className="btn btn-success prestamo" type="submit">Prestar</button>
            </form>
        </div>
    );
};

export default PrestarLibro;
