import React from 'react';

const Perfil = () => {
    return (
        <div>
            <form class="form-container">
                <h1>Perfil de usuario</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png " className='user-profilepic' alt='Juan Pérez' />
                <h2 htmlFor="nombre">Nombre:</h2>
                <input class="search-bar" type="text" id="nombre" placeholder="Juan" />
                <h2 htmlFor="apellidos">Apellidos:</h2>
                <input class="search-bar" type="text" id="apellidos" placeholder="Pérez"/>
                <h2 htmlFor="rol">Rol:</h2>  
                <select class="search-bar" id="rol">
                    <option value="1">Veterinario</option>
                    <option value="2">Cliente</option>
                    <option value="3">Administrador</option>
                </select>
                <h2 htmlFor="email">Email:</h2>
                <input class="search-bar" type="email" id="email" placeholder='juan.perez@example.com' />
                
                <h4>_</h4>
                <button className="button" type="submit">Editar</button>
                <a href="/Mascotas" className="button">Mascotas</a>
            </form>
        </div>
    );
}

export default Perfil;