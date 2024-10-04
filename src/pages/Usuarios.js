import React, { useState, useEffect } from 'react';
import UsuarioModal from '../components/UsuarioModal'; // Reutilizamos el mismo componente Modal
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi, toggleUserStatusApi } from '../services/api';


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [filterActive, setFilterActive] = useState(null);
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        fetchUsuarios();
    }, [filterActive, filterRole]);

    const fetchUsuarios = async () => {
        try {
            const response = await getUsersApi(filterActive, filterRole);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedUsuario(null);
        setIsAdding(true);
    };

    const handleDelete = async (usuarioId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.')) {
            try {
                await deleteUserApi(usuarioId);
                fetchUsuarios();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleToggleStatus = async (usuarioId, isActive) => {
        try {
            await toggleUserStatusApi(usuarioId, !isActive);
            fetchUsuarios();
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const handleSave = async (usuario) => {
        try {
            if (isEditing) {
                await updateUserApi(usuario.id, usuario);
            } else if (isAdding) {
                await createUserApi(usuario);
            }
            fetchUsuarios();
            setIsEditing(false);
            setIsAdding(false);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="usuarios-container">
            <h2>Usuarios</h2>
            <div className="filters">
                <select onChange={(e) => setFilterActive(e.target.value)} value={filterActive || ''}>
                    <option value="">Todos</option>
                    <option value="true">Activos</option>
                    <option value="false">Inactivos</option>
                </select>
                <select onChange={(e) => setFilterRole(e.target.value)} value={filterRole}>
                    <option value="">Todos los roles</option>
                    <option value="VETERINARIO">Veterinario</option>
                    <option value="CLIENTE">Cliente</option>
                    <option value="RECEPCIONISTA">Recepcionista</option>
                </select>
            </div>
            <button onClick={handleAdd} className="button-56">Agregar Usuario</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.roles.join(', ')}</td>
                            <td>{usuario.active ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)} className="button-61">Editar</button>
                                <button onClick={() => handleDelete(usuario.id)} className="button-61">Eliminar</button>
                                <button onClick={() => handleToggleStatus(usuario.id, usuario.active)} className="button-61">
                                    {usuario.active ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(isEditing || isAdding) && (
                <UsuarioModal
                    usuario={selectedUsuario}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            )}
        </div>
    );
};

export default Usuarios;