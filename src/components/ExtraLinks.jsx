import React from "react";

const ExtraLinks = ({ handleRegister }) => (
  <div className="extra-links">
    <button>Desbloquea tu Banca Web</button>
    <button onClick={handleRegister}>Regístrate a Banca Web</button>
  </div>
);

export default ExtraLinks;