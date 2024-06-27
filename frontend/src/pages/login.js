import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { useEffect, useState } from "react";
import { useCSRFToken, useCSRFTokenSetter } from "../store/csrfContext";
import { GetCSRFToken } from "../services/getCSRFToken";

import { useAuthUserDispatch } from "../store/authUserContext";
import { requestLogin } from "../services/auth/login";
import { getJWToken } from "../services/auth/token";
import LoginForm from "../components/loginForm/loginForm";


const LoginPage = () => {

    return (
        <Layout>
            <div className="d-flex flex-row justify-content-center mt-5 pt-5">
                <div style={{width: "100%"}}>
                    <LoginForm></LoginForm>
                </div>
                {/* <div className="d-flex flex-column col-sm-8 col-md-6 col-lg-4 col-xl-4 align-items-center">
                </div> */}
            </div>
        </Layout>
    );
};

export default LoginPage;