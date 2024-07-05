import axios from "axios";
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN_NAME,
    timeout: 5000
});

// Decode JWT and get expiration timeout
const getExpirationTime = (token) => {
    if (!token) return null;
    const decoded =  jwtDecode (token);
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
};

// Check if token is expired
const isTokenExpired = (token) => {
    const expirationTime = getExpirationTime(token);
    if (!expirationTime) return true;
    return Date.now() >= expirationTime;
};

// Refresh the token
const refreshToken = () => {
    return new Promise((resolve, reject) => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
            reject(new Error('Refresh token not found.'));
            return;
        }

        api.post('/api/token/refresh/', { refresh: refreshToken })
            .then((response) => {
                sessionStorage.setItem('token', response.data.access);
                resolve(response.data.access);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.detail){
                    reject(new Error(error.response.data.detail));
                } else {
                    reject(new Error('An error occurred while refreshing token.'));
                }
            });
    });
};


// Axios request interceptor
api.interceptors.request.use(
    async (config) => {
        if (config.headers['Require-Auth']) {
            let token = sessionStorage.getItem('token');
    
            if (token && isTokenExpired(token)) {
                try {
                    token = await refreshToken();
                } catch (error) {
                    console.log("Token refresh failed:", error);
                    // Optionally handle failed refresh (e.g., log out user)
                }
            }
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;