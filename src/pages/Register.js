import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerApi, loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo_registro from '../img/logo_registro.jpeg';
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        telefono: '',
        direccion: ''
    });
    const history = useHistory();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerApi({ ...formData, roles: ['CLIENTE'] });
            const loginResponse = await loginApi({
                email: formData.email,
                password: formData.password
            });

            if (loginResponse && loginResponse.token && loginResponse.user) {
                login(loginResponse.user, loginResponse.token);
                toast.success('Registro exitoso. Bienvenido!');
                history.push('/perfil');
            } else {
                throw new Error('Error en el inicio de sesión automático');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            toast.error('Error en el registro: ' + (error.message || 'Ocurrió un problema'));
        }
    };

    return (
        <div className="register-container">
            <div className="register-image">
                <img src={logo_registro} alt="Register" className="register-logo"  />
            </div>
            <div className="register-form">
                <h1>Registro</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                    <button type="submit" className="register-button">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Register;