import React, { useState } from 'react';
import RolModal from '../components/RolModal'; // Reutilizamos el mismo componente Modal
import './TablasStyles.css'; // Importa los estilos

const Roles = () => {
    const [roles, setRoles] = useState([
        { id: 1, nombre: 'Administrador', permisos: ['Crear', 'Editar', 'Eliminar'] },
        { id: 2, nombre: 'Veterinario', permisos: ['Consultar', 'Editar'] }
    ]);

    const [filteredRoles, setFilteredRoles] = useState(roles);
    const [selectedRol, setSelectedRol] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPermisos, setFilterPermisos] = useState('');

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
            const updatedRoles = roles.filter(rol => rol.id !== rolId);
            setRoles(updatedRoles);
            setFilteredRoles(updatedRoles); // Actualiza la lista filtrada
        }
    };

    const handleSave = (rol) => {
        if (isEditing) {
            const updatedRoles = roles.map(r => r.id === rol.id ? rol : r);
            setRoles(updatedRoles);
            setFilteredRoles(updatedRoles); // Actualiza la lista filtrada
        } else if (isAdding) {
            const newRoles = [...roles, { ...rol, id: roles.length + 1 }];
            setRoles(newRoles);
            setFilteredRoles(newRoles); // Actualiza la lista filtrada
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    // Función para manejar la búsqueda y filtrado
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterRoles(query, filterPermisos);
    };

    const handleFilterPermisos = (e) => {
        const permiso = e.target.value;
        setFilterPermisos(permiso);
        filterRoles(searchQuery, permiso);
    };

    const filterRoles = (searchQuery, filterPermisos) => {
        const filtered = roles.filter(rol => {
            const matchesQuery = rol.nombre.toLowerCase().includes(searchQuery);
            const matchesPermisos = filterPermisos ? rol.permisos.includes(filterPermisos) : true;
            return matchesQuery && matchesPermisos;
        });
        setFilteredRoles(filtered);
    };

    return (
        <div className="table-container">
            <h2>Roles</h2>

            {/* Barra de búsqueda y filtro */}
            <div className="filter-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Buscar por nombre de rol..."
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <select className="filter-select" value={filterPermisos} onChange={handleFilterPermisos}>
                    <option value="">Filtrar por permiso</option>
                    <option value="Crear">Crear</option>
                    <option value="Editar">Editar</option>
                    <option value="Eliminar">Eliminar</option>
                    <option value="Consultar">Consultar</option>
                </select>

                <button className="button" onClick={handleAdd}>Agregar Rol</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Permisos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoles.map(rol => (
                        <tr key={rol.id}>
                            <td>{rol.nombre}</td>
                            <td>{rol.permisos.join(', ')}</td>
                            <td>
                                <button className='button button-edit' onClick={() => handleEdit(rol)}>Editar</button>
                                <button className='button button-delete' onClick={() => handleDelete(rol.id)}>Eliminar</button>
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
