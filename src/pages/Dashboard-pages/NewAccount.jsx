import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import NewAccountForm from "../../components/newAccountForm";
import "../../styles/Dashboard-newaccount.css";
import HeaderDashboard from "../../components/headerDashboard";
import DashboardForm from "../../components/DashboardForm";

const NewAccount = () => {
  const navigate = useNavigate();

  const benefits = [
    "Sin comisiones de mantenimiento",
    "Tu dinero a todas horas",
    "Acceso a banca en línea 24/7",
    "Tu dinero esta en las mejores manos",
    "Notificaciones en tiempo real ",
  ];

  return (
    <div className="new-account">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Solicitar Nueva Cuenta</h1>
        <div className="benefits-section">
          <h2>Beneficios de abrir una cuenta en Buhobanco</h2>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <NewAccountForm />
      </main>
    </div>
  );
};

export default NewAccount;
