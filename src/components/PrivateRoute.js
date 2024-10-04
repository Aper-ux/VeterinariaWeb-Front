import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          // Redirigir al login si no hay usuario
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }

        // Verificar roles si es necesario
        if (roles && !roles.some(role => user.roles.includes(role))) {
          // Permitir acceso a mascotas para clientes
          if (props.location.pathname === '/mascotas' && user.roles.includes('CLIENTE')) {
            return <Component {...props} />;
          }
          // Redirigir a la página principal si no tiene los roles necesarios
          return <Redirect to="/" />;
        }

        // Si todo está bien, renderizar el componente
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;