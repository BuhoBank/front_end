import React from "react";
import "../styles/Dashboard.css";

const HeaderDashboard = () => {
  const name_user = localStorage.getItem("user_name");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-user">
        <span>IU</span>
        <span> Bienvenido {name_user}</span>
        <a href="/" onClick={handleLogout}>
          Cerrar sesión
        </a>
      </div>
    </header>
  );
};

export default HeaderDashboard;
