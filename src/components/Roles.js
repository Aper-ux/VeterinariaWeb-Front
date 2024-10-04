import React, { useState, useEffect } from 'react';
import { getRolesApi, updateRolePermissionsApi } from '../services/api'; // Ensure this is correctly importing your API functions
import './Roles.css'; // Assuming you have a CSS file for styling the roles page

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles and permissions when the component mounts
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRolesApi();
      setRoles(response); // Assuming response is the list of roles and their permissions
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Handle permission updates
  const handlePermissionChange = async (roleName, permission, isChecked) => {
    try {
      const updatedRole = roles.find((role) => role.role === roleName);
      const updatedPermissions = isChecked
        ? [...updatedRole.permissions, permission]
        : updatedRole.permissions.filter((p) => p !== permission);

      await updateRolePermissionsApi(roleName, updatedPermissions);
      fetchRoles(); // Refresh roles after the update
    } catch (error) {
      console.error('Error updating role permissions:', error);
    }
  };

  if (loading) {
    return <div>Cargando roles...</div>;
  }

  return (
    <div className="roles-container">
      <h2>Gestión de Roles y Permisos</h2>
      {roles.length > 0 ? (
        roles.map((role) => (
          <div key={role.role} className="role-card">
            <h3>{role.role}</h3>
            <ul>
              {['VER_USUARIOS', 'GESTIONAR_USUARIOS', 'GESTIONAR_ROLES', 'VER_PERFIL_PROPIO', 'EDITAR_PERFIL_PROPIO'].map((permission) => (
                <li key={permission}>
                  <label>
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={(e) => handlePermissionChange(role.role, permission, e.target.checked)}
                    />
                    {permission}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No se encontraron roles.</p>
      )}
    </div>
  );
};

export default Roles;
