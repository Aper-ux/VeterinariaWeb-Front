import React, { useState, useEffect } from 'react';
import { scheduleAppointment, getUsers, getClientPets } from '../services/api';

import './AgendarCita.css';

const AgendarCita = () => {
    const [appointmentData, setAppointmentData] = useState({
        clientId: '',
        veterinarianId: '',
        appointmentDate: '',
        reason: '',
        notes: '',
        petId: '',
    });
    const [clients, setClients] = useState([]);
    const [veterinarians, setVeterinarians] = useState([]);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetchUsers(); // Cargar todos los usuarios al montar el componente
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            const users = response.data.data;

            // Filtrar usuarios según el rol
            const filteredClients = users.filter(user => user.roles.includes('CLIENTE'));
            const filteredVeterinarians = users.filter(user => user.roles.includes('VETERINARIO'));

            setClients(filteredClients);
            setVeterinarians(filteredVeterinarians);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({ ...appointmentData, [name]: value });
    };

    const handleClientChange = (e) => {
        const clientNameOrEmail = e.target.value;
        const selectedClient = clients.find(
            client => client.nombre === clientNameOrEmail || client.email === clientNameOrEmail
        );
        if (selectedClient) {
            setAppointmentData({ ...appointmentData, clientId: selectedClient.uid });
            fetchPetsByClientId(selectedClient.uid);
        }
    };

    const handleVeterinarianChange = (e) => {
        const vetNameOrEmail = e.target.value;
        const selectedVet = veterinarians.find(
            vet => vet.nombre === vetNameOrEmail || vet.email === vetNameOrEmail
        );
        if (selectedVet) {
            setAppointmentData({ ...appointmentData, veterinarianId: selectedVet.uid });
        }
    };

    const handlePetChange = (e) => {
        const petName = e.target.value;
        const selectedPet = pets.find(pet => pet.name === petName);
        if (selectedPet) {
            setAppointmentData({ ...appointmentData, petId: selectedPet.id });
        }
    };

    const fetchPetsByClientId = async (clientId) => {
        try {
            const response = await getClientPets(clientId); // Ajusta esta función en api.js si es necesario
            setPets(response.data.data);
        } catch (error) {
            console.error('Error al obtener mascotas del cliente:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await scheduleAppointment(appointmentData);
            alert('Cita programada exitosamente');
        } catch (error) {
            console.error('Error al programar la cita:', error);
            alert('Error al programar la cita');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cliente (Nombre o Correo):</label>
                <input type="text" name="clientNameOrEmail" onChange={handleClientChange} required />
            </div>

            <div>
                <label>Mascota (Nombre):</label>
                <input type="text" name="petName" onChange={handlePetChange} required />
            </div>

            <div>
                <label>Veterinario (Nombre o Correo):</label>
                <input type="text" name="veterinarianNameOrEmail" onChange={handleVeterinarianChange} required />
            </div>

            <div>
                <label>Fecha y Hora:</label>
                <input type="datetime-local" name="appointmentDate" onChange={handleChange} required />
            </div>

            <div>
                <label>Razón de la cita:</label>
                <input type="text" name="reason" onChange={handleChange} required />
            </div>

            <div>
                <label>Notas adicionales:</label>
                <textarea name="notes" onChange={handleChange}></textarea>
            </div>

            <button type="submit">Agendar Cita</button>
        </form>
    );
};

export default AgendarCita;
