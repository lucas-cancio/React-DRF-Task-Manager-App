import { Routes, Route } from 'react-router-dom';

import { CSRFTokenProvider } from './store/csrfContext';
import { AuthUserProvider } from './store/authUserContext';
import { TasksProvider } from './store/tasksContext';


import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/notFound';
import LandingPage from './pages/landing';
import SignUpPage from './pages/signup';
import { ThemeProvider } from './store/themeContext';
function App() {

    return (
        <ThemeProvider>
            <AuthUserProvider>
                <CSRFTokenProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/signup/" element={<SignUpPage />} />
                        <Route path="/dashboard/" element={
                            <TasksProvider>
                                <DashboardPage />
                            </TasksProvider> 
                        } />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </CSRFTokenProvider>
            </AuthUserProvider>
        </ThemeProvider>
    );
}

export default App;
