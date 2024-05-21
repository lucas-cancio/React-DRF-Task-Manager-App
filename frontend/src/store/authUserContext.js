
import axios from "axios";
import { createContext, useReducer, useContext, useState, useEffect } from "react";

const AuthUserContext = createContext(null);

const AuthUserDispatchContext = createContext(null)

export function AuthUserProvider({children}) {
    const [user, dispatch] = useReducer(authUserReducer, null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/getSession/", {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                dispatch({
                    type: 'getSession',
                    id: res.data.user.id,
                    username: res.data.user.username,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    // token: res.data.token,
                });
            } else {
                console.log("Couldn't get session.");
            }
        })
        .catch((error) => {
            console.log("Failed to get session.", error);
        });
    }, [])

    return (
        <AuthUserContext.Provider value={user}>
            <AuthUserDispatchContext.Provider value={dispatch}>
                {children}
            </AuthUserDispatchContext.Provider>
        </AuthUserContext.Provider>
    )
}

export function useAuthUser() {
    return useContext(AuthUserContext);
}

export function useAuthUserDispatch() {
    return useContext(AuthUserDispatchContext);
}

function authUserReducer(user, action) {
    switch(action.type) {
        case 'login': {
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                username: action.username,
                email: action.email,
                // token: action.token,
            };
        }
        case 'getSession': {
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                username: action.username,
                email: action.email,
                // token: action.token,
            }
        }
        case 'logout': {
            return null;
        }
        default: {
            throw Error('Unkown action: ' + action.type);
        }
    }
}