import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-transfer.css";

const Transfer = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();
    // Lógica para manejar la transferencia
    console.log("Transferencia realizada:", { accountNumber, amount });
  };

  return (
    <div className="transfer">
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
        <h1>Transferencias</h1>
        <form className="transfer-form" onSubmit={handleTransfer}>
          <div className="form-group">
            <label htmlFor="accountNumber">Número de Cuenta:</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Monto:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Realizar Transferencia</button>
        </form>
      </main>
    </div>
  );
};

export default Transfer;
