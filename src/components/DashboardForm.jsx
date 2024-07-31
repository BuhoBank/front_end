import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashboard.css"; // Ajusta la ruta según sea necesario

const DashboardForm = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="front_end_BuhoBank\src\assets\image.png" alt="BuhoBank" />
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Mis Cuentas
          </li>
          <li
            className={
              location.pathname === "/dashboard-transfer" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-transfer")}
          >
            Transferencias
          </li>
          <li
            className={
              location.pathname === "/dashboard-payments" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-payments")}
          >
            Pagos
          </li>
          <li
            className={
              location.pathname === "/dashboard-newaccount" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-newaccount")}
          >
            Solicitar cuentas
          </li>
          <li
            className={
              location.pathname === "/dashboard-others" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-others")}
          >
            Otros Servicios
          </li>
          <li
            className={
              location.pathname === "/dashboard-contacts" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-contacts")}
          >
            Mis Contactos
          </li>
          <li
            className={
              location.pathname === "/dashboard-profile" ? "active" : ""
            }
            onClick={() => navigate("/dashboard-profile")}
          >
            Mi perfil
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardForm;
