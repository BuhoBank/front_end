import React from "react";
import { useNavigate } from "react-router-dom";
import useRegisterForm from "../hooks/useRegisterForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/Register.css";

const Register = () => {
  const navigate=useNavigate();
  const { formData, handleChange, handleSubmit, validations } = useRegisterForm();

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
      </div>
    </>
  );
};

export default Register;
