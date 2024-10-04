import React, { useState, useEffect } from 'react';
import { getInventory } from '../../services/api';

const InventoryAlerts = () => {
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        fetchLowStockItems();
    }, []);

    const fetchLowStockItems = async () => {
        try {
            const inventory = await getInventory();
            const lowStock = inventory.filter(item => item.quantity < item.minThreshold);
            setLowStockItems(lowStock);
        } catch (error) {
            console.error("Error fetching low stock items:", error);
        }
    };

    return (
        <div>
            <h2>Alertas de Bajo Stock</h2>
            {lowStockItems.length > 0 ? (
                <ul>
                    {lowStockItems.map(item => (
                        <li key={item.id}>
                            {item.name} - Cantidad Disponible: {item.quantity} (Umbral: {item.minThreshold})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos con bajo stock.</p>
            )}
        </div>
    );
};

export default InventoryAlerts;
