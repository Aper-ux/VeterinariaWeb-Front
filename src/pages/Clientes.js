import React, { useState } from 'react';
import ClienteModal from '../components/ClienteModal'; // Componente Modal reutilizable

const Clientes = () => {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: 'Juan', apellido: 'Pérez', direccion: 'Av. Siempre Viva', telefono: '123456789', rol: 'Cliente' },
        { id: 2, nombre: 'María', apellido: 'Gómez', direccion: 'Calle Falsa 123', telefono: '987654321', rol: 'Cliente' }
    ]);

    const [selectedCliente, setSelectedCliente] = useState(null); // Para el cliente que se va a editar
    const [isEditing, setIsEditing] = useState(false); // Controla si estamos en modo edición
    const [isAdding, setIsAdding] = useState(false); // Controla si estamos en modo agregar

    // Función para abrir el modal de editar
    const handleEdit = (cliente) => {
        setSelectedCliente(cliente);
        setIsEditing(true);
    };

    // Función para abrir el modal de agregar
    const handleAdd = () => {
        setSelectedCliente(null); // No hay cliente seleccionado
        setIsAdding(true);
    };

    // Función para eliminar un cliente
    const handleDelete = (clienteId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            setClientes(clientes.filter(cliente => cliente.id !== clienteId));
        }
    };

    // Función para guardar o actualizar cliente
    const handleSave = (cliente) => {
        if (isEditing) {
            setClientes(clientes.map(c => c.id === cliente.id ? cliente : c));
        } else if (isAdding) {
            setClientes([...clientes, { ...cliente, id: clientes.length + 1 }]);
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    return (
        <div className="clientes-container">
            <h2>Clientes</h2>
            <button onClick={handleAdd} class="button-56">Agregar Cliente</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.rol}</td>
                            <td>
                                <button onClick={() => handleEdit(cliente)} class="button-61">Editar</button>
                                <button onClick={() => handleDelete(cliente.id)} class="button-61" >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar o editar cliente */}
            {isEditing || isAdding ? (
                <ClienteModal
                    cliente={selectedCliente}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            ) : null}
        </div>
    );
};

export default Clientes;
