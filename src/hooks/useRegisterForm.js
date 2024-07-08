import { useState } from "react";
import { register } from "../services/registerService";

const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    ci: "",
    cell: "",
    email: "",
    user: "",
    password: "",
    pass_conf: "",
  });

  const validations = {
    name: {
      pattern: "[A-Za-zÑñ ]{1,30}",
      message: "Ingrese solo letras y máximo 3 nombres.",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.pass_conf) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await register(formData);
      console.log("Registro Exitoso", response);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return { formData, handleChange, handleSubmit, validations };
};

export default useRegisterForm;