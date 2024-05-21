// src/auth.js
import api from './api/axios';

// Function to log in and obtain JWT and refresh token
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        api.post('/api/token/', { username, password })
            .then((response) => {
                localStorage.setItem('token', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.detail) {
                    reject(new Error(error.response.data.detail));
                } else {
                    reject(new Error('An error occurred during login.'));
                }
            });
    });
};

// Function to refresh JWT using refresh token
export const refreshToken = () => {
    return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            reject(new Error('Refresh token not found.'));
            return;
        }

        api.post('/api/token/refresh/', { refresh: refreshToken })
            .then((response) => {
                localStorage.setItem('token', response.data.access);
                resolve(response.data.access);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.detail) {
                    reject(new Error(error.response.data.detail));
                } else {
                    reject(new Error('An error occurred while refreshing token.'));
                }
            });
    });
};
