import LogOut from "../../auth/logout";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import api from "../../axios";

describe("Loging Out of Authenticated User", () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Correctly handles a successful API call response.", async () => {

        let mockAPIGET = jest
            .spyOn(api, 'get')
            .mockImplementation(() => {
                return Promise.resolve("Successfully logged out");
            });

        const logoutResponse = await LogOut();

        expect(logoutResponse).toBe("Successfully logged out");
        expect(mockAPIGET).toHaveBeenLastCalledWith("/api/logout/",
            {
                headers: {
                    "Require-Auth": false,
                },
                withCredentials: true,
        });
        
    });

    it("Correctly handles an unsuccessful API call response.", async () => {
        
        let mockAPIGET = jest
            .spyOn(api, 'get')
            .mockImplementation(() => {
                return Promise.reject("Failed to log out");
            });

        await expect(LogOut()).rejects.toEqual("Failed to log out");
    });
});