import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-other.css";
import HeaderDashboard from "../../components/headerDashboard";
import DashboardForm from "../../components/DashboardForm";

const Others = () => {
  const navigate = useNavigate();

  return (
    <div className="others">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Otros Servicios</h1>
        <p>Aquí puedes administrar otros servicios ofrecidos por BuhoBank.</p>
      </main>
    </div>
  );
};

export default Others;
