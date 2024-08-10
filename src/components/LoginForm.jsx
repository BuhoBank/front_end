import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const LoginForm = ({
  user,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  isButtonDisabled,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Link to="#">¿Olvidaste tu usuario?</Link>
    </div>
    <div className="form-group">
      <PasswordInput
        password={password}
        setPassword={setPassword}
        placeholder="Contraseña"
      />
      <Link to="/recuperar_contrasena">¿Olvidaste tu contraseña?</Link>
    </div>
    <button
      type="submit"
      disabled={isButtonDisabled}
      className={`button ${isButtonDisabled ? "loading" : ""}`}
    >
      {isButtonDisabled && <div className="loader"></div>}
      {isButtonDisabled ? "Cargando..." : "INGRESAR"}
    </button>
  </form>
);

export default LoginForm;
