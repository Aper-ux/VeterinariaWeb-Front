import React, { useState } from 'react';
import InventoryManager from '../components/inventory/InventoryManager'; // Assuming you have this component
import ProductForm from '../components/inventory/ProductForm';

const InventoryPage = () => {
    const [refresh, setRefresh] = useState(false);

    const handleProductAdded = () => {
        // Trigger refresh after a product is added
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Gestión de Inventario</h1>
            <ProductForm onProductAdded={handleProductAdded} />
            <InventoryManager key={refresh} /> {/* Use key to force re-render */}
        </div>
    );
};

export default InventoryPage;
