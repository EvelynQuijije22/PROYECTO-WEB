import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './user.css';

export const UserDashboard = ({ onFormSwitch }) => {
    const [esperando, setEsperando] = useState(true);
    const [proximasTutorias, setProximasTutorias] = useState([]);
    const [tutoriaDestacados, settutoriaDestacados] = useState([]);

    useEffect(() => {
        const storedTutorias = JSON.parse(localStorage.getItem('proximasTutorias')) || [];
        const storedProximasTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];

        settutoriaDestacados(storedProximasTutorias);
        setProximasTutorias(storedTutorias);
    }, []);

    const solicitarTutoria = () => {
        Swal.fire({
            title: 'Solicitar Nueva Tutoría',
            html: `
                <input type="text" id="materia" class="swal2-input" placeholder="Materia">
                <input type="date" id="fecha" class="swal2-input">
                <input type="time" id="hora" class="swal2-input">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const materia = Swal.getPopup().querySelector('#materia').value;
                const fecha = Swal.getPopup().querySelector('#fecha').value;
                const hora = Swal.getPopup().querySelector('#hora').value;

                if (!materia || !fecha || !hora) {
                    Swal.showValidationMessage('Por favor, ingrese todos los campos');
                    return false;
                }

                const selectedDateTime = new Date(`${fecha}T${hora}`);
                const now = new Date();

                if (selectedDateTime < now) {
                    Swal.showValidationMessage('La fecha y hora no pueden ser en el pasado');
                    return false;
                }

                return { materia, fecha, hora };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { materia, fecha, hora } = result.value;

                setEsperando(true);

                setTimeout(() => {
                    const nuevaTutoria = { materia, fecha, hora, estado: 'esperando' };

                    const tutoriasSolicitadas = JSON.parse(localStorage.getItem('proximasTutorias')) || [];
                    tutoriasSolicitadas.push(nuevaTutoria);
                    localStorage.setItem('proximasTutorias', JSON.stringify(tutoriasSolicitadas));

                    setProximasTutorias(tutoriasSolicitadas);
                    setEsperando(false);

                    Swal.fire('¡Solicitada!', `Has solicitado una tutoría de ${materia} el ${fecha} a las ${hora}.`, 'success');
                }, 1500);
            }
        });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={`${process.env.PUBLIC_URL}/icon.png`} alt="Logo ULEAM" className="logo" />
                    <h2>Dashboard Estudiantes</h2>
                </div>
                <ul className="nav-links">
                    <li><a onClick={() => onFormSwitch('index')}>Cerrar Sesión</a></li>
                </ul>
            </nav>

            <main className="main-cosas">
                <section className="section-fila">
                    <div className="card">
                        <button className="button button-primary" onClick={solicitarTutoria}>
                            Solicitar Nuevas Tutorías
                        </button>
                    </div>
                </section>

                <section className="section-fila">
                    <div className="card">
                        <h3>Próximas Tutorías</h3>
                        <ul className="tutorial-list">
                            {tutoriaDestacados.map((tutoria, index) => (
                                <li key={index} className="tutorial-item">
                                    <div className="tutorial-details">
                                        <span className="tutorial-materia">{tutoria.materia}</span>
                                        <span className="tutorial-fecha">Fecha: {tutoria.fecha}</span>
                                        <span className="tutorial-hora">Hora: {tutoria.hora}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="section-fila">
                    <div className="card">
                        <h3>Solicitudes de Tutorías</h3>
                        <ul className="tutorial-list">
                            {proximasTutorias.map((tutoria, index) => (
                                <li key={index} className="tutorial-item">
                                    <div className="tutorial-details">
                                        <span className="tutorial-materia">{tutoria.materia}</span>
                                        <span className="tutorial-fecha">Fecha: {tutoria.fecha}</span>
                                        <span className="tutorial-hora">Hora: {tutoria.hora}</span>
                                    </div>
                                    <span className={`tutorial-estado ${tutoria.estado}`}>{tutoria.estado}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};
