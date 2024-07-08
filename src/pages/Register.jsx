import React from "react";
import useRegisterForm from "../hooks/useRegisterForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/Register.css";

const Register = () => {
  const { formData, handleChange, handleSubmit, validations } = useRegisterForm();

  return (
    <>
      <div className="register-background"></div>
      <div className="register-container">
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          validations={validations}
        />
      </div>
    </>
  );
};

export default Register;
