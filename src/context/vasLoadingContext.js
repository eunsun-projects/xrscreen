import { createContext, useState, useMemo } from "react";

export const VasLoadingContext = createContext();

export default function LoadingProvider({ children }) {
    
    const [counter, setCounter] = useState(0);
    const actions = useMemo(
        () => ({
        increase() {
            setCounter((prev) => prev + 1);
        },
        decrease() {
            setCounter((prev) => prev - 1);
        }
        }),
        []
    );

    const value = useMemo(() => [counter, actions], [counter, actions]);

    return (
            <VasLoadingContext.Provider value={value}>
                {children}
            </VasLoadingContext.Provider>
        );
}