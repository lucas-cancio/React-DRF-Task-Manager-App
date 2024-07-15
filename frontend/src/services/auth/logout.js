import api from '../axios';

export default function LogOut() {

    return new Promise((resolve, reject) => {
        api.get("/api/logout/",
            {
                headers: {
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => {
            console.log("Successfully logged out.");
            resolve(res);
        })
        .catch((err) => {
            console.error("Failed to log out." + err);
            reject(err);
        })
    });
}
