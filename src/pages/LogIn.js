import React, { useState } from 'react';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', 
        email, 'Password:', password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} class="LogInContainer">
                <h1>Iniciar Sesión</h1>
                <h2 htmlFor="email">Email:</h2>
                <div class="InputContainer">
                    <input class="input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <h2 htmlFor="password">Contraseña:</h2>
                <div class="InputContainer">
                    <input class="input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button class="button-56" type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LogIn;