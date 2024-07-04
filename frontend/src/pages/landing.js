import { Link } from "react-router-dom";

import { useAuthUser } from "../store/authUserContext";
import Layout from "../components/layout/Layout";
import "./styles/landing.css";
import { useTheme } from "../store/themeContext";

const LandingPage = () => {
    
    const theme = useTheme();

    const user = useAuthUser();
    let isLoggedIn = user == null ? false : true;
    const mytext = 
    `Whether you're managing a team or planning your personal goals, 
TaskMaster is here to help you stay on track and get things done.`;
    return (
        <Layout>
            <div className="container-fluid pt-1 mt-5">
                <div className="d-flex flex-row justify-content-center" >
                    <div className="d-flex flex-column justify-content-start align-items-center">
                        <div className="d-flex flex-row justify-content-center align-items-center p-3 py-5 mt-5 flex-wrap">
                            <div className="d-flex flex-column justify-content-start align-items-center col-sm-9 col-md-8 col-lg-6 pb-3">
                                <div className="d-flex flex-row">
                                    <h1 className="m-1">*DELETEME*Welcome to <strong className={`coloredText ${theme}`}>TaskMaster</strong></h1>
                                </div>
                                <div className="d-flex flex-row my-2">
                                    <h5 className="m-1 text-wrap">Stay Organized, Stay Productive</h5>
                                </div>
                                <div className="d-flex flex-row justify-content-center">
                                    <div className="d-flex flex-column justify-content-start align-items-center col-10 col-md-9">
                                        <p className="m-1 text-wrap text-center" style={{ whiteSpace: 'pre' }}>
                                            {mytext}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center mx-2 col-sm-10 col-md-4 col-lg-4 m-3 mt-5">
                                <div className={`d-flex flex-row sampleImageBackground ${theme} justify-content-center align-items-center`}>
                                    <img className="sampleImage" src={`${process.env.PUBLIC_URL}/assets/images/SampleImg2.png`} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-center align-items-center p-3 py-4 mt-4">
                            <div className="d-flex flex-column justify-content-start align-items-center col-12 col-md-10">
                                <div className="d-flex flex-row justify-content-center">
                                    <h2 className="mb-4">Key Features</h2>
                                </div>
                                <div className="d-flex flex-row justify-content-center flex-wrap">
                                    <div className="d-flex flex-column col-9 col-md-6 col-lg-6 col-xl-3 text-wrap py-1">
                                        <div className="px-2">
                                            <div className="pb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-bar-graph" viewBox="0 0 16 16" style={{width: '32px', height: '32px'}}>
                                                        <path className={`icon ${theme}`} style={{width: '64px', height: '64px'}} d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
                                                        <path className={`icon ${theme}`} style={{width: '64px', height: '64px'}} d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                                    </svg>
                                            </div>
                                            <strong>Effortless Task Management</strong>
                                            <p>Easily create, organize, and prioritize your tasks. Set deadlines and reminders to never miss a beat.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column col-9 col-md-6 col-lg-6 col-xl-3 text-wrap py-1">
                                        <div className="px-2">
                                            <div className="pb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16" style={{width: '32px', height: '32px'}}>
                                                    <path className={`icon ${theme}`} style={{width: '64px', height: '64px'}} fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                                </svg>
                                            </div>
                                            <strong>Customizable Workflows</strong>
                                            <p>Tailor your task management system to fit your unique workflow. Create custom tags, categories, and filters.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column col-9 col-md-6 col-lg-6 col-xl-3 text-wrap py-1">
                                        <div className="px-2">
                                            <div className="pb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16" style={{width: '32px', height: '32px'}}>
                                                    <path className={`icon ${theme}`} style={{width: '64px', height: '64px'}} fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                                                </svg>
                                            </div>
                                            <strong>Seamless Integration</strong>
                                            <p>Sync with your favorite apps like Google Calendar, Slack, and more to streamline your workflow.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column col-9 col-md-6 col-lg-6 col-xl-3 text-wrap py-1">
                                        <div className="px-2">
                                            <div className="pb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16" style={{width: '32px', height: '32px'}}>
                                                    <path className={`icon ${theme}`} fill-rule="evenodd"  style={{width: '64px', height: '64px'}} d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                                                </svg>
                                            </div>
                                            <strong>Insightful Analytics</strong>
                                            <p>Get detailed reports and insights on your productivity trends. Understand where your time goes and optimize your efforts.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-center align-items-center p-3 py-4 mt-4" style={{width: 100 + '%'}}>
                            <div className="d-flex flex-column justify-content-start align-items-center col-8 col-lg-10">
                                <h2 className="mb-3">How It Works</h2>   
                                <ol>
                                    <li className="px-2 text-wrap">
                                        <strong>Create Your Account</strong>
                                        <p>Sign up in seconds with your email or social media accounts.</p>
                                    </li>
                                    <li className="px-2">
                                        <strong>Start Adding Tasks</strong>
                                        <p>Quickly add tasks with our intuitive interface. Group them into projects or categories for easy access.</p>
                                    </li>
                                    <li className="px-2">
                                        <strong>Collaborate and Share</strong>
                                        <p>Invite team members to your projects. Assign tasks, share files, and communicate directly within the app.</p>
                                    </li>
                                    <li className="px-2">
                                        <strong>Track Your Progress</strong>
                                        <p>Use our powerful analytics and reporting tools to monitor your progress and stay on top of your goals.</p>
                                    </li>
                                </ol> 
                            </div>    
                        </div>

                        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center p-3 py-4 mt-4" style={{width: 100 + '%'}}>
                            <div className="d-flex flex-column justify-content-center align-items-center mx-4">
                                <div className={`d-flex flex-row sampleImageBackground ${theme} justify-content-center align-items-center`}>
                                    <img className="sampleImage" src={`${process.env.PUBLIC_URL}/assets/images/SampleImg.png`} alt="" />
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start mx-3">
                                <div className="d-flex flex-row align-self-center mb-3">
                                    <h2>Why Choose TaskMaster</h2>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column">
                                        <strong className={`coloredText ${theme}`}>User Friendly Design</strong>
                                        <p>
                                            Our clean and intuitive interface makes task management a breeze.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column">
                                        <strong className={`coloredText ${theme}`}>Reliable and Secure</strong>
                                        <p>
                                            Your data is protected with industry-leading security measures.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column">
                                        <strong className={`coloredText ${theme}`}>24/7 Support</strong>
                                        <p>
                                            Our support team is always here to help, whenever you need it.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column">
                                        <strong className={`coloredText ${theme}`}>Affordable Plans</strong>
                                        <p>
                                            Flexible pricing to suit your needs, whether you're an individual or a large team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-flex flex-row justify-content-center align-items-center">
                            <h1>Landing Page</h1>

                            { isLoggedIn ? (
                                <p>Go to your <Link to="/dashboard/">Dashboard</Link> to view your tasks!</p>
                            ) : (
                                <p>Login <Link to="/login/">HERE</Link> to create and view your tasks!</p>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default LandingPage;