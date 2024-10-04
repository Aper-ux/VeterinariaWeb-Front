import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, deleteUser, toggleUserStatus } from '../services/api';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import './UserLis.css'
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterActive, setFilterActive] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const users = await getAllUsers(filterActive, filterRole);
            console.log("Users received in component:", users);
            if (Array.isArray(users)) {
                setUsers(users);
                setFilteredUsers(users);
            } else {
                console.error("Unexpected response structure:", users);
                toast.error('Error al cargar los usuarios: Estructura de respuesta inesperada');
            }
        } catch (error) {
            console.error("Error fetching users in component:", error);
            toast.error('Error al cargar los usuarios: ' + (error.message || 'Error desconocido'));
        } finally {
            setIsLoading(false);
        }
    }, [filterActive, filterRole]);
    const applyFilters = useCallback(() => {
        let result = users;
    
        if (filterActive !== '') {
            result = result.filter(user => user.active === (filterActive === 'true'));
        }
    
        if (filterRole !== '') {
            result = result.filter(user => user.roles.includes(filterRole));
        }
    
        if (searchTerm !== '') {
            result = result.filter(user => 
                (user.nombre && user.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.apellido && user.apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setFilteredUsers(result);
    }, [users, filterActive, filterRole, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Re-apply filters when they change
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);


    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            await toggleUserStatus(id, !isActive);
            fetchUsers();
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsFormVisible(true);
    };

    const handleSave = async () => {
        setEditingUser(null);
        setIsFormVisible(false);
        await fetchUsers();
    };

    const handleCancel = () => {
        setEditingUser(null);
        setIsFormVisible(false);
    };

    if (isLoading) {
        return <div>Cargando usuarios...</div>;
    }

    return (
        <div className="content">
            <h2>Gestión de Usuarios</h2>
            
            {/* Filter Bar */}
            <div className="filter-bar">
                <input 
                    type="text" 
                    placeholder="Buscar usuarios..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={filterActive} onChange={(e) => setFilterActive(e.target.value)}>
                    <option value="">Todos los estados</option>
                    <option value="true">Activos</option>
                    <option value="false">Inactivos</option>
                </select>
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">Todos los roles</option>
                    <option value="VETERINARIO">Veterinario</option>
                    <option value="CLIENTE">Cliente</option>
                    <option value="RECEPCIONISTA">Recepcionista</option>
                </select>
                <button onClick={() => setIsFormVisible(true)}>Agregar Usuario</button>
            </div>
    
            {/* User Form */}
            {isFormVisible && (
                <UserForm 
                    user={editingUser} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            )}
    
            {/* User Table */}
            {filteredUsers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.uid}>
                                <td>{user.nombre} {user.apellido}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.join(', ')}</td>
                                <td>{user.active ? 'Activo' : 'Inactivo'}</td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(user)}>Editar</button>
                                    <button onClick={() => handleDelete(user.uid)}>Eliminar</button>
                                    <button onClick={() => handleToggleStatus(user.uid, user.active)}>
                                        {user.active ? 'Desactivar' : 'Activar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron usuarios.</p>
            )}
        </div>
    );
    
};

export default UserList;