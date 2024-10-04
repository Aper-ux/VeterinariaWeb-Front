import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Url principal del backend

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        // Verificar si la respuesta tiene la estructura esperada
        if (response.data && response.data.success) {
            return response.data.data;
        }
        return response;
    },
    error => {
        // Manejar errores
        if (error.response && error.response.data && error.response.data.error) {
            return Promise.reject(error.response.data.error);
        }
        return Promise.reject(error);
    }
);

// Función de login
export const loginApi = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};
  // Función de registro normal (CLIENTE)
export const registerApi = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};
  
  // Función de registro por admin (VETERINARIO)
export const adminRegisterApi = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};
  
export const getUsersApi = (isActive, role) => {
    return axios.get(`${API_URL}/users`, { params: { isActive, role } });
};

export const createUserApi = (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};

export const updateUserApi = (userId, userData) => {
    return axios.put(`${API_URL}/users/${userId}`, userData);
};

export const deleteUserApi = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`);
};

export const toggleUserStatusApi = (userId, isActive) => {
    return axios.post(`${API_URL}/users/${userId}/toggle-status`, { isActive });
};
//roles
export const getRolesApi = () => {
    return axios.get(`${API_URL}/roles`);
};

export const updateRolePermissionsApi = (roleName, permissions) => {
    return axios.put(`${API_URL}/roles/${roleName}`, permissions);
};

export const updateUserRolesApi = (userId, roles) => {
    return axios.put(`${API_URL}/users/${userId}/roles`, roles);
};

//perfil y mascotas
export const getAllPets = () => {
    return axios.get(`${API_URL}/pets`); // Cambia a tu endpoint que devuelve todas las mascotas
};
export const getUserProfile = () => {
    return axios.get(`${API_URL}/users/me`);
};

export const updateUserProfile = (profileData) => {
    return axios.put(`${API_URL}/users/me`, profileData);
};

export const getUserPets = () => {
    return axios.get(`${API_URL}/users/me/pets`);
};

export const updatePet = (petId, petData) => {
    return axios.put(`${API_URL}/pets/${petId}`, petData);
};

export const changePassword = (passwordData) => {
    return axios.post(`${API_URL}/users/me/change-password`, passwordData);
};
// services/api.js

export const getCurrentUserPets = () => {
    return axios.get(`${API_URL}/pets/me`);
};

export const createPet = (petData) => {
    return axios.post(`${API_URL}/pets`, petData);
};


export const deletePet = (petId) => {
    return axios.delete(`${API_URL}/pets/${petId}`);
};