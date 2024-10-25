import React, { useState, useEffect } from 'react';
import { getCurrentUserPets, createPet, updatePet, deletePet } from '../services/api';
import MascotaModal from '../components/MascotaModal';
import { toast } from 'react-toastify';

const Mascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => { fetchMascotas(); }, []);

    const fetchMascotas = async () => {
        try {
            const response = await getCurrentUserPets();
            setMascotas(response);
        } catch (error) {
            toast.error('Error al cargar las mascotas');
        }
    };

    const handleEdit = mascota => { setSelectedMascota(mascota); setIsEditing(true); };
    const handleAdd = () => { setSelectedMascota(null); setIsAdding(true); };
    const handleDelete = async mascotaId => {
        if (window.confirm('¿Eliminar esta mascota?')) {
            try { await deletePet(mascotaId); fetchMascotas(); toast.success('Mascota eliminada'); }
            catch { toast.error('Error al eliminar'); }
        }
    };

    const handleSave = async mascota => {
        try {
            if (isEditing) await updatePet(mascota.id, mascota);
            else if (isAdding) await createPet(mascota);
            fetchMascotas(); setIsEditing(false); setIsAdding(false);
            toast.success(`Mascota ${isEditing ? 'actualizada' : 'agregada'} con éxito`);
        } catch {
            toast.error(`Error al ${isEditing ? 'actualizar' : 'agregar'} la mascota`);
        }
    };

    return (
        <div className="mascotas-container">
            <h2>Mis Mascotas</h2>
            <button onClick={handleAdd} className="button-56">Agregar Mascota</button>
            <table>
                <thead>
                    <tr><th>Nombre</th><th>Especie</th><th>Raza</th><th>Edad</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {mascotas.map(mascota => (
                        <tr key={mascota.id}>
                            <td>{mascota.name}</td><td>{mascota.species}</td><td>{mascota.breed}</td><td>{mascota.age}</td>
                            <td>
                                <button onClick={() => handleEdit(mascota)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(mascota.id)} className="button-61">Eliminar</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(isEditing || isAdding) && <MascotaModal mascota={selectedMascota} onSave={handleSave} onClose={() => { setIsEditing(false); setIsAdding(false); }} />}
        </div>
    );
};

export default Mascotas;
