import { useState } from "react";
import { login } from "../services/authService";

const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return { username, password, error, handleSubmit, setUsername, setPassword };
};

export default useLoginForm;