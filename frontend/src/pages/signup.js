import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUp from "../services/auth/signup";
import { useCSRFToken, useCSRFTokenSetter } from "../store/csrfContext";
import { GetCSRFToken } from "../services/getCSRFToken";

import Layout from "../components/layout/Layout";

const SignUpPage = () => {

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
        <Layout>
            <h1>Create Your Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstNameInput">First Name</label>
                    <input id="firstNameInput" type="text" name="firstName" placeholder="first name" 
                        value={firstName} onChange={handleFirstNameChange} required></input>
                </div>
                <div>
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input id="lastNameInput" type="text" name="lastName" placeholder="last name" 
                        value={lastName} onChange={handleLastNameChange} required></input>
                </div>
                <div>
                    <label htmlFor="emailInput">Email</label>
                    <input id="emailInput" type="email" name="email" placeholder="email"
                        value={email} onChange={handleEmailChange} required></input>
                </div>
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input id="usernameInput" type="text" name="username" placeholder="username"
                        value={username} onChange={handleUserNameChange} required></input>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" name="password" placeholder="password" 
                        value={password} onChange={handlePasswordChange} required></input>
                </div>
                <div>
                    <input type="submit" name="submit"></input>
                </div>
                
            </form>
        </Layout>
    )
}

export default SignUpPage;