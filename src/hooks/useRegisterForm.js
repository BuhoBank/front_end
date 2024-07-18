//import { useState } from "react";
//import { register } from "../services/registerService";

// const useRegisterForm = () => {
// const [formData, setFormData] = useState({
//   name: "",
//   lastname: "",
//   ci: "",
//   cell: "",
//   email: "",
//   user: "",
//   password: "",
//   pass_conf: "",
// });

// const validations = {
//   name: {
//     pattern: "[A-Za-zÑñ ]{1,30}",
//     message: "Ingrese solo letras y máximo 3 nombres.",
//   },
//   lastname: {
//     pattern: "[A-Za-zÑñ ]{1,30}",
//     message: "Ingrese solo letras y minimo 1 apellido",
//   },
//   ci: {
//     pattern: "[0-9]{10}",
//     message: "Ingrese exactamente 10 dígitos numéricos.",
//   },
//   cell: {
//     pattern: "[0-9]{10}",
//     message: "Ingrese un numero de telefono válido.",
//   },
//   email: {
//     type: "email",
//     message: "Ingrese un correo electrónico válido.",
//   },
//   user: {
//     pattern: "[A-Za-z0-9]{1,20}",
//     message: "Ingrese solo letras y números, sin símbolos ni espacios.",
//   },
//   pass: {
//     minLength: 8,
//     message: "La contraseña debe tener mínimo 8 caracteres.",
//   },
// };

// const [success, setSuccess] = useState(false);
// const [noSuccess, setNoSuccess] = useState(null);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };



// const handleSendEmail = async (e) => {
//   e.preventDefault();
//   try {
//     const data = {
//       email: formData.email
//     };
//     const resp_email = await sendEmail(formData)
//     if (response.success) {
//       console.log("Existo al mandar mensaje")
//       console.log(response)
//     }

//   } catch (error) {
//     console.error("Error en el registro:", error);
//   }
// }

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (formData.password !== formData.pass_conf) {
//     alert("Las contraseñas no coinciden.");
//     return;
//   }

//   try {
//     const response = await register(formData);
//     if (response.code === "USER_CREATE") {
//       setSuccess(true);
//       localStorage.setItem('data', JSON.stringify(response));
//       const storedData = JSON.parse(localStorage.getItem('data'));
//       console.log(storedData)
//     }
//     if (response.code === "CI_REPEAT") {
//       setNoSuccess(0);
//     }
//     if (response.code === "EMAIL_REPEAT") {
//       setNoSuccess(1);
//     }

//     if (response.code === "USER_REPEAT") {
//       setNoSuccess(2);
//     }
//   } catch (error) {
//     console.error("Error en el registro:", error);
//   }
// };

// const handleClosePopup = () => {
//   setSuccess(false);
//   setNoSuccess(null);
// };


// return { formData, handleChange, handleSubmit,handleSendEmail, validations, success, noSuccess, handleClosePopup };

// const useRegisterForm = (dataRegisterForm) => {

//   const [success, setSuccess] = useState(false);
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await register(dataRegisterForm)
//       if (response.code === 'USER_CREATE') {
//         localStorage.setItem('data', JSON.stringify(response));
//         const storedData = JSON.parse(localStorage.getItem('data'));
//         console.log(storedData)
//         setSuccess(true);
//         console.log(response)
//       } else {
//         console.log(response)
//       }

//     } catch (error) {
//       console.error("Error en el registro:", error);
//     }

//   };
//   return { success, handleRegister }

// };

// export default useRegisterForm;


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
