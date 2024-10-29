import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../services/api';
import { toast } from 'react-toastify';
import logo from '../img/logo.jpg';

import './login.css';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginApi({ email, password });
            if (response && response.token && response.user) {
                login(response.user, response.token);
                history.push('/perfil');
                toast.success('Inicio de sesión exitoso');
            } else {
                toast.error('Respuesta de inicio de sesión inválida');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            toast.error(error.message || 'Error en el inicio de sesión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={logo} alt="Logo" className="login-logo" />
            </div>
            <div className="login-form">
                <h1>🐾Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;