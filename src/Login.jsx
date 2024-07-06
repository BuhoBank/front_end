import React from 'react';
import './styles/Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-image">
                <img src="/src/assets/image.png" alt="BúhoBank Logo" />
            </div>
            <div className="login-form">
                <h2>BIENVENIDO A TU BANCA WEB</h2>
                <form>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input type="text" placeholder="Usuario" />
                        <a href="#">¿Olvidaste tu usuario?</a>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Contraseña" />
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit">INGRESAR</button>
                </form>
                <div className="extra-links">
                    <button>Desbloquea tu Banca Web</button>
                    <button>Regístrate a Banca Web</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
