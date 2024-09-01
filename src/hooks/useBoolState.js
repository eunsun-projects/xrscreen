import { useContext } from "react";
import { VasInformContext } from "@/context/vasInformContext";

export default function useBoolState() {
    const value = useContext(VasInformContext);
    if (value === undefined) {
        throw new Error('useInformState should be used within InformProvider');
    }
    return value;
}