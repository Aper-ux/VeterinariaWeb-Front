import React, { useState, useEffect } from 'react';
import { getAllHistorial } from '../services/api'; // Asegúrate de que está importado correctamente
import { toast } from 'react-toastify';

const Historial = ({ petId }) => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        fetchHistorial();
    }, [petId]);

    const fetchHistorial = async () => {
        try {
            const response = await getAllHistorial(petId);  // Llama a la API con el ID de la mascota
            setHistorial(response);  // Actualiza el estado con los historiales obtenidos
        } catch (error) {
            console.error('Error fetching historial:', error);
            toast.error('Error al cargar el historial');
        }
    };

    return (
        <div className="historial-container">
            <h2>Historial Médico</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Mascota</th>
                        <th>Veterinario</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((record, index) => (
                        <tr key={index}>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.petName}</td>
                            <td>{record.veterinarianName}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.treatment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historial;
