import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css'; /* CSS global */

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar> {/* Agregamos el componente Sidebar */}
      <div> {/* Contenido principal */}
        <h1>Bienvenido</h1>
      </div>
    </div>
  );
}

export default App;
