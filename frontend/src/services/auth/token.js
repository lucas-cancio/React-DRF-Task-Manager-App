import api from '../axios';

export const getJWToken = ({username, password}) => {
    return new Promise((resolve, reject) => {

        console.log("GETTING YOU YOUR JWT TOKEN");
        
        api.post('/api/token/', { username, password }, {
            'headers': {
                'Require-Auth': false,
            }
        })
            .then((response) => {
                sessionStorage.setItem('token', response.data.access);
                sessionStorage.setItem('refreshToken', response.data.refresh);
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

export const refreshJWToken = () => {
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
                if (error.response && error.response.data && error.response.data.detail) {
                    reject(new Error(error.response.data.detail));
                } else {
                    reject(new Error('An error occurred while refreshing token.'));
                }
            });
    });
};