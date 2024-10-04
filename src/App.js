import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import Clientes from './pages/Clientes';
import Mascotas from './pages/Mascotas';
import InventoryPage from './pages/InventoryPage';

import Roles from './components/Roles';
import PerfilCliente from './pages/PerfilCliente';
import MascotasVet from './pages/MascotasVet';
import UserList from './components/UserList'
import './App.css'

function AppContent() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Router>
            <div className="App">
                <TopBar />
                <Sidebar />
                <div className="content">
                    <Switch>
                        <Route path="/login">
                            {user ? <Redirect to="/perfil" /> : <LogIn />}
                        </Route>
                        <Route path="/register">
                            {user ? <Redirect to="/perfil" /> : <Register />}
                        </Route>
                        <PrivateRoute path="/admin-register" component={AdminRegister} roles={['VETERINARIO']} />
                        <PrivateRoute path="/clientes" component={Clientes} roles={['VETERINARIO', 'RECEPCIONISTA']} />
                        <PrivateRoute path="/inventory" component={InventoryPage} roles={['VETERINARIO', 'RECEPCIONISTA']} />
                        <PrivateRoute path="/mascotas" component={Mascotas} />
                        <PrivateRoute path="/vetmascotas" component={MascotasVet} roles={['VETERINARIO']} />
                        <PrivateRoute path="/usuarios" component={UserList} roles={['VETERINARIO']} />
                        <PrivateRoute path="/roles" component={Roles} roles={['VETERINARIO']} />
                        <PrivateRoute path="/perfil" component={PerfilCliente} />
                        <Route exact path="/">
                            <Redirect to={user ? "/perfil" : "/login"} />
                        </Route>
                    </Switch>
                </div>
                <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;