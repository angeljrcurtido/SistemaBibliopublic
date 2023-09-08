import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

const CargarLibros = () => {
  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [autor, setAutor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

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

  useEffect(() => {
    axios.get('https://server-0ugo.onrender.com/autores')
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://server-0ugo.onrender.com/categories')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categoria) {
      axios.get(`https://server-0ugo.onrender.com/categories/${categoria}/subcategories`)
        .then(response => {
          setSubcategorias(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setSubcategorias([]);
    }
  }, [categoria]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (libroSeleccionado) {
      axios.put(`https://server-0ugo.onrender.com/libros/${libroSeleccionado._id}`, {
        titulo,
        categoria,
        imagen,
        subcategoria,
        descripcion,
        cantidad,
        autor
      })
        .then(response => {
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
    } else {
      axios.post('https://server-0ugo.onrender.com/libros', {
        titulo,
        categoria,
        imagen,
        subcategoria,
        descripcion,
        cantidad,
        autor
      })
        .then(response => {
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
    setTitulo('');
    setCategoria('');
    setImagen('');
    setSubcategoria('');
    setDescripcion('');
    setCantidad('');
    setAutor(null);
    setLibroSeleccionado(null);
    formRef.current.reset();
  };

  const handleEditarLibro = (id) => {
    axios.get(`https://server-0ugo.onrender.com/libros/${id}`)
      .then(response => {
        setLibroSeleccionado(response.data);
        setTitulo(response.data.titulo);
        setCategoria(response.data.categoria);
        setImagen(response.data.imagen);
        setSubcategoria(response.data.subcategoria);
        setDescripcion(response.data.descripcion);
        setCantidad(response.data.cantidad);
        setAutor(response.data.autor);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEliminarLibro = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este libro?")) {
      axios.delete(`https://server-0ugo.onrender.com/libros/${id}`)
        .then(response => {
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


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    axios.get(`https://server-0ugo.onrender.com/libros/${id}`)
      .then(response => {
        setLibroSeleccionado(response.data);
        setTitulo(response.data.titulo);
        setCategoria(response.data.categoria);
        setImagen(response.data.imagen);
        setSubcategoria(response.data.subcategoria);
        setDescripcion(response.data.descripcion);
        setCantidad(response.data.cantidad);
        setAutor(response.data.autor);
      })
      .catch(error => {
        console.log(error);
      });
  }, [location.search]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setShowOptions(true);
  };

  const handleSelectAuthor = (author) => {
    setAutor(author);
    setSearchTerm(author.nombre);
    setShowOptions(false);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className="form-container">
        <h2 className="titulodecarga">Cargar Libros</h2>
        <div className="subgrupo1 cargarpeli">
          <div className="form-group title">
            <label htmlFor="titulo" className="form-label">Título:</label>
            <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="form-group1">
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <textarea className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
        </div>
        <div className="subgrupo2 cargar">
          <div className="form-group autores">
            <label htmlFor="autor" className="form-label">Autor:</label>
            <div className="select-container">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearch}
                onBlur={() => setShowOptions(false)}
                className="form-control"
                placeholder="Buscar autor..."
              />
              {showOptions && (
                <div className="options-container" style={{ maxHeight: '60px', overflowY: 'auto' }}>
                  {autores
                    .filter(autor => autor.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(autor => (
                      <div
                        style={{ border: '1px solid black', padding: '1px' }}
                        className="option"
                        key={autor._id}
                        onMouseDown={() => handleSelectAuthor(autor)}
                      >
                        {autor.nombre}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group categoria">
            <label htmlFor="categoria" className="form-label">Categoría:</label>
            <select className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ color: '#000' }}>
              <option value="">Seleccionar categoría</option>
              {categorias.map(categoria => (
                <option key={categoria._id} value={categoria.name} style={{ color: '#000' }} >{categoria.name}</option>
              ))}
            </select>
          </div>

        </div>
        <div className="subgrupo4">
          <div className="form-group subcategoria">
            <label htmlFor="subcategoria" className="form-label">Subcategoría:</label>
            <select className="form-control" id="subcategoria" value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)}>
              <option value="">Seleccionar subcategoría</option>
              {subcategorias.map(subcategoria => (
                <option key={subcategoria._id} value={subcategoria._id}>{subcategoria}</option>
              ))}
            </select>
          </div>

          <div className="form-groupdecantidad">
            <label htmlFor="cantidad" className="form-label">Cantidad:</label>
            <input type="number" className="form-control" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </div>
        </div>



        <button type="submit" className="btn btn-success guardarlibro">{libroSeleccionado ? "Editar" : "Guardar"}</button>
      </form>

      <h2>Libros cargados:</h2>
      <div className="tabla-scroll reporteslibrosprestados cargar">
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
              {libros.map((libro, index) => (
                <tr key={libro._id}>
                  <td>{libro.titulo}</td>
                  <td>{libro.categoria}</td>
                  <td>{libro.subcategoria}</td>
                  <td>{libro.descripcion}</td>
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
    </div>
  );
};

export default CargarLibros;
