import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMyAppointments, cancelAppointment, rescheduleAppointment } from '../services/api';
import './CitasMascota.css';

const CitasMascota = () => {
    const [citas, setCitas] = useState([]);
    const [rescheduleDate, setRescheduleDate] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Obtener citas del cliente
    const fetchAppointments = async () => {
        try {
            const response = await getMyAppointments();  // API para obtener citas de la mascota del cliente
            setCitas(response);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Error al cargar las citas');
        }
    };

    // Cancelar una cita
    const handleCancel = async (appointmentId) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            try {
                await cancelAppointment(appointmentId);  // API para cancelar la cita
                toast.success('Cita cancelada con éxito');
                fetchAppointments();  // Recargar citas
            } catch (error) {
                console.error('Error cancelling appointment:', error);
                toast.error('Error al cancelar la cita');
            }
        }
    };

    // Reprogramar una cita
    const handleReschedule = async () => {
        if (!selectedAppointment || !rescheduleDate) {
            toast.error('Selecciona una fecha para reprogramar');
            return;
        }
        try {
            await rescheduleAppointment(selectedAppointment, rescheduleDate);  // API para reprogramar la cita
            toast.success('Cita reprogramada con éxito');
            setRescheduleDate('');
            setSelectedAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            toast.error('Error al reprogramar la cita');
        }
    };

    return (
        <div className="citas-container">
            <h2>Mis Citas Programadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => (
                        <tr key={cita.id}>
                            <td>{new Date(cita.date).toLocaleDateString()}</td>
                            <td>{cita.reason}</td>
                            <td>{cita.status}</td>
                            <td>
                                <button onClick={() => handleCancel(cita.id)} className="button-cancel">Cancelar</button>
                                <button onClick={() => setSelectedAppointment(cita.id)} className="button-reschedule">Reprogramar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Sección para reprogramar */}
            {selectedAppointment && (
                <div className="reschedule-container">
                    <h3>Reprogramar Cita</h3>
                    <input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                    />
                    <button onClick={handleReschedule} className="button-confirm">Confirmar Reprogramación</button>
                </div>
            )}
        </div>
    );
};

export default CitasMascota;
