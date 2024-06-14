
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AuthUserDispatchContext } from "../../store/authUserContext";
import { CSRFTokenContext, SetCSRFTokenContext } from "../../store/csrfContext";
import { ThemeContext } from "../../store/themeContext";

import LoginForm from "./loginForm";
import { requestLogin } from "../../services/auth/login";
import { getJWToken } from "../../services/auth/token";
import { GetCSRFToken } from "../../services/getCSRFToken";


// Mock the Login Request Service
jest.mock("../../services/auth/login", () => ({
    requestLogin: jest.fn(),
}));

// Mock the GetJWToken service 
jest.mock("../../services/auth/token", () => ({
    getJWToken: jest.fn(),
}));

// Mock GetCSRFToken Service
jest.mock("../../services/getCSRFToken");

// Mock the useNavigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe("Login form", () => {

    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderLoginForm = ({user = null, csrfTokenSetter = null, authUserDispatch = null} = {}) => {
        if (authUserDispatch == null) authUserDispatch = jest.fn();
        if (csrfTokenSetter == null) csrfTokenSetter = jest.fn();
        
        return render(
            <BrowserRouter>
                <ThemeContext.Provider value={'light'}>
                    <AuthUserDispatchContext.Provider value={authUserDispatch}>
                        <CSRFTokenContext.Provider value={null}>
                            <SetCSRFTokenContext.Provider value={csrfTokenSetter}>
                                <LoginForm />
                            </SetCSRFTokenContext.Provider>
                        </CSRFTokenContext.Provider>
                    </AuthUserDispatchContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        );
    };


    it("Attempts to retrieve CSRF Token upon initial render", () => {
        renderLoginForm();
        expect(GetCSRFToken).toHaveBeenCalled();
    });

    it("Calls handleLogin, requestLogin service, getJWToken service, and react-router navigate function when all are successful after form is submited", async () => {
        const mockCredentials = { username: 'testuser', password: 'password'};

        requestLogin.mockImplementation(() => Promise.resolve({
            id: 1,
            username: "john",
            firstName: "johnny",
            lastName: "doe",
            email: "johndoe@example.com",
        }));
        getJWToken.mockImplementation(() => Promise.resolve());
        
        renderLoginForm();

        const usernameInput = screen.getByLabelText("Username");
        const passowrdInput = screen.getByLabelText("Password");
        const loginFormSubmitBtn = screen.getByRole("button", { name: "Submit"});

        // Fill in the form
        fireEvent.change(usernameInput, { target: { value: mockCredentials.username} });
        fireEvent.change(passowrdInput, { target: { value: mockCredentials.password } });

        // Click the submit button
        fireEvent.click(loginFormSubmitBtn);

        await waitFor(() => {
            expect(requestLogin).toHaveBeenCalledWith({
                username: mockCredentials.username,
                password: mockCredentials.password,
                csrfToken: null,
                authUserDispatch: expect.any(Function),
            });
        });

        await waitFor(() => {
            expect(getJWToken).toHaveBeenCalledWith({
                username: mockCredentials.username,
                password: mockCredentials.password,
            });
        });

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("Doesn't call getJWToken service and react-router navigate function after requestLogin service fails after the form is submited", async () => {
        const mockCredentials = { username: 'testuser', password: 'password'};

        // Mock requestLogin to return a rejected Promise
        requestLogin.mockImplementation(() => Promise.reject(new Error("Login Failed.")));

        // Mock getJWToken to return a resolved Promise (shouldn't be called)
        getJWToken.mockImplementation(() => Promise.resolve()); 

        renderLoginForm();

        const usernameInput = screen.getByLabelText("Username");
        const passowrdInput = screen.getByLabelText("Password");
        const loginFormSubmitBtn = screen.getByRole("button", { name: "Submit"});

        // Fill in the form
        fireEvent.change(usernameInput, { target: { value: mockCredentials.username} });
        fireEvent.change(passowrdInput, { target: { value: mockCredentials.password } });

        // Click the submit button
        fireEvent.click(loginFormSubmitBtn);

        await waitFor(() => {
            expect(requestLogin).toHaveBeenCalledWith({
                username: mockCredentials.username,
                password: mockCredentials.password,
                csrfToken: null,
                authUserDispatch: expect.any(Function),
            });
        });

        await waitFor(() => {
            expect(getJWToken).not.toHaveBeenCalled();
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("Doesn't call react-router navigate function after requestLogin and getJWToken services respectively succeed and fail after the form is submited", async () => {
        const mockCredentials = { username: 'testuser', password: 'password'};

        // Mock requestLogin to return a successful Promise
        requestLogin.mockImplementation(() => Promise.resolve({
            id: 1,
            username: "john",
            firstName: "johnny",
            lastName: "doe",
            email: "johndoe@example.com",
        }));

        // Mock getJWToken to return a resolved Promise (shouldn't be called)
        getJWToken.mockImplementation(() => Promise.reject(new Error("Failed to Get JWToken."))); 

        renderLoginForm();

        const usernameInput = screen.getByLabelText("Username");
        const passowrdInput = screen.getByLabelText("Password");
        const loginFormSubmitBtn = screen.getByRole("button", { name: "Submit"});

        // Fill in the form
        fireEvent.change(usernameInput, { target: { value: mockCredentials.username} });
        fireEvent.change(passowrdInput, { target: { value: mockCredentials.password } });

        // Click the submit button
        fireEvent.click(loginFormSubmitBtn);

        await waitFor(() => {
            expect(requestLogin).toHaveBeenCalledWith({
                username: mockCredentials.username,
                password: mockCredentials.password,
                csrfToken: null,
                authUserDispatch: expect.any(Function),
            });
        });

        await waitFor(() => {
            expect(getJWToken).toHaveBeenCalledWith({
                username: mockCredentials.username,
                password: mockCredentials.password,
            });
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});