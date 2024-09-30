import React, { useState } from 'react';
import RolModal from '../components/RolModal'; // Reutilizamos el mismo componente Modal

const Roles = () => {
    const [roles, setRoles] = useState([
        { id: 1, nombre: 'Administrador', permisos: ['Crear', 'Editar', 'Eliminar'] },
        { id: 2, nombre: 'Veterinario', permisos: ['Consultar', 'Editar'] }
    ]);

    const [selectedRol, setSelectedRol] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (rol) => {
        setSelectedRol(rol);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedRol(null);
        setIsAdding(true);
    };

    const handleDelete = (rolId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
            setRoles(roles.filter(rol => rol.id !== rolId));
        }
    };

    const handleSave = (rol) => {
        if (isEditing) {
            setRoles(roles.map(r => r.id === rol.id ? rol : r));
        } else if (isAdding) {
            setRoles([...roles, { ...rol, id: roles.length + 1 }]);
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    return (
        <div className="roles-container">
            <h2>Roles</h2>
            <button onClick={handleAdd} class="button-56">Agregar Rol</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Permisos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(rol => (
                        <tr key={rol.id}>
                            <td>{rol.nombre}</td>
                            <td>{rol.permisos.join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(rol)} class="button-61">Editar</button>
                                <button onClick={() => handleDelete(rol.id)} class="button-61">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar o editar rol */}
            {isEditing || isAdding ? (
                <RolModal
                    rol={selectedRol}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            ) : null}
        </div>
    );
};

export default Roles;
