import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import { useEffect, useState } from "react";
import { useCSRFToken, useCSRFTokenSetter } from "../store/csrfContext";
import { GetCSRFToken } from "../services/getCSRFToken";

import { useAuthUserDispatch } from "../store/authUserContext";
import RequestLogin from "../services/auth/login";

import tokenAPI from "../services/auth/token";

const LoginPage = () => {

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();
    const authUserDispatch = useAuthUserDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        RequestLogin({
            username: username,
            password: password,
            csrfToken: csrfToken,
            authUserDispatch: authUserDispatch,
        })
        .then((data) => {
            console.log("Login successful.");
            navigate("/dashboard");
        })
        .catch((error) => {
            console.error("Login failed: ", error);
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
            <h1>Login Page</h1>
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="usernameInput">Username</label>
                        <input id="usernameInput" type="text" name="username" placeholder="username" value={username} onChange={handleUsernameChange}></input>
                    </div>
                    <div>
                        <label htmlFor="passwordInput">Password</label>
                        <input id="passwordInput" type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                    </div>
                    <div>
                        <input type="submit" name="submit"></input>
                    </div>
                </form>
                <p>Don't have an account? <Link to="/signup/">Register Here</Link></p>
            </div>
        </Layout>
    )
}

export default LoginPage;