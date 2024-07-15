import React, { useEffect } from 'react';
import './index.css';
import logo from '../assets/icon.png';
import tutoria1 from '../assets/images.png';
import tutoria2 from '../assets/image1.png';
import caracteristicas1 from '../assets/img2.jpg';
import caracteristicas2 from '../assets/logoL.png';
import Slider from './index/Slider';

export const Index = (props) => {
  useEffect(() => {
    // Verificar si ya existen usuarios en localStorage
    let usuariosRegistrados = JSON.parse(localStorage.getItem('Usuarios'));

    if (!usuariosRegistrados) {
      // Crear usuarios por defecto si no existen
      const usuariosPorDefecto = [
        {
          nombre: 'Admin',
          correo: 'admin@gmail.com',
          contraseña: 'admin123',
          carrera: 'Administración',
          tutor: 'Tutor Admin',
          rol: 'admin',
        },
        {
          nombre: 'Usuario',
          correo: 'usuario@gmail.com',
          contraseña: 'usuario123',
          carrera: 'Ingeniería',
          tutor: 'Tutor Usuario',
          rol: 'usuario',
        }
      ];

      localStorage.setItem('Usuarios', JSON.stringify(usuariosPorDefecto));
    }
  }, []);

  const handleRegister = (rol) => {
    // Esta función puede ser utilizada para registrar nuevos usuarios,
    // pero los usuarios por defecto ya se han creado al cargar la página.
    alert(`No puedes registrar nuevos usuarios desde esta interfaz.`);
  };

  return (
    <div className="App">
      <header className="header-main">
        <div className="header-container">
          <div className="logo-container">
            <img src={logo} alt="Logo ULEAM" className="logo" />
            <h1>ULEAM</h1>
          </div>
          <div className="button-container">
            <button className="login-button" onClick={() => props.onFormSwitch('login')}>Iniciar Sesión</button>
            <button className="register-button" onClick={() => props.onFormSwitch('registro')}>Registrarse</button>
          </div>
        </div>
      </header>
      <h1>Tutorías de Titulación ULEAM</h1>
      <main>
        <section className="section">
          <div className="section-content">
            <h2>Facilita tu Proceso de Titulación</h2>
            <p>
              Nuestro software está diseñado para ayudarte a gestionar y realizar el seguimiento de tus tutorías de titulación de manera eficiente y efectiva.
            </p>
          </div>
          <div className="section-image">
            <Slider images={[tutoria1, tutoria2]} />
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h2>Características Principales</h2>
            <ul>
              <li>Seguimiento detallado de tus tutorías</li>
              <li>Comunicación directa con tu tutor</li>
              <li>Gestión de plazos y entregas</li>
              <li>Acceso a recursos y materiales adicionales</li>
            </ul>
          </div>
          <div className="section-image">
            <Slider images={[caracteristicas1, caracteristicas2]} />
          </div>
        </section>
      </main>

      <footer className="footer-main">
        <p>&copy; 2024 ULEAM. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
