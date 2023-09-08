import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.css';
import imagen1 from './imagenes/IMAGEN 1 SJN.jpg';
import imagen2 from './imagenes/IMAGEN 2 SJN.jpg';
import imagen3 from './imagenes/IMAGEN 3 SJN.jpeg';
import imagen4 from './imagenes/CASADECULTURA.png';

const NavBar = () => {
 
  return (
    <nav className='navbarsuper'>
      <div className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img className='logocasa' src={imagen4} alt="Logo Casa de Cultura" />
          <h2 className='texto0'>BliotecaPopular</h2>
        </div>
        <Carousel className='carouselbarra'>
          <Carousel.Item>
            <img className='green-gradient carousel' src={imagen1} style={{ width: '100%', height: '300px' }} alt="green-gradient carousel" text="First slide" />
            <Carousel.Caption>
              <h3 className='texto1'>San Juan Nepomuceno</h3>
              <p>Colocar aqui descripcion</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='green-gradient carousel' src={imagen2} style={{ width: '100%', height: '300px' }} alt="green-gradient carousel" text="Second slide" />
            <Carousel.Caption>
              <h3 className='texto1'>Iglesia Central San Juan Nepomuceno</h3>
              <p>Colocar aqui descripcion</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='green-gradient carousel' src={imagen3} style={{ width: '100%', height: '300px' }} alt="green-gradient carousel" text="Third slide" />
            <Carousel.Caption>
              <h3 className='texto1'>Arbol Navideño Nicho</h3>
              <p>
                Colocar aqui descripcion.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <ul className={`navegador1`}>
        <Dropdown>
          <Dropdown.Toggle className='botondespliege' variant="success" id="dropdown-basic">
            Inicio
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/inicio">Carga de Libros</Dropdown.Item>
            <Dropdown.Item href="/todoslibros">Inventario de Libros</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle className='botondespliege' variant="success" id="dropdown-basic">
            Prestamos
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/prestarlibros">Prestar Libros</Dropdown.Item>
            <Dropdown.Item href="/registroalquiler">Registro de Libros Prestados</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle className='botondespliege' variant="success" id="dropdown-basic">
            Reportes
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/reportelibrosprestados">Reporte de Libros Prestados</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle className='botondespliege' variant="success" id="dropdown-basic">
            Categorias
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/categorias">Cargar Categorias</Dropdown.Item>
            <Dropdown.Item href="/cargarsubcategorias">Cargar SubCategorias</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle className='botondespliege' variant="success" id="dropdown-basic">
            Autores
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/crearautores">Cargar Autores</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </ul>
    </nav>
  );
};

export default NavBar;