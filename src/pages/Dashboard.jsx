import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";
import AccountInfo from "../components/accountsList";
import HeaderDashboard from "../components/headerDashboard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna el estado del menú
  };

  const name_user = localStorage.getItem("user_name");

  return (
    <div className="dashboard">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <DashboardForm isOpen={isOpen} />
      <main className="main-content">
        <HeaderDashboard />
        <div className="content">
          <div className="investment-banner">
            <p>Bienvenido a tus cuentas BuhoBank</p>
          </div>
          <section className="products">
            <h2>Mis cuentas</h2>
            <AccountInfo />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
