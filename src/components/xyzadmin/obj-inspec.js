"use client"
import { React, useEffect, memo } from "react";
import useScript from "@/components/mpMain/03/usescript"

//j4RZx7ZGM6T
const ObjInspector = memo(function ObjInspector(){

    const jsSrc = '/assets/ui/main.bundle.js';
    const [loading, error] = useScript(jsSrc, 'afterbegin');
    const [loading2, error2] = useScript(jsSrc, 'beforeend');

    useEffect(()=>{
        let script = document.querySelector(`script[src="${jsSrc}"]`);
        script && script.remove();
            return() => {
                let script = document.querySelector(`script[src="${jsSrc}"]`);
                script && script.remove();
            }
    },[])

    return(
        <>  
            {loading}
            {error && <div>에러!</div>}
            <div id="content"></div>
            {loading2}
            {error2 && <div>에러!</div>}
        </>    
    )
});

export default ObjInspector;