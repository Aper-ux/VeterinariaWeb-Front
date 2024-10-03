import React, { useState } from 'react';
import ClienteModal from '../components/ClienteModal'; // Componente Modal reutilizable
import './TablasStyles.css';

const Clientes = () => {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: 'Juan', apellido: 'Pérez', direccion: 'Av. Siempre Viva', telefono: '123456789', rol: 'Cliente' },
        { id: 2, nombre: 'María', apellido: 'Gómez', direccion: 'Calle Falsa 123', telefono: '987654321', rol: 'Cliente' }
    ]);

    const [filteredClientes, setFilteredClientes] = useState(clientes);
    const [selectedCliente, setSelectedCliente] = useState(null); // Para el cliente que se va a editar
    const [isEditing, setIsEditing] = useState(false); // Controla si estamos en modo edición
    const [isAdding, setIsAdding] = useState(false); // Controla si estamos en modo agregar
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRol, setFilterRol] = useState('');
    
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
            setFilteredClientes(clientes.filter(cliente => cliente.id !== clienteId)); // Actualiza la lista filtrada
        }
    };

    // Función para guardar o actualizar cliente
    const handleSave = (cliente) => {
        if (isEditing) {
            const updatedClientes = clientes.map(c => c.id === cliente.id ? cliente : c);
            setClientes(updatedClientes);
            setFilteredClientes(updatedClientes); // Actualiza la lista filtrada
        } else if (isAdding) {
            const newClientes = [...clientes, { ...cliente, id: clientes.length + 1 }];
            setClientes(newClientes);
            setFilteredClientes(newClientes); // Actualiza la lista filtrada
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    // Filtrar por búsqueda y rol
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterClientes(query, filterRol);
    };

    const handleFilterRol = (e) => {
        const rol = e.target.value;
        setFilterRol(rol);
        filterClientes(searchQuery, rol);
    };

    const filterClientes = (searchQuery, filterRol) => {
        const filtered = clientes.filter(cliente => {
            const matchesQuery = cliente.nombre.toLowerCase().includes(searchQuery) || 
                                 cliente.apellido.toLowerCase().includes(searchQuery);
            const matchesRol = filterRol ? cliente.rol === filterRol : true;
            return matchesQuery && matchesRol;
        });
        setFilteredClientes(filtered);
    };

    return (
        <div className="table-container">
            <h2>Clientes</h2>

            <div className="filter-container">
                <input 
                    type="text"
                    className="search-bar"
                    placeholder="Buscar por nombre o apellido..."
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <select className="filter-select" value={filterRol} onChange={handleFilterRol}>
                    <option value="">Filtrar por rol</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Veterinario">Veterinario</option>
                </select>

                <button className="button" onClick={handleAdd}>Agregar Cliente</button>
            </div>

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
                    {filteredClientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.rol}</td>
                            <td>
                                <button className='button button-edit' onClick={() => handleEdit(cliente)}>Editar</button>
                                <button className='button button-delete' onClick={() => handleDelete(cliente.id)}>Eliminar</button>
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
