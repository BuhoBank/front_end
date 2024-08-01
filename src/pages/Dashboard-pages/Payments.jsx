import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-payments.css";
import DashboardForm from "../../components/DashboardForm";
import HeaderDashboard from "../../components/headerDashboard";



const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="payments">
      <aside className="sidebar">
        <DashboardForm />
      </aside>  
      <main className="main-content">
        <HeaderDashboard />
        <h1>Pago de servicios</h1>
        <form>
        <div className="payments-services">
            <button className="service-button">
              <img src="/src/assets/services/luz.png" alt="Luz" className="service-icon" />
              <span>Luz</span>
            </button>
            <button className="service-button">
              <img src="/src/assets/services/agua.png" alt="Agua" className="service-icon" />
              <span>Agua</span>
            </button>
            <button className="service-button">
              <img src="/src/assets/services/wifi.png" alt="Internet" className="service-icon" />
              <span>Internet</span>
            </button>
            <button className="service-button">
              <img src="/src/assets/services/telefono.png" alt="Teléfono" className="service-icon" />
              <span>Teléfono</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default Payments;
