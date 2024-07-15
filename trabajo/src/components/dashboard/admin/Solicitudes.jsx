import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/styles.css';

export const SolicitudesPage = (props) => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        const storedSolicitudes = JSON.parse(localStorage.getItem('proximasTutorias')) || [];
        setSolicitudes(storedSolicitudes);
    }, []);

    const handleAceptarSolicitud = (index) => {
        Swal.fire({
            title: '¿Está seguro de aceptar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedSolicitudes = [...solicitudes];
                updatedSolicitudes[index].estado = 'aceptada';
                setSolicitudes(updatedSolicitudes);
                localStorage.setItem('solicitudes', JSON.stringify(updatedSolicitudes));

                Swal.fire('Aceptada', 'La solicitud ha sido aceptada.', 'success');
            }
        });
    };

    const handleRechazarSolicitud = (index) => {
        Swal.fire({
            title: '¿Está seguro de rechazar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, rechazar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedSolicitudes = [...solicitudes];
                updatedSolicitudes[index].estado = 'rechazada';
                setSolicitudes(updatedSolicitudes);
                localStorage.setItem('solicitudes', JSON.stringify(updatedSolicitudes));

                Swal.fire('Rechazada', 'La solicitud ha sido rechazada.', 'success');
            }
        });
    };

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
                    <li><a onClick={() => props.onFormSwitch('tutorias')}>Tutorías Programadas</a></li>
                    <li><a onClick={() => props.onFormSwitch('solicitudes')}>Solicitudes</a></li>
                    <li><a onClick={() => props.onFormSwitch('estudiante')}>Estudiantes</a></li>
                    <li><a onClick={() => props.onFormSwitch('tutores')}>Tutores</a></li>
                    <li><a onClick={() => props.onFormSwitch('index')}>Cerrar Sesión</a></li>
                </ul>
            </nav>

            <main className="container mt-4">
                <section className="mb-4">
                    <h2>Solicitudes de Tutoría</h2>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Materia</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                                <th scope="col">Cantidad de Solicitudes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud, index) => (
                                <tr key={index}>
                                    <td>{solicitud.materia}</td>
                                    <td>{solicitud.fecha}</td>
                                    <td>{solicitud.hora}</td>
                                    <td>{solicitud.estado}</td>
                                    <td>
                                        <button className="button-aceptar" onClick={() => handleAceptarSolicitud(index)}>Aceptar</button>
                                        <button className="button-delete" onClick={() => handleRechazarSolicitud(index)}>Rechazar</button>
                                    </td>
                                    <td>{solicitudes.filter(s => s.materia === solicitud.materia).length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

