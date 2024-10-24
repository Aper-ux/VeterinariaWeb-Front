import React, { useState, useEffect } from 'react';

const ClienteModal = ({ cliente, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        rol: ''
    });

    useEffect(() => {
        if (cliente) {
            setFormData(cliente); // Cargar datos del cliente si está en modo edición
        }
    }, [cliente]);

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
                <h3>{cliente ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                <label>Apellido:</label>
                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                <label>Dirección:</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
                <label>Teléfono:</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                <label>Rol:</label>
                <input type="text" name="rol" value={formData.rol} onChange={handleChange} />

                <button onClick={handleSubmit}>{cliente ? 'Guardar Cambios' : 'Agregar Cliente'}</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default ClienteModal;
