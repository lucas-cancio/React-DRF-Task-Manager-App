
import { createContext, useContext, useState, useRef, useEffect } from "react";

export const ThemeContext = createContext(null);
export const SetThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const themeRef = useRef('dark');
    const [, setDummyState] = useState(0); // Dummy state to force re-renders

    // Load theme from localStorage on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            themeRef.current = savedTheme;
            setDummyState(prev => prev + 1); // Force re-render
        }
    }, []);

    const setTheme = (newTheme) => {
        themeRef.current = newTheme;
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
        setDummyState(prev => prev + 1); // Force re-render
    };

    return (
        <ThemeContext.Provider value={themeRef.current}>
            <SetThemeContext.Provider value={setTheme}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    return useContext(ThemeContext);
};

export function useThemeSetter() {
    return useContext(SetThemeContext);
};