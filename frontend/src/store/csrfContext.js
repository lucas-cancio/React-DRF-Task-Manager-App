
import { createContext, useContext,  useState, useEffect } from "react";

const CSRFTokenContext = createContext(null);

const SetCSRFTokenContext = createContext(null);

export function CSRFTokenProvider({children}) {
    const [csrfToken, setCSRFToken] = useState(null);

    return (
        <CSRFTokenContext.Provider value={csrfToken}>
            <SetCSRFTokenContext.Provider value={setCSRFToken}>
                {children}
            </SetCSRFTokenContext.Provider>
        </CSRFTokenContext.Provider>
    )
};

export function useCSRFToken() {
    return useContext(CSRFTokenContext);
};

export function useCSRFTokenSetter() {
    return useContext(SetCSRFTokenContext);
};