import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-payments.css";

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="payments">
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
        <h1>Pagos</h1>
        <form>
          <div className="form-group">
            <label htmlFor="billNumber">Número de Factura:</label>
            <input type="text" id="billNumber" required />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Monto:</label>
            <input type="number" id="amount" required />
          </div>
          <button type="submit">Pagar</button>
        </form>
      </main>
    </div>
  );
};

export default Payments;
