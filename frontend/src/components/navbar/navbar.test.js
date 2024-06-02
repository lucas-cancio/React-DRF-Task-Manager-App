import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "./navbar";
import { BrowserRouter } from "react-router-dom";
import { SetThemeContext, ThemeContext } from "../../store/themeContext";
import { AuthUserContext, AuthUserDispatchContext } from "../../store/authUserContext";
import { SetCSRFTokenContext } from "../../store/csrfContext";
import LogOut from "../../services/auth/logout";


// Mock the LogOut services
jest.mock("../../services/auth/logout");

// Mock the useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// do 

describe("Navbar", () => {

    const renderNavBar = ({ theme = 'light', user = null, setTheme=jest.fn() } = {}) => {
        const authUserDispatch = jest.fn();
        const csrfTokenSetter = jest.fn();

        return render(
            <BrowserRouter>
                <ThemeContext.Provider value={theme}>
                    <SetThemeContext.Provider value={setTheme}>
                        <AuthUserContext.Provider value={user}>
                            <AuthUserDispatchContext.Provider value={authUserDispatch}>
                                <SetCSRFTokenContext.Provider value={csrfTokenSetter}>
                                    <NavBar />
                                </SetCSRFTokenContext.Provider>
                            </AuthUserDispatchContext.Provider>
                        </AuthUserContext.Provider>
                    </SetThemeContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        );
    };

    
    it("Toggles theme from light to dark when the theme-toggle button is clicked.", () => {
        const setTheme = jest.fn();
        
        renderNavBar({theme: 'light', setTheme});

        let themeToggleBtn = screen.getByTestId("themeToggleBtn");
        fireEvent.click(themeToggleBtn);

        expect(setTheme).toHaveBeenCalledWith('dark');
    });

    it ("Toggles theme from dark to light when the theme-toggle button is clicked.", () => {
        const setTheme = jest.fn();

        renderNavBar({theme: 'dark', setTheme});

        let themeToggleBtn = screen.getByTestId("themeToggleBtn");
        fireEvent.click(themeToggleBtn);
    
        expect(setTheme).toHaveBeenCalledWith('light');
    });
    
    it("Renders correctly with theme set to light.", () => {
       renderNavBar({theme: 'light'});

       const navBtns = screen.getAllByRole("button");
       navBtns.forEach((el) => {
        expect(el).toHaveClass('light');
        expect(el).not.toHaveClass('dark');
       });

       const navLinks = screen.getAllByRole("link");
       navLinks.forEach((el) => {
           expect(el.className).toContain('light');
           expect(el.className).not.toContain('dark');
       });
    });
    
    it("Renders correctly with theme set to dark.", () => {
        renderNavBar({theme: 'dark'});

        const navBtns = screen.getAllByRole("button");
        navBtns.forEach((el) => {
            expect(el.className).toContain('dark');
            expect(el.className).not.toContain('light');
        });

        const navLinks = screen.getAllByRole("link");
        navLinks.forEach((el) => {
            expect(el.className).toContain('dark');
            expect(el.className).not.toContain('light');
        });
    });
    
    it("Renders the Log Out button if the user is logged in.", () => {
        renderNavBar({user: {name: "Test User" } });
        expect(screen.getByRole('button', {name: "Log Out" })).toBeInTheDocument();
    });
    
    it("Renders the Log In and Sign Up buttons if the user is not logged in.", () => {
        renderNavBar({user: null});
        const loginLink = screen.getByRole("link", {name: "Log In"});
        expect(loginLink).toBeInTheDocument();
        const signUpLink = screen.getByRole("link", {name: "Sign Up"});
        expect(signUpLink).toBeInTheDocument();
    });
    
    it("Calls the logout function and navigates to landing page when logout button is clicked.", () => {
        renderNavBar({user:{ name: "Test User"}});
        
        const logoutBtn = screen.getByRole('button', {name: "Log Out" });
        fireEvent.click(logoutBtn);
        
        expect(LogOut).toHaveBeenCalledWith({
            authUserDispatch: expect.any(Function),
            csrfTokenSetter: expect.any(Function),
        });
        
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});