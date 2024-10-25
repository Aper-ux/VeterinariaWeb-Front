// src/pages/AppointmentDetailsModal.js
import React from 'react';
import './AppointmentDetailsModal.css';

const AppointmentDetailsModal = ({ appointment, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles de la cita</h2>
        <p><strong>Hora:</strong> {new Date(appointment.appointmentDate).toLocaleTimeString()}</p>
        <p><strong>Cliente:</strong> {appointment.client.nombre} {appointment.client.apellido}</p>
        <p><strong>Mascota:</strong> {appointment.pet.name}</p>
        <p><strong>Razón de la consulta:</strong> {appointment.reason}</p>
        <p><strong>Historial Médico:</strong></p>
        <ul>
          {appointment.petHistory.map((record, index) => (
            <li key={index}>{record.notes} - {new Date(record.date).toLocaleDateString()}</li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
