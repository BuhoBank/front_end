import { useNavigate } from "react-router-dom";

const Navigate = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sidebar-logo">
        <img src="" alt="BuhoBank" />
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li className="active" onClick={() => navigate("/dashboard")}>
            Mis Cuentas
          </li>
          <li onClick={() => navigate("/dashboard-transfer")}>
            Transferencias
          </li>
          <li onClick={() => navigate("/dashboard-payments")}>Pagos</li>
          <li onClick={() => navigate("/dashboard-newaccount")}>
            Solicitar cuentas
          </li>
          <li onClick={() => navigate("/dashboard-others")}>Otros Servicios</li>
          <li onClick={() => navigate("/dashboard-contacts")}>Mis Contactos</li>
          <li onClick={() => navigate("/dashboard-profile")}>Mi perfil</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigate;
