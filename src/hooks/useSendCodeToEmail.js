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

    const validateForm = () => {
        // Validar campos requeridos
        // if (!formData.name || !formData.lastname || !formData.ci || !formData.email || !formData.user || !formData.password || !formData.pass_conf) {
        if (!formData.name || !formData.lastname || !formData.ci || !formData.email || !formData.user) {
            alert("Por favor, complete todos los campos requeridos.");
            return false;
        }

        // Validar contraseñas
        if (pass !== conf_pass) {
            alert("Las contraseñas no coinciden.");
            return false;
        }

        // Validar cell solo si se ha ingresado un valor
        if (formData.cell && !formData.cell.match(validations.cell.pattern)) {
            alert("El número de teléfono no es válido.");
            return false;
        }

        return true;
    };

    const [success, setSuccess] = useState(false);
    const [noSuccess, setNoSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            password: pass,
            pass_conf: conf_pass

        }));
        console.log("Veamos que regresa: ", !validateForm())
        if (!validateForm()) {
            return;
        }
        try {
            const data = {
                email: formData.email
            };
            const response = await sendEmail(formData)
            if (response.code === 'EMAIL_SEND') {
                console.log("Existo al mandar mensaje")
                console.log(response)
                setSuccess(true)
            }
            if (response.code === 'CI_REPEAT') {
                console.log("Cedula repetida")
                console.log(response)
                setNoSuccess(0)
            }
            if (response.code === 'EMAIL_REPEAT') {
                console.log("email repetido")
                console.log(response)
                setNoSuccess(1)
            }
            if (response.code === 'USER_REPEAT') {
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

    const [pass, setPass] = useState("")
    const [conf_pass, setConf_pass] = useState("")
    return { formData, handleChange, handleSendEmail, validations, success, noSuccess, handleClosePopup, pass, setPass, conf_pass, setConf_pass };

};

export default useSendCodeEmail;