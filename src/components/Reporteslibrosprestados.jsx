import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Reportelibrosprestados = () => {
    const [alquilados, setAlquilados] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [librosPrestados, setLibrosPrestados] = useState(0);
    const [librosDevueltos, setLibrosDevueltos] = useState(0);

    const navigate = useNavigate();

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    const calcularCantidadLibros = () => {
        let cantidadPrestados = 0;
        let cantidadDevueltos = 0;

        filtrarPorFechas().forEach(alquilado => {
            if (alquilado.estado === 'prestado') {
                cantidadPrestados++;
            } else if (alquilado.estado === 'devuelto') {
                cantidadDevueltos++;
            }
        });

        setLibrosPrestados(cantidadPrestados);
        setLibrosDevueltos(cantidadDevueltos);
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchAlquilados();
    }, []);

    useEffect(() => {
        calcularCantidadLibros();
    });

    const fetchAlquilados = () => {
        axios.get('https://server-0ugo.onrender.com/libros/alquilados')
            .then(response => {
                setAlquilados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const imprimirReporte = () => {
        const input = document.getElementById("reporte");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'pt',
                format: [792, 1224] // Tamaño de hoja oficio en puntos
            });
            pdf.text('Título del Reporte', 20, 20); // Agregar título
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("reporte.pdf");
        });
    };

    const filtrarPorFechas = () => {
        const fechaInicioObjeto = new Date(fechaInicio);
        const fechaFinObjeto = new Date(fechaFin);

        const alquiladosFiltrados = alquilados.filter(alquilado => {
            const fechaRetiroObjeto = new Date(alquilado.fechaRetiro);
            const fechaDevolucionObjeto = new Date(alquilado.fechaDevolucion);

            return fechaRetiroObjeto >= fechaInicioObjeto && fechaDevolucionObjeto <= fechaFinObjeto;
        });

        return alquiladosFiltrados;
    };

    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
    };

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    };

    return (
        <div>
            <h2 className="tituloreportelibrosprestados">Reporte Libros Prestados</h2>
            <div className="calendarioinicio">
                <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                <input className="fechafin" type="date" id="fechaInicio" value={fechaInicio} onChange={handleFechaInicioChange} />
            </div>
            <div className="calendarioinicio">
                <label htmlFor="fechaFin">Fecha de Fin:</label>
                <input className="fechafin" type="date" id="fechaFin" value={fechaFin} onChange={handleFechaFinChange} />
            </div>
            <div className="botonesparareportes">
                <button className="btn btn-success reporte" onClick={fetchAlquilados}>Calcular Prestados y Devueltos</button>
                <button className="btn btn-success reporte" onClick={imprimirReporte}>Imprimir Reporte</button>
            </div>
            <div className="tabla-scroll reporteslibrosprestados">
                <div id="reporte">
                    <table className="table table-striped-columns">
                        <thead>
                            <tr>
                                <th>N° Orden</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Libro</th>
                                <th>Fecha de Retiro</th>
                                <th>Fecha de Devolución</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrarPorFechas().map((alquilado, index) => (
                                <tr key={alquilado._id}>
                                    <td>{index + 1}</td>
                                    <td>{alquilado.nombrePersona}</td>
                                    <td>{alquilado.apellidoPersona}</td>
                                    <td>{alquilado.nombreLibro}</td>
                                    <td>{new Date(alquilado.fechaRetiro).toLocaleDateString('es-ES')}</td>
                                    <td>{new Date(alquilado.fechaDevolucion).toLocaleDateString('es-ES')}</td>
                                    <td>{alquilado.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7">
                                    Cantidad de Libros Prestados: {librosPrestados} | Cantidad de Libros Devueltos: {librosDevueltos}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reportelibrosprestados;
