import React, { useState } from 'react';
import MascotaModal from '../components/MascotaModal'; // Reutilizamos el mismo componente Modal

const Mascotas = () => {
    const [mascotas, setMascotas] = useState([
        { id: 1, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador', edad: 3, dueño: 'Juan Pérez', identificacion: '123ABC' },
        { id: 2, nombre: 'Michi', especie: 'Gato', raza: 'Siamés', edad: 2, dueño: 'María Gómez', identificacion: '456DEF' }
    ]);

    const [selectedMascota, setSelectedMascota] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

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
            setMascotas(mascotas.filter(mascota => mascota.id !== mascotaId));
        }
    };

    const handleSave = (mascota) => {
        if (isEditing) {
            setMascotas(mascotas.map(m => m.id === mascota.id ? mascota : m));
        } else if (isAdding) {
            setMascotas([...mascotas, { ...mascota, id: mascotas.length + 1 }]);
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    return (
        <div className="mascotas-container">
            <h2>Mascotas</h2>
            <button onClick={handleAdd}>Agregar Mascota</button>
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
                    {mascotas.map(mascota => (
                        <tr key={mascota.id}>
                            <td>{mascota.nombre}</td>
                            <td>{mascota.especie}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.edad}</td>
                            <td>{mascota.dueño}</td>
                            <td>{mascota.identificacion}</td>
                            <td>
                                <button onClick={() => handleEdit(mascota)}>Editar</button>
                                <button onClick={() => handleDelete(mascota.id)}>Eliminar</button>
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
