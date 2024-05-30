import { useEffect, useState } from "react";
import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { GetCSRFToken } from "../../services/getCSRFToken";
import { Link, useNavigate } from "react-router-dom";

import { useAuthUserDispatch } from "../../store/authUserContext";
import { requestLogin } from "../../services/auth/login";
import { getJWToken } from "../../services/auth/token";

import Card from "../card/card";
import "./loginForm.css";

export default function LoginForm() {

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();
    const authUserDispatch = useAuthUserDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        GetCSRFToken({
            csrfToken: csrfToken,
            csrfTokenSetter, csrfTokenSetter
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
        <Card>
            <div className="p-3">
                <form onSubmit={handleLogin}>
                    <div className="d-flex flex-row justify-content-center mb-1">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label className="mx-2" htmlFor="usernameInput">Username</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="usernameInput" type="text" name="username" placeholder="username" value={username} onChange={handleUsernameChange}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center mb-2">
                        <div className="d-flex flex-column col-sm-6 col-md-4 align-items-center">
                            <label className="mx-2" htmlFor="passwordInput">Password</label>
                        </div>
                        <div className="d-flex flex-column col-sm-6 align-items-center">
                            <input id="passwordInput" type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center mb-1">
                        <input type="submit" name="submit"></input>
                    </div>
                </form>
                <div className="d-flex flex-row justify-content-center">
                    <p>Don't have an account? <Link to="/signup/">Register Here</Link></p>
                </div>
            </div>
        </Card>
    );
}