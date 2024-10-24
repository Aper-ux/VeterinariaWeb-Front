import React, { useState, useEffect } from 'react';
import './MascotaModal.css';
const MascotaModal = ({ mascota, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        breed: '',
        age: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mascota) {
            setFormData(mascota);
        }
    }, [mascota]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Limpiar el error cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.species.trim()) newErrors.species = 'La especie es obligatoria';
        if (!formData.breed.trim()) newErrors.breed = 'La raza es obligatoria';
        if (!formData.age || formData.age <= 0) newErrors.age = 'La edad debe ser un número positivo';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <div className="mascota-modal-overlay">
            <div className="mascota-modal">
                <h2>{mascota ? 'Editar Mascota' : 'Agregar Mascota'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="species">Especie:</label>
                        <input
                            type="text"
                            id="species"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            className={errors.species ? 'error' : ''}
                        />
                        {errors.species && <span className="error-message">{errors.species}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Raza:</label>
                        <input
                            type="text"
                            id="breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            className={errors.breed ? 'error' : ''}
                        />
                        {errors.breed && <span className="error-message">{errors.breed}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Edad:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={errors.age ? 'error' : ''}
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn-save">
                            {mascota ? 'Guardar Cambios' : 'Agregar Mascota'}
                        </button>
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MascotaModal;
