import React, { useState, useEffect } from 'react';

const UsuarioModal = ({ usuario, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        rol: '',
        estado: ''
    });

    useEffect(() => {
        if (usuario) {
            setFormData(usuario); // Cargar datos del usuario si está en modo edición
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData); // Guardar cambios
        onClose(); // Cerrar modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{usuario ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                <label>Apellido:</label>
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <label>Rol:</label>
                <input type="text" name="rol" value={formData.rol} onChange={handleChange} />
                <label>Estado:</label>
                <input type="text" name="estado" value={formData.estado} onChange={handleChange} />

                <button onClick={handleSubmit}>{usuario ? 'Guardar Cambios' : 'Agregar Usuario'}</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default UsuarioModal;
