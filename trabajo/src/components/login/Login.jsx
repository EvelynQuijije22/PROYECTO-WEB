import React, { useState } from "react";
import './login.css'; 

export const Login = (props) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const checkLogin = () => {
    // Validar el formato del correo electrónico
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      setErrorMensaje('El formato del correo electrónico no es válido');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (contrasena.length < 6) {
      setErrorMensaje('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Obtener los datos de usuario almacenados en localStorage
    const storedUser = JSON.parse(localStorage.getItem('Usuarios'));

    // Verificar si hay datos de usuario y si es así, comparar con el correo y contraseña ingresados
    if (storedUser) {
      const usuarioEncontrado = storedUser.find(user => user.correo === correo && user.contraseña === contrasena);

      if (usuarioEncontrado) {
        console.log('Inicio de sesión exitoso:', usuarioEncontrado);
        
        // Verificar el rol del usuario encontrado
        if (usuarioEncontrado.rol === 'admin') {
          console.log('¡Bienvenido, administrador!');
          props.onFormSwitch('panel');
        } else if (usuarioEncontrado.rol === 'usuario') {
          console.log('¡Bienvenido, usuario!');
          props.onFormSwitch('user');

        } else {
          console.log('Rol desconocido:', usuarioEncontrado.roles);
        }

      } else {
        setErrorMensaje('Correo o contraseña incorrectos');
      }
    } else {
      setErrorMensaje('No hay datos de usuario en localStorage');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMensaje(''); // Reiniciar el mensaje de error antes de la validación
    checkLogin();
  };

  return (
    <div>
      {/* BARRA DE NAVEGACION */}
      <header className="header-main">
        <div className="header-container">
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Logo ULEAM" className="logo" />
            <h1> ULEAM</h1>
          </div>
          <div className="button-container">
            <button className="login-button" onClick={() => props.onFormSwitch('index')}>Regresar</button>
            <button className="register-button" onClick={() => props.onFormSwitch('registro')}>Registrarse</button>
          </div>
        </div>
      </header>

      <br /><br /><br />
      <br /><br />
      
      {/* FORMULARIO DE INGRESO */}
      <div id="signup-container">
        <h2 id="h2">INICIAR SESIÓN</h2>
        <form id="signup-form" method="post" onSubmit={handleLogin}>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="signup" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <br /><br />

          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          <span id="error-message" className="error-message">{errorMensaje}</span>

          <br /><br />

          <button id="redirigir-button" type="submit">Ingresar</button>
        </form>
      </div>
    
      <br /><br /><br /><br /><br /><br />

      {/* PIE DE PAGINA */}
      <footer className="footer-main">
        <p>&copy; 2024 ULEAM. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
