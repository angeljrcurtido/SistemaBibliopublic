import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import {useNavigate} from "react-router-dom";
const Categorias = () => {
    const [name, setName] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [categorias, setCategorias] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar si la categoría ya existe

        const categoriaExistente = categorias.some((categoria) =>
            categoria.name.toLowerCase() === name.toLowerCase()
        );
        if (categoriaExistente) {
            setMensajeError('¡La categoría ya existe!');
            setTimeout(() => {
                setMensajeError('');
            }, 1000);
            return;
        }

        await axios.post('https://server-0ugo.onrender.com/categories', {
            name,
            subcategories
        })
            .then(response => {
                console.log("Se envio correctamente")
                alert("Categoria cargada con éxito")
            })
            .catch(error => {
                console.log(error);
                console.log("Este es el error")
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='subgrupo3 categorias'>
                <div className="form-group title">
                    <label htmlFor="name" className="form-label"><strong>Nombre de la Categoria:</strong></label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group title">
                    <label htmlFor="subcategories" className="form-label"><strong>Nombre de la SubCategoria:</strong></label>
                    <input type="text" className="form-control" id="subcategories" value={subcategories} onChange={(e) => setSubcategories(e.target.value)} />
                </div>

                <button className='btn btn-success categorias' type="submit">Crear categoría</button>
            </form>
            {mensajeError && <p>{mensajeError}</p>}
        </div>
    );
};

export default Categorias
