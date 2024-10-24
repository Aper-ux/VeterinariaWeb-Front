// Historial accessible por el veterinario

import React, { useState, useEffect } from 'react';
import { getAllHistorial} from '../services/api'; // Importa la nueva función
import { toast } from 'react-toastify';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        fetchHistorial();  // Cambiamos la llamada a la nueva función
    }, []);

    const fetchHistorial = async () => {
        try {
            const response = await getAllHistorial();  // Llamada a getAllHistorial() en lugar de getCurrentUserHistorial()
            setHistorial(response);  // Actualizamos el estado con las historial obtenidas
        } catch (error) {
            console.error('Error fetching historial:', error);
            toast.error('Error al cargar las historial');
        }
    };

    return (
        <div className="historial-container">
            <h2>Historial</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Mascota</th>
                        <th>Dueño</th>
                        <th>Veterinario</th> {/* Veterinario asignado al historial */}
                        <th>Motivo de consulta</th>
                        <th>Alergias</th>
                        <th>Peso</th>
                        <th>Temperatura</th>
                        <th>Vacunas</th>
                        <th>Sintomas</th>
                        <th>Diagnostico</th>
                        <th>Tratamiento</th> {/* Consulta, vacunación, cirugía, etc. */}
                        <th>Resultados de examenes</th>
                        <th>Notas adicionales</th>
                        <th>Proximos pasos</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map(historial => (
                        <tr key={historial.id}>
                            <td>{historial.date}</td>
                            <td>{historial.pet}</td>
                            <td>{historial.owner}</td>
                            <td>{historial.veterinarian}</td>
                            <td>{historial.reason}</td>
                            <td>{historial.allergies}</td>
                            <td>{historial.weight}</td>
                            <td>{historial.temperature}</td>
                            <td>{historial.vaccines}</td>
                            <td>{historial.symptoms}</td>
                            <td>{historial.diagnosis}</td>
                            <td>{historial.treatment}</td>
                            <td>{historial.examResults}</td>
                            <td>{historial.notes}</td>
                            <td>{historial.nextSteps}</td>                 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historial;
