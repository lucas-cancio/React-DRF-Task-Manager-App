import { render, fireEvent, screen } from "@testing-library/react";
import DummyComponent from "./dummy";

describe("Dummy Component", () => {
    it("Renders off-value when button is initially OFF", () => {
        render(<DummyComponent onValue="I am on" offValue="I am off" initialValue={false} />);
        const btn = screen.getByRole("button");

        expect(btn.className).toContain('off');
        expect(btn.textContent).toEqual("I am off");
    });

    it("Renders on-value when button is initially ON", () => {
        render(<DummyComponent onValue={"I am on"} offValue={"I am off"} initialValue={true} />);
        const btn = screen.getByRole("button");

        expect(btn.className).toContain('on');
        expect(btn.textContent).toEqual("I am on");
    });

    it("Toggles to ON when initially off and button is clicked", () => {
        render(<DummyComponent onValue="I am on" offValue="I am off" initialValue={false} />);
        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(btn.className).toContain("on");
        expect(btn.textContent).toEqual("I am on");
    });
    
    it("Toggles to OFF when initially ON and button is clicked", () => {
        render(<DummyComponent onValue="I am on" offValue="I am off" initialValue={true} />);
        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(btn.className).toContain("off");
        expect(btn.textContent).toEqual("I am off");
    });
});