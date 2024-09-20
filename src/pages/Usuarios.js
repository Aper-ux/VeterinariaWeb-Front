import React, { useState } from 'react';
import UsuarioModal from '../components/UsuarioModal'; // Reutilizamos el mismo componente Modal

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Carlos', apellido: 'Sánchez', email: 'carlos.sanchez@example.com', rol: 'Veterinario', estado: 'Activo' },
        { id: 2, nombre: 'Ana', apellido: 'Ríos', email: 'ana.rios@example.com', rol: 'Cliente', estado: 'Inactivo' }
    ]);

    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

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

    return (
        <div className="usuarios-container">
            <h2>Usuarios</h2>
            <button onClick={handleAdd}>Agregar Usuario</button>
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
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)}>Editar</button>
                                <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
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
