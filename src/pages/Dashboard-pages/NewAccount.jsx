import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-newaccount.css";

const NewAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="new-account">
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
        <h1>Solicitar Nueva Cuenta</h1>
        <form>
          <div className="form-group">
            <label htmlFor="accountType">Tipo de Cuenta:</label>
            <select id="accountType">
              <option value="savings">Ahorros</option>
              <option value="checking">Corriente</option>
            </select>
          </div>
          <button type="submit">Solicitar</button>
        </form>
      </main>
    </div>
  );
};

export default NewAccount;
