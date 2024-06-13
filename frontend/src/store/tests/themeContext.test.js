import { ThemeProvider, useTheme, useThemeSetter } from "../themeContext";
import { screen, render, fireEvent } from "@testing-library/react";

const TestThemeUser = () => {
    const theme = useTheme();
    const themeSetter = useThemeSetter();

    const toggleTheme = () => {
        if (theme === 'light') {
            themeSetter('dark');
        } else {
            themeSetter('light');
        };
    };

    return (
        <div className={`${theme}`} data-testid="themeUser">
            <button onClick={toggleTheme}>Toggle Theme</button>
            <h1> Test Theme User </h1>
        </div>
    );
};

describe("Theme Store", () => {

    beforeEach(() => {
        localStorage.removeItem('theme');
    });

    it("Provides theme value and setter to child component", () => {
        render(
            <ThemeProvider>
                <TestThemeUser />
            </ThemeProvider>
        );

        const themeUser = screen.getByTestId("themeUser");
        expect(themeUser).toHaveClass('dark');

        fireEvent.click(screen.getByRole("button", { name: "Toggle Theme" }));

        expect(themeUser).toHaveClass('light');
    });

    it("Stores the theme value in local storage", () => {
        const { rerender } = render(
            <ThemeProvider>
                <TestThemeUser />
            </ThemeProvider>
        );

        // check that theme is not yet saved
        let savedTheme = localStorage.getItem('theme');
        expect(savedTheme).toBeNull();

        // toggle theme so that updated value is stored
        fireEvent.click(screen.getByRole("button", { name: "Toggle Theme" }));
        
        // get theme value from storage
        savedTheme = localStorage.getItem('theme');

        // check that the value is not null ('light')
        expect(savedTheme).not.toBeNull();
        expect(savedTheme).toEqual('light');
    });
});