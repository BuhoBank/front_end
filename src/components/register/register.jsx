import React, { useState } from "react";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    ci: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar si el campo es "name" o "lastname" y permitir solo letras en español
    if (name === "name" || name === "lastname") {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    // Validar si el campo es "ci", permitir solo números y limitar a 10 dígitos
    if (name === "ci") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log(formData);
  };

  return (
    <div className="register-container">
      <h2>Registro de clientes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Nombres:</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Apellidos:</h3>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Numero de cedula:</h3>
          <input
            type="text"
            name="ci"
            value={formData.ci}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Email:</h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Contraseña:</h3>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
