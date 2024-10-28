import React, { useEffect, useState } from 'react';
import { getClientPetsAppointments, cancelAppointment, rescheduleAppointment } from '../services/api';

const CitasMascota = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await getClientPetsAppointments();
            setAppointments(response.data.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            await cancelAppointment(appointmentId);
            alert('Cita cancelada');
            fetchAppointments();
        } catch (error) {
            console.error('Error al cancelar cita:', error);
        }
    };

    const handleReschedule = async (appointmentId, newDate) => {
        try {
            await rescheduleAppointment(appointmentId, newDate);
            alert('Cita reprogramada');
            fetchAppointments();
        } catch (error) {
            console.error('Error al reprogramar cita:', error);
        }
    };

    return (
        <div>
            <h2>Citas de Mascotas</h2>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Fecha: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                    <p>Razón: {appointment.reason}</p>
                    <button onClick={() => handleCancel(appointment.id)}>Cancelar</button>
                    {/* Añadir funcionalidad para reprogramar */}
                </div>
            ))}
        </div>
    );
};

export default CitasMascota;
