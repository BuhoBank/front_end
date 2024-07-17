import React, { useState } from 'react';
import InputGroup from "./InputGroup";
import { sendCode } from '../services/sendCodeToVerify';
import '../styles/SuccessPopup.css';

const EnterCodeComponent = ({ message, onClose, state, email_parameter }) => {

    //const[handleSubmit,success]=useSendCodeToVerify();
    const [formData, setFormData] = useState({
        codigo: '',
        email: email_parameter
    });

    const validations = {
        codigo: {
            pattern: '[0-9]{6}',
            minLength: 6,
            message: 'El código debe tener 6 dígitos numéricos'
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)
        try {
            const response = await sendCode(formData);
            console.log(response)
        } catch (error) {
            console.error("Error al enviar el codigo", error);
        }
    };


    return (
        <div className="popup-overlay">
            <div className="popup">
                {state ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <h1>{message}</h1>
                            <InputGroup
                                id="codigo"
                                name="codigo"
                                label="Código (6 caracteres)"
                                type="text"
                                value={formData.codigo}
                                onChange={handleChange}
                                validation={validations.codigo}
                            />
                            <button type="submit">Enviar Código</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Error en el Registro</h2>
                        <p>{message}</p>
                    </>
                )}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default EnterCodeComponent;