import React, { useState, useEffect } from 'react';

const MascotaModal = ({ mascota, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        dueño: '',
        identificacion: ''
    });

    useEffect(() => {
        if (mascota) {
            setFormData(mascota);
        }
    }, [mascota]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal">
            <div className='modal-content'>
                <h3>{mascota ? 'Editar Mascota' : 'Agregar Mascota'}</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                <label>Especie:</label>
                <input
                    type="text"
                    name="especie"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                />
                <label>Raza:</label>
                <input
                    type="text"
                    name="raza"
                    value={formData.raza}
                    onChange={handleChange}
                    required
                />
                <label>Edad:</label>
                <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                />
                <label>Dueño:</label>
                <input
                    type="text"
                    name="dueño"
                    value={formData.dueño}
                    onChange={handleChange}
                    required
                />
                <label>ID:</label>
                <input
                    type="text"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    required
                />
                <div className='modal-buttons'>
                    <button onClick={handleSubmit}>{mascota ? 'Guardar Cambios' : 'Agregar Mascota'}</button>
                    <button className='button-cancel' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default MascotaModal;
