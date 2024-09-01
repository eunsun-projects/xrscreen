"use client"
import { useState, useContext, React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBgmsList } from "@/store/store.js";
import dayjs from 'dayjs';
import VolumeNob from "./volumeNob.js";
import AudioContext from '@/context/audioContext';
import styles from '@/app/[slug]/styles.module.css';

function AudioComp({isSelect, mpModels}){

    const bgmsList = useSelector((state)=>state.bgmsList.value);
    const audioRef = useContext(AudioContext); 
    const dispatch = useDispatch();

    const [play, setPlay] = useState(false);
    const [load, setLoad] = useState(false);
    const [src, setSrc] = useState({});
    const [full, setFull] = useState(0);
    const [current, setCurrent] = useState(0);
    const [nowM, setNowM] = useState(0);
    const [maxM, setMaxM] = useState(0);
    const [listOpen, setListOpen] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [nob, setNob] = useState(false);
    const [mute, setMute] = useState(false);
    const [fullyLoad, setFullyLoad] = useState(false);

    const volume_mute = "volume_mute"
    const volume_off = "volume_off"

    const handleLoad = () => {
        setLoad(true);
        if(play) audioRef.current.play();
    };

    const handlePlay = () => {
        audioRef.current.play(); // ???
        setPlay(true);
    };

    const handlePause = () =>{
        audioRef.current.pause(); //?
        setPlay(false);
    };

    const handleEnded = () => {
        const result = bgmsList.filter((e, i)=>{
            if(Number(audioRef.current.dataset.num) === bgmsList.length -1){
                return setPlay(false);
            }else{
                return i === Number(audioRef.current.dataset.num) + 1
            }   
        });
        result.length > 0 && setSrc(...result);
    };

    const handleListOpen = () => {
        setListOpen(!listOpen);
    };

    const handleDuration = () => {
        let max = dayjs(audioRef.current.duration * 1000).format("mm:ss");
        setMaxM(max);
        setFull(audioRef.current.duration);
    };

    const handleCurrent = () => {
        let now = dayjs(audioRef.current.currentTime * 1000).format("mm:ss");
        setNowM(now);
        setCurrent(audioRef.current.currentTime);
    };

    const handleFullyloaded = () => {
        audioRef.current.play();
        setPlay(true);
        setFullyLoad(true);
    };

    const handleListClick = (item) => () => {
        setSrc(item);
        setPlay(true);
        const audioPromise = audioRef.current.play(); 
        if (audioPromise !== undefined) {
            audioPromise
                .then(() => {
                    audioRef.current.play();
                })
                .catch((err)=>{
                    console.log(err);
                    audioRef.current.play();
                })
        }
    };

    const handleBefore = () => {
        const result = bgmsList.filter((e, i)=>{
            if(Number(audioRef.current.dataset.num) === 0){
                return;
            }else{
                return i === Number(audioRef.current.dataset.num) -1
            }   
        });
        result.length > 0 && setSrc(...result);
        setPlay(true);
    };

    const handleNext = () => {
        const result = bgmsList.filter((e, i)=>{
            if(Number(audioRef.current.dataset.num) === bgmsList.length -1){
                return;
            }else{
                return i === Number(audioRef.current.dataset.num) + 1
            }   
        });
        result.length > 0 && setSrc(...result);
        setPlay(true);
    };

    const handleRewind = () => {
        audioRef.current.load();
        audioRef.current.play();
        setPlay(true);
    };

    const handleProgress = (e) => {
        const width = e.currentTarget.clientWidth; // 전체 넓이
        const offsetX = e.nativeEvent.offsetX; // 현재 x 좌표;
        const duration = audioRef.current.duration; // 재생길이
        audioRef.current.currentTime = (offsetX / width) * duration;
    };

    const handleNob = (e) => {
        if(window.innerWidth < 768){
            if(e.type === "click"){
                audioRef.current.muted = !mute;
                setMute(!mute)
            }
        }else{
            if(e.type === "mouseenter"){
                setNob(true);
            }else if(e.type === "mouseleave"){
                setNob(false);
            }
            if(e.type === "click"){
                setNob(!nob);
            }
        }
    };

    const handleNob2 = (e) => {
        if(window.innerWidth < 768){
            if(e.type === "click"){
                audioRef.current.muted = !mute;
                setMute(!mute)
            }
        }
    }

    useEffect(()=>{
        if(audioRef.current.src !== src){
            setLoad(true);
        }else{
            setLoad(false);
        }
    },[src, audioRef]);

    useEffect(()=>{
        audioRef.current.volume = volume;
    },[volume, audioRef])

    useEffect(()=>{

        console.log(mpModels)

        let origin = [...mpModels.bgmsUrl];
            origin.sort();

        let cdOrigin;
        if(mpModels.cdUrl.length > 0){
            cdOrigin = [...mpModels.cdUrl];
            cdOrigin.sort();
        }else{
            cdOrigin = ['/assets/ui/logo192cd.png'];
        };

        let songNameOrigin = [...mpModels.songNames];
            songNameOrigin.sort();

        const result = origin.map((e,i)=>{

            const str = songNameOrigin[i];
            const name = str.replace(/^.{3}|.{4}$/g, '');

            let tt = {
                num : i,
                name : name,
                url : origin[i],
                cdUrl : cdOrigin[0] === '/assets/ui/logo192cd.png' ? cdOrigin[0] : cdOrigin[i]
            }
            return tt;
        })
    
        dispatch(setBgmsList(result)) // bgms.js 파일 여부랑 관계없이 음악이랑 음악 커버 순서만 맞춰서 업로드하면 자동 적용됨

        setSrc(result[0]);
    },[]);

    return(                
            <div className={`${styles.music_container} ${play && "play"}`} style={{ display: isSelect ? "block" : "none" }}>

                {src && (
                    <audio 
                        id="audio" 
                        preload="auto"
                        autoPlay
                        muted
                        data-name={src.name}
                        data-num={src.num}
                        ref={audioRef} 
                        src={src.url}
                        onLoadedData={handleLoad}
                        onCanPlayThrough={handleFullyloaded}
                        onDurationChange={handleDuration}
                        onTimeUpdate={handleCurrent}
                        onPause={handlePause}
                        onPlay={handlePlay}
                        onEnded={handleEnded}
                    >
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                )}
    
                <div className={styles.img_container}>
                    {load ? <img src={src.cdUrl} style={{ animation : play ? "rotate 3s infinite linear" : "none", animationPlayState : play ? "running" : "none"}} alt="cover" id="cover"></img> : <img src="/assets/ui/logo192cd.png" style={{ animation : play ? "rotate 3s infinite linear" : "none", animationPlayState : play ? "running" : "none"}} alt="cover" id="cover"></img> }
                </div> 

                <div className={styles.nav_wrapper}>
                    <div className={styles.nav_upper_container}>
                        <div style={{ width : "100%", display: "flex"}}>
                            <div className={styles.progress_container} id="progress-container">
                                <progress id="progress" className={styles.progress} value={current} max={full} onClick={handleProgress}></progress>
                            </div>
                            <div style={{width : "20%"}}></div>
                        </div>
                        <div className={styles.navigation_upper}>
                            <span className="material-symbols-rounded" style={{ pointerEvents : load ? "auto" : "none" }} onClick={handleBefore}>fast_rewind</span>
                            { play === false ? 
                                <span className="material-symbols-rounded play-btn" style={{ pointerEvents : load ? "auto" : "none" }} onClick={handlePlay}>play_arrow</span> : 
                                <span className="material-symbols-rounded pause-btn" style={{ pointerEvents : load ? "auto" : "none" }} onClick={handlePause}>pause</span>
                            }
                            <span className="material-symbols-rounded" style={{ pointerEvents : load ? "auto" : "none" }} onClick={handleNext} >fast_forward</span>
                            <span className="material-symbols-rounded replay-btn" style={{ pointerEvents : load ? "auto" : "none" }} onClick={handleRewind}>replay</span>

                            <div className={styles.volume_btn} onMouseEnter={handleNob} onMouseLeave={handleNob} >
                                {volume > 0 && mute === false ? <span className="material-symbols-rounded volume" onClick={handleNob} >volume_up</span> : <span style={{ left : mute ? "0px" : "-7px"}} className="material-symbols-rounded" onClick={handleNob2}>{mute ? volume_off : volume_mute}</span>}
                                {nob && (<VolumeNob volume={volume} setVolume={setVolume} />)}
                            </div>
                        </div>
                    </div>

                    <div className={styles.nav_lower_container}> 
                        <span className={styles.music_title}>{src.name}</span>
                        <span className={styles.music_time}>{nowM} / {maxM}</span>
                        <span className="material-symbols-rounded list" onClick={handleListOpen}>list</span>
                    </div>
                </div>

                {listOpen && (
                    <div className={styles.music_info}>
                        {bgmsList.length > 0 && bgmsList.map((item,index) => (
                            <div key={item.name+index}><p style={{ color : src.num === index ? "#2e2d2b" : "#fff", pointerEvents : load ? "auto" : "none" }} onClick={handleListClick(item)}>{item.name}</p></div>
                        ))}
                    </div>
                )}
            </div>
            
    )
}
export default AudioComp;