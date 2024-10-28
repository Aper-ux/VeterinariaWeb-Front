import React, { useState, useEffect } from 'react';
import { getInventoryItems, addInventoryItem, updateInventoryItem } from '../../services/api';
import './InventoryManager.css';

const InventoryManager = () => {
    const [inventory, setInventory] = useState([]);  // Estado para la lista de inventario
    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: '',
        minThreshold: '',
        dateAdded: ''
    });
    const [editingItem, setEditingItem] = useState(null);  // Producto en modo de edición
    const [error, setError] = useState(null);
    const [lowStockProducts, setLowStockProducts] = useState([]);  // Lista de productos con bajo stock

    // Cargar el inventario al iniciar el componente
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const items = await getInventoryItems();
                setInventory(items);

                // Filtrar productos con bajo stock
                const lowStock = items.filter(item => item.quantity < item.minThreshold);
                setLowStockProducts(lowStock);

            } catch (err) {
                console.error("Error fetching inventory:", err);
                setError("Error al cargar el inventario.");
            }
        };
        

        fetchInventory();
    }, []);

    // Manejar el cambio en los campos del nuevo producto o producto en edición
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        if (editingItem) {
            setEditingItem({ ...editingItem, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    // Agregar nuevo producto al inventario
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const newProductData = { ...newProduct, dateAdded: new Date().toISOString() };
            await addInventoryItem(newProductData);

            // Actualiza el inventario localmente
            setInventory([...inventory, newProductData]);

            // Verifica si el producto tiene bajo stock
            if (newProductData.quantity < newProductData.minThreshold) {
                setLowStockProducts([...lowStockProducts, newProductData]);
            }

            // Reinicia el formulario
            setNewProduct({
                name: '',
                quantity: '',
                minThreshold: '',
                dateAdded: ''
            });
        } catch (err) {
            console.error("Error adding product:", err);
            setError("Error al agregar el producto.");
        }
    };

    // Guardar los cambios de un producto editado
    const handleSaveClick = async (e) => {
        e.preventDefault();
        if (editingItem) {
            try {
                await updateInventoryItem(editingItem.id, editingItem);

                // Actualiza el inventario localmente
                setInventory(inventory.map(item =>
                    item.id === editingItem.id ? editingItem : item
                ));

                // Verificar si el stock es bajo
                if (editingItem.quantity < editingItem.minThreshold) {
                    setLowStockProducts([...lowStockProducts, editingItem]);
                } else {
                    setLowStockProducts(lowStockProducts.filter(item => item.id !== editingItem.id));
                }

                setEditingItem(null);  // Salir del modo de edición
            } catch (err) {
                console.error("Error updating product:", err);
                setError("Error al actualizar el producto.");
            }
        }
    };

    // Manejar la edición de un producto
    const handleEditClick = (item) => {
        setEditingItem(item);
    };

    // Cancelar la edición
    const handleCancelClick = () => {
        setEditingItem(null);
    };

    return (
        <div className="inventory-manager">
            <h2>Gestionar Inventario de Productos</h2>

            {/* Mostrar productos con bajo stock en la parte superior */}
            {lowStockProducts.length > 0 && (
                <div className="low-stock-notification">
                    <h3>Productos con Bajo Stock</h3>
                    <ul>
                        {lowStockProducts.map(item => (
                            <li key={item.id}>
                                <strong>{item.name}</strong> está bajo en stock. Disponible: {item.quantity}.
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Formulario para agregar o editar producto */}
            <div className="add-product">
                <h3>{editingItem ? 'Editar Producto' : 'Agregar Producto al Inventario'}</h3>
                <form onSubmit={editingItem ? handleSaveClick : handleAddProduct}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Producto"
                        value={editingItem ? editingItem.name : newProduct.name}
                        onChange={handleProductChange}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Cantidad Disponible"
                        value={editingItem ? editingItem.quantity : newProduct.quantity}
                        onChange={handleProductChange}
                        required
                    />
                    <input
                        type="number"
                        name="minThreshold"
                        placeholder="Umbral Mínimo"
                        value={editingItem ? editingItem.minThreshold : newProduct.minThreshold}
                        onChange={handleProductChange}
                        required
                    />
                    <button type="submit">{editingItem ? 'Guardar Cambios' : 'Agregar Producto'}</button>
                    {editingItem && <button type="button" className="btn-cancel" onClick={handleCancelClick}>Cancelar</button>}
                </form>
            </div>

            {/* Tabla de productos */}
            <div className="inventory-table">
                <h3>Inventario de Productos</h3>
                {inventory.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre del Producto</th>
                                <th>Cantidad Disponible</th>
                                <th>Umbral Mínimo</th>
                                <th>Fecha de Ingreso</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map(item => (
                                <tr key={item.id} className={item.quantity < item.minThreshold ? 'low-stock' : ''}>
                                    <td>{item.name}</td>
                                    <td>
                                        {editingItem?.id === item.id ? (
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={editingItem.quantity}
                                                onChange={handleProductChange}
                                                required
                                            />
                                        ) : (
                                            item.quantity
                                        )}
                                    </td>
                                    <td>
                                        {editingItem?.id === item.id ? (
                                            <input
                                                type="number"
                                                name="minThreshold"
                                                value={editingItem.minThreshold}
                                                onChange={handleProductChange}
                                                required
                                            />
                                        ) : (
                                            item.minThreshold
                                        )}
                                    </td>
                                    <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                                    <td>
                                        {editingItem?.id === item.id ? (
                                            <>
                                                <button className="btn-save" onClick={handleSaveClick}>Guardar</button>
                                                <button className="btn-cancel" onClick={handleCancelClick}>Cancelar</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditClick(item)}>Editar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay productos en el inventario.</p>
                )}
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default InventoryManager;
