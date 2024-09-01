import { createContext, useState, useMemo } from "react";

export const VasInformContext = createContext();

export default function InformProvider({ children }) {
    // 초기 상태를 null이나 적절한 초기값으로 설정할 수 있습니다.
    const [isInfo, setTrueFalse] = useState({ bool: false, info: null });

    const boolActions = useMemo(
        () => ({
            setTrue(info) {
                setTrueFalse((prev) => ({
                    ...prev,
                    bool: true,
                    info: info // `info` 매개변수를 사용하여 상태를 업데이트합니다.
                }));
            },
            setFalse(info) { // `setFalse` 함수에도 `info` 매개변수를 추가해야 합니다.
                setTrueFalse((prev) => ({
                    ...prev,
                    bool: false,
                    info: info // 이전 상태에서 `info`를 업데이트합니다.
                }));
            }
        }),
        []
    );

    const value = useMemo(() => [isInfo, boolActions], [isInfo, boolActions]);

    return (
        <VasInformContext.Provider value={value}>
            {children}
        </VasInformContext.Provider>
    );
}