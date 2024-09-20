import React, { useState } from 'react';

const Clientes = () => {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: 'Juan Pérez', contacto: '555-1234' },
        { id: 2, nombre: 'Maria López', contacto: '555-5678' }
    ]);
    
    const [filtro, setFiltro] = useState("");

    const handleDelete = (id) => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
    };

    const handleSearch = (e) => {
        setFiltro(e.target.value);
    };

    const filteredClientes = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <h1>Clientes</h1>
            <input 
                type="text" 
                placeholder="Buscar cliente..." 
                value={filtro}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.contacto}</td>
                            <td>
                                <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                                {/* Agregar botones para editar/ver detalles */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
