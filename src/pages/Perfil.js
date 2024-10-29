import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, changePassword } from '../services/api';
import { toast } from 'react-toastify';
import '../components/PerfilCliente.css';

const PerfilCliente = () => {
    const [userProfile, setUserProfile] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await getUserProfile();
            setUserProfile(response);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Error al cargar el perfil de usuario');
        }
    };

    const handleProfileChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const validateProfile = () => {
        const newErrors = {};
        if (!userProfile.nombre) newErrors.nombre = 'El nombre es obligatorio';
        if (!userProfile.apellido) newErrors.apellido = 'El apellido es obligatorio';
        if (!userProfile.email) newErrors.email = 'El email es obligatorio';
        if (!userProfile.telefono) newErrors.telefono = 'El teléfono es obligatorio';
        if (!userProfile.direccion) newErrors.direccion = 'La dirección es obligatoria';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (validateProfile()) {
            try {
                await updateUserProfile(userProfile);
                toast.success('Perfil actualizado con éxito');
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('Error al actualizar el perfil');
            }
        } else {
            toast.error('Por favor, completa todos los campos obligatorios');
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/;
        return regex.test(password);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!validatePassword(passwordData.newPassword)) {
            newErrors.newPassword = 'La contraseña debe tener al menos 10 caracteres, una mayúscula y un símbolo';
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await changePassword(passwordData);
                toast.success('Contraseña cambiada con éxito');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                toast.error('Error al cambiar la contraseña');
            }
        } else {
            toast.error('Por favor, corrige los errores en el formulario de contraseña');
        }
    };

    return (
        <div className="perfil-cliente-container">
            <h2>Mi Perfil</h2>
            <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre: *</label>
                    <input type="text" id="nombre" name="nombre" value={userProfile.nombre || ''} onChange={handleProfileChange} required />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido: *</label>
                    <input type="text" id="apellido" name="apellido" value={userProfile.apellido || ''} onChange={handleProfileChange} required />
                    {errors.apellido && <span className="error">{errors.apellido}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: *</label>
                    <input type="email" id="email" name="email" value={userProfile.email || ''} onChange={handleProfileChange} required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono: *</label>
                    <input type="tel" id="telefono" name="telefono" value={userProfile.telefono || ''} onChange={handleProfileChange} required />
                    {errors.telefono && <span className="error">{errors.telefono}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección: *</label>
                    <input type="text" id="direccion" name="direccion" value={userProfile.direccion || ''} onChange={handleProfileChange} required />
                    {errors.direccion && <span className="error">{errors.direccion}</span>}
                </div>
                <button type="submit" className="btn-save">Actualizar Perfil</button>
            </form>

            <h3>Cambiar Contraseña</h3>
            <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña actual: *</label>
                    <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Nueva contraseña: *</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                    {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nueva contraseña: *</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="btn-save">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default PerfilCliente;