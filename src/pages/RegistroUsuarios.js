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
                <h1>Iniciar Sesión</h1>
                <h2 htmlFor="email">Email:</h2>
                <input class="search-bar" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h2 htmlFor="password">Contraseña:</h2>
                <input class="search-bar" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h2 htmlFor="password">Repita la contraseña:</h2>
                <input class="search-bar" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h2>_</h2>
                <button class="button" type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default RegistroUsuarios;