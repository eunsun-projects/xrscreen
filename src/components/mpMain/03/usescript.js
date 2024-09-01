import { useEffect, useState } from "react";

function useScript(src, attach, isModule) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
        script = document.createElement("script");
        script.src = src;
        script.async = false;
    }

    if (isModule) {
        script.type = isModule;
    }

    const handleLoad = () => setLoading(false);
    const handleError = (error) => setError(error);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.body.insertAdjacentElement(attach, script);
    // document.body.appendChild(script);

    return () => {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
    };
    }, [src, attach, isModule]);

    return [loading, error];
}

export default useScript