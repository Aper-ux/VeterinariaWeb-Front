import React, { useState, useEffect } from 'react';
import { getAllClients, getPetsByClient, checkVetAvailability, createAppointment } from '../services/api';
import { toast } from 'react-toastify';
import './AgendarCita.css';

const AgendarCita = () => {
    const [clientes, setClientes] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    // Obtener la lista de clientes
    const fetchClients = async () => {
        try {
            const response = await getAllClients();
            setClientes(response);
        } catch (error) {
            console.error('Error fetching clients:', error);
            toast.error('Error al cargar los clientes');
        }
    };

    // Obtener las mascotas del cliente seleccionado
    const fetchPets = async (clientId) => {
        try {
            const response = await getPetsByClient(clientId);
            setMascotas(response);
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error('Error al cargar las mascotas');
        }
    };

    // Comprobar disponibilidad del veterinario
    const checkAvailability = async () => {
        if (!appointmentDate || !appointmentTime) return;
        try {
            const available = await checkVetAvailability(appointmentDate, appointmentTime);
            setIsAvailable(available);
            if (!available) toast.error('El veterinario no está disponible en esta fecha y hora');
        } catch (error) {
            console.error('Error checking availability:', error);
            toast.error('Error al verificar disponibilidad');
        }
    };

    // Agendar cita
    const handleSchedule = async () => {
        if (!selectedClient || !selectedPet || !appointmentDate || !appointmentTime) {
            toast.error('Completa todos los campos obligatorios');
            return;
        }
        if (!isAvailable) {
            toast.error('El veterinario no está disponible en la fecha y hora seleccionadas');
            return;
        }
        try {
            await createAppointment(selectedClient, selectedPet, appointmentDate, appointmentTime);
            toast.success('Cita agendada exitosamente');
            // Aquí podrías incluir código para enviar notificación
        } catch (error) {
            console.error('Error scheduling appointment:', error);
            toast.error('Error al agendar la cita');
        }
    };

    return (
        <div className="agendar-cita-container">
            <h2>Agendar Nueva Cita</h2>
            <div className="form-group">
                <label>Cliente:</label>
                <select onChange={(e) => { setSelectedClient(e.target.value); fetchPets(e.target.value); }}>
                    <option value="">Seleccionar Cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Mascota:</label>
                <select onChange={(e) => setSelectedPet(e.target.value)}>
                    <option value="">Seleccionar Mascota</option>
                    {mascotas.map((mascota) => (
                        <option key={mascota.id} value={mascota.id}>
                            {mascota.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Fecha de la Cita:</label>
                <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Hora de la Cita:</label>
                <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} onBlur={checkAvailability} />
            </div>

            <button onClick={handleSchedule} className="button-schedule" disabled={!isAvailable}>
                Agendar Cita
            </button>
        </div>
    );
};

export default AgendarCita;
