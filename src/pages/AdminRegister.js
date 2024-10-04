import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { adminRegisterApi } from '../services/api';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
        roles: []
    });
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        let updatedRoles = [...formData.roles];
        if (checked) {
            updatedRoles.push(value);
        } else {
            updatedRoles = updatedRoles.filter(role => role !== value);
        }
        setFormData({ ...formData, roles: updatedRoles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminRegisterApi(formData);
            history.push('/usuarios');
        } catch (error) {
            console.error('Error en el registro:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    return (
        <div className="admin-register-container">
            <h2>Registro de Usuario (Administrador)</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required />
                <div>
                    <label>
                        <input type="checkbox" value="CLIENTE" checked={formData.roles.includes('CLIENTE')} onChange={handleRoleChange} />
                        Cliente
                    </label>
                    <label>
                        <input type="checkbox" value="VETERINARIO" checked={formData.roles.includes('VETERINARIO')} onChange={handleRoleChange} />
                        Veterinario
                    </label>
                    <label>
                        <input type="checkbox" value="RECEPCIONISTA" checked={formData.roles.includes('RECEPCIONISTA')} onChange={handleRoleChange} />
                        Recepcionista
                    </label>
                </div>
                <button type="submit" className="button-56">Registrar Usuario</button>
            </form>
        </div>
    );
};

export default AdminRegister;