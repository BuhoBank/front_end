import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";
import AccountInfo from "../components/accountsList";
import HeaderDashboard from "../components/headerDashboard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const name_user = localStorage.getItem("user_name");

  return (
    <div className="dashboard">
      <DashboardForm />
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
