import axios from 'axios';

// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicio de API
export const api = {
  // Eventos
  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  },

  // Tareas
  getTasks: async (eventId) => {
    const response = await apiClient.get(`/events/${eventId}/tasks`);
    return response.data;
  },

  createTask: async (eventId, taskData) => {
    const response = await apiClient.post(`/events/${eventId}/tasks`, taskData);
    return response.data;
  },

  updateTask: async (eventId, taskId, updateData) => {
    const response = await apiClient.patch(`/events/${eventId}/tasks/${taskId}`, updateData);
    return response.data;
  },

  // Test de conexión
  testConnection: async () => {
    const response = await apiClient.get('/test');
    return response.data;
  },
};

export default api; 