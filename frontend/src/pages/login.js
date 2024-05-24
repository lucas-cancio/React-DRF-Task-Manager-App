import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import { useEffect, useState } from "react";
import { useCSRFToken, useCSRFTokenSetter } from "../store/csrfContext";
import { GetCSRFToken } from "../services/getCSRFToken";

import { useAuthUserDispatch } from "../store/authUserContext";
import { requestLogin } from "../services/auth/login";

 import { getJWToken } from "../services/auth/token";

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

    useEffect(() => {
        GetCSRFToken({
            csrfToken: csrfToken,
            csrfTokenSetter, csrfTokenSetter
        });
    }, []);


    return (
        <Layout>
            <h1 className="mt-5 pt-5">Login Page</h1>
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