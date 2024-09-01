import { useContext } from "react";
import { VasLoadingContext } from "@/context/vasLoadingContext";

export default function useLoadingCounter() {
    const value = useContext(VasLoadingContext);
    if (value === undefined) {
        throw new Error('useLoadingCounterState should be used within LoadingProvider');
    }
    return value;
}