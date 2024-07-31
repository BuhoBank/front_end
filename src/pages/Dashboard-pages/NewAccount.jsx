import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import NewAccountForm from "../../components/newAccountForm";
import "../../styles/Dashboard-newaccount.css";
import HeaderDashboard from "../../components/headerDashboard";
import DashboardForm from "../../components/DashboardForm";

const NewAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="new-account">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Solicitar Nueva Cuenta</h1>
        <NewAccountForm />
      </main>
    </div>
  );
};

export default NewAccount;
