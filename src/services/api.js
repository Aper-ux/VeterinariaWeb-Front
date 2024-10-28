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
        // Verificar si la respuesta es un array (como en el caso del inventario)
        if (Array.isArray(response.data)) {
            return response.data;  // Devuelve directamente el array de datos
        }
        
        // Si la respuesta tiene un campo "success", manejarlo normalmente
        if (response.data && response.data.success) {
            return response.data.data;  // Devuelve los datos del campo "data"
        }
        
        // Si no es un array o no tiene el campo "success", devuelve la respuesta completa
        return response;
    },
    error => {
        // Manejar errores
        if (error.response && error.response.data && error.response.data.error) {
            return Promise.reject(error.response.data.error);
        }
        console.error("Axios error:", error);
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
    return axios.post(`${API_URL}/users/create-with-roles`, userData);
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
//endpoints de veterinario
export const getAllUsers = (isActive, role) => {
    let url = `${API_URL}/users`;
    const params = new URLSearchParams();
    if (isActive !== null) params.append('isActive', isActive);
    if (role) params.append('role', role);
    if (params.toString()) url += `?${params.toString()}`;

    return axios.get(url)
        .then(response => {
            console.log("Full response:", response);
            // Verificar si la respuesta es un array directamente
            if (Array.isArray(response)) {
                return response;
            }
            // Si no es un array, buscar en data o en data.data
            else if (response.data) {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    return response.data.data;
                }
            }
            console.error("Unexpected response structure:", response);
            throw new Error("Unexpected response structure");
        })
        .catch(error => {
            console.error("Error in getAllUsers:", error);
            throw error;
        });
};

export const createUser = (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};

export const updateUser = (userId, userData) => {
    return axios.put(`${API_URL}/users/${userId}`, userData);
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`);
};

export const toggleUserStatus = (userId, isActive) => {
    return axios.post(`${API_URL}/users/${userId}/toggle-status`, { isActive });
};
//inventario
// En api.js
export const getInventoryItems = async (page = 0, size = 10, sortBy = '', sortDirection = '', filterBy = '', filterValue = '') => {
    try {
        const response = await axios.get( `${API_URL}/inventory`, {
            params: {
                page,
                size,
                sortBy,
                sortDirection,
                filterBy,
                filterValue
            }
        });
        
        // Retorna solo el array `content` para ser usado en el frontend
        return response.data.data.content; 
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};

export const addInventoryItem = async (data) => {
    return axios.post(`${API_URL}/inventory`, data);
};
export const updateInventoryItem = async (id, data) => {
    if (!id || !data) {
        throw new Error("Missing id or data for update");
    }
    const response = await axios.put(`${API_URL}/inventory/${id}`, data);
    return response.data;
};

export const getLowStockProducts = async () => {
    const response = await axios.get(`${API_URL}/inventory/low-stock`);
    return response.data;
};

// endpoints de citas
export const getAllCitas = () => {
    return axios.get(`${API_URL}/appointments`);
};

export const createCita = (citaData) => {
    return axios.post(`${API_URL}/appointments`, citaData);
};

export const updateCita = (citaId, citaData) => {
    return axios.put(`${API_URL}/appointments/${citaId}`, citaData);
};

export const deleteCita = (citaId) => {
    return axios.delete(`${API_URL}/appointments/${citaId}`);
};

export const getAvailableTimes = (date) => {
    return axios.get(`${API_URL}/appointments/available-times`, { params: { date } });
};

export const getAvailableDates = () => {
    return axios.get(`${API_URL}/appointments/available-dates`);
};

//endpoints de historial
export const getAllHistorial = () => {
    return axios.get(`${API_URL}/history`);
};

export const createHistorial = (historialData) => {
    return axios.post(`${API_URL}/history`, historialData);
};

// En api.js
export const getUsers = () => {
    return axios.get(`${API_URL}/users`); // Ajusta el endpoint según tu backend para obtener todos los usuarios
};

// En api.js
export const getClientPets = (clientId) => {
    return axios.get(`${API_URL}/users/${clientId}/pets`); // Ajusta el endpoint según tu backend
};


export const updateHistorial = (historialId, historialData) => {
    return axios.put(`${API_URL}/history/${historialId}`, historialData);
};

export const deleteHistorial = (historialId) => {
    return axios.delete(`${API_URL}/history/${historialId}`);
};

<<<<<<< Updated upstream
// Obtener las citas del cliente autenticado
export const getMyAppointments = async () => {
    const response = await axios.get('/api/appointments/my-pets');
    return response.data;
=======

// Endpoint para obtener citas diarias de un veterinario
export const getDailyAppointments = (veterinarianId, date) => {
    return axios.get(`${API_URL}/daily`, { params: { veterinarianId, date } });
>>>>>>> Stashed changes
};

// Endpoint para obtener citas de todas las mascotas de un cliente autenticado
export const getClientPetsAppointments = (paginationRequest) => {
    return axios.get(`${API_URL}/my-pets`, { params: paginationRequest });
};

// Endpoint para programar una cita
export const scheduleAppointment = (appointmentData) => {
    return axios.post(`${API_URL}/appointments/schedule`, appointmentData);
};

// Endpoint para reprogramar una cita
export const rescheduleAppointment = (appointmentId, newDate) => {
    return axios.post(`${API_URL}/${appointmentId}/reschedule`, { newDate });
};

// Endpoint para cancelar una cita
export const cancelAppointment = (appointmentId) => {
    return axios.post(`${API_URL}/${appointmentId}/cancel`);
};

// Obtener todos los clientes
export const getAllClients = async () => {
    const response = await axios.get('/api/clients');
    return response.data;
};

// Obtener mascotas por cliente
export const getPetsByClient = async (clientId) => {
    const response = await axios.get(`/api/clients/${clientId}/pets`);
    return response.data;
};

// Comprobar disponibilidad del veterinario
export const checkVetAvailability = async (date, time) => {
    const response = await axios.post('/api/vet/check-availability', { date, time });
    return response.data.available;
};

// Crear una nueva cita
export const createAppointment = async (clientId, petId, date, time) => {
    await axios.post('/api/appointments', { clientId, petId, date, time });
};