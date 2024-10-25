import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HistorialClinico.css';

const HistorialClinico = () => {
  const [historial, setHistorial] = useState([]);
  const [filteredHistorial, setFilteredHistorial] = useState([]); // Historial filtrado
  const [filters, setFilters] = useState({
    tipo: '',
    fechaInicio: '',
    fechaFin: ''
  });

  useEffect(() => {
    fetchHistorial(); // Cargar el historial al cargar la página
  }, []);

  const fetchHistorial = async () => {
    try {
      const response = await axios.get('/api/pets/me/historial'); // Endpoint para obtener el historial de la mascota del cliente autenticado
      setHistorial(response.data.data); // Ajusta según la estructura de respuesta
      setFilteredHistorial(response.data.data); // Inicialmente, las mismas que el historial
    } catch (error) {
      console.error('Error al obtener el historial clínico:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    // Filtrar el historial por tipo de consulta y fechas
    let newFilteredHistorial = [...historial];

    if (filters.tipo) {
      newFilteredHistorial = newFilteredHistorial.filter(item => item.tipo === filters.tipo);
    }

    if (filters.fechaInicio) {
      newFilteredHistorial = newFilteredHistorial.filter(item => new Date(item.fecha) >= new Date(filters.fechaInicio));
    }

    if (filters.fechaFin) {
      newFilteredHistorial = newFilteredHistorial.filter(item => new Date(item.fecha) <= new Date(filters.fechaFin));
    }

    setFilteredHistorial(newFilteredHistorial);
  };

  return (
    <div className="historial-clinico-container">
      <h1>Historial Clínico de Mi Mascota</h1>

      {/* Filtros */}
      <div className="filtros">
        <label>
          Tipo de Consulta:
          <select name="tipo" value={filters.tipo} onChange={handleFilterChange}>
            <option value="">Todas</option>
            <option value="vacunas">Vacunas</option>
            <option value="cirugias">Cirugías</option>
            <option value="consultas">Consultas Generales</option>
          </select>
        </label>
        <label>
          Fecha Inicio:
          <input type="date" name="fechaInicio" value={filters.fechaInicio} onChange={handleFilterChange} />
        </label>
        <label>
          Fecha Fin:
          <input type="date" name="fechaFin" value={filters.fechaFin} onChange={handleFilterChange} />
        </label>
        <button onClick={applyFilters}>Aplicar Filtros</button>
      </div>

      {/* Mostrar Historial */}
      <div className="historial-list">
        {filteredHistorial.length > 0 ? (
          filteredHistorial.map((item) => (
            <div key={item.id} className="historial-item">
              <h3>{item.tipo}</h3>
              <p>Fecha: {new Date(item.fecha).toLocaleDateString()}</p>
              <p>{item.descripcion}</p>
              <p>{item.notas}</p>
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
