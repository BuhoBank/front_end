import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const useLoginForm = () => {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(user, password);
      if (response.authenticated) {
        console.log("Login successful");
        localStorage.setItem("isLoggenIn", "true");
        navigate("/dashboard");
        // Aquí puedes manejar el éxito del login, por ejemplo:
        // - Guardar el token en localStorage
        // - Redirigir al usuario a la página principal
        // - Actualizar el estado global de la aplicación
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError(
        "Error al intentar iniciar sesión. Por favor, intente nuevamente."
      );
      console.error("Error durante el login:", error);
    }
  };

  return { user, password, error, handleSubmit, setUsername, setPassword };
};

export default useLoginForm;
