import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el petId de la URL
import { getAllHistorial } from '../services/api'; // Importar la función de la API para obtener el historial clínico
import './HistorialClinico.css';

const HistorialClinico = () => {
  const { petId } = useParams(); // Extraer el petId de la URL
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchHistorial(); // Cargar el historial al cargar la página
  }, []);

  const fetchHistorial = async () => {
    try {
      const response = await getAllHistorial(petId); // Obtener historial clínico desde el backend
      setHistorial(response);
    } catch (error) {
      console.error('Error al obtener el historial clínico:', error);
    }
  };

  return (
    <div className="historial-clinico-container">
      <h1>Historial Clínico de la Mascota</h1>

      <div className="historial-list">
        {historial.length > 0 ? (
          historial.map((item) => (
            <div key={item.id} className="historial-item">
              <h3>{item.diagnostico}</h3>
              <p>Fecha de Visita: {new Date(item.fechaVisita).toLocaleDateString()}</p>
              <p>Tratamiento: {item.tratamiento}</p>
              <p>Motivo: {item.motivoConsulta}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron registros en el historial.</p>
        )}
      </div>
    </div>
  );
};

export default HistorialClinico;
