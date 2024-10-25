// Citas accessibles por el veterinario y recepcionista

import React, { useState, useEffect } from 'react';
import { getAllCitas} from '../services/api'; // Importa la nueva función
import { toast } from 'react-toastify';

const Citas = () => {
    const [citas, setCitas] = useState([]);

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

    return (
        <div className="citas-container">
            <h2>Citas</h2>
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
            </table>
        </div>
    );
};

export default Citas;
