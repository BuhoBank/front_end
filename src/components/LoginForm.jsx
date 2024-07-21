import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ user, password, setUsername, setPassword, handleSubmit }) => (
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
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/recuperar_contrasena">¿Olvidaste tu contraseña?</Link>
    </div>
    <button type="submit">INGRESAR</button>
  </form>
);

export default LoginForm;
