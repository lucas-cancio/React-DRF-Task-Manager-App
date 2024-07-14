import { AuthUserProvider, useAuthUser, useAuthUserDispatch, authUserReducer } from "../authUserContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import api from "../../services/axios";

const TestAuthUserSubscriber = () => {
    const authUser = useAuthUser();
    const dispatch = useAuthUserDispatch();

    return (
        <div>
            <p data-testid="authUserFirstName">{authUser ? authUser.firstName : null}</p>
            <button onClick={() => dispatch({
                type: 'login',
                id: 5,
                firstName: 'Joe',
            })}>
                Login Button
            </button>
        </div>
    );
}

jest.mock('../../service/axios');

describe("Auth User Store", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Correctly renders AuthUserProvider and interacts with context", () => {

        api.get.mockResolvedValueOnce({});

        render(
            <AuthUserProvider>
                <TestAuthUserSubscriber />
            </AuthUserProvider>
        );

        let userFirstName = screen.getByTestId("authUserFirstName");
        expect(userFirstName).toHaveTextContent("");

        fireEvent.click(screen.getByRole("button", { name: "Login Button"}));

        expect(userFirstName).toHaveTextContent("Joe");
    });

    it("Correctly fetches and sets user info on mount", async () => {
        api.get.mockResolvedValueOnce({
            status: 200,
            data: {
                user: {
                    id: 4,
                    username: "JohnDoe",
                    firstName: "John",
                    lastName: "Doe",
                    email: "johndoe@example.com"
                },
            },
        });

        const { rerender } = render(
            <AuthUserProvider>
                <TestAuthUserSubscriber />
            </AuthUserProvider>
        );

        expect(api.get).toHaveBeenLastCalledWith("/api/getSession/", {
            headers: { 
                'Require-Auth': true,
            },
            withCredentials: true,
        });

        await waitFor(() => {
            let userFirstName = screen.getByTestId("authUserFirstName");
            expect(userFirstName).toHaveTextContent("John");
        });
    });

    // Test AuthUserReducer action handling
    it("Correctly handles login action", () => {

        const initialState = {
            id: 0,
            firstName: "",
        };

        const action = {
            type: "login",
            id: 5,
            firstName: 'Joe',
        };

        const newState = authUserReducer(initialState, action);
        expect(newState.firstName).toEqual("Joe");
    });

    it("Correctly handles getSession action", () => {

        const initialState = {
            id: 0,
            firstName: "",
        };

        const action = {
            type: "getSession",
            id: 5,
            firstName: 'Joe',
        };

        const newState = authUserReducer(initialState, action);
        expect(newState.firstName).toEqual("Joe");
    });
});