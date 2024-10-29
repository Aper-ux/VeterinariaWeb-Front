import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw, faCalendarAlt, faClipboardList, faSignOutAlt, faThLarge } from '@fortawesome/free-solid-svg-icons';

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
                                        <li onClick={() => handleNavigation('/perfil')}>
                                            <FontAwesomeIcon icon={faUser} className="icon" />
                                            Mi Perfil
                                        </li>
                                        <li onClick={() => handleNavigation('/mascotas')}>
                                            <FontAwesomeIcon icon={faPaw} className="icon" />
                                            Mis Mascotas
                                        </li>
                                        <li onClick={() => handleNavigation('/mis-citas')}>
                                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                                            Mis Citas
                                        </li>
                                        
                                        {hasRole(['VETERINARIO']) && (
                                            <>
                                                <li onClick={() => handleNavigation('/vet-dashboard')}>
                                                    <FontAwesomeIcon icon={faThLarge} className="icon" />
                                                    Dashboard Veterinario
                                                </li>
                                            </>
                                        )}
                                        
                                        {hasRole(['VETERINARIO', 'RECEPCIONISTA']) && (
                                            <>
                                                <li onClick={() => handleNavigation('/vetmascotas')}>
                                                    <FontAwesomeIcon icon={faClipboardList} className="icon" />
                                                    Todas las Mascotas
                                                </li>
                                                <li onClick={() => handleNavigation('/inventory')}>
                                                    <FontAwesomeIcon icon={faClipboardList} className="icon" />
                                                    Inventario
                                                </li>
                                                <li onClick={() => handleNavigation('/daily-appointments')}>
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                                                    Citas
                                                </li>
                                                <li onClick={() => handleNavigation('/configurar-recordatorio')}>
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                                                    Configurar Recordatorio
                                                </li>
                                            </>
                                        )}
                                        <li onClick={handleLogout} className="logout-button">
                                            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                                            Cerrar Sesión
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li onClick={() => handleNavigation('/login')}>
                                            <FontAwesomeIcon icon={faUser} className="icon" />
                                            Iniciar Sesión
                                        </li>
                                        <li onClick={() => handleNavigation('/register')}>
                                            <FontAwesomeIcon icon={faUser} className="icon" />
                                            Registrarse
                                        </li>
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
