import { useEffect, useState } from "react";
import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { GetCSRFToken } from "../../services/getCSRFToken";
import { Link, useNavigate } from "react-router-dom";

import { useAuthUserDispatch } from "../../store/authUserContext";
import { requestLogin } from "../../services/auth/login";
import { getJWToken } from "../../services/auth/token";

import Card from "../card/card";
import "./loginForm.css";
import { useTheme } from "../../store/themeContext";

export default function LoginForm() {

    const theme = useTheme();

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();
    const authUserDispatch = useAuthUserDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        GetCSRFToken({
            csrfToken: csrfToken,
            csrfTokenSetter: csrfTokenSetter
        });
    }, []);


    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        requestLogin({
            username: username,
            password: password,
            csrfToken: csrfToken,
            authUserDispatch: authUserDispatch,
        })
        .then((data) => {
            console.log("Login successful.");

            authUserDispatch({
                type: 'login',
                id: data.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            });

            getJWToken({
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
                console.log("Forcing user logout");
            });
        })
        .catch((error) => {
            console.error("Login failed: ", error);
        });
    }

    return (
        <div className={`loginFormContainer ${theme} my-5`}>
            <div className="d-flex flex-row justify-content-center flex-wrap">
                <div className={`d-flex flex-column loginFormLeftContainer col-8 col-md-4 ${theme}`}>
                    <div className="p-5">
                        <h4 className="py-3">Sign In</h4>
                        <form onSubmit={handleLogin}>
                            <div className="d-flex flex-row justify-content-center mb-3">
                                <div className="d-flex flex-column col-12 align-items-start">
                                    <label className="mb-2" htmlFor="usernameInput"><strong>Username</strong></label>
                                    <input className="normalLoginInput rounded-pill" id="usernameInput" type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center mb-4">
                                <div className="d-flex flex-column col-12 align-items-start">
                                    <label className="mb-2" htmlFor="passwordInput"><strong>Password</strong></label>
                                    <input className="normalLoginInput rounded-pill" id="passwordInput" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center mb-3">
                                <input className={`loginSubmitInput rounded-pill ${theme}`} type="submit" name="submit" value="Log In"></input>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={`d-flex flex-column loginFormRightContainer col-8 col-md-4 ${theme} justify-content-center align-items-center`}>
                    <h3 className="mt-5"> <strong>Welcome to Login</strong></h3>
                    <p>Don't have an account?</p>
                    <Link className={`signupLink rounded-pill ${theme} mb-5`} to="/signup/">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}