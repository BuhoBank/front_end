import React from "react";
import { useState } from "react";
import InputGroup from "../InputGroup";
import '../../styles/SuccessPopup.css';

const RecoverPassword = () => {
    const [showAttemptsWarning, setShowAttemptsWarning] = useState(false);
    const [showBadCodeWarning, setShowBadCodeWarning] = useState(false)
    const [attempts, setAttemps] = useState(3)

    const [formData, setFormData] = useState({
        email: ""
    });

    const validations = {
        email: {
            type: "email",
            message: "Ingrese un correo electrónico válido.",
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        console.log("gunciona")
    }

    return (
        <div className="popup-overlay">
                <div className="popup">
                <>
                    <form onSubmit={handleSubmit}>
                        <h1>Ingrese su dirección de correo electrónico con el que se registro</h1>
                        <InputGroup
                            id="email"
                            name="email"
                            label="correo electronivo"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            validation={validations.email}
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
                </div>
        </div>
    )
}

export default RecoverPassword;