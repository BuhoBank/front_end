import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessPopup.css';

const SuccessPopup = ({ message, onClose,state}) => {
  const navigate=  useNavigate();
  const handleButtonClick = () => {
    onClose();
    if (state) {
      navigate('/');
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup">
      <div className="popup-overlay">
      <div className="popup">
        {state ? (
          <>
            <h1>{message}</h1>
            <button onClick={handleButtonClick}>Ir a inicio sesión</button>
          </>
        ) : (
          <>
            <h2>Error en el Registro</h2>
            <p>{message}</p>
            <button onClick={handleButtonClick}>Volver a intentar</button>
          </>
        )}
        {/* <button onClick={handleButtonClick}>Cerrar</button> */}
      </div>
    </div>
      </div>
    </div>
  );
};

export default SuccessPopup;