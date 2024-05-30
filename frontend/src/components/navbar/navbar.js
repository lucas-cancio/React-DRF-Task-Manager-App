import "./navbar.css"

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTheme, useThemeSetter } from "../../store/themeContext";

import { useAuthUser, useAuthUserDispatch } from "../../store/authUserContext"
import { useCSRFTokenSetter } from "../../store/csrfContext";
import LogOut from "../../services/auth/logout";

export default function NavBar() {

    const navigate = useNavigate();

    const user = useAuthUser();
    const authUserDispatch = useAuthUserDispatch();
    const csrfTokenSetter = useCSRFTokenSetter();

    const theme = useTheme();
    const setTheme = useThemeSetter();

    let isLoggedIn = user == null ? false : true;

    const handleLogout = (e) => {
        e.preventDefault();

        LogOut({
            authUserDispatch: authUserDispatch,
            csrfTokenSetter: csrfTokenSetter,
        });
        navigate("/");
    }

    const toggleTheme = (e) => {
        e.preventDefault();

        if (theme == 'light'){
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    
    return (
        <nav className={`custom-navbar ${theme}`}>
            <div className="container-fluid p-2">
                <div className="d-flex flex-row justify-content-end px-3">
                    <button className={`flex-column navbar-button ${theme} py-1 px-2 mx-1`} onClick={toggleTheme}>
                        {theme == 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                            <   path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                            </svg>
                        )}
                    </button>
                    <Link className={`flex-column navbar-link ${theme} px-0 mx-1`} to="/">
                        <p className={`navbar-link-text ${theme}`}>
                            About
                        </p>
                    </Link>
                    {isLoggedIn ? (
                        <button className={`flex-column navbar-button ${theme} p-0 mx-1`} onClick={handleLogout}>
                            <p className={`navbar-link-text ${theme}`}>
                                Log Out
                            </p>
                        </button>
                    ) : (
                        <>
                            <Link className={`flex-column navbar-link ${theme} p-0 mx-1`} to="/login/">
                                <p className={`navbar-link-text ${theme}`}>
                                    Log In
                                </p>
                            </Link>
                            <Link className={`flex-column navbar-link ${theme} p-0 mx-1`} to="/signup/">
                                <p className={`navbar-link-text ${theme}`}>
                                    Sign Up
                                </p>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}