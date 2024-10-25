// Historial accessible por el veterinario

import React, { useState, useEffect } from 'react';
import { getAllHistorial, createHistorial, updateHistorial, deleteHistorial } from '../services/api'; // Importa la nueva función
import HistorialModal from '../components/HistorialModal';
import { toast } from 'react-toastify';

const Historial = () => {
    const [historial, setHistorial] = useState([]);
    const [selectedHistorial, setSelectedHistorial] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

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

    const handleEdit = (historial) => {
        setSelectedHistorial(historial);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedHistorial(null);
        setIsAdding(true);
    };

    const handleDelete = async (historialId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este historial?')) {
            try {
                await deleteHistorial(historialId);
                toast.success('Historial eliminado con éxito');
                fetchHistorial();
            } catch (error) {
                console.error('Error deleting historial:', error);
                toast.error('Error al eliminar el historial');
            }
        }
    };

    const handleSave = async (historial) => {
        try {
            if (isEditing) {
                await updateHistorial(historial.id, historial);
                toast.success('Historial actualizado con éxito');
            } else if (isAdding) {
                await createHistorial(historial);
                toast.success('Historial agregado con éxito');
            }
            fetchHistorial();
            setIsEditing(false);
            setIsAdding(false);
        } catch (error) {
            console.error('Error saving historial:', error);
            toast.error('Error al guardar el historial');
        }
    };

    return (
        <div className="historial-container">
            <h2>Historial</h2>
            <button onClick={handleAdd} className="button-56">Agregar Historial</button>
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
                            <td>
                                <button onClick={() => handleEdit(historial)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(historial.id)} className="button-61">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(isEditing || isAdding) && (
                <HistorialModal
                    historial={selectedHistorial}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            )}
        </div>
    );
};

export default Historial;
