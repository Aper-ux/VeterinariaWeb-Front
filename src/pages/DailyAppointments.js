import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DailyAppointments.css';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const DailyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments/daily', {
          params: {
            veterinarianId: 'ID_DEL_VETERINARIO'
          }
        });
        const sortedAppointments = response.data.data.appointments.sort(
          (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );
        setAppointments(sortedAppointments);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las citas');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Cargando citas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="appointments-container">
      <h2>Citas del día</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div>Hora: {new Date(appointment.appointmentDate).toLocaleTimeString()}</div>
            <div>Cliente: {appointment.client.nombre} {appointment.client.apellido}</div>
            <div>Mascota: {appointment.pet.name}</div>
            <div>Razón: {appointment.reason}</div>
            <button onClick={() => setSelectedAppointment(appointment)}>Ver Detalles</button>
          </li>
        ))}
      </ul>

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default DailyAppointments;
