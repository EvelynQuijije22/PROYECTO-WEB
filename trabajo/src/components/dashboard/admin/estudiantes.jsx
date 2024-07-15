import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './css/styles.css'; 

export const EstudiantesPage = (props) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [tutores, setTutores] = useState([]);

    // Cargar estudiantes y tutores almacenados en localStorage al cargar la página
    useEffect(() => {
        const storedEstudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
        setEstudiantes(storedEstudiantes);

        const storedTutores = JSON.parse(localStorage.getItem('tutores')) || [];
        setTutores(storedTutores);
    }, []);

    const handleAgregarEstudiante = () => {
        Swal.fire({
            title: 'Agregar Estudiante',
            html: `
                <input type="text" id="nombres" class="swal2-input form-control" placeholder="Nombres">
                <input type="text" id="carrera" class="swal2-input form-control" placeholder="Carrera">
                <input type="text" id="semestre" class="swal2-input form-control" placeholder="Semestre">
                <select id="tutor" class="swal2-select form-control" required>
                <option value="">Seleccione tutor</option>
                ${tutores.map(tutor => `<option>${tutor.nombres}</option>`)}
            </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombres = Swal.getPopup().querySelector('#nombres').value;
                const carrera = Swal.getPopup().querySelector('#carrera').value;
                const semestre = Swal.getPopup().querySelector('#semestre').value;
                const tutor = Swal.getPopup().querySelector('#tutor').value;

                if (!nombres || !carrera || !semestre || !tutor) {
                    Swal.showValidationMessage(`Todos los campos son obligatorios`);
                } else {
                    return { nombres: nombres, carrera: carrera, semestre: semestre, tutor: tutor };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newEstudiante = {
                    nombres: result.value.nombres,
                    carrera: result.value.carrera,
                    semestre: result.value.semestre,
                    tutor: result.value.tutor
                };

                // Actualizar estado local de estudiantes
                const updatedEstudiantes = [...estudiantes, newEstudiante];
                setEstudiantes(updatedEstudiantes);

                // Guardar en localStorage
                localStorage.setItem('estudiantes', JSON.stringify(updatedEstudiantes));

                Swal.fire({
                    title: 'Estudiante Agregado',
                    text: 'El estudiante ha sido agregado correctamente',
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
                // Eliminar estudiante del estado local
                const updatedEstudiantes = [...estudiantes];
                updatedEstudiantes.splice(index, 1);
                setEstudiantes(updatedEstudiantes);

                // Actualizar localStorage
                localStorage.setItem('estudiantes', JSON.stringify(updatedEstudiantes));

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
                    <h2>Estudiantes</h2>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Buscar..." />
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        <button className="btn btn-primary ms-auto" onClick={handleAgregarEstudiante}>Agregar Estudiante</button>
                    </div>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Semestre</th>
                                <th scope="col">Tutor</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.nombres}</td>
                                    <td>{estudiante.carrera}</td>
                                    <td>{estudiante.semestre}</td>
                                    <td>{estudiante.tutor}</td>
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

export default EstudiantesPage;
