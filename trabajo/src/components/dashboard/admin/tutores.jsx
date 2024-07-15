import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/styles.css'; 

export const TutoresPage = (props) => {
    const [tutores, setTutores] = useState([]);

    // Cargar tutores almacenados en localStorage al cargar la página
    useEffect(() => {
        const storedTutores = JSON.parse(localStorage.getItem('tutores')) || [];
        setTutores(storedTutores);
    }, []);

    const handleAgregarTutor = () => {
        Swal.fire({
            title: 'Agregar Tutor',
            html: `
                <input type="text" id="nombres" class="swal2-input form-control" placeholder="Nombres">
                <input type="text" id="carrera" class="swal2-input form-control" placeholder="Carrera">
                <input type="text" id="materia" class="swal2-input form-control" placeholder="Materia que imparte">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombres = Swal.getPopup().querySelector('#nombres').value;
                const carrera = Swal.getPopup().querySelector('#carrera').value;
                const materia = Swal.getPopup().querySelector('#materia').value;

                if (!nombres || !carrera || !materia) {
                    Swal.showValidationMessage(`Todos los campos son obligatorios`);
                } else {
                    return { nombres: nombres, carrera: carrera, materia: materia };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newTutor = {
                    nombres: result.value.nombres,
                    carrera: result.value.carrera,
                    materia: result.value.materia
                };

                // Actualizar estado local de tutores
                const updatedTutores = [...tutores, newTutor];
                setTutores(updatedTutores);

                // Guardar en localStorage
                localStorage.setItem('tutores', JSON.stringify(updatedTutores));

                Swal.fire({
                    title: 'Tutor Agregado',
                    text: 'El tutor ha sido agregado correctamente',
                    icon: 'success',
                    timer: 5000,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleConfirmarBaja = (index) => {
        Swal.fire({
            title: '¿Está seguro de dar de baja?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, dar de baja',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar tutor del estado local
                const updatedTutores = [...tutores];
                updatedTutores.splice(index, 1);
                setTutores(updatedTutores);

                // Actualizar localStorage
                localStorage.setItem('tutores', JSON.stringify(updatedTutores));

                Swal.fire({
                    title: 'Baja Confirmada',
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
                    <h2>Tutores</h2>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Buscar..." />
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        <button className="btn btn-primary ms-auto" onClick={handleAgregarTutor}>Agregar Tutor</button>
                    </div>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Especialidad</th>
                                <th scope="col">Materia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutores.map((tutor, index) => (
                                <tr key={index}>
                                    <td>{tutor.nombres}</td>
                                    <td>{tutor.carrera}</td>
                                    <td>{tutor.materia}</td>
                                    <td>
                                        <button className="button-delete" onClick={() => handleConfirmarBaja(index)}>Eliminar</button>
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

