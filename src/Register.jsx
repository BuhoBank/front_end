// src/Register.jsx
import React from 'react';
import './styles/Register.css'; // Asegúrate de crear y definir los estilos si es necesario

const Register = () => {
    return (
        <div className="register-container">
            <h2>Registro en BúhoBank</h2>
            <form>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" placeholder="Nombre" />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" placeholder="Apellido" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" placeholder="Contraseña" />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;
