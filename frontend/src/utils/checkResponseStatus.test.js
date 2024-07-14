import isResponseOK from "./checkResponseStatus";

let testResponse = {
    status: 200,
    statusText: "Success",
    data: {
        name: "dummy name",
    },
};

describe("Response Status-Code Check", () => {

    it("Returns the dummy data given an successful status code (200-299)", () => {
        expect(isResponseOK(testResponse)).toBe(testResponse.data);
        
        testResponse.status = 205;
        expect(isResponseOK(testResponse)).toBe(testResponse.data);

        testResponse.status = 299; 
        expect(isResponseOK(testResponse)).toBe(testResponse.data);
    });

    it("Throws an error given an unsuccessful status code of 404", () => {
        testResponse.status = 404;
        testResponse.statusText = "Not Found";
        expect(() => isResponseOK(testResponse)).toThrow(testResponse.statusText);
    });

    it("Throws an error given an unsuccessful status code of 500", () => {
        testResponse.status = 500;
        testResponse.statusText = "Internal Server Error";
        expect(() => isResponseOK(testResponse)).toThrow(testResponse.statusText);
    });
});