import React, { useState } from 'react';
import UsuarioModal from '../components/UsuarioModal'; // Reutilizamos el mismo componente Modal
import './TablasStyles.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Carlos', apellido: 'Sánchez', email: 'carlos.sanchez@example.com', rol: 'Veterinario', estado: 'Activo' },
        { id: 2, nombre: 'Ana', apellido: 'Ríos', email: 'ana.rios@example.com', rol: 'Cliente', estado: 'Inactivo' }
    ]);

    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Filtros y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRol, setFilterRol] = useState('');
    const [filterEstado, setFilterEstado] = useState('');

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedUsuario(null);
        setIsAdding(true);
    };

    const handleDelete = (usuarioId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioId));
        }
    };

    const handleSave = (usuario) => {
        if (isEditing) {
            setUsuarios(usuarios.map(u => u.id === usuario.id ? usuario : u));
        } else if (isAdding) {
            setUsuarios([...usuarios, { ...usuario, id: usuarios.length + 1 }]);
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    // Manejo de filtros y búsqueda
    const filteredUsuarios = usuarios
        .filter(usuario => 
            (filterRol === '' || usuario.rol === filterRol) &&
            (filterEstado === '' || usuario.estado === filterEstado) &&
            (usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
             usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) || 
             usuario.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    return (
        <div className="table-container">
            <h2>Usuarios</h2>
            
            <div className="filter-container">
                {/* Barra de búsqueda */}
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, apellido o email" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-bar"
                />
                
                {/* Filtro por Rol */}
                <select value={filterRol} onChange={(e) => setFilterRol(e.target.value)} className="filter-select">
                    <option value="">Filtrar por Rol</option>
                    <option value="Veterinario">Veterinario</option>
                    <option value="Cliente">Cliente</option>
                </select>

                {/* Filtro por Estado */}
                <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className="filter-select">
                    <option value="">Filtrar por Estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>

                <button className='button' onClick={handleAdd}>Agregar Usuario</button>
            </div>

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
                    {filteredUsuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td className='table-actions'>
                                <button className='button button-edit' onClick={() => handleEdit(usuario)}>Editar</button>
                                <button className='button button-delete' onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar o editar usuario */}
            {isEditing || isAdding ? (
                <UsuarioModal
                    usuario={selectedUsuario}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            ) : null}
        </div>
    );
};

export default Usuarios;
