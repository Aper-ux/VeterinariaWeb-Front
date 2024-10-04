import React, { useState } from 'react';
import './Sidebar.css'; // Asegúrate de que el archivo CSS esté correctamente referenciado

const Sidebar = () => {
    // Estado para controlar si el sidebar está desplegado o no
    const [isOpen, setIsOpen] = useState(true);

    // Datos de usuario (cambiar esto para obtener los datos del usuario real)
    const user = {
        name: 'Juan Pérez',
        email: 'juan.perez@example.com'
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {/* menu icon, closed and open white*/}
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="aliceblue">
                        <path d="M12 5v14l10-7z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="aliceblue">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                )}
                
            </button>
            {isOpen && (
                <div className="sidebar-content">
                    {/* Información del usuario */}
                    <div className="user-info">
                        <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png " className='user-profilepic' alt={user.name} />
                        <div className="user-info-text">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    {/* Opciones de menú */}
                    <nav className="menu">
                        <ul>
                            <a href="/"><li>Inicio</li></a>
                            <a href="/perfil"><li>Mi Perfil</li></a>
                            <a href="/perfil"><li>Inventario</li></a>
                            <a href="/clientes"><li>Clientes</li></a>
                            <a href="/mascotas"><li>Mascotas</li></a>
                            <a href="/usuarios"><li>Usuarios</li></a>
                            <a href="/roles"><li>Roles</li></a>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
