import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/styles.css'; 

export const TutoriaAdmin = (props) => {
    const [tutorias, setTutorias] = useState([]);
    const [tutores, setTutores] = useState([]);

    useEffect(() => {
        const storedTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
        const storedTutores = JSON.parse(localStorage.getItem('tutores')) || [];
        setTutorias(storedTutorias);
        setTutores(storedTutores);
    }, []);

    const handleAgregarTutoria = () => {
        Swal.fire({
            title: 'Agregar Tutoría',
            html: `
                <input type="date" id="fecha" class="swal2-input form-control" placeholder="Fecha">
                <input type="time" id="hora" class="swal2-input form-control" placeholder="Hora">
              <select id="tutor" class="swal2-select form-control">
                <option disabled selected>Seleccione un tutor</option>
                ${tutores.map(tutor => `<option>${tutor.nombres}</option>`)}
            </select>
            <input id="materia" class="swal2-input form-control" placeholder="Materia">

            `,
            focusConfirm: false,
            preConfirm: () => {
                const fecha = Swal.getPopup().querySelector('#fecha').value;
                const hora = Swal.getPopup().querySelector('#hora').value;
                const tutor = Swal.getPopup().querySelector('#tutor').value;
                const materia = Swal.getPopup().querySelector('#materia').value;
                const today = new Date().toISOString().split('T')[0];

                if (!fecha || !hora || !tutor || !materia) {
                    Swal.showValidationMessage(`Todos los campos son obligatorios`);
                } else if (fecha < today) {
                    Swal.showValidationMessage(`No se pueden agregar tutorías en fechas pasadas`);
                } else {
                    return { fecha: fecha, hora: hora, tutor: tutor, materia: materia };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newTutoria = {
                    fecha: result.value.fecha,
                    hora: result.value.hora,
                    tutor: result.value.tutor,
                    materia: result.value.materia
                };

                const updatedTutorias = [...tutorias, newTutoria];
                setTutorias(updatedTutorias);
                localStorage.setItem('tutorias', JSON.stringify(updatedTutorias));

                Swal.fire({
                    title: 'Tutoría Agregada',
                    text: 'La tutoría ha sido agregada correctamente',
                    icon: 'success',
                    timer: 5000,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleEliminarTutoria = (index) => {
        Swal.fire({
            title: '¿Está seguro de eliminar la tutoría?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTutorias = [...tutorias];
                updatedTutorias.splice(index, 1);
                setTutorias(updatedTutorias);
                localStorage.setItem('tutorias', JSON.stringify(updatedTutorias));

                Swal.fire({
                    title: 'Tutoría Eliminada',
                    text: 'La tutoría ha sido eliminada correctamente',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <a onClick={() => props.onFormSwitch('panel')}>
                        <img src={process.env.PUBLIC_URL + '/icon.png'}  alt="Logo ULEAM" className="logo" />
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
                    <h2>Tutorías Programadas</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Buscar..." />
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        <button className="btn btn-primary ms-auto" onClick={handleAgregarTutoria}>Agregar Tutoría</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Tutor</th>
                                <th scope="col">Materia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorias.map((tutoria, index) => (
                                <tr key={index}>
                                    <td>{tutoria.fecha}</td>
                                    <td>{tutoria.hora}</td>
                                    <td>{tutoria.tutor}</td>
                                    <td>{tutoria.materia}</td>
                                    <td>
                                        <button className="button-delete" onClick={() => handleEliminarTutoria(index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};
