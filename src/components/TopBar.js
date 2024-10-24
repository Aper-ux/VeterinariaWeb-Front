import React from 'react';
import { useAuth } from '../context/AuthContext';
import './TopBar.css';

const TopBar = () => {
  const { user } = useAuth();

  return (
    <div className="top-bar">
      <h1>PetClinic</h1>
      {user && <p>Bienvenido, {user.nombre} {user.apellido}</p>}
    </div>
  );
};

export default TopBar;