import { CSRFTokenProvider, useCSRFToken, useCSRFTokenSetter } from "../csrfContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const CSRFTokenUser = () => {
    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    return (
        <div>
            <p>{csrfToken}</p>
            <button onClick={() => csrfTokenSetter("1234")}>Set Token</button>
        </div>
    );
}

describe("CSRF Token Store", () => {

    it("Correctly renders and interacts with CSRF Token context", async () => {
        render(
            <CSRFTokenProvider>
                <CSRFTokenUser />
            </CSRFTokenProvider>
        );

        expect(screen.queryByText("1234")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Set Token" }));

        await waitFor(() => {
            expect(screen.getByText("1234")).toBeInTheDocument();
        });
    });
});