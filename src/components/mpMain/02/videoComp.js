"use client"
import { useEffect, memo, useState, useContext, React } from "react";
import VideoContext from "@/context/videoContext";

const VideoComp = memo(function VideoComp({mpModels}){

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [src, setSrc] = useState('');

    const videoRef = useContext(VideoContext);

    const toSrc = mpModels.vidsUrl[0]; // 만약 비디오가 여러개여야 한다면, prop 으로 정해서 받아야 할 듯
    
    useEffect(()=>{
        // if(mpModels.video[1] === "low3_final.mp4"){
        //     console.log('조각모음 비디오 맞냐??????')
        //     setWidth('720');
        //     setHeight('1280');
        // }else{
            setWidth('320');
            setHeight('240');
        // }
        setSrc(toSrc);
    },[toSrc])

    return(
        <>
            <video
                id="myVideo"
                value="off"
                ref={videoRef}
                playsInline
                loop
                muted
                autoPlay
                width={width}
                height={height}
                src={src}
                typeof="video/mp4"
                crossOrigin="anonymous"
            ></video>
        </>
    )
})
export default VideoComp;