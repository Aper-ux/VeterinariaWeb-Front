import React, { useState, useEffect } from 'react';
import './CitasModal.css';
const CitasModal = ({ cita, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        date: '',
        pet: '',
        owner: '',
        veterinarian: '',
        reason: '',
        status: '',
        observations: '',
        type: '',
        estimatedPrice: '',
        paymentMethod: '',
        reminder: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cita) {
            setFormData(cita);
        }
    }, [cita]);

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
        if (!formData.date.trim()) newErrors.date = 'La fecha es obligatoria';
        if (!formData.pet.trim()) newErrors.pet = 'La mascota es obligatoria';
        if (!formData.owner.trim()) newErrors.owner = 'El dueño es obligatorio';
        if (!formData.veterinarian.trim()) newErrors.veterinarian = 'La edad es obligatoria';
        if (!formData.reason.trim()) newErrors.reason = 'La razon es obligatoria';
        if (!formData.status.trim()) newErrors.status = 'El estado es obligatorio';
        if (!formData.observations.trim()) newErrors.observations = 'Las observaciones son obligatorias';
        if (!formData.type.trim()) newErrors.type = 'El tipo es obligatorio';
        if (!formData.estimatedPrice || formData.estimatedPrice <= 0) newErrors.estimatedPrice = 'El precio estimado es obligatorio';
        if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'El metodo de pago es obligatorio';
        if (!formData.reminder.trim()) newErrors.reminder = 'El recordatorio es obligatorio';
        
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
        <div className="cita-modal-overlay">
            <div className="cita-modal">
                <h2>{cita ? 'Editar Cita' : 'Agregar Cita'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-message">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="pet">Mascota:</label>
                        <input
                            type="text"
                            id="pet"
                            name="pet"
                            value={formData.pet}
                            onChange={handleChange}
                            className={errors.pet ? 'error' : ''}
                        />
                        {errors.pet && <span className="error-message">{errors.pet}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Dueño:</label>
                        <input
                            type="text"
                            id="owner"
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className={errors.owner ? 'error' : ''}
                        />
                        {errors.owner && <span className="error-message">{errors.owner}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="veterinarian">Veterinario:</label>
                        <input
                            type="text"
                            id="veterinarian"
                            name="veterinarian"
                            value={formData.veterinarian}
                            onChange={handleChange}
                            className={errors.veterinarian ? 'error' : ''}
                        />
                        {errors.veterinarian && <span className="error-message">{errors.veterinarian}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Motivo de cita:</label>
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className={errors.reason ? 'error' : ''}
                        />
                        {errors.reason && <span className="error-message">{errors.reason}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Estado:</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={errors.status ? 'error' : ''}
                        />
                        {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="observations">Observaciones:</label>
                        <input
                            type="text"
                            id="observations"
                            name="observations"
                            value={formData.observations}
                            onChange={handleChange}
                            className={errors.observations ? 'error' : ''}
                        />
                        {errors.observations && <span className="error-message">{errors.observations}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Tipo de cita:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={errors.type ? 'error' : ''}
                        />
                        {errors.type && <span className="error-message">{errors.type}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="estimatedPrice">Costo estimado:</label>
                        <input
                            type="number"
                            id="estimatedPrice"
                            name="estimatedPrice"
                            value={formData.estimatedPrice}
                            onChange={handleChange}
                            className={errors.estimatedPrice ? 'error' : ''}
                        />
                        {errors.estimatedPrice && <span className="error-message">{errors.estimatedPrice}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Metodo de pago:</label>
                        <input
                            type="text"
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className={errors.paymentMethod ? 'error' : ''}
                        />
                        {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder">Recordatorio de cita:</label>
                        <input
                            type="text"
                            id="reminder"
                            name="reminder"
                            value={formData.reminder}
                            onChange={handleChange}
                            className={errors.reminder ? 'error' : ''}
                        />
                        {errors.reminder && <span className="error-message">{errors.reminder}</span>}
                    </div>
                    
                    <div className="button-group">
                        <button type="submit" className="btn-save">
                            {cita ? 'Guardar Cambios' : 'Agregar Cita'}
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

export default CitasModal;
