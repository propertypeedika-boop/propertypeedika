import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (credentials) => api.post('/auth/register', credentials), // Optional, for initial setup
    verify: () => api.get('/auth/verify'),
};

export const propertyAPI = {
    getAll: (params) => api.get('/properties', { params }),
    getOne: (id) => api.get(`/properties/${id}`),
    getSimilar: (id) => api.get(`/properties/similar/${id}`),
    create: (data) => {
        // Handle FormData for file uploads
        if (data instanceof FormData) {
            return api.post('/properties', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        return api.post('/properties', data);
    },
    update: (id, data) => {
        if (data instanceof FormData) {
            return api.put(`/properties/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        return api.put(`/properties/${id}`, data);
    },
    delete: (id) => api.delete(`/properties/${id}`),
};

export const enquiryAPI = {
    create: (data) => api.post('/enquiries', data),
    getAll: () => api.get('/enquiries'),
    delete: (id) => api.delete(`/enquiries/${id}`),
};

export default api;
