import api from '../axios';

export default function LogOut({authUserDispatch, csrfTokenSetter}) {
    api.get("/api/logout/",
        {
            headers: {
                "Require-Auth": false,
            },
            withCredentials: true,
        }
    )
    .then((res) => {
        console.log("Successfully logged out.");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        authUserDispatch({
            type: "logout",
        })
    })
    .catch((err) => {
        console.error("Failed to log out." + err);
    })
}