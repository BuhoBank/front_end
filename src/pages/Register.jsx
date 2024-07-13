import React from "react";
import { useNavigate } from "react-router-dom";
import useRegisterForm from "../hooks/useRegisterForm";
import RegisterForm from "../components/RegisterForm";
import SuccessPopup from "../components/SuccessPopup";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    handleSubmit,
    validations,
    success,
    noSuccess,
    handleClosePopup,
  } = useRegisterForm();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="register-background"></div>
      <div className="register-container">
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          validations={validations}
          handleReturn={handleReturn}
        />
        {success && (
          <SuccessPopup message="Registro Exitoso" onClose={handleClosePopup} state={true} />
        )}
         {noSuccess === 0 && (
          <SuccessPopup message="Cédula ya existe" onClose={handleClosePopup} state={false}/>
        )}
        {noSuccess === 1 && (
          <SuccessPopup message="Correo electrónico ya existe" onClose={handleClosePopup} state={false}/>
        )}
        {
          noSuccess ===2 && (
            <SuccessPopup message="Nombre de usuario ya existe" onClose={handleClosePopup} state={false}/>
          )
        }
      </div>
    </>
  );
};

export default Register;
