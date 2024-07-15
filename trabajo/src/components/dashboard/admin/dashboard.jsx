import React, { useState, useEffect } from 'react';
import './css/styles.css'; 

export const DashboardAdmin = (props) => {
    const [proximasTutorias, setProximasTutorias] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [tutoresDestacados, setTutoresDestacados] = useState([]);

    useEffect(() => {
        const storedProximasTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
        const storedEstudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
        const storedTutoresDestacados = JSON.parse(localStorage.getItem('tutores')) || [];

        setProximasTutorias(storedProximasTutorias);
        setEstudiantes(storedEstudiantes);
        setTutoresDestacados(storedTutoresDestacados);
    }, []);

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <a onClick={() => props.onFormSwitch('panel')}>
                        <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Logo ULEAM" className="logo" />
                    </a>
                    <h2>Control de Tutorías</h2>
                </div>
                <h2>Administrador</h2>

                <ul className="nav-links">
                    <li><a onClick={() => props.onFormSwitch('tutorias')} >Tutorías Programadas</a></li>
                    <li><a onClick={() => props.onFormSwitch('solicitudes')}>Solicitudes</a></li>
                    <li><a onClick={() => props.onFormSwitch('estudiante')}>Estudiantes</a></li>
                    <li><a onClick={() => props.onFormSwitch('tutores')}>Tutores</a></li>
                    <li><a onClick={() => props.onFormSwitch('index')}>Cerrar Sesión</a></li>
                </ul>
            </nav>
            <main className="main-content">
    <section className="section">
        <h2>Misión</h2>
        <p>Nuestra misión es proporcionar soluciones educativas innovadoras que inspiren y transformen vidas, asegurando el desarrollo integral de nuestros estudiantes.</p>
    </section>

    <section className="section">
        <h2>Visión</h2>
        <p>Nuestra visión es ser reconocidos como líderes en la formación académica y profesional, destacándonos por nuestra excelencia educativa y compromiso con la comunidad.</p>
    </section>

    <section className="section">
        <h2>Información</h2>
        <p>Aquí encontrarás información relevante sobre nuestros programas académicos, servicios estudiantiles y eventos próximos. Estamos comprometidos con tu éxito académico y profesional.</p>
    </section>

    <section className="section">
        <h3>Próximas Tutorías</h3>
        <div className="scheduled-tutorials">
            <ul>
                {proximasTutorias.map((tutoria, index) => (
                    <li key={index}>{tutoria.tutor} - Fecha: {tutoria.fecha}</li>
                ))}
            </ul>
        </div>
    </section>

    <section className="section">
        <h3>Estudiantes</h3>
        <div className="students-list">
            <ul>
                {estudiantes.map((estudiante, index) => (
                    <li key={index}>- Estudiante: {estudiante.nombres} * Carrera: {estudiante.carrera}</li>
                ))}
            </ul>
        </div>
    </section>

    <section className="section">
        <h3>Tutores</h3>
        <div className="tutors-list">
            <ul>
                {tutoresDestacados.map((tutor, index) => (
                    <li key={index}>- {tutor.nombres} * Área: {tutor.materia}</li>
                ))}
            </ul>
        </div>
    </section>
</main>

        </div>
    );
}
