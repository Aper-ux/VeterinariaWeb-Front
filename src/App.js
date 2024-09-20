import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Clientes from './pages/Clientes';
import Mascotas from './pages/Mascotas';
import Usuarios from './pages/Usuarios';
import Roles from './pages/Roles';

import './App.css'; // Asegúrate de que el archivo CSS esté correctamente referenciado

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                {/* Contenido principal de la aplicación */}
                <div className="content">
                    <Switch>
                        <Route path="/login" component={LogIn} />
                        <Route path="/clientes" component={Clientes} />
                        <Route path="/mascotas" component={Mascotas} />
                        <Route path="/usuarios" component={Usuarios} />
                        <Route path="/roles" component={Roles} />
                        <Route path="/" exact>
                            <h1>Bienvenido a PetClinic</h1>
                            <p>Selecciona una opción en el menú para comenzar.</p>
                            <div class="container">
                                <a href="/login" className="button-56">Iniciar Sesión</a>
                                <a href="/login" className="button-56">Registrarse</a>
                            </div>
                            </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
