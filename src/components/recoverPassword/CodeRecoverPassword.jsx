import React, { useState } from 'react';
import InputGroup from '../InputGroup';
import { sendCode } from '../../services/sendCodeToVerify';
import { changePassword } from '../../services/passService';
import { useNavigate } from 'react-router-dom';
import '../../styles/Enterecoverycodepass.css';

const CodeRecoverPassword = ({ data_parameter, handleClose }) => {
    const [success, setSuccess] = useState(false);
    const [attempts, setAttempts] = useState(3);
    const [showAttemptsWarning, setShowAttemptsWarning] = useState(false);
    const [showBadCodeWarning, setShowBadCodeWarning] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState(false); // Inicialmente, el mensaje de éxito está oculto
    const [timeOut,setTimeOut]=useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        codigo: '',
        email: data_parameter.email,
        parameter: 1
    });

    const [formData2, setFormData2] = useState({
        id: JSON.parse(localStorage.getItem("id")),
        new_password: '',
        current_password: '',
        confirm_password:'',
    });

    const validations = {
        codigo: {
            pattern: /^[0-9]{6}$/,
            message: 'El código debe tener 6 dígitos numéricos'
        },
        new_password: {
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un dígito y un carácter especial'
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in formData) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (name in formData2) {
            setFormData2(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validatePassword = (password) => {
        if (password.length < validations.new_password.minLength) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }
        if (!validations.new_password.pattern.test(password)) {
            return validations.new_password.message;
        }
        return '';
    };


    const validateEqualsPasswords = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return true;
        }
        return false;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validations.codigo.pattern.test(formData.codigo)) {
            alert("Ingrese 6 dígitos por favor");
            return;
        }

        setIsLoading(true);

        try {
            const response = await sendCode(formData);
            if (response.code === 'SUCCESS') {
                setSuccess(true);
            } else if (response.code === "NO_SUCCESS") {
                setAttempts(prev => {
                    const newAttempts = prev - 1;
                    if (newAttempts <= 0) {
                        setShowAttemptsWarning(true);
                    }
                    setShowBadCodeWarning(true);
                    return newAttempts;
                });
            }else if (response.code==='TIME_OUT'){
                setTimeOut(true)
            }
        } catch (error) {
            console.error("Error al enviar el código:", error);
        }finally{
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const error = validatePassword(formData2.new_password);
        const confirmPasswordError = validateEqualsPasswords(formData2.new_password, formData2.confirm_password);
        console.log("confirmacion de contraseñas iguales: ", confirmPasswordError)
        if (confirmPasswordError) {
            setPasswordError("Las contraseñas deben ser iguales")
            return;
        }
        if (error) {
            setPasswordError(error);
            return;
        }
        try {
            const response = await changePassword(formData2.id, formData2.current_password, formData2.new_password, 1);
            if (response.code === "PASSWORD_CHANGED") {
                setMessage(true);
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
        }
    };

    const goLogin=()=>{
        navigate("/");
    }

    return (
        <div className="popup-overlay">
            <div className={`popup ${success ? 'success' : ''}`}>
                {!success ? (
                    <div className="code-form">
                        <h1>Ingrese el código que hemos enviado a su email</h1>
                        <InputGroup
                            id="codigo"
                            name="codigo"
                            label="Código (6 caracteres)"
                            type="text"
                            value={formData.codigo}
                            onChange={handleChange}
                            validation={validations.codigo}
                        />
                        <div className="popup-button-container">
                            {attempts > 0 && (
                                <button 
                                onClick={handleSubmit}
                                className={`send-button ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="loader"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar"
                                )}
                            </button>
                            )}
                            <button onClick={handleClose}>Atras</button>
                        </div>
                        {showBadCodeWarning && (
                            <p style={{ color: 'red' }}>Código incorrecto, intente nuevamente</p>
                        )}
                        {timeOut && (
                            <p style={{ color: 'red' }}>El tiempo para ingresar el código se ha agotado</p>
                        )}
                        {attempts > 0 && (
                            <p>Tiene {attempts} intentos para ingresar el código.</p>
                        )}
                        {showAttemptsWarning && (
                            <div>
                                <p style={{ color: 'red' }}>Código incorrecto,</p>
                                <p>Ya no tiene más intentos disponibles. Asegúrese de usar un código correcto, verifique que el código le llegó al correo, y revise el spam.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="success-form">
                        {!message ? (
                            <>
                                <h1>Cree una nueva contraseña</h1>
                                <InputGroup
                                    id="new_password"
                                    name="new_password"
                                    label="Nueva contraseña"
                                    type="password"
                                    value={formData2.new_password}
                                    onChange={handleChange}
                                    validation={validations.new_password}
                                />
                                <InputGroup
                                    id="confirm_password"
                                    name="confirm_password"
                                    label="Repetir contraseña"
                                    type="password"
                                    value={formData2.confirm_password}
                                    onChange={handleChange}
                                    validation={{ message: "La contraseña debe ser igual al anterior."}}
                                />
                                {passwordError && (
                                    <p style={{ color: 'red' }}>{passwordError}</p>
                                )}
                                <div className="popup-button-container">
                                    <button onClick={handlePasswordSubmit}>Guardar</button>
                                    <button onClick={handleClose}>Cancelar</button>
                                </div>
                            </>
                        ) : (
                            <div>
                            <p>Contraseña cambiada con éxito</p>
                            <button onClick={goLogin}> Ir a inicio</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeRecoverPassword;
