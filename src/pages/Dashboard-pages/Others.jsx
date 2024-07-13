import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-other.css";

const Others = () => {
  const navigate = useNavigate();

  return (
    <div className="others">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="" alt="BuhoBank" />
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
            <li onClick={() => navigate("/dashboard-profile")}>Mi perfil</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Otros Servicios</h1>
        <p>Aquí puedes administrar otros servicios ofrecidos por BuhoBank.</p>
      </main>
    </div>
  );
};

export default Others;
