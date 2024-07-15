import SignUpForm from "./signupForm";
import { SignUp } from "../../services/auth/signup";
import { useNavigate } from "react-router-dom";
import { CSRFTokenContext, SetCSRFTokenContext } from "../../store/csrfContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "../../store/themeContext";

// Mock the Signup API service call
jest.mock("../../services/auth/signup", () => ({
    SignUp: jest.fn(),
}));

// Mock the useNavigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe("Signup Form Component", () => {

    const mockSignUp = SignUp; 
    const mockCSRFTokenSetter = jest.fn();
    
    const renderSignupForm = () => {
        return render(
            <BrowserRouter>
                <ThemeContext.Provider value={'light'}>
                    <CSRFTokenContext.Provider value={null}>
                        <SetCSRFTokenContext.Provider value={mockCSRFTokenSetter}>
                            <SignUpForm />
                        </SetCSRFTokenContext.Provider>
                    </CSRFTokenContext.Provider>
                </ThemeContext.Provider>
            </BrowserRouter>
        );
    };

    it("Correctly renders sign up form", () => {
        renderSignupForm();

        expect(screen.getByTestId("firstNameInput")).toBeInTheDocument();
        expect(screen.getByTestId("lastNameInput")).toBeInTheDocument();
        expect(screen.getByTestId("emailInput")).toBeInTheDocument();
        expect(screen.getByTestId("usernameInput")).toBeInTheDocument();
        expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    });

    it("Correctly changes inputs on user input and handles form submit", async () => {
        
        SignUp.mockImplementation(() => Promise.resolve());
        
        renderSignupForm();

        const firstNameInput = screen.getByTestId("firstNameInput");
        const lastNameInput = screen.getByTestId("lastNameInput");
        const emailInput = screen.getByTestId("emailInput");
        const usernameInput = screen.getByTestId("usernameInput");
        const passwordInput = screen.getByTestId("passwordInput");

        const fakeChanges = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            username: "john_doe",
            password: "12345",
        };

        // Test changing first name input
        fireEvent.change(firstNameInput, { target: { value: fakeChanges.firstName } });
        await waitFor(() => {
            expect(firstNameInput).toHaveValue(fakeChanges.firstName);
        });

        // Test changing last name input
        fireEvent.change(lastNameInput, { target: { value: fakeChanges.lastName } });
        await waitFor(() => {
            expect(lastNameInput).toHaveValue(fakeChanges.lastName);
        });

        // Test changing email name input
        fireEvent.change(emailInput, { target: { value: fakeChanges.email } });
        await waitFor(() => {
            expect(emailInput).toHaveValue(fakeChanges.email);
        });

        // Test changing username input
        fireEvent.change(usernameInput, { target: { value: fakeChanges.username } });
        await waitFor(() => {
            expect(usernameInput).toHaveValue(fakeChanges.username);
        });

        // Test changing password input
        fireEvent.change(passwordInput, { target: { value: fakeChanges.password } });
        await waitFor(() => {
            expect(passwordInput).toHaveValue(fakeChanges.password);
        });

        const submitBtn = screen.getByRole("button", {name: "Submit"});

        fireEvent.click(submitBtn);
        
        await waitFor(() => {
            expect(SignUp).toHaveBeenLastCalledWith({
                ...fakeChanges,
                csrfToken: null
            });
        });

        expect(mockNavigate).toHaveBeenCalledWith("/login/");
    });
});