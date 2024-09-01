"use client"
import { useEffect, useRef, useState, useContext, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '@/app/[slug]/styles.module.css';
import showcaseLoader from "@/utils/connect";
import NewTagSubscribi from "@/utils/old/newtagsubscribe.js";
import ifCustomData from "@/utils/old/ifcustomdata.js";
import newSettedArr from "@/utils/old/newsettedarr.js";
import newUniqueArr from "@/utils/old/newuniquearr.js";
import sorting from "@/utils/old/sorting.js";
import observer from "@/utils/observer.js";
import customImporter from "@/utils/customimporter.js";
import VideoComp from "../02/videoComp";
import VideoContext from "@/context/videoContext";
import AudioContext from "@/context/audioContext";
import DropdownTagList from "../02/dropdownTagList";

function MainUiReload({mpModels, embed}){

    const loadCheck = useSelector((state)=>state.load.value);
    const isPopup = useSelector((state)=>state.isPopup.value);
    const isInfoPopup = useSelector((state)=>state.isInfoPopup.value);

    const dispatch = useDispatch();
    
    const selIframe = useRef();
    const container = useRef();
    const videoRef = useContext(VideoContext); 
    const audioRef = useContext(AudioContext); 

    const [ zIndex, setZindex ] = useState(-1); // 로딩되면 zindex 1로
    const [ opacityL, setOpacityL ] = useState(1); // 로딩 오퍼시티 
    const [ isLoading, setIsLoading ] = useState(true); // 아이프레임 온로드 체크 // 초기값 false 로 하고? 이펙트에서 [] 이미지받으면 true로?? 아니면 app.js에서 내려줘?
    const [ forBindArr, setBindArr ] = useState([]); // mpSdk 를 포함한 모든 태그 생성용 어레이 스테이트
    const [ fullyReady, setFullyReady ] = useState(false); // bindarr 다 받아오면
    const [ iframeLoaded, setIframeLoaded ] = useState(false); // iframe 로드 완료 - video init 등에만 쓰임
    const [ isVideo, setIsVideo ] = useState(false); // 공간 삽입 비디오 여부, 온로드에서 체크
    const [ params, setParams ] = useState('');
    const [ modelInfo, setModelInfo ] = useState(null); // 모델 정보 스테이트

    const handleLoad = async () => {
        
        let bindArr = [];

        /** ====== if embeded > hide title & btnSize up ====== */  
        if( embed === false ) { // 

            const [ tagData , tagAttachData, sdk ] = await NewTagSubscribi(selIframe.current, process.env.REACT_APP_MPSDKKEY, dispatch); // mpSdk 태그 정보 가져오기, 앱 페이즈 체크
            
            const [ customTagData, customTagAttachData, videoXyz, controlXyz ] = await customImporter(sdk, mpModels, tagData, tagAttachData, dispatch); // 모델삽입있을 경우에만 작동하는 커스텀 임포터 

            const reducedTagData = await ifCustomData(customTagData); // 커스텀 태그가 있으면 합치기
        
            const settedArr = await newSettedArr(reducedTagData); // 메뉴 카테고리 폴더 생성을 위한 추출 

            const uniqueArr = await newUniqueArr(settedArr); // 추출된 카테고리 set

            const [ finalArr, notSortedArr, forFinal ] = await sorting(reducedTagData, uniqueArr, settedArr); // 태그데이타 소팅하고 최종 카테고리 어레이, 카테고리 없는 어레이 리턴
            
            bindArr.push(finalArr, notSortedArr, uniqueArr, customTagAttachData, forFinal, sdk, videoXyz, controlXyz);

            setBindArr(bindArr);
            setOpacityL(0);
            setIsLoading(false);
        }

        if(mpModels.video[0]) {
            setIsVideo(true);
        }
        setIframeLoaded(true);

        await showcaseLoader(selIframe.current, process.env.REACT_APP_MPSDKKEY, dispatch, bindArr, videoRef, isPopup);
        setZindex(1);
    };

    useEffect(() => {
        /** ============ set screensize =============== */
        function setScreenSize() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        /** ============ EventListener-IOSsounduUnlocker =============== */ 
        function unLocker(){
            if (document.activeElement === selIframe.current) {
                console.log('%c Yes! The click happened inside the iframe!', 'background: #333333; color: #8dceff');
                if(mpModels.video[0]) { 
                    videoRef.current.muted = false;
                    videoRef.current.pause(); 
                }
                if(mpModels.isBgm[0]) { audioRef.current.muted = false }
                window.focus();
                // remove this event listener since it's no longer needed
                window.removeEventListener('blur', unLocker);
            };
        };
        /** ====== Generate a resize event if the device doesn't do it ====== */  
        window.addEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
        window.addEventListener('resize', setScreenSize);
        window.dispatchEvent(new Event("resize"))
        window.addEventListener('blur', unLocker)

        return () => {
            window.removeEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
            window.removeEventListener('resize', setScreenSize);
            window.removeEventListener('blur', unLocker);
        };
    }, []);

    useEffect(()=>{
        /** ======= set default video ======== */
        function videoInit(){
            videoRef.current.value = 'off';
            videoRef.current.load();
            videoRef.current.pause();
        };
        if(isVideo && iframeLoaded){
            videoInit();
        }

    },[videoRef, isVideo, iframeLoaded]);

    useEffect(()=>{
        const changeBottomLogo = () => {
            const innerIframe = selIframe.current.contentWindow.document;
            let seleclink = innerIframe.querySelectorAll(".link");
            let aTag = "<a class='termchange' href='https://screenxyz.net' target='_blank'><img src='/assets/ui/footer_logo_screen.svg' alt='screenlogo' width=65px height=16px></a>";
            seleclink[1].insertAdjacentHTML('afterend', aTag);
            seleclink[1].remove();
            /** ======== if kakaotalk > remove share & fullscreen button ========== */
            let shareBttn = innerIframe.querySelectorAll('.mp-nova-btn-icon');
            if (navigator.userAgent.indexOf('KAKAO') >= 0){ 
                shareBttn[2].remove();
                shareBttn[3].remove();
            }
        };

        if(loadCheck && isLoading === false){
            changeBottomLogo();
        }  
    },[loadCheck, isLoading])

    useEffect(()=>{
        const modelSid = mpModels.sid;
        const toParams = `m=${modelSid}&newtags=1&lang=en&play=1&title=0&brand=0&qs=1&help=0&applicationKey=${process.env.NEXT_PUBLIC_MPSDKKEY}`;
        setParams(toParams);
    },[mpModels])

    useEffect(() => {
        if(isLoading === false && forBindArr.length > 0){
            const mpSdk = forBindArr[5];
             /** ======== get mp model info ======== */
            const getModelInfo = async () => {
                const info = await mpSdk.Model.getDetails((modelDetails)=>{return modelDetails}); // mpSdk 조작 여기서
                // console.log(info)
                setModelInfo(info);
            };
            getModelInfo();
            setFullyReady(true);
            observer(selIframe.current, modelInfo); 
        }
    }, [isLoading, forBindArr, modelInfo]);

    return(
        <>
            { isVideo && ( <VideoComp mpModels={mpModels} bindArr={forBindArr}/> )}
            { isLoading && (
                <div className={styles.loading_page} style={{ backgroundColor : "#e5e5e5" }}>
                            {embed === false && (
                                <>
                                    <div className="lds-ellipsis" style={{ opacity : opacityL }}>
                                        <div></div><div></div><div></div><div></div>
                                    </div>
                                </>
                            )}
                </div>
            )}
            
            {fullyReady && (<DropdownTagList iframe={selIframe.current} bindArr={forBindArr} mpModels={mpModels} modelInfo={modelInfo}></DropdownTagList>)}
            <div ref={container} className={styles.container_showcase}>
                {params.length > 0 && (
                    <iframe 
                        title="mpIframe"
                        id="myIframe" 
                        ref={selIframe} 
                        className={styles.showcaseTop}
                        width="100%" 
                        height="100%" 
                        allowFullScreen
                        src={process.env.NEXT_PUBLIC_BUNDLEADDRESS + params}
                        style={{ zIndex : zIndex, filter : (isInfoPopup||isPopup) ? "blur(1px)" : "none" }}
                        onLoad={handleLoad}>
                    </iframe>
                )}   
            </div>
        </>
    )
}

export default MainUiReload;