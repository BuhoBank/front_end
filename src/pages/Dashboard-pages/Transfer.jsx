import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-transfer.css";

const Transfer = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState("");

  const userAccounts = [
    { id: "1", name: "Cuenta de Ahorro 1", number: "220678123" },
    { id: "2", name: "Cuenta de Ahorro 2", number: "220678456" },
    // Añadir más cuentas según sea necesario
  ];

  const handleTransfer = (e) => {
    e.preventDefault();
    // Lógica para manejar la transferencia
    console.log("Transferencia realizada:", {
      selectedAccount,
      amount,
      beneficiary,
      accountNumber,
      description,
      notification,
    });
  };

  return (
    <div className="transfer">
      <aside className="sidebar">
        {/* <div className="sidebar-logo">
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
        </nav> */}
        <Navigate />
      </aside>
      <main className="main-content">
        <h1>Transferencias Directas</h1>
        <div className="account-info">
          <label htmlFor="account-select"></label>
          <select
            id="account-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="">Seleccione una cuenta</option>
            {userAccounts.map((account) => (
              <option key={account.id} value={account.number}>
                {account.name} - {account.number}
              </option>
            ))}
          </select>
        </div>
        <form className="transfer-form" onSubmit={handleTransfer}>
          <div className="form-group">
            <label htmlFor="amount"></label>
            <div className="amount-input">
              <span>$</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ingrese el valor a transferir"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="beneficiary"></label>
            <input
              type="text"
              id="beneficiary"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              required
              placeholder="Nombre del beneficiario"
            />
            <input
              type="text"
              placeholder="Número de cuenta"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"></label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="150"
              placeholder="Descripción (Opcional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notification"></label>
            <input
              type="email"
              id="notification"
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              placeholder="Correo electrónico (Opcional)"
            />
          </div>
          <div className="form-actions">
            <button type="reset" className="btn-secondary">
              Limpiar
            </button>
            <button type="submit" className="btn-primary">
              Continuar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Transfer;