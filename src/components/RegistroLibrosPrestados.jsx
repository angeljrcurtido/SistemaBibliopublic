import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css'

const RegistrarLibrosPrestados = () => {
    const [librosAlquilados, setLibrosAlquilados] = useState([]);
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [busquedaApellido, setBusquedaApellido] = useState('');

    const navigate = useNavigate();


    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        axios.get('https://server-0ugo.onrender.com/libros/alquilados/prestados')
            .then(response => {
                setLibrosAlquilados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const devolverLibro = (alquilerId) => {
        axios.patch(`https://server-0ugo.onrender.com/libros/devolver/${alquilerId}`)
            .then(response => {
                axios.get('https://server-0ugo.onrender.com/libros/alquilados/prestados')
                    .then(response => {
                        setLibrosAlquilados(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const filtrarPorNombre = (alquilado) => {
        if (busquedaNombre === '') {
            return true;
        }
        return alquilado.nombrePersona.toLowerCase().includes(busquedaNombre.toLowerCase());
    };

    const filtrarPorApellido = (alquilado) => {
        if (busquedaApellido === '') {
            return true;
        }
        return alquilado.apellidoPersona.toLowerCase().includes(busquedaApellido.toLowerCase());
    };

    const librosFiltrados = librosAlquilados.filter(alquilado => filtrarPorNombre(alquilado) && filtrarPorApellido(alquilado));

    const calcularDiasRetraso = (fechaDevolucion) => {
        const fechaActual = new Date();
        const fechaDevolucionObj = new Date(fechaDevolucion);
        const diferenciaTiempo = fechaActual.getTime() - fechaDevolucionObj.getTime();
        const diasRetraso = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
        return Math.max(0, diasRetraso);
    };

    return (
        <div>
            <h1 className='titulolibrosalquilados' >Libros Alquilados</h1>
            <div className='registrolibrosalquilados'>
                <input
                    className='inputapellido'
                    type="text"
                    placeholder="Buscar por nombre"
                    value={busquedaNombre}
                    onChange={(e) => setBusquedaNombre(e.target.value)}
                />
                <input
                    className='inputapellido'
                    type="text"
                    placeholder="Buscar por apellido"
                    value={busquedaApellido}
                    onChange={(e) => setBusquedaApellido(e.target.value)}
                />

            </div>
            <div className="tabla-scroll tablalibrosprestados">
                <table className='table table-striped-columns'>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nomb.</th>
                            <th>Apell.</th>
                            <th>Teléf.</th>
                            <th>Lib.</th>
                            <th>F_Ret.</th>
                            <th>F_Dev.</th>
                            <th>Cant.Alq.</th>
                            <th>Est.</th>
                            <th>D_Retraso</th>
                            <th>Acc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {librosFiltrados.map((alquilado, index) => (
                            <tr key={alquilado._id}>
                                <td>{index + 1}</td>
                                <td>{alquilado.nombrePersona}</td>
                                <td>{alquilado.apellidoPersona}</td>
                                <td>{alquilado.telefonoPersona}</td>
                                <td>{alquilado.nombreLibro}</td>
                                <td>{formatDate(alquilado.fechaRetiro)}</td>
                                <td>{formatDate(alquilado.fechaDevolucion)}</td>
                                <td>{alquilado.cantidadAlquilada}</td>
                                <td>{alquilado.estado}</td>
                                <td>{calcularDiasRetraso(alquilado.fechaDevolucion)}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => devolverLibro(alquilado._id)}>Devuelto</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RegistrarLibrosPrestados;
