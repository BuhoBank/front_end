import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/DashboardForm.css"; // Asegúrate de que la ruta sea correcta

const DashboardForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const open_menu = () => {
    console.log("Menú hamburguesa clicado"); // Verifica si se ejecuta
    let menu_desplegable = document.getElementById("menu");
    menu_desplegable.classList.toggle("abrir_menu");
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Aquí puedes agregar cualquier lógica adicional para cerrar sesión, como limpiar el estado global o las cookies
    navigate("/"); // Redirige a la página de login
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="barras">
          <button onClick={open_menu} className="boton_menu" id="x">
            <div className="linea"></div>
            <div className="linea"></div>
            <div className="linea"></div>
          </button>
          <img src="image2.png" alt="BuhoBank" className="logo-image" />
        </div>
      </div>
      <nav id="menu" className="sidebar-menu">
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
            Pago de servicios
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
          <li
            className="cerrar-sesion"
            onClick={handleLogout} // Usamos la función de logout
          >
            Cerrar Sesión
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardForm;
