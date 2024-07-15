import React, { useState } from "react";
import "./App.css";
import { Index } from "./components/Index.jsx";
import { Login } from "./components/login/Login.jsx";
import { Signup } from "./components/register/Signup.jsx";
import { EstudiantesPage } from "./components/dashboard/admin/estudiantes.jsx";
import { DashboardAdmin } from "./components/dashboard/admin/dashboard.jsx";
import { TutoresPage } from "./components/dashboard/admin/tutores.jsx";
import { TutoriaAdmin } from "./components/dashboard/admin/tutorias_programadas.jsx";
import { UserDashboard } from "./components/dashboard/user/User.jsx";
import { SolicitudesPage } from "./components/dashboard/admin/Solicitudes.jsx";

function App() {
  const [currentForm, setCurrentForm] = useState('index');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const renderCurrentForm = () => {
    switch (currentForm) {
      case "login":
        return <Login onFormSwitch={toggleForm} />;
      case "registro":
        return <Signup onFormSwitch={toggleForm} />;
      case "estudiante":
        return <EstudiantesPage onFormSwitch={toggleForm} />;
      case "panel":
        return <DashboardAdmin onFormSwitch={toggleForm} />;
      case "tutores":
        return <TutoresPage onFormSwitch={toggleForm} />;
      case "tutorias":
        return <TutoriaAdmin onFormSwitch={toggleForm} />;
      case "user":
        return <UserDashboard onFormSwitch={toggleForm} />;
      case "solicitudes":
        return <SolicitudesPage onFormSwitch={toggleForm} />;
      case "index":
      default:
        return <Index onFormSwitch={toggleForm} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentForm()}
    </div>
  );
}

export default App;
