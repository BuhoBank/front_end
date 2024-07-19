import React, { useState } from 'react';
import InputGroup from "./InputGroup";
import { sendCode } from '../services/sendCodeToVerify';
import '../styles/SuccessPopup.css';
import useRegisterForm from '../hooks/useRegisterForm';
import SuccessPopup from './SuccessPopup'; // Asegúrate de que este import sea correcto

const EnterCodeComponent = ({ message, onClose, state, data_parameter }) => {
  const { success, handleRegister } = useRegisterForm(data_parameter);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [accountNumber, setAccountNumber] = useState(null);
  const [attempts,setAttemps]=useState(3)
  const [showAttemptsWarning, setShowAttemptsWarning] = useState(false);
  const [showBadCodeWarning,setShowBadCodeWarning]=useState(false)
  const [formData, setFormData] = useState({
    codigo: '',
    email: data_parameter.email
  });

  const validations = {
    codigo: {
      pattern: '[0-9]{6}',
      minLength: 6,
      message: 'El código debe tener 6 dígitos numéricos'
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendCode(formData);
      console.log("response in send code", response);
      if (response.code === 'SUCCESS') {
        try {
          const register_response = await handleRegister();
          // Asegúrate de verificar que register_response no es undefined
          if (register_response && register_response.code === 'USER_CREATE') {
            console.log(register_response);
            setRegisterSuccess(true);
            const storedData = localStorage.getItem('data');
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              setAccountNumber(parsedData.account);
            }
          }
        } catch (error) {
          console.error("Error al registrar:", error);
        }
      }
      if(response.code==="NO_SUCCESS" ){
        setAttemps(attempts-1)
        setShowBadCodeWarning(true)
        if (attempts - 1 === 0) {
          setShowAttemptsWarning(true);
        }
      }
    } catch (error) {
      console.error("Error al enviar el código:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        {state && (
          <>
            <form onSubmit={handleSubmit}>
              <h1>{message}</h1>
              <InputGroup
                id="codigo"
                name="codigo"
                label="Código (6 caracteres)"
                type="text"
                value={formData.codigo}
                onChange={handleChange}
                validation={validations.codigo}
              />
              {showAttemptsWarning &&
              (<p>Ya no tiene más intentos disponibles. Asegurese de usar un correcto
                existente, asegurese que el codigo le llego al correo, verifique spam.

              </p>)
               
        
               }
               {showBadCodeWarning && (
                <p>Código incorrecto, intente nuevamente</p>
               )

               }
              {attempts > 0 && (
                <div>
                  <p>Tiene {attempts} intentos para ingresar el código.</p>
                  <button type="submit">Enviar Código</button>
                </div>
              )}
            </form>
          </>
        )}
        {registerSuccess && (
          <SuccessPopup message="Registro exitoso" onClose={onClose} state={true} acc_number={accountNumber} />
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EnterCodeComponent;
