import { useState } from "react";
import { sendEmail } from "../services/sendCodeToEmail";

const useSendCodeEmail = () => {
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

    const [success, setSuccess] = useState(false);
    const [noSuccess, setNoSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: formData.email
            };
            const response = await sendEmail(formData)
            if (response.code==='EMAIL_SEND') {
                console.log("Existo al mandar mensaje")
                console.log(response)
                setSuccess(true)
            }
            if (response.code==='CI_REPEAT') {
                console.log("Cedula repetida")
                console.log(response)
                setNoSuccess(0)
            }
            if (response.code==='EMAIL_REPEAT') {
                console.log("email repetido")
                console.log(response)
                setNoSuccess(1)
            }
            if (response.code==='USER_REPEAT') {
                console.log("usuario creado")
                console.log(response)
                setNoSuccess(2)
            }

        } catch (error) {
            console.error("Error al mandar mensaje", error);
        }
    }

    const handleClosePopup = () => {
        setSuccess(false);
        setNoSuccess(null);
    };

    return { formData, handleChange, handleSendEmail, validations, success, noSuccess, handleClosePopup };

};

export default useSendCodeEmail;