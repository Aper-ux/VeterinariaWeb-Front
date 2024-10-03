import React, { useState } from 'react';
import MascotaModal from '../components/MascotaModal'; // Reutilizamos el mismo componente Modal
import './TablasStyles.css'; // Importa los estilos creados

const Mascotas = () => {
    const [mascotas, setMascotas] = useState([
        { id: 1, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador', edad: 3, dueño: 'Juan Pérez', identificacion: '123ABC' },
        { id: 2, nombre: 'Michi', especie: 'Gato', raza: 'Siamés', edad: 2, dueño: 'María Gómez', identificacion: '456DEF' }
    ]);

    const [filteredMascotas, setFilteredMascotas] = useState(mascotas);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterEspecie, setFilterEspecie] = useState('');

    const handleEdit = (mascota) => {
        setSelectedMascota(mascota);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedMascota(null);
        setIsAdding(true);
    };

    const handleDelete = (mascotaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
            const updatedMascotas = mascotas.filter(mascota => mascota.id !== mascotaId);
            setMascotas(updatedMascotas);
            setFilteredMascotas(updatedMascotas); // Actualiza la lista filtrada
        }
    };

    const handleSave = (mascota) => {
        if (isEditing) {
            const updatedMascotas = mascotas.map(m => m.id === mascota.id ? mascota : m);
            setMascotas(updatedMascotas);
            setFilteredMascotas(updatedMascotas); // Actualiza la lista filtrada
        } else if (isAdding) {
            const newMascotas = [...mascotas, { ...mascota, id: mascotas.length + 1 }];
            setMascotas(newMascotas);
            setFilteredMascotas(newMascotas); // Actualiza la lista filtrada
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    // Función para manejar la búsqueda y filtrado
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterMascotas(query, filterEspecie);
    };

    const handleFilterEspecie = (e) => {
        const especie = e.target.value;
        setFilterEspecie(especie);
        filterMascotas(searchQuery, especie);
    };

    const filterMascotas = (searchQuery, filterEspecie) => {
        const filtered = mascotas.filter(mascota => {
            const matchesQuery = mascota.nombre.toLowerCase().includes(searchQuery) ||
                                 mascota.raza.toLowerCase().includes(searchQuery) ||
                                 mascota.dueño.toLowerCase().includes(searchQuery);
            const matchesEspecie = filterEspecie ? mascota.especie === filterEspecie : true;
            return matchesQuery && matchesEspecie;
        });
        setFilteredMascotas(filtered);
    };

    return (
        <div className="table-container">
            <h2>Mascotas</h2>

            {/* Barra de búsqueda y filtro */}
            <div className="filter-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Buscar por nombre, raza o dueño..."
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <select className="filter-select" value={filterEspecie} onChange={handleFilterEspecie}>
                    <option value="">Filtrar por especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                </select>

                <button className="button" onClick={handleAdd}>Agregar Mascota</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Dueño</th>
                        <th>ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMascotas.map(mascota => (
                        <tr key={mascota.id}>
                            <td>{mascota.nombre}</td>
                            <td>{mascota.especie}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.edad}</td>
                            <td>{mascota.dueño}</td>
                            <td>{mascota.identificacion}</td>
                            <td>
                                <button className='button button-edit' onClick={() => handleEdit(mascota)}>Editar</button>
                                <button className='button button-delete' onClick={() => handleDelete(mascota.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar o editar mascota */}
            {isEditing || isAdding ? (
                <MascotaModal
                    mascota={selectedMascota}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            ) : null}
        </div>
    );
};

export default Mascotas;
