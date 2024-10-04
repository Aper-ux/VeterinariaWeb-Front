import React, { useState, useEffect } from 'react';
import { updateUser, adminRegisterApi } from '../services/api'; // Import adminRegisterApi for veterinarians
import './UserForm.css'; // Import the modal styles

const UserForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        roles: [],
        password: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                password: '' // Reset password when editing a user
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*\W)(?=.{10,})/;

        if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio';
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio';
        if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria';

        // Validate password only when adding a user
        if (!user && !formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (!user && !passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 10 caracteres, una mayúscula y un símbolo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleCreateUser = async (userData) => {
        try {
            const response = await adminRegisterApi(userData);
            console.log("User created successfully:", response);
            onSave(); // Trigger onSave after a successful user creation
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (user) {
                // Update user (excluding password if empty)
                const { password, ...rest } = formData;
                await updateUser(user.uid, password ? formData : rest);
            } else {
                // Create user (use the handleCreateUser function)
                await handleCreateUser(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{user ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        {errors.nombre && <p className="error">{errors.nombre}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                            required
                        />
                        {errors.apellido && <p className="error">{errors.apellido}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />
                        {errors.telefono && <p className="error">{errors.telefono}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección:</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />
                        {errors.direccion && <p className="error">{errors.direccion}</p>}
                    </div>

                    {!user && (
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required={!user} // Password is required when creating a user
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                    )}

                    <div className="form-group role-checkboxes">
                        <label>Roles:</label>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    value="VETERINARIO"
                                    checked={formData.roles.includes('VETERINARIO')}
                                    onChange={handleRoleChange}
                                />
                                Veterinario
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="CLIENTE"
                                    checked={formData.roles.includes('CLIENTE')}
                                    onChange={handleRoleChange}
                                />
                                Cliente
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="RECEPCIONISTA"
                                    checked={formData.roles.includes('RECEPCIONISTA')}
                                    onChange={handleRoleChange}
                                />
                                Recepcionista
                            </label>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">
                            {user ? 'Actualizar' : 'Crear'} Usuario
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onCancel}></div>
        </div>
    );
};

export default UserForm;
