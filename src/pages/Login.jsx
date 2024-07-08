import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(username, password);
      console.log("Login successful", data);
      // Aquí puedes manejar el éxito del login, por ejemplo:
      // - Guardar el token en localStorage
      // - Redirigir al usuario a la página principal
      // - Actualizar el estado global de la aplicación
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
    }
  };
  //ruta a la pagina registro
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/src/assets/image.png" alt="BúhoBank Logo" />
      </div>
      <div className="login-form">
        <h2>BIENVENIDO A TU BANCA WEB</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <a href="#">¿Olvidaste tu usuario?</a>
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit">INGRESAR</button>
        </form>
        <div className="extra-links">
          <button>Desbloquea tu Banca Web</button>
          <button onClick={handleRegister}>Regístrate a Banca Web</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
