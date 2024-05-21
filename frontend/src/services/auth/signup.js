import axios from "axios";

export default function SignUp({firstName, lastName, email, username, password, csrfToken}) {
    
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8000/api/signup/", 
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
    })
}