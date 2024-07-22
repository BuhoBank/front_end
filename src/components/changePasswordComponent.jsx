import React, { useState } from "react";
import { changePassword } from "../services/passService";

const ChangePassword = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successCode, setSuccessCode] = useState(null);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const clientID = localStorage.getItem("clientID");
    const response = await changePassword(clientID, currentPassword, newPassword,0);
    console.log(response);
    if (response.message === "INVALID_PASSWORD_LENGTH") {
        setMessage("La nueva contraseña debe tener entre 8 y 20 caracteres");

    }
    if (response.message === "MISSING_UPPERCASE") {
        setMessage("La nueva contraseña debe tener al menos una mayuscula");
    }
    
    if (response.message === "MISSING_DIGIT") {
        setMessage("La nueva contraseña debe tener al menos un digito");
    }

    if (response.message === "MISSING_SPECIAL_CHARACTER") {
        setMessage("La nueva contraseña debe tener al menos un caracter especial");
    }

    if (response.message === "MISSING_LOWERCASE") {
        setMessage("La nueva contraseña debe tener al menos una minúscula");
    }

    if (response.code ==="INCORRECT_CURRENT_PASSWORD"){
        setMessage("La contraseá actual no coincide con los registros");
    }
    
    if (response.code ==="PASSWORD_CHANGED"){
        setMessage("Contraseña actualizada");
    }
    //setMessage("Contraseña cambiada exitosamente");
    // Limpiar los campos después de un cambio exitoso
   
  };

  return (
    <div className="profile-password">
      <h3>Cambio de contraseña</h3>
      <div className="profile-item">
        <span>Contraseña actual</span>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <span>Nueva contraseña</span>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span>Confirme su nueva contraseña</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>
          Aceptar cambio de contraseña
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
