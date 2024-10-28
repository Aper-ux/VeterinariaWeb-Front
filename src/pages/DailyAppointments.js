import React, { useEffect, useState } from 'react';
import { getDailyAppointments } from '../services/api';

const DailyAppointments = ({ veterinarianId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchDailyAppointments();
    }, []);

    const fetchDailyAppointments = async () => {
        try {
            const response = await getDailyAppointments(veterinarianId);
            setAppointments(response.data.data);
        } catch (error) {
            console.error('Error al obtener citas diarias:', error);
        }
    };

    return (
        <div>
            <h2>Citas del Día</h2>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Fecha: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                    <p>Razón: {appointment.reason}</p>
                    <p>Cliente: {appointment.client.nombre}</p>
                </div>
            ))}
        </div>
    );
};

export default DailyAppointments;
