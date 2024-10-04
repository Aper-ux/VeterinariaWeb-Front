import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginApi } from '../services/api';
import { toast } from 'react-toastify';

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
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="LogInContainer">
                <h1>Iniciar Sesión</h1>
                <h2 htmlFor="email">Email:</h2>
                <div className="InputContainer">
                    <input className="input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <h2 htmlFor="password">Contraseña:</h2>
                <div className="InputContainer">
                    <input className="input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="button-56" type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LogIn;