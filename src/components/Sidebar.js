import React, { useState } from 'react';
import './Sidebar.css'; // Asegúrate de que el archivo CSS esté correctamente referenciado

const Sidebar = () => {
    // Estado para controlar si el sidebar está desplegado o no
    const [isOpen, setIsOpen] = useState(true);

    // Datos de usuario (puedes cambiar esto para obtener los datos del usuario real)
    const user = {
        name: 'Juan Pérez',
        email: 'juan.perez@example.com'
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Cerrar' : 'Abrir'}
            </button>
            {isOpen && (
                <div className="sidebar-content">
                    {/* Información del usuario */}
                    <div className="user-info">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>

                    {/* Opciones de menú */}
                    <nav className="menu">
                        <ul>
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/clientes">Clientes</a></li>
                            <li><a href="/mascotas">Mascotas</a></li>
                            <li><a href="/usuarios">Usuarios</a></li>
                            <li><a href="/roles">Roles</a></li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
