import "./navbar.css"

import { Link, useNavigate } from "react-router-dom";

import { useAuthUser, useAuthUserDispatch } from "../../store/authUserContext"
import { useCSRFTokenSetter } from "../../store/csrfContext";
import LogOut from "../../services/auth/logout";

export default function NavBar() {

    const navigate = useNavigate();

    const user = useAuthUser();
    const authUserDispatch = useAuthUserDispatch();
    const csrfTokenSetter = useCSRFTokenSetter();

    let isLoggedIn = user == null ? false : true;

    const handleLogout = (e) => {
        e.preventDefault();

        LogOut({
            authUserDispatch: authUserDispatch,
            csrfTokenSetter: csrfTokenSetter,
        });
        navigate("/");
    }
    
    return (
        <nav className="custom-navbar">
            <div className="container-fluid p-2">
                <div className="d-flex flex-row justify-content-end px-3">
                    <Link className="flex-column navbar-link px-0 mx-1" to="/">
                        <p className="navbar-link-text">
                            About
                        </p>
                    </Link>
                    {
                        isLoggedIn ? (
                            <button className="flex-column navbar-button p-0 mx-1" onClick={handleLogout}>
                                <p className="navbar-link-text">
                                    Log Out
                                </p>
                            </button>
                        ) : (
                            <>
                                <Link className="flex-column navbar-link p-0 mx-1" to="/login/">
                                    <p className="navbar-link-text">
                                        Log In
                                    </p>
                                </Link>
                                <Link className="flex-column navbar-link p-0 mx-1" to="/signup/">
                                    <p className="navbar-link-text">
                                        Sign Up
                                    </p>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}