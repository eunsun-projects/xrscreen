"use client"
import styles from "@/app/vas/[slug]/page.module.css"
import VasNavHelp from "./vasnavhelp"
import { useEffect, useState } from "react"
import LoadingProvider from "@/context/vasLoadingContext"
import InformProvider from "@/context/vasInformContext"

export default function VasBasic({title}){

    const [mobile, setMobile] = useState(null);

    function isMobile(){
        const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // const clientW = window.innerHeight < 1024;
        if(mobile) return true;
    };

    useEffect(()=>{

        const isMob = isMobile();
        if(isMob){
            setMobile(true);
        } else {
            setMobile(false);
        };

         /** ============ set screensize =============== */
        function setScreenSize() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        /** ====== Generate a resize event if the device doesn't do it ====== */  
        window.addEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
        window.addEventListener('resize', setScreenSize);
        window.dispatchEvent(new Event("resize"));

        return () => {
            window.removeEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
            window.removeEventListener('resize', setScreenSize);
        };
        
    },[])

    return(
        <>
            <LoadingProvider>
            <InformProvider>
                <div className={styles.xyznonelandscape}>
                    <h3>Looks good in portrait mode!</h3>
                </div>

                <div className={styles.vasgui}>

                    <VasNavHelp title={title} mobile={mobile}/>

                </div>
            </InformProvider>
            </LoadingProvider>
        </>
    )
}