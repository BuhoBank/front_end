import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";
// import useAccountData from "../hooks/useAccountData";
import AccountInfo from "../components/accountsList";
import "../styles/Dashboard.css"; // Asegúrate de ajustar la ruta si es necesario

const Dashboard = () => {
  const navigate = useNavigate();
  // const { accountData, loading, error } = useAccountData();

  const handleLogout = () => {
    navigate("/");
  };
  // const name_user = JSON.parse(localStorage.getItem('id')); ESTO TIENES QUE USAR CON NAME_USER
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error al cargar los datos de la cuenta.</div>;
  // }

  return (
    <div className="dashboard">
      <DashboardForm handleLogout={handleLogout} />
      <main className="main-content">
        <header className="header">
          <div className="header-user">
            <span>IU</span>
            <span>AQui debes poner el name user</span>
            <a href="#" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </div>
        </header>
        <div className="content">
          <div className="investment-banner">
            <p>Bienvenido a tus cuentas BuhoBank</p>
          </div>
          <section className="products">
            <h2>Mis cuentas</h2>
            {/* <div className="product">
              <h3>Cuenta número 1</h3>
              <div className="account">
                <span>{accountData.accountNumber}</span>
                <div className="balance">
                  <p>Saldo Disponible</p>
                  <p>${accountData.balance}</p>
                </div>
              </div>
            </div> */}
            <AccountInfo />
          </section>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
