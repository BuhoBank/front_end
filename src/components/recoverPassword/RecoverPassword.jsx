import React from "react";
import { useState } from "react";
import InputGroup from "../InputGroup";
import sendRecoveryCode from "../../services/recoveryPassword";
import EnterCodeComponent from "../EnterCodeComponent";
import CodeRecoverPassword from "./CodeRecoverPassword";
import '../../styles/SuccessPopup.css';
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
    const [showEnterCodePopup, setshowEnterCodePopup] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const [formData, setFormData] = useState({
        email: ""
    });



    const validations = {
        email: {
            type: "email",
            message: "Ingrese un correo electrónico válido con al menos un punto después del arroba.",
            validate: (email) => emailRegex.test(email),
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleClose = () => {
        setshowEnterCodePopup(false)
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Validar el correo electrónico
        const emailValidation = validations.email.validate(formData.email);
        if (!emailValidation) {
            alert("Por favor, ingrese una dirección de email valido"); // Muestra un mensaje de error si el correo no es válido
            return;
        }

        try {
            // Llamada a la API para enviar el código
            const response = await sendRecoveryCode(formData);

            if (response.code === 'EMAIL_SEND') {
                localStorage.setItem('id', JSON.stringify(response.id));
                const storedData = JSON.parse(localStorage.getItem('id'));
                console.log("veamos si guarda el id ", storedData);
                setshowEnterCodePopup(true)
                console.log("Código enviado exitosamente");
            } else if (response.code === 'EMAIL_DONT_EXIST') {
                setEmailExist(true)
            }

            else {
                console.error("Error al enviar el código:", response.message);
            }
        } catch (error) {
            // Manejar errores de red o de la API
            setshowEnterCodePopup(true);
            console.error("Error de red o de la API:", error);
        }
    };

    const navigate = useNavigate()
    const handleReturn = () => {
        navigate("/");
    };
    

    return (
        <div className="popup-overlay">
                <div className="popup">
                <>
                    <form onSubmit={handleSubmit}>
                        <h1>Ingrese el correo electrónico que usó para crear su cuenta y le enviaremos las instrucciones para cambiar su contraseña</h1>

                        <InputGroup
                            id="email"
                            name="email"
                            label="correo electronico"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            validation={validations.email}
                        />
                        <div className="form-buttons">
                            <button type="submit" className="button">Aceptar</button>
                            <button onClick={handleReturn} className="button">
                                Volver
                            </button>
                        </div>
                        {showEnterCodePopup && (
                            <CodeRecoverPassword data_parameter={formData}  handleClose={handleClose}/>
                        )}
                        {emailExist && (
                            <p style={{ color: 'red' }}>Email ingresado no existe en nuestro registro, verifique la información e intente nuevamente</p>
                        )}
                    </form>
                </>
                </div>
        </div>
    )
}

export default RecoverPassword;