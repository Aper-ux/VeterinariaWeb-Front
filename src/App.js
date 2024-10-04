import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import TopBar from './components/TopBar';
import Clientes from './pages/Clientes';
import Mascotas from './pages/Mascotas';
import Usuarios from './pages/Usuarios';
import Roles from './pages/Roles';
import RegistroUsuarios from './pages/RegistroUsuarios';
import Perfil from './pages/Perfil';
import Inventario from './pages/Inventario';
import './App.css'; // Asegúrate de que el archivo CSS esté correctamente referenciado

function App() {
    return (
        <Router>
            <div className="App">
                <TopBar />
                <Sidebar />
                {/* Contenido principal de la aplicación */}
                <div className="content">
                    <Switch>
                        <Route path="/login" component={LogIn} />
                        <Route path="/registro-usuarios" component={RegistroUsuarios} />
                        <Route path="/perfil" component={Perfil} />
                        <Route path="/inventario" component={Inventario} />
                        <Route path="/clientes" component={Clientes} />
                        <Route path="/mascotas" component={Mascotas} />
                        <Route path="/usuarios" component={Usuarios} />
                        <Route path="/roles" component={Roles} />
                        <Route path="/" exact>
                            <h1>Bienvenido a la Veterinaria</h1>
                            <p>Selecciona una opción en el menú para comenzar.</p>
                            <div class="container">
                                <a href="/login" className="button">Iniciar Sesión</a>
                                <a href="/registro-usuarios" className="button">Registrarse</a>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;