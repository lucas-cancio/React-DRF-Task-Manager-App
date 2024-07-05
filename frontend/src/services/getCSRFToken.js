import axios from "axios";

export function GetCSRFToken({csrfToken, csrfTokenSetter}) {

    if (csrfToken != null) {
        return;
    }

    axios.get("".concat(process.env.REACT_APP_BACKEND_DOMAIN_NAME,"/api/getCSRFToken/"), {
        withCredentials: true,
    })
        .then((res) => {
            console.log("Successfully retrieved CSRF Token");
            let csrfToken = res.headers.get('X-CSRFToken');
            csrfTokenSetter(csrfToken);
            return csrfToken;
        })
        .catch((error) => {
            console.error("Failed to get CSRF Token");
            console.error(error);
            return error;
        });
}