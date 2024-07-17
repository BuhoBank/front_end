import React from "react";
import { useNavigate } from "react-router-dom";
import useRegisterForm from "../hooks/useRegisterForm";
import RegisterForm from "../components/RegisterForm";
import SuccessPopup from "../components/SuccessPopup";
import EnterCodeComponent from "../components/EnterCodeComponent";
import useSendCodeEmail from "../hooks/useSendCodeToEmail";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  // const {
  //   formData,
  //   handleChange,
  //   handleSubmit,
  //   handleSendEmail,
  //   validations,
  //   success,
  //   noSuccess,
  //   handleClosePopup,
  // } = useRegisterForm();

  const {
    formData,
    handleChange,
    handleSendEmail,
    validations,
    success,
    noSuccess,
    handleClosePopup,
  }=useSendCodeEmail();

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
          //handleSubmit={handleSubmit}
          handleSubmit={handleSendEmail}
          validations={validations}
          handleReturn={handleReturn}
        />
        {success && (
          <EnterCodeComponent message="Ingrese codigo enviado al email" onClose={handleClosePopup} state={true} email_parameter={formData.email} />
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
