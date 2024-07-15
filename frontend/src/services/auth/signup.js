import api from "../axios";

export function SignUp({firstName, lastName, email, username, password, csrfToken}) {
    
    return new Promise((resolve, reject) => {
        api.post("/api/signup/", 
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "username": username,
                "password": password,
            }, {  
               headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                "Require-Auth": false,
            }, withCredentials: true,
            }
        ).then((res) => {
            console.log("Successfully created an account.");
            resolve(res.data);
        })
        .catch((err) => {
            console.error("Failed to create an account." + err);
            reject(err);
        });
    });
};