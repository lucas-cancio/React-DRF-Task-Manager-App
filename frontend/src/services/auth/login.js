import axios from 'axios';
import tokenAPI from './token';
import isResponseOK from '../../utils/checkResponseStatus';
// import GetAuthToken from './token';

export const RequestLogin = ({username, password, csrfToken, authUserDispatch}) => {

    return new Promise((resolve, reject) => {

        axios.post("http://localhost:8000/api/login/", {
                "username": username,
                "password": password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true,
            } )
            .then((res) => isResponseOK(res))
            .then((loginData) => {
                console.log(loginData);
                authUserDispatch({
                    type: 'login',
                    id: loginData.id,
                    username: loginData.username,
                    firstName: loginData.firstName,
                    lastName: loginData.lastName,
                    email: loginData.email,
                });
                resolve(loginData);
            })
            .catch((error) => {
                console.error("Login failed: ", error);
                reject(error);
            });
    })
}

export const RequestTokenLogin = async ({username, password, csrfToken, })