import React, { useState } from "react";
import InputGroup from "../InputGroup";
import recoverUser from "../../services/recoveryUserName";
import { useNavigate } from "react-router-dom";
import "../../styles/SuccessPopup.css";

const RecoverNameUser = () => {
    const [email, setEmail] = useState("");
    const [emailExist, setEmailExist] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailValidation = validations.email.validate(email);
        if (!emailValidation) {
            alert("Por favor, ingrese una dirección de email valido"); // Muestra un mensaje de error si el correo no es válido
            return;
        }
        setIsButtonDisabled(true);
        const response = await recoverUser(email)
        if (response.code === 'EMAIL_DONT_EXIST') {
            console.log("el emaul no existe")
            setEmailExist(true)
            setIsButtonDisabled(false);

        } else {
            setSuccess(true);
        }

    };

    const validations = {
        email: {
            type: "email",
            message:
                "Ingrese un correo electrónico válido con al menos un punto después del arroba.",
            validate: (email) => emailRegex.test(email),
        },
    };

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate("/");
        setSuccess(false)
        setEmailExist(false)
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Ingrese el correo electrónico que usó para crear su cuenta y le
                        enviaremos su nombre de usuario
                    </h1>
                    <InputGroup
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        type="text"
                        value={email}
                        onChange={handleChange}
                        validation={validations.email}
                    />
                    <div className="form-buttons">
                        <button
                            type="submit"
                            className={`button ${isButtonDisabled ? "loading" : ""}`}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled && <div className="loader"></div>}
                            {isButtonDisabled ? "Cargando..." : "Aceptar"}
                        </button>
                        <button onClick={handleReturn} className="button">
                            Volver
                        </button>
                    </div>
                    {emailExist && (
                        <p style={{ color: "red" }}>
                            Email ingresado no existe en nuestro registro, verifique la
                            información e intente nuevamente
                        </p>
                    )}
                    {success && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <h3 style={{ color: "green" }}>Email encontrado</h3>
                                <p>Revisa tu bandeja o correo spam del email que ha ingresado</p>
                                <button onClick={handleReturn} className="button">
                                    Ir a inicio de sesion
                                </button>
                            </div>

                        </div>

                    )}
                </form>
            </div>
        </div>
    );
};

export default RecoverNameUser;
