
import Layout from "../components/layout/Layout";
import SignUpForm from "../components/signupForm/signupForm";

const SignUpPage = () => {

    return (
        <Layout>
            <div className="d-flex flex-row justify-content-center mt-5 pt-5">
                <div className="d-flex flex-column col-sm-8 col-md-6 col-lg-4 col-xl-4 align-items-center">
                    <div style={{width: 100 + "%"}}>
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignUpPage;