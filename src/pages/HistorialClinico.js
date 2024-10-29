import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HistorialClinico = () => {
  const { petId } = useParams(); // Obtener el petId desde los parámetros de la URL
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchHistorial(); // Llamar al historial cuando el componente se monte
  }, []);

  const fetchHistorial = async () => {
    try {
      const response = await axios.get(`/api/historial-clinico/mascota/${petId}`); // Usar el petId en la URL correcta
      setHistorial(response.data.data); // Asegurarse de que los datos están en el formato correcto
    } catch (error) {
      console.error('Error al obtener el historial clínico:', error);
    }
  };

  return (
    <div>
      <h2>Historial Clínico</h2>
      <ul>
        {historial.length > 0 ? (
          historial.map((item) => (
            <li key={item.id}>
              <strong>{item.tipo}</strong> - {new Date(item.fechaVisita).toLocaleDateString()}
              <p>{item.diagnostico}</p>
              <p>{item.tratamiento}</p>
              <p>{item.notas}</p>
            </li>
          ))
        ) : (
          <p>No se encontraron registros en el historial.</p>
        )}
      </ul>
    </div>
  );
};

export default HistorialClinico;
