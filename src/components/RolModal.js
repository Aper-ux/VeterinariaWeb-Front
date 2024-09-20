import React, { useState, useEffect } from 'react';

const RolModal = ({ rol, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        permisos: ''
    });

    useEffect(() => {
        if (rol) {
            setFormData(rol); // Cargar datos del rol si está en modo edición
        }
    }, [rol]);

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
                <h3>{rol ? 'Editar Rol' : 'Agregar Rol'}</h3>
                <label>Nombre del Rol:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                <label>Permisos (separados por comas):</label>
                <input type="text" name="permisos" value={formData.permisos} onChange={handleChange} />

                <button onClick={handleSubmit}>{rol ? 'Guardar Cambios' : 'Agregar Rol'}</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default RolModal;
