
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { SignUp } from "../../services/auth/signup";
import { GetCSRFToken } from "../../services/getCSRFToken";
import Card from "../card/card";

import "./signupForm.css";
import { useTheme } from "../../store/themeContext";

export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    const theme = useTheme();

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
        <div className={`signupFormContainer ${theme} p-5`}>
            <h2 className="mb-3 text-center">Sign Up</h2>
            <p className="instructionMsg text-center mb-4">Please fill in the form to create an account.</p>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row justify-content-center mb-2">
                    <input className="normalInput rounded-pill" id="firstNameInput" type="text" name="firstName" placeholder="first name" 
                        value={firstName} onChange={handleFirstNameChange} required data-testid="firstNameInput"></input>
                </div>

                <div className="d-flex flex-row justify-content-center mb-2">
                    <input className="normalInput rounded-pill" id="lastNameInput" type="text" name="lastName" placeholder="last name" 
                        value={lastName} onChange={handleLastNameChange} required data-testid="lastNameInput"></input>
                </div>
                
                <div className="d-flex flex-row justify-content-center mb-2">
                    <input className="normalInput rounded-pill" id="emailInput" type="email" name="email" placeholder="email"
                        value={email} onChange={handleEmailChange} required data-testid="emailInput"></input>
                </div>

                <div className="d-flex flex-row justify-content-center mb-2">
                    <input className="normalInput rounded-pill" id="usernameInput" type="text" name="username" placeholder="username"
                        value={username} onChange={handleUserNameChange} required data-testid="usernameInput"></input>
                </div>

                <div className="d-flex flex-row justify-content-center mb-3">
                    <input className="normalInput rounded-pill" id="passwordInput" type="password" name="password" placeholder="password" 
                        value={password} onChange={handlePasswordChange} required data-testid="passwordInput"></input>     
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <input className={`signupSubmitInput rounded-pill ${theme}`} type="submit" name="submit"></input>
                </div>
            </form>
        </div>
    );
}