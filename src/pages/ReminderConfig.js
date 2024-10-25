import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReminderConfig = () => {
  const [hoursBefore, setHoursBefore] = useState(24); // Valor por defecto
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener la configuración actual desde el backend
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/reminders/config');
        setHoursBefore(response.data.data.hoursBefore);
      } catch (error) {
        console.error('Error al cargar la configuración', error);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/reminders/config', { hoursBefore });
      setMessage('Configuración guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la configuración', error);
      setMessage('Error al guardar la configuración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Configurar Recordatorio de Citas</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="hoursBefore">Horas antes de la cita para enviar recordatorio:</label>
        <input
          type="number"
          id="hoursBefore"
          value={hoursBefore}
          onChange={(e) => setHoursBefore(e.target.value)}
          min="1"
          max="72" // Límite de horas (ajustable)
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReminderConfig;
