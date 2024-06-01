import { useState } from "react";
import "./dummy.css";


export default function DummyComponent({onValue, offValue, initialValue=false}) {
    const [isOn, setIsOn] = useState(initialValue);

    const toggleButton = (event) => {
        event.preventDefault();
        setIsOn(!isOn);
    };

    return (
        <button className={`dummyButton ${isOn ? "on" : "off"}`} type="button" onClick={toggleButton}>
            {isOn ? onValue : offValue}
        </button>
    );
};