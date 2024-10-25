import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HistorialClinicoRegistro.css';

const HistorialClinicoRegistro = ({ onSave }) => {
    const { petId } = useParams(); // Obtiene el petId de la URL
    const [petInfo, setPetInfo] = useState(null);
    const [formData, setFormData] = useState({
        reason: '',
        diagnosis: '',
        treatment: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});

    // Cargar la información de la mascota para confirmación visual
    useEffect(() => {
        const fetchPetInfo = async () => {
            try {
                const response = await axios.get(`/api/mascotas/${petId}`);
                setPetInfo(response.data); // Actualizar con la información de la mascota
            } catch (error) {
                console.error('Error al obtener información de la mascota', error);
            }
        };
        fetchPetInfo();
    }, [petId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.reason.trim()) newErrors.reason = 'El motivo de la consulta es obligatorio.';
        if (!formData.diagnosis.trim()) newErrors.diagnosis = 'El diagnóstico es obligatorio.';
        if (!formData.treatment.trim()) newErrors.treatment = 'El tratamiento es obligatorio.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await onSave(petId, formData); // Guardar el historial en la mascota correspondiente
            alert('Historial registrado correctamente.');
        } catch (error) {
            alert('Error al guardar el historial.');
        }
    };

    return (
        <div className="historial-registro-container">
            <h2>Registrar Historial Clínico</h2>
            {petInfo ? (
                <div className="pet-info">
                    <h3>{`Mascota: ${petInfo.name}`}</h3>
                    <p>{`Dueño: ${petInfo.clientName}`}</p>
                </div>
            ) : (
                <p>Cargando información de la mascota...</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reason">Motivo de consulta:</label>
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
                    <label htmlFor="diagnosis">Diagnóstico:</label>
                    <input
                        type="text"
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className={errors.diagnosis ? 'error' : ''}
                    />
                    {errors.diagnosis && <span className="error-message">{errors.diagnosis}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="treatment">Tratamiento:</label>
                    <input
                        type="text"
                        id="treatment"
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className={errors.treatment ? 'error' : ''}
                    />
                    {errors.treatment && <span className="error-message">{errors.treatment}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notas adicionales:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn-save">Guardar Historial</button>
            </form>
        </div>
    );
};

export default HistorialClinicoRegistro;
