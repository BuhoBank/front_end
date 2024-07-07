import React, { useState } from "react";
import "../styles/Register.css"; // Asegúrate de importar correctamente tus estilos CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    ci: "",
    cell: "",
    email: "",
    user: "",
    pass: "",
    pass_conf: "",
  });

  //Validaciones de datos

  const validations = {
    name: {
      pattern: "[A-Za-zÑñ ]{1,30}",
      message: "Ingrese solo letras  y máximo 3 nombres.",
    },
    lastname: {
      pattern: "[A-Za-zÑñ ]{1,30}",
      message: "Ingrese solo letras y minimo 1 apellido",
    },
    ci: {
      pattern: "[0-9]{10}",
      message: "Ingrese exactamente 10 dígitos numéricos.",
    },
    cell: {
      pattern: "[0-9]{10}",
      message: "Ingrese un numero de telefono válido.",
    },
    email: {
      type: "email",
      message: "Ingrese un correo electrónico válido.",
    },
    user: {
      pattern: "[A-Za-z0-9]{1,20}",
      message: "Ingrese solo letras y números, sin símbolos ni espacios.",
    },
    pass: {
      minLength: 8,
      message: "La contraseña debe tener mínimo 8 caracteres.",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Verifica que las contraseñas coincidan
    if (formData.pass !== formData.pass_conf) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    //Enviar datos al back-end
    try {
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if (response.ok) {
        console.log("Registro Exitoso");
      } else {
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <>
      <div className="register-background"></div>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h2>Bienvenido a BuhoBank</h2>

          {/* Primera fila: Cedula de identidad */}
          <div className="group">
            <input
              type="text"
              id="ci"
              name="ci"
              required
              pattern={validations.ci.pattern}
              maxLength={10}
              value={formData.ci}
              onChange={handleChange}
            />
            <span className="barra"></span>
            <label htmlFor="ci">Cedula de identidad</label>
            <p className="info">{validations.ci.message}</p>
          </div>

          {/* Segunda fila: Nombres y Apellidos */}
          <div className="row">
            <div className="group">
              <input
                type="text"
                id="name"
                name="name"
                required
                pattern={validations.name.pattern}
                value={formData.name}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="name">Nombres</label>
              <p className="info">{validations.name.message}</p>
            </div>

            <div className="group">
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                pattern={validations.lastname.pattern}
                value={formData.lastname}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="lastname">Apellidos</label>
              <p className="info">{validations.lastname.message}</p>
            </div>
          </div>

          {/* Tercera fila: Correo electrónico y Número celular */}
          <div className="row">
            <div className="group">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="email">Correo electrónico</label>
              <p className="info">{validations.email.message}</p>
            </div>
            <div className="group">
              <input
                type="tel"
                id="cell"
                name="cell"
                required
                pattern={validations.cell.pattern}
                maxLength={10}
                value={formData.cell}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="cell">Número celular</label>
              <p className="info">{validations.cell.message}</p>
            </div>
          </div>

          {/* Cuarta fila: Usuario */}
          <div className="group">
            <input
              type="text"
              id="user"
              name="user"
              required
              pattern={validations.user.pattern}
              value={formData.user}
              onChange={handleChange}
            />
            <span className="barra"></span>
            <label htmlFor="user">Usuario</label>
            <p className="info">{validations.user.message}</p>
          </div>

          {/* Quinta fila: Contraseña y Repetir contraseña */}
          <div className="row">
            <div className="group">
              <input
                type="password"
                id="pass"
                name="pass"
                required
                minLength={validations.pass.minLength}
                value={formData.pass}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="pass">Contraseña</label>
              <p className="info">{validations.pass.message}</p>
            </div>
            <div className="group">
              <input
                type="password"
                id="pass_conf"
                name="pass_conf"
                required
                value={formData.pass_conf}
                onChange={handleChange}
              />
              <span className="barra"></span>
              <label htmlFor="pass_conf">Repetir contraseña</label>
              <p className="info">La contraseña debe ser igual al anterior.</p>
            </div>
          </div>

          <button type="submit" className="button">
            Registrarte
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
