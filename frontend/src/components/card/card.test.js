import { screen, render, fireEvent } from "@testing-library/react";

import { ThemeContext } from "../../store/themeContext";
import Card from "./card";



describe("Card", () => {
    const renderCard = ({theme = 'light'}) => {
        return render(
            <ThemeContext.Provider value={theme}>
                <Card />;
            </ThemeContext.Provider>
        );
    };


    it("Displays correctly when in theme is in light mode", () => {
        renderCard({theme: "light"});
        const cardDiv = screen.getByTestId("CardBody");
        expect(cardDiv).toHaveClass("light");
    });
    
    it("Displays correctly when in theme is in dark mode", () => {
        renderCard({theme: "dark"});
        const cardDiv = screen.getByTestId("CardBody");
        expect(cardDiv).toHaveClass("dark");
    })
});