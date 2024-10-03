import React, { useState, useEffect } from 'react';

const UsuarioModal = ({ usuario, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        rol: '',
        estado: ''
    });

    useEffect(() => {
        if (usuario) {
            setFormData(usuario); // Cargar datos del usuario si está en modo edición
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData); // Guardar cambios
        onClose(); // Cerrar modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{usuario ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <label>Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <label>Rol:</label>
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar rol</option>
                    <option value="Veterinario">Veterinario</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <label>Estado:</label>
                <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>
                        {usuario ? 'Guardar Cambios' : 'Agregar Usuario'}
                    </button>
                    <button className="button-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsuarioModal;
