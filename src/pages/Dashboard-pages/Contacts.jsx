import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-contacts.css";

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <div className="contacts">
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
        <h1>Mis Contactos</h1>
        <ul>
          <li>Contacto 1: 123-456-789</li>
          <li>Contacto 2: 987-654-321</li>
        </ul>
      </main>
    </div>
  );
};

export default Contacts;
