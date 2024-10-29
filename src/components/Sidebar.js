import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { user, logout } = useAuth();
    const history = useHistory();

    const hasRole = (roles) => {
        return user && roles.some(role => user.roles.includes(role));
    };

    const handleNavigation = (path) => {
        history.push(path);
        window.location.reload(); // Forzar recarga de página
    };

    const handleLogout = () => {
        logout();
        history.push('/login');
        window.location.reload(); // Forzar recarga de página
    };

    return (
        <div>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {isOpen && (
                    <div className="sidebar-content">
                        <div className="user-info">
                            <h2>{user ? `${user.nombre} ${user.apellido}` : '🐾PurplePaw'}</h2>
                            <p>{user ? user.email : ''}</p>
                        </div>
                        <nav className="menu">
                            <ul>
                                {user ? (
                                    <>
                                        <li><button onClick={() => handleNavigation('/perfil')}>Mi Perfil</button></li>
                                        <li><button onClick={() => handleNavigation('/mascotas')}>Mis Mascotas</button></li>
                                        <li><button onClick={() => handleNavigation('/mis-citas')}>Mis Citas</button></li>
                                        
                                        {hasRole(['VETERINARIO', 'RECEPCIONISTA']) && (
                                            <>
                                                <li><button onClick={() => handleNavigation('/vetmascotas')}>Todas las Mascotas</button></li>
                                                <li><button onClick={() => handleNavigation('/inventory')}>Inventario</button></li>
                                                <li><button onClick={() => handleNavigation('/daily-appointments')}>Citas</button></li>
                                                <li><button onClick={() => handleNavigation('/configurar-recordatorio')}>Configurar Recordatorio</button></li>
                                            </>
                                        )}
                                        {hasRole(['VETERINARIO']) && (
                                            <>
                                                <li><button onClick={() => handleNavigation('/usuarios')}>Usuarios</button></li>
                                                <li><button onClick={() => handleNavigation('/roles')}>Roles</button></li>
                                            </>
                                        )}
                                        <li><button onClick={handleLogout} className="logout-button">Cerrar Sesión</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><button onClick={() => handleNavigation('/login')}>Iniciar Sesión</button></li>
                                        <li><button onClick={() => handleNavigation('/register')}>Registrarse</button></li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '-' : '+'}
            </button>
        </div>
    );
};

export default Sidebar;