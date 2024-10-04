import React, { useState } from 'react';
import ProductoModal from '../components/ProductoModal'; // Reutilizamos el mismo componente Modal
import './TablasStyles.css'; // Importa los estilos creados

const Inventario = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Alprazolam', tipo: 'Medicación', cantidad: 3, identificacion: '123ABC' },
        { id: 2, nombre: 'Penisilina', tipo: 'Medicación', cantidad: 2, identificacion: '456DEF' },
        { id: 3, nombre: 'Pinzas', tipo: 'Instrumento', cantidad: 2, identificacion: '523OPE' },
        { id: 4, nombre: 'Bata', tipo: 'Indumentaria', cantidad: 6, identificacion: '524QAE' }
    ]);

    const [filteredProductos, setFilteredProductos] = useState(productos);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTipo, setFilterTipo] = useState('');

    const handleEdit = (producto) => {
        setSelectedProducto(producto);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setSelectedProducto(null);
        setIsAdding(true);
    };

    const handleDelete = (productoId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta producto?')) {
            const updatedProductos = productos.filter(producto => producto.id !== productoId);
            setProductos(updatedProductos);
            setFilteredProductos(updatedProductos); // Actualiza la lista filtrada
        }
    };

    const handleSave = (producto) => {
        if (isEditing) {
            const updatedProductos = productos.map(p => p.id === producto.id ? producto : p);
            setProductos(updatedProductos);
            setFilteredProductos(updatedProductos); // Actualiza la lista filtrada
        } else if (isAdding) {
            const newProductos = [...productos, { ...producto, id: productos.length + 1 }];
            setProductos(newProductos);
            setFilteredProductos(newProductos); // Actualiza la lista filtrada
        }
        setIsEditing(false);
        setIsAdding(false);
    };

    // Función para manejar la búsqueda y filtrado
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterProductos(query, filterTipo);
    };

    const handleFilterTipo = (e) => {
        const tipo = e.target.value;
        setFilterTipo(tipo);
        filterProductos(searchQuery, tipo);
    };

    const filterProductos = (searchQuery, filterTipo) => {
        const filtered = productos.filter(producto => {
            const matchesQuery = producto.nombre.toLowerCase().includes(searchQuery) ||
                                 producto.identificacion.toLowerCase().includes(searchQuery);
            const matchesTipo = filterTipo ? producto.tipo === filterTipo : true;
            return matchesQuery && matchesTipo;
        });
        setFilteredProductos(filtered);
    };

    return (
        <div className="table-container">
            <h2>Inventario</h2>

            {/* Barra de búsqueda y filtro */}
            <div className="filter-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Buscar por nombre, tipo, codigo"
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <select className="filter-select" value={filterTipo} onChange={handleFilterTipo}>
                    <option value="">Filtrar por tipo</option>
                    <option value="Medicación">Medicación</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Instrumento">Instrumento</option>
                </select>

                <button className="button" onClick={handleAdd}>Agregar Producto</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProductos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.tipo}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.identificacion}</td>
                            <td>
                                <button className='button button-edit' onClick={() => handleEdit(producto)}>Editar</button>
                                <button className='button button-delete' onClick={() => handleDelete(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar o editar producto */}
            {isEditing || isAdding ? (
                <ProductoModal
                    producto={selectedProducto}
                    onSave={handleSave}
                    onClose={() => { setIsEditing(false); setIsAdding(false); }}
                />
            ) : null}
        </div>
    );
};

export default Inventario;
