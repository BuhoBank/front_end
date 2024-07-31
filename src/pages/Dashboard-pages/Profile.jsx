import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../components/changePasswordComponent";
import HeaderDashboard from "../../components/headerDashboard";
import "../../styles/Dashboard-profile.css"; // Asegúrate de importar los estilos
import DashboardForm from "../../components/DashboardForm";

const Profile = () => {
  const navigate = useNavigate();

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const username = localStorage.getItem("user");
  const email = localStorage.getItem("user_email");
  const phone = localStorage.getItem("phone");

  //const [username, setUsername] = useState("user0101");
  //const [email, setEmail] = useState("user@correo.com");
  //const [phone, setPhone] = useState("0964567453");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const handleEditUser = () => {
    setIsEditingUser(true);
  };

  const handleSaveUser = () => {
    setIsEditingUser(false);
    // Aquí puedes agregar la lógica para guardar el nuevo nombre de usuario en el backend
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    // Aquí puedes agregar la lógica para guardar el nuevo correo electrónico en el backend
  };

  const handleEditPhone = () => {
    setIsEditingPhone(true);
  };

  const handleSavePhone = () => {
    setIsEditingPhone(false);
    // Aquí puedes agregar la lógica para guardar el nuevo número de teléfono en el backend
  };

  const handlePasswordChange = () => {
    // Aquí puedes agregar la lógica para cambiar la contraseña en el backend
    if (newPassword === confirmPassword) {
      console.log("Contraseña cambiada");
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <header className="header">
          <HeaderDashboard />
        </header>
        <div className="profile-content">
          <div className="profile-header">
            <h2>Nombre del usuario</h2>
          </div>
          <section className="profile-details">
            <div className="profile-section">
              <h3>Datos de contacto</h3>
              <div className="profile-item">
                <span>Usuario</span>
                {isEditingUser ? (
                  <>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleSaveUser}>Guardar</button>
                  </>
                ) : (
                  <>
                    <span>{username}</span>
                    <a href="#" onClick={handleEditUser}>
                      Editar
                    </a>
                  </>
                )}
              </div>
              <div className="profile-item">
                <span>Correo electrónico</span>
                {isEditingEmail ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSaveEmail}>Guardar</button>
                  </>
                ) : (
                  <>
                    <span>{email}</span>
                    <a href="#" onClick={handleEditEmail}>
                      Editar
                    </a>
                  </>
                )}
              </div>
              <div className="profile-item">
                <span>Número de teléfono</span>
                {isEditingPhone ? (
                  <>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={handleSavePhone}>Guardar</button>
                  </>
                ) : (
                  <>
                    <span>{phone}</span>
                    <a href="#" onClick={handleEditPhone}>
                      Editar
                    </a>
                  </>
                )}
              </div>
            </div>
            <ChangePassword />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
