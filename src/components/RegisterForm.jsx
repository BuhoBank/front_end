import React from "react";
import InputGroup from "./InputGroup";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ formData, handleChange, handleSubmit, validations,handleReturn }) => (
  <form onSubmit={handleSubmit}>
    <h2>Bienvenido a BuhoBank</h2>
    
    <InputGroup
      id="ci"
      name="ci"
      label="Cedula de identidad"
      type="text"
      value={formData.ci}
      onChange={handleChange}
      validation={validations.ci}
    />

    <div className="row">
      <InputGroup
        id="name"
        name="name"
        label="Nombres"
        type="text"
        value={formData.name}
        onChange={handleChange}
        validation={validations.name}
      />
      <InputGroup
        id="lastname"
        name="lastname"
        label="Apellidos"
        type="text"
        value={formData.lastname}
        onChange={handleChange}
        validation={validations.lastname}
      />
    </div>

    <div className="row">
      <InputGroup
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        validation={validations.email}
      />
      <InputGroup
        id="cell"
        name="cell"
        label="Número celular"
        type="tel"
        value={formData.cell}
        onChange={handleChange}
        validation={validations.cell}
      />
    </div>

    <InputGroup
      id="user"
      name="user"
      label="Usuario"
      type="text"
      value={formData.user}
      onChange={handleChange}
      validation={validations.user}
    />

    <div className="row">
      <InputGroup
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formData.pass}
        onChange={handleChange}
        validation={validations.pass}
      />
      <InputGroup
        id="pass_conf"
        name="pass_conf"
        label="Repetir contraseña"
        type="password"
        value={formData.pass_conf}
        onChange={handleChange}
        validation={{ message: "La contraseña debe ser igual al anterior." }}
      />
    </div>

    <div className="form-buttons">
      <button type="submit" className="button">
        Registrarte
      </button>
      <button type="submit" onClick={handleReturn} className="button">
        Volver
      </button>
    </div>



  </form>
);

export default RegisterForm;