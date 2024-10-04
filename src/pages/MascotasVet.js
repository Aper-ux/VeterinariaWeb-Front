import React, { useState, useEffect } from 'react';
import { getAllPets, createPet, updatePet, deletePet } from '../services/api'; // Importa la nueva función
import MascotaModal from '../components/MascotaModal';
import { toast } from 'react-toastify';

const MascotasVet = () => {
    const [mascotas, setMascotas] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchMascotas();  // Cambiamos la llamada a la nueva función
    }, []);

    const fetchMascotas = async () => {
        try {
            const response = await getAllPets();  // Llamada a getAllPets() en lugar de getCurrentUserPets()
            setMascotas(response);  // Actualizamos el estado con las mascotas obtenidas
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
        setIsAdding(true);
    };

    const handleDelete = async (mascotaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
            try {
                await deletePet(mascotaId);
                toast.success('Mascota eliminada con éxito');
                fetchMascotas();
            } catch (error) {
                console.error('Error deleting pet:', error);
                toast.error('Error al eliminar la mascota');
            }
        }
    };

    const handleSave = async (mascota) => {
        try {
            if (isEditing) {
                await updatePet(mascota.id, mascota);
                toast.success('Mascota actualizada con éxito');
            } else if (isAdding) {
                await createPet(mascota);
                toast.success('Mascota agregada con éxito');
            }
            fetchMascotas();
            setIsEditing(false);
            setIsAdding(false);
        } catch (error) {
            console.error('Error saving pet:', error);
            toast.error('Error al guardar la mascota');
        }
    };

    return (
        <div className="mascotas-container">
            <h2>Todas las Mascotas Registradas</h2>
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
                    {mascotas.map(mascota => (
                        <tr key={mascota.id}>
                            <td>{mascota.name}</td>
                            <td>{mascota.species}</td>
                            <td>{mascota.breed}</td>
                            <td>{mascota.age}</td>
                            <td>
                                <button onClick={() => handleEdit(mascota)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(mascota.id)} className="button-61">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(isEditing || isAdding) && (
                <MascotaModal
                    mascota={selectedMascota}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            )}
        </div>
    );
};

export default MascotasVet;
