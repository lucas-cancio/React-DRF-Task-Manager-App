
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { SignUp } from "../../services/auth/signup";
import { GetCSRFToken } from "../../services/getCSRFToken";
import Card from "../card/card";

export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        SignUp({
            csrfToken: csrfToken,
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
        })
        .then((res) => {
            navigate("/login/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        GetCSRFToken({
            csrfToken: csrfToken,
            csrfTokenSetter, csrfTokenSetter
        });
    }, []);


    return (
        <Card>
            <div className="p-3">

                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label htmlFor="firstNameInput">First Name</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="firstNameInput" type="text" name="firstName" placeholder="first name" 
                                value={firstName} onChange={handleFirstNameChange} required></input>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label htmlFor="lastNameInput">Last Name</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="lastNameInput" type="text" name="lastName" placeholder="last name" 
                                value={lastName} onChange={handleLastNameChange} required></input>
                        </div>    
                    </div>
                    
                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label htmlFor="emailInput">Email</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="emailInput" type="email" name="email" placeholder="email"
                                value={email} onChange={handleEmailChange} required></input>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label htmlFor="usernameInput">Username</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="usernameInput" type="text" name="username" placeholder="username"
                                value={username} onChange={handleUserNameChange} required></input>
                        </div>        
                    </div>

                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label htmlFor="passwordInput">Password</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="passwordInput" type="password" name="password" placeholder="password" 
                                value={password} onChange={handlePasswordChange} required></input>
                        </div>        
                    </div>

                    <div className="d-flex flex-row justify-content-center mb-1">
                        <input type="submit" name="submit"></input>
                    </div>
                </form>
            </div>
        </Card>
    );
}