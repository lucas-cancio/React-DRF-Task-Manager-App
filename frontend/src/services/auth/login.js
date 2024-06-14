import api from '../axios';
import isResponseOK from '../../utils/checkResponseStatus';

export const requestLogin = ({username, password, csrfToken}) => {

    return new Promise((resolve, reject) => {

        api.post("/api/login/", {
                "username": username,
                "password": password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, 
                    "Require-Auth": false,
                },
                withCredentials: true,
            } )
            .then((res) => isResponseOK(res))
            .then((loginData) => {
                console.log(loginData);
                resolve(loginData);
            })
            .catch((error) => {
                console.error("Login failed: ", error);
                reject(error);
            });
    })
}