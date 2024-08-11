import React, { useState } from 'react';
import InputGroup from '../InputGroup';
import { sendCode } from '../../services/sendCodeToVerify';
import { changePassword } from '../../services/passService';
import { useNavigate } from 'react-router-dom';
import '../../styles/Enterecoverycodepass.css';

const TransferCodePopup = ({ handleTransfer, handleClose }) => {
    const [attempts, setAttempts] = useState(3);
    const [showAttemptsWarning, setShowAttemptsWarning] = useState(false);
    const [showBadCodeWarning, setShowBadCodeWarning] = useState(false);
    const [timeOut, setTimeOut] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const user_email = localStorage.getItem('user_email')
    const [formData, setFormData] = useState({
        codigo: '',
        email: user_email,
        parameter: 2
    });


    const validations = {
        codigo: {
            pattern: /^[0-9]{6}$/,
            message: 'El código debe tener 6 dígitos numéricos'
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in formData) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        if (!validations.codigo.pattern.test(formData.codigo)) {
            alert("Ingrese 6 dígitos por favor");
            return;
        }

        setIsLoading(true);

        try {
            const response = await sendCode(formData);
            if (response.code === 'SUCCESS') {
                handleTransfer()
            } else if (response.code === "NO_SUCCESS") {
                setAttempts(prev => {
                    const newAttempts = prev - 1;
                    if (newAttempts <= 0) {
                        setShowAttemptsWarning(true);
                        setShowBadCodeWarning(false);

                    } else {
                        setShowBadCodeWarning(true);
                    }
                    return newAttempts;
                });
            } else if (response.code === 'TIME_OUT') {
                setTimeOut(true)
                setAttempts(0)

            }

        } catch (error) {
            console.error("Error al enviar el código para transferencia:", error);

        } finally {
            setIsLoading(false);
        }


    }

    return (
        <div className='popup-overlay'>
            <div className="popup">
                <div className='code-form'>
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
                            onClick={handleSubmitCode} 
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
                            <p style={{ color: 'red' }}>Código incorrecto</p>
                            <p>Ya no tiene más intentos disponibles. Asegúrese de usar el código que hemos enviado a su correo, verifique que el código le llegó al correo, y revise el spam.</p>
                            <p style={{color:'red'}}>La transferencia no se realizo</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default TransferCodePopup;