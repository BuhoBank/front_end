import React from "react";

const InputGroup = ({ id, name, label, type, value, onChange, validation }) => (
  <div className="group">
    <input
      type={type}
      id={id}
      name={name}
      required
      pattern={validation.pattern}
      minLength={validation.minLength}
      value={value}
      onChange={onChange}
    />
    <span className="barra"></span>
    <label htmlFor={id}>{label}</label>
    <p className="info">{validation.message}</p>
  </div>
);

export default InputGroup;