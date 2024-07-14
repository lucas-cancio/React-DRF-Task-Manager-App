import { waitFor } from "@testing-library/react";
import { requestLogin } from "../../auth/login";
import api from "../../axios";

const fakeLoginResponse = {
    status: 200,
    data: {
        id: 5,
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
    },
};

describe("Login API Service Call", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Correctly calls the login API with the correct credentials.", async () => {
        
        let mockAPIPost = jest
            .spyOn(api, 'post')
            .mockImplementation(() => {
                return Promise.resolve(fakeLoginResponse);
            });

        const loginResponse = await requestLogin({
            username: "username",
            password: "password",
            csrfToken: "dummyToken",
        });

        expect(mockAPIPost).toHaveBeenLastCalledWith("/api/login/", {
            username: "username",
            password: "password",
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": "dummyToken", 
                "Require-Auth": false,
            },
            withCredentials: true,
        });

        expect(loginResponse).toEqual(fakeLoginResponse.data);
    });
    
    it("Call the login API with incorrect credentials.", async () => {
        
        let mockAPIPost = jest
            .spyOn(api, 'post')
            .mockImplementation(() => {
                return Promise.reject("My error");
            });

        await expect(requestLogin({
                username: "username",
                password: "password",
                csrfToken: "dummyToken",
            })).rejects.toEqual('My error');
    });
});