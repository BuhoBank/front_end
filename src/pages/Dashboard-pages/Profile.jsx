import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-profile.css"; // Asegúrate de importar los estilos

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="logo.png" alt="BuhoBank" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li onClick={() => navigate("/dashboard")}>Mis Cuentas</li>
            <li onClick={() => navigate("/dashboard-transfer")}>
              Transferencias
            </li>
            <li onClick={() => navigate("/dashboard-payments")}>Pagos</li>
            <li onClick={() => navigate("/dashboard-newaccount")}>
              Solicitar cuentas
            </li>
            <li onClick={() => navigate("/dashboard-others")}>
              Otros Servicios
            </li>
            <li onClick={() => navigate("/dashboard-contacts")}>
              Mis Contactos
            </li>
            <li
              className="active"
              onClick={() => navigate("/dashboard-profile")}
            >
              Mi perfil
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-user">
            <span>SE</span>
            <span>Steven Gabriel Erazo Laguna</span>
            <a href="#" onClick={handleLogout}>
              Salir
            </a>
          </div>
        </header>
        <div className="profile-content">
          <div className="profile-header">
            <h2>Nombre del usuario</h2>
          </div>
          <div className="profile-tabs">
            <button className="active">Detalle</button>
            <button>Cambio de Contraseña</button>
          </div>
          <section className="profile-details">
            <div className="profile-section">
              <h3>Datos personales</h3>
              <div className="profile-item">
                <span>Fecha de nacimiento</span>
                <span>21/09/2001</span>
              </div>
              <div className="profile-item">
                <span>Datos adicionales de perfil</span>
                <span>Información laboral y patrimonial</span>
              </div>
            </div>
            <div className="profile-section">
              <h3>Datos de contacto</h3>
              <div className="profile-item">
                <span>Número de celular</span>
                <span>0962567643</span>
                <a href="#">Editar</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
