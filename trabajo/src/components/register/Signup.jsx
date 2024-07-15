import React, { useState, useRef } from 'react';
import './signup.css'; 

export const Signup = (props) => {
  const nombreInput = useRef(null);
  const correoInput = useRef(null);
  const contraseñaInput = useRef(null);
  const confirmarContrasenaInput = useRef(null);
  const carreraInput = useRef(null);
  const tutorAsignadoInput = useRef(null);

  const [nombreMensaje, setNombreMensaje] = useState('');
  const [correoMensaje, setCorreoMensaje] = useState('');
  const [contraseñaMensaje, setContraseñaMensaje] = useState('');
  const [confirmarContrasenaMensaje, setConfirmarContrasenaMensaje] = useState('');
  const [carreraMensaje, setCarreraMensaje] = useState('');
  const [tutorMensaje, setTutorMensaje] = useState('');

  const validarNombre = () => {
    const valor = nombreInput.current.value.trim();
    if (valor === '') {
      setNombreMensaje('⚠️ Este campo no puede estar vacío');
    } else if (valor.length < 3) {
      setNombreMensaje('⚠️ Debe tener al menos 3 caracteres');
    } else {
      setNombreMensaje('');
    }
  };

  const validarCorreo = () => {
    const valor = correoInput.current.value.trim();
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === '') {
      setCorreoMensaje('⚠️ Este campo no puede estar vacío');
    } else if (!expresionCorreo.test(valor)) {
      setCorreoMensaje('⚠️ Ingresa un correo electrónico válido');
    } else {
      setCorreoMensaje('');
    }
  };

  const validarContraseña = () => {
    const valor = contraseñaInput.current.value.trim();
    if (valor === '') {
      setContraseñaMensaje('⚠️ Este campo no puede estar vacío');
    } else if (valor.length < 8) {
      setContraseñaMensaje('⚠️ La contraseña debe tener al menos 8 caracteres');
    } else {
      setContraseñaMensaje('');
    }
  };

  const validarConfirmarContraseña = () => {
    const contraseña = contraseñaInput.current.value.trim();
    const confirmarContraseña = confirmarContrasenaInput.current.value.trim();

    if (confirmarContraseña === '') {
      setConfirmarContrasenaMensaje('⚠️ Este campo no puede estar vacío');
    } else if (contraseña !== confirmarContraseña) {
      setConfirmarContrasenaMensaje('⚠️ Las contraseñas no coinciden');
    } else {
      setConfirmarContrasenaMensaje('');
    }
  };

  const validarCarrera = () => {
    const valor = carreraInput.current.value.trim();
    if (valor === '') {
      setCarreraMensaje('⚠️ Este campo no puede estar vacío');
    } else {
      setCarreraMensaje('');
    }
  };

  const validarTutor = () => {
    const valor = tutorAsignadoInput.current.value.trim();
    if (valor === '') {
      setTutorMensaje('⚠️ Este campo no puede estar vacío');
    } else {
      setTutorMensaje('');
    }
  };

  const handleRegistro = (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Validación de campos
    validarNombre();
    validarCorreo();
    validarContraseña();
    validarConfirmarContraseña();
    validarCarrera();
    validarTutor();

    // Verificación de errores
    if (
      nombreMensaje === '' &&
      correoMensaje === '' &&
      contraseñaMensaje === '' &&
      confirmarContrasenaMensaje === '' &&
      carreraMensaje === '' &&
      tutorMensaje === ''
    ) {
      // Procesamiento de registro
      const nuevoUsuario = {
        nombre: nombreInput.current.value.trim(),
        correo: correoInput.current.value.trim(),
        contraseña: contraseñaInput.current.value.trim(),
        carrera: carreraInput.current.value.trim(),
        tutor: tutorAsignadoInput.current.value.trim(),
        rol: 'usuario', 
      };

      // Obtener registros actuales del localStorage
      let usuariosRegistrados = JSON.parse(localStorage.getItem('Usuarios')) || [];

      // Agregar nuevo usuario a la lista
      usuariosRegistrados.push(nuevoUsuario);

      // Guardar en localStorage
      localStorage.setItem('Usuarios', JSON.stringify(usuariosRegistrados));

      // Restablecer campos después del registro
      nombreInput.current.value = '';
      correoInput.current.value = '';
      contraseñaInput.current.value = '';
      confirmarContrasenaInput.current.value = '';
      carreraInput.current.value = '';
      tutorAsignadoInput.current.value = '';

      // Mostrar mensaje de éxito
      alert('Registro exitoso');
    } else {
      // Mostrar mensaje de error
      alert('Por favor, corrige los errores antes de registrar.');
    }
  };

  return (
    <div>
      {/* Cabecera */}
      <header className="header-main">
        <div className="header-container">
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Logo ULEAM" className="logo" />
            <h1> ULEAM</h1>
          </div>
          <div className="button-container">
            <button className="login-button" onClick={() => props.onFormSwitch('index')}>
              Regresar
            </button>
            <button className="register-button" onClick={() => props.onFormSwitch('login')}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Formulario de registro */}
      <form id="registroForm" className="form-container" onSubmit={handleRegistro}>
        <div className="container" id="signup-container">
          <h2 id="h2">REGISTRO</h2>
          <div className="signup-form" id="signup-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                ref={nombreInput}
                onBlur={validarNombre}
                required
              />
              <span style={{ color: 'red' }}>{nombreMensaje}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={correoInput}
                onBlur={validarCorreo}
                required
              />
              <span style={{ color: 'red' }}>{correoMensaje}</span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                ref={contraseñaInput}
                onBlur={validarContraseña}
                required
              />
              <span style={{ color: 'red' }}>{contraseñaMensaje}</span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                ref={confirmarContrasenaInput}
                onBlur={validarConfirmarContraseña}
                required
              />
              <span style={{ color: 'red' }}>{confirmarContrasenaMensaje}</span>
            </div>
            <div className="form-group">
              <label htmlFor="carrera">Carrera:</label>
              <input
                type="text"
                id="carrera"
                name="carrera"
                ref={carreraInput}
                onBlur={validarCarrera}
                required
              />
              <span style={{ color: 'red' }}>{carreraMensaje}</span>
            </div>
            <div className="form-group">
              <label htmlFor="tutorAsignado">Tutor asignado:</label>
              <input
                type="text"
                id="tutorAsignado"
                name="tutorAsignado"
                ref={tutorAsignadoInput}
                onBlur={validarTutor}
                required
              />
              <span style={{ color: 'red' }}>{tutorMensaje}</span>
            </div>
            <button type="submit">
              Registrar
            </button>
          </div>
        </div>
      </form>

      {/* Pie de página */}
      <footer className="footer-registro">
        <p>&copy; 2024 ULEAM. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
