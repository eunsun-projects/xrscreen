import { useEffect, useRef } from 'react'

function useTimeout(callback, delay) {
    const savedCallback = useRef(callback)

    // callback이 변경될 시, 가장 최신의 것을 기억합니다.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // 타이머 설정
    useEffect(() => {
        // 지연시간이 구체적이지 않다면, 스케쥴링을 하지 않습니다.
        if (delay === null) {
        return
        }

        const id = setTimeout(() => savedCallback.current(), delay)

        return () => clearTimeout(id)
    }, [delay])
}
export default useTimeout;