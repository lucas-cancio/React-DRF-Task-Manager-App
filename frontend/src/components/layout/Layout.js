import { useTheme } from "../../store/themeContext";
import NavBar from "../navbar/navbar";
import "./layout.css"

export default function Layout({children}) {

    const theme = useTheme();

    return (
        <>
            <NavBar></NavBar>
            <div className={`layout-root ${theme}`}>
                {children}
            </div>
        </>
    );
}