import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createHistorial } from '../services/api'; // Importar la función de la API para crear el historial
import './HistorialClinicoRegistro.css';

const HistorialClinicoRegistro = () => {
    const { petId } = useParams(); // Obtiene el petId de la URL
    const [formData, setFormData] = useState({
        motivoConsulta: '',
        diagnostico: '',
        tratamiento: '',
        observaciones: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createHistorial(petId, formData); // Guardar el historial en la mascota correspondiente
            alert('Historial registrado correctamente.');
        } catch (error) {
            alert('Error al guardar el historial.');
        }
    };

    return (
        <div className="historial-registro-container">
            <h2>Registrar Historial Clínico</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="motivoConsulta">Motivo de consulta:</label>
                    <input
                        type="text"
                        id="motivoConsulta"
                        name="motivoConsulta"
                        value={formData.motivoConsulta}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="diagnostico">Diagnóstico:</label>
                    <input
                        type="text"
                        id="diagnostico"
                        name="diagnostico"
                        value={formData.diagnostico}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tratamiento">Tratamiento:</label>
                    <input
                        type="text"
                        id="tratamiento"
                        name="tratamiento"
                        value={formData.tratamiento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="observaciones">Notas adicionales:</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn-save">Guardar Historial</button>
            </form>
        </div>
    );
};

export default HistorialClinicoRegistro;
