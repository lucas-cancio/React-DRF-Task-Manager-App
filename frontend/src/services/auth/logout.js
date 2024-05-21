import axios from "axios";

export default function LogOut({authUserDispatch, csrfTokenSetter}) {
    axios.get("http://localhost:8000/api/logout/",
        {
            withCredentials: true,
        }
    )
    .then((res) => {
        console.log("Successfully logged out.");
        authUserDispatch({
            type: "logout",
        })
    })
    .catch((err) => {
        console.error("Failed to log out." + err);
    })
}