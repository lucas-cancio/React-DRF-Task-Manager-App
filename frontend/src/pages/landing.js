import { Link } from "react-router-dom";

import { useAuthUser } from "../store/authUserContext";
import Layout from "../components/layout/Layout";

const LandingPage = () => {
    
    const user = useAuthUser();
    let isLoggedIn = user == null ? false : true;

    return (
        <Layout>
            <h1>Landing Page</h1>

            { isLoggedIn ? (
                <p>Go to your <Link to="/dashboard/">Dashboard</Link> to view your tasks!</p>
            ) : (
                <p>Login <Link to="/login/">HERE</Link> to create and view your tasks!</p>
            )}
        </Layout>
    )
}

export default LandingPage;