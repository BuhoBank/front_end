// import React, { useState } from "react";
// import InputGroup from "./InputGroup";
// import { useNavigate } from "react-router-dom";
// import PasswordInput from "./PasswordInput";


// const RegisterForm = ({ formData, handleChange, handleSubmit, validations, handleReturn, pass, setPass, conf_pass, setConf_pass,button,setButton }) => (

//   <form onSubmit={handleSubmit}>
//     <h2>Bienvenido a BuhoBank</h2>

//     <InputGroup
//       id="ci"
//       name="ci"
//       label="Cedula de identidad"
//       type="text"
//       value={formData.ci}
//       onChange={handleChange}
//       validation={validations.ci}
//       required={true}
//     />

//     <div className="row">
//       <InputGroup
//         id="name"
//         name="name"
//         label="Nombres"
//         type="text"
//         value={formData.name}
//         onChange={handleChange}
//         validation={validations.name}
//         required={true}
//       />
//       <InputGroup
//         id="lastname"
//         name="lastname"
//         label="Apellidos"
//         type="text"
//         value={formData.lastname}
//         onChange={handleChange}
//         validation={validations.lastname}
//         required={true}
//       />
//     </div>

//     <div className="row">
//       <InputGroup
//         id="email"
//         name="email"
//         label="Correo electrónico"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         validation={validations.email}
//         required={true}
//       />
//       <InputGroup
//         id="cell"
//         name="cell"
//         label="Número celular"
//         type="tel"
//         value={formData.cell}
//         onChange={handleChange}
//         validation={validations.cell}
//         required={false}
//       />
//     </div>

//     <InputGroup
//       id="user"
//       name="user"
//       label="Usuario"
//       type="text"
//       value={formData.user}
//       onChange={handleChange}
//       validation={validations.user}
//       required={true}
//     />

//     <div className="row">
//       <PasswordInput
//         password={pass}
//         setPassword={setPass}
//       />
//       <PasswordInput
//         password={conf_pass}
//         setPassword={setConf_pass}
//       />
//     </div>

//     <div className="form-buttons">
//       <button type="submit" disabled={button} className="button">
//         Registrarte
//       </button>
//       <button type="submit" onClick={handleReturn} className="button">
//         Volver
//       </button>
//     </div>



//   </form>
// );

// export default RegisterForm;


import React from "react";
import InputGroup from "./InputGroup";
import PasswordInput from "./PasswordInput";
//import './RegisterForm.css'; // Asegúrate de importar el archivo CSS

const RegisterForm = ({ formData, handleChange, handleSubmit, validations, handleReturn, pass, setPass, conf_pass, setConf_pass, button, setButton }) => (
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
      required={true}
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
        required={true}
      />
      <InputGroup
        id="lastname"
        name="lastname"
        label="Apellidos"
        type="text"
        value={formData.lastname}
        onChange={handleChange}
        validation={validations.lastname}
        required={true}
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
        required={true}
      />
      <InputGroup
        id="cell"
        name="cell"
        label="Número celular"
        type="tel"
        value={formData.cell}
        onChange={handleChange}
        validation={validations.cell}
        required={false}
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
      required={true}
    />

    <div className="row">
      <PasswordInput
        password={pass}
        setPassword={setPass}
      />
      <PasswordInput
        password={conf_pass}
        setPassword={setConf_pass}
      />
    </div>

    <div className="form-buttons">
      <button type="submit" disabled={button} className={`button ${button ? 'loading' : ''}`}>
        {button && <div className="loader"></div>}
        {button ? 'Cargando...' : 'Registrarte'}
      </button>
      <button type="button" onClick={handleReturn} className="button">
        Volver
      </button>
    </div>
  </form>
);

export default RegisterForm;


