import React, { useState, useEffect } from 'react';

const UsuarioModal = ({ usuario, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        roles: [],
        password: '' // Solo para nuevos usuarios
    });
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (usuario) {
            setFormData({
                ...usuario,
                password: '' // No incluimos la contraseña al editar
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'email') {
            validateEmail(value);
        }
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        let updatedRoles;
        if (checked) {
            updatedRoles = [...formData.roles, value];
        } else {
            updatedRoles = formData.roles.filter(role => role !== value);
        }
        setFormData({ ...formData, roles: updatedRoles });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!re.test(email)) {
            setEmailError('Por favor, introduce un correo electrónico válido');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = () => {
        if (emailError) {
            alert('Por favor, corrige los errores antes de guardar.');
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{usuario ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                <label>Apellido:</label>
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                {emailError && <p className="error">{emailError}</p>}
                {!usuario && (
                    <>
                        <label>Contraseña:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </>
                )}
                {/* <label>Roles:</label> */}
                <div>
                    <h4>Roles:</h4>
                    {['VETERINARIO', 'CLIENTE', 'RECEPCIONISTA'].map(role => (
                        <label key={role}>
                            <input
                                type="checkbox"
                                value={role}
                                checked={formData.roles.includes(role)}
                                onChange={handleRoleChange}
                            />
                            {role}
                        </label>
                    ))}
                </div>
                <button onClick={handleSubmit}>{usuario ? 'Guardar Cambios' : 'Agregar Usuario'}</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default UsuarioModal;
