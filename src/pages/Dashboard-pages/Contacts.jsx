import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-contacts.css";
import DashboardForm from "../../components/DashboardForm";
import HeaderDashboard from "../../components/headerDashboard";

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <div className="contacts">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Mis Contactos</h1>
        <ul>
          <li>Contacto 1: 123-456-789</li>
          <li>Contacto 2: 987-654-321</li>
        </ul>
      </main>
    </div>
  );
};

export default Contacts;
