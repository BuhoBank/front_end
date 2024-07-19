import React from "react";

const LoginForm = ({ user, password, setUsername, setPassword, handleSubmit,handleResetPasss }) => (

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUsername(e.target.value)}
      />
      <a href="#">¿Olvidaste tu usuario?</a>
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="#" onClick={handleResetPasss}>¿Olvidaste tu contraseña?</a>
    </div>
    <button type="submit">INGRESAR</button>
  </form>
);

export default LoginForm;


