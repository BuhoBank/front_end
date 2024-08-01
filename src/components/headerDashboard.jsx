import React from "react";
import Navigate from "./navigate";
import "../styles/Dashboard.css"; 
import { useNavigate } from "react-router-dom";

const HeaderDashboard =()=>{
    const name_user = localStorage.getItem('user_name'); 
    const navigate =useNavigate()
    const handleLogout = () => {
        navigate("/");
      };
    return(
        <header className="header">
          <div className="header-user">
            <span>IU</span>
            <span> Bienvenido {name_user}</span>
            <a href="/" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </div>
        </header>
    )
}

export default HeaderDashboard;
