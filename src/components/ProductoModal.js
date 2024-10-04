import React, { useState, useEffect } from 'react';

const ProductoModal = ({ producto, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        cantidad: '',
        identificacion: ''
    });

    useEffect(() => {
        if (producto) {
            setFormData(producto);
        }
    }, [producto]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal">
            <div className='modal-content'>
                <h3>{producto ? 'Editar producto' : 'Agregar producto'}</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                <label>Tipo:</label>
                <input
                    type="text"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                />
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                />
                <label>ID:</label>
                <input
                    type="text"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    required
                />
                <div className='modal-buttons'>
                    <button onClick={handleSubmit}>{producto ? 'Guardar Cambios' : 'Agregar producto'}</button>
                    <button className='button-cancel' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductoModal;
