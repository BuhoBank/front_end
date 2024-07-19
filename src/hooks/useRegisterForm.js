

import { useState } from "react";
import { register } from "../services/registerService";

const useRegisterForm = (dataRegisterForm) => {
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await register(dataRegisterForm);
      if (response.code === 'USER_CREATE') {
        localStorage.setItem('data', JSON.stringify(response));
        const storedData = JSON.parse(localStorage.getItem('data'));
        console.log(storedData);
        setSuccess(true);
        console.log(response);
        return response; // Asegúrate de devolver la respuesta
      } else {
        console.log(response);
        return response; // Asegúrate de devolver la respuesta también en caso de fallo
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  return { success, handleRegister };
};

export default useRegisterForm;
