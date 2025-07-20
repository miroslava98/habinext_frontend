// src/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.18:8080', // Cambia según tu backend
    headers: { 'Content-Type': 'application/json' }

});

api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('authToken');
        console.log("token guardado", token);
        if (
            token && !config.url?.includes('/auth/login') &&
            !config.url?.includes('/auth/signup') 
        ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)


);

export default api;
