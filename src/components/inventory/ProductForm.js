import React, { useState } from 'react';
import { addInventoryItem } from '../../services/api'; // Ensure this API call is defined
import './ProductForm.css'; // Import the CSS file for styling

const ProductForm = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        dateAdded: '',
        minThreshold: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (!formData.name || !formData.quantity || !formData.dateAdded || !formData.minThreshold) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            await addInventoryItem({
                ...formData,
                quantity: parseInt(formData.quantity), // Ensure quantity is a number
                minThreshold: parseInt(formData.minThreshold), // Ensure minThreshold is a number
                dateAdded: new Date(formData.dateAdded).toISOString() // Convert date to ISO format
            });
            setError('');
            setFormData({
                name: '',
                quantity: '',
                dateAdded: '',
                minThreshold: '',
            });
            onProductAdded(); // Callback to refresh the inventory after adding a product
        } catch (error) {
            console.error("Error adding product:", error);
            setError('Error al agregar el producto. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="product-form">
            <h3>Agregar Producto al Inventario</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del Producto"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Cantidad Disponible:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Cantidad"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateAdded">Fecha de Ingreso:</label>
                    <input
                        type="date"
                        id="dateAdded"
                        name="dateAdded"
                        value={formData.dateAdded}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="minThreshold">Umbral Mínimo de Stock:</label>
                    <input
                        type="number"
                        id="minThreshold"
                        name="minThreshold"
                        value={formData.minThreshold}
                        onChange={handleChange}
                        placeholder="Umbral Mínimo"
                        required
                    />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductForm;
