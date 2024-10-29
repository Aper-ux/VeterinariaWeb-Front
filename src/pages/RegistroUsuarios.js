import React, { useState } from 'react';

const RegistroUsuarios = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', 
        email, 'Password:', password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} class="form-container">
                <h1>Registrarse</h1>
                <h2 htmlFor="nombre">Nombre:</h2>
                <input class="search-bar" type="text" id="nombre" />
                <h2 htmlFor="apellidos">Apellidos:</h2>
                <input class="search-bar" type="text" id="apellidos" />
                <h2 htmlFor="rol">Rol:</h2>  
                <select class="search-bar" id="rol">
                    <option value="1">Veterinario</option>
                    <option value="2">Cliente</option>
                    <option value="3">Administrador</option>
                </select>
                <h2 htmlFor="email">Email:</h2>
                <input class="search-bar" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h2 htmlFor="password">Contraseña:</h2>
                <input class="search-bar" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h2 htmlFor="password">Repita la contraseña:</h2>
                <input class="search-bar" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h4>_</h4>
                <button class="button" type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegistroUsuarios;