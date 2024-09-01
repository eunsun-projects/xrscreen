'use client'
import { React, useEffect, useRef, useState } from "react";
import VideoContext from "@/context/videoContext.js";
import AudioContext from "@/context/audioContext.js";
import MainUi from "../01/mainui";;
import { analytics } from "@/firebase/firebaseClient";
import { logEvent } from "firebase/analytics";

const screenName = 'screenvr'; // 현재 화면의 이름
const screenClass = 'Screenmp'; // 현재 화면을 나타내는 클래스 또는 컴포넌트의 이름

export default function Screenmp ({model}) {

    const videoRef = useRef();
    const audioRef = useRef();

    const [embed, setEmbed] = useState(false); // 400 이하 임베드
    const [embedMiddle, setEmbedMiddle] = useState(false); // 400 ~ 600 임베드


    useEffect(()=>{

        // 파이어베이스 아날리틱스 시작
        analytics
            .then((a)=>{
                // 그 후 Firebase Analytics에 로그를 보냅니다.
                logEvent(a, 'screen_view', {
                    firebase_screen: screenName,
                    firebase_screen_class: screenClass
                });
            })
            .catch(err => console.log(err))

    },[])

    useEffect(()=>{

        if(window.innerHeight < 400 && window.parent){
            setEmbed(true);
        } else if(window.innerHeight >= 400 && window.innerHeight <= 600){
            setEmbedMiddle(true);
        }

    },[])
    
    return(
        <>
            <VideoContext.Provider value={videoRef}>
            <AudioContext.Provider value={audioRef}>
                {Object.keys(model).length >0 && ( <MainUi mpModels={model} embed={embed} embedMiddle={embedMiddle}></MainUi> )} 
            </AudioContext.Provider>
            </VideoContext.Provider>
        </>
    )
}
