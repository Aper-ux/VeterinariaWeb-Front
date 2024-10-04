import React, { useState, useEffect } from 'react';
import { getRolesApi, updateRolePermissionsApi } from '../services/api';

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await getRolesApi();
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handlePermissionChange = async (roleName, permission, isChecked) => {
        try {
            const updatedRole = roles.find(role => role.role === roleName);
            const updatedPermissions = isChecked
                ? [...updatedRole.permissions, permission]
                : updatedRole.permissions.filter(p => p !== permission);
            
            await updateRolePermissionsApi(roleName, updatedPermissions);
            fetchRoles(); // Refresh roles after update
        } catch (error) {
            console.error('Error updating role permissions:', error);
        }
    };

    return (
        <div className="roles-container">
            <h2>Gestión de Roles y Permisos</h2>
            {roles.map(role => (
                <div key={role.role} className="role-card">
                    <h3>{role.role}</h3>
                    <ul>
                        {['VER_USUARIOS', 'GESTIONAR_USUARIOS', 'GESTIONAR_ROLES', 'VER_PERFIL_PROPIO', 'EDITAR_PERFIL_PROPIO'].map(permission => (
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
            ))}
        </div>
    );
};

export default Roles;