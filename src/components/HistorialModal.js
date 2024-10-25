import React, { useState, useEffect } from 'react';
import './HistorialModal.css';
const HistorialModal = ({ historial, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        date: '',
        pet: '',
        owner: '',
        veterinarian: '',
        reason: '',
        allergies: '',
        weight: '',
        temperature: '',
        vaccines: '',
        symptoms: '',
        diagnosis: '',
        treatment: '',
        examResults: '',
        notes: '',
        nextSteps: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (historial) {
            setFormData(historial);
        }
    }, [historial]);

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
        if (!formData.allergies.trim()) newErrors.allergies = 'Las alergias son obligatorias';
        if (!formData.weight.trim() || !formData.weights <= 0) newErrors.weight = 'El peso es obligatorio';
        if (!formData.temperature.trim()) newErrors.temperature = 'La temperatura es obligatoria';
        if (!formData.vaccines.trim()) newErrors.vaccines = 'Las vacunas son obligatorias';
        if (!formData.symptoms.trim()) newErrors.symptoms = 'Los sintomas son obligatorios';
        if (!formData.diagnosis.trim()) newErrors.diagnosis = 'El diagnostico es obligatorio';
        if (!formData.treatment.trim()) newErrors.treatment = 'El tratamiento es obligatorio';
        if (!formData.examResults.trim()) newErrors.examResults = 'Los resultados de examenes son obligatorios';
        if (!formData.notes.trim()) newErrors.notes = 'Las notas son obligatorias';
        if (!formData.nextSteps.trim()) newErrors.nextSteps = 'Los proximos pasos son obligatorios';
        
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
        <div className="historial-modal-overlay">
            <div className="historial-modal">
                <h2>{historial ? 'Editar Historial' : 'Agregar Historial'}</h2>
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
                        <label htmlFor="reason">Motivo de historial:</label>
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
                        <label htmlFor="type">Tipo de historial:</label>
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
                        <label htmlFor="reminder">Recordatorio de historial:</label>
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
                            {historial ? 'Guardar Cambios' : 'Agregar Historial'}
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

export default HistorialModal;