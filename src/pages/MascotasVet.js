import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPets, createPet, deletePet } from '../services/api';
import MascotaModal from '../components/MascotaModal';
import { toast } from 'react-toastify';

const MascotasVet = () => {
    const [mascotas, setMascotas] = useState([]);
    const [filteredMascotas, setFilteredMascotas] = useState([]); // Mascotas filtradas
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Número total de páginas
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false); // Nuevo estado para agregar mascota

    useEffect(() => {
        fetchMascotas(currentPage); // Cargar mascotas cuando cambia la página
    }, [currentPage]);

    useEffect(() => {
        // Filtrar las mascotas cuando cambie el término de búsqueda
        const results = mascotas.filter(mascota => 
            mascota.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMascotas(results);
    }, [searchTerm, mascotas]);

    const fetchMascotas = async (page) => {
        try {
            const response = await getAllPets(page, 10); // Pasar el número de página
            setMascotas(response.content); // Mascotas en la página actual
            setFilteredMascotas(response.content); // Inicialmente, las filtradas son las mismas
            setTotalPages(response.totalPages); // Total de páginas
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error('Error al cargar las mascotas');
        }
    };

    const handleEdit = (mascota) => {
        setSelectedMascota(mascota);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedMascota(null);
        setIsAdding(true); // Abre el modal para agregar una nueva mascota
    };

    const handleDelete = async (mascotaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
            try {
                await deletePet(mascotaId);
                toast.success('Mascota eliminada con éxito');
                fetchMascotas(currentPage); // Recargar mascotas después de eliminar
            } catch (error) {
                console.error('Error deleting pet:', error);
                toast.error('Error al eliminar la mascota');
            }
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1); // Ir a la siguiente página
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1); // Ir a la página anterior
        }
    };

    return (
        <div className="mascotas-container">
            <h2>Todas las Mascotas Registradas</h2>

            {/* Barra de búsqueda */}
            <input 
                type="text" 
                placeholder="Buscar por nombre de mascota" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
            />

            {/* Botón para agregar nueva mascota */}
            <button onClick={handleAdd} className="button-56">Agregar Mascota</button>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMascotas.map(mascota => (
                        <tr key={mascota.id}>
                            <td>{mascota.name}</td>
                            <td>{mascota.species}</td>
                            <td>{mascota.breed}</td>
                            <td>{mascota.age}</td>
                            <td>
                                {/* Botones de acción */}
                                <button onClick={() => handleEdit(mascota)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(mascota.id)} className="button-61">Eliminar</button>
                                <Link to={`/registro-historial/${mascota.id}`} className="button-61">Registrar Historial</Link>
                                <Link to={`/historial/${mascota.id}`} className="button-61">Ver Historial</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botones de paginación */}
            <div className="pagination-buttons">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Página anterior
                </button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                    Página siguiente
                </button>
            </div>

            {/* Modal para editar o agregar mascota */}
            {(isEditing || isAdding) && (
                <MascotaModal
                    mascota={selectedMascota}
                    onSave={() => { 
                        setIsEditing(false); 
                        setIsAdding(false); 
                        fetchMascotas(currentPage); 
                    }} // Recargar después de editar o agregar
                    onClose={() => {
                        setIsEditing(false);
                        setIsAdding(false);
                    }}
                />
            )}
        </div>
    );
};

export default MascotasVet;
