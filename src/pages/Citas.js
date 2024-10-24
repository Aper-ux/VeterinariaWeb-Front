// Citas accessibles por el veterinario y recepcionista

import React, { useState, useEffect } from 'react';
import { getAllCitas, createCita, updateCita, deleteCita } from '../services/api'; // Importa la nueva función
import CitasModal from '../components/CitasModal';
import { toast } from 'react-toastify';

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [selectedCita, setSelectedCita] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchCitas();  // Cambiamos la llamada a la nueva función
    }, []);

    const fetchCitas = async () => {
        try {
            const response = await getAllCitas();  // Llamada a getAllCitas() en lugar de getCurrentUserCitas()
            setCitas(response);  // Actualizamos el estado con las citas obtenidas
        } catch (error) {
            console.error('Error fetching citas:', error);
            toast.error('Error al cargar las citas');
        }
    };

    const handleEdit = (cita) => {
        setSelectedCita(cita);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedCita(null);
        setIsAdding(true);
    };

    const handleDelete = async (citaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
            try {
                await deleteCita(citaId);
                toast.success('Cita eliminada con éxito');
                fetchCitas();
            } catch (error) {
                console.error('Error deleting cita:', error);
                toast.error('Error al eliminar la cita');
            }
        }
    };

    const handleSave = async (cita) => {
        try {
            if (isEditing) {
                await updateCita(cita.id, cita);
                toast.success('Cita actualizada con éxito');
            } else if (isAdding) {
                await createCita(cita);
                toast.success('Cita agregada con éxito');
            }
            fetchCitas();
            setIsEditing(false);
            setIsAdding(false);
        } catch (error) {
            console.error('Error saving cita:', error);
            toast.error('Error al guardar la cita');
        }
    };

    return (
        <div className="citas-container">
            <h2>Citas</h2>
            <button onClick={handleAdd} className="button-56">Agregar Cita</button>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Mascota</th>
                        <th>Dueño</th>
                        <th>Veterinario</th> {/* Veterinario asignado a la cita */}
                        <th>Motivo de cita</th>
                        <th>Estado</th> {/* Pendiente, confirmada, cancelada */}
                        <th>Observaciones</th> {/* Anotaciones */}
                        <th>Tipo de cita</th> {/* Consulta, vacunación, cirugía, etc. */}
                        <th>Costo estimado</th>
                        <th>Metodo de pago</th>
                        <th>Recordatorio de cita</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => (
                        <tr key={cita.id}>
                            <td>{cita.name}</td>
                            <td>{cita.species}</td>
                            <td>{cita.breed}</td>
                            <td>{cita.age}</td>
                            <td>
                                <button onClick={() => handleEdit(cita)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(cita.id)} className="button-61">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(isEditing || isAdding) && (
                <CitasModal
                    cita={selectedCita}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            )}
        </div>
    );
};

export default Citas;
