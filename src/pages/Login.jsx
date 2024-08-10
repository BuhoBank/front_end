import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginForm from "../hooks/useLoginForm";
import LoginForm from "../components/LoginForm";
import ExtraLinks from "../components/ExtraLinks";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, password, error, handleSubmit, setUsername, setPassword } =
    useLoginForm();
  const [showResetPass, setshowResetPass] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    await handleSubmit(e);
    setIsButtonDisabled(false);
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/src/assets/image.png" alt="BúhoBank Logo" />
      </div>
      <div className="login-form">
        <h2>BIENVENIDO A TU BANCA WEB</h2>
        {error && <p className="error-message">{error}</p>}
        <LoginForm
          user={user}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          isButtonDisabled={isButtonDisabled}
        />
        <ExtraLinks handleRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Login;
