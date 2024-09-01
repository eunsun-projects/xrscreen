"use client"
import { useEffect, useRef, useState, useContext, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '@/app/[slug]/styles.module.css';
import showcaseLoader from "@/utils/connect";
import VideoComp from "../02/videoComp";
import VideoContext from "@/context/videoContext";
import AudioContext from "@/context/audioContext";
import DropdownTagList from "../02/dropdownTagList";
import HelpLoader from "@/components/loaders/helploader"
import { setTagSid, setIspopup, changeLoadState } from '../../../store/store';

const mouseHelpText = '마우스 휠을 통해 줌 인 줌 아웃이 가능합니다.\n마우스 드래그를 통해 공간을 둘러볼 수 있습니다.'
const keyboardHelpText = '키보드 방향키를 통해 위치를 이동할 수 있습니다.'

function MainUi({mpModels, embed, embedMiddle}){ 

    const loadCheck = useSelector((state)=>state.load.value);
    const isPopup = useSelector((state)=>state.isPopup.value);
    const isInfoPopup = useSelector((state)=>state.isInfoPopup.value);

    const dispatch = useDispatch();
    
    const selIframe = useRef();
    const playBtn = useRef();
    const timerRef = useRef(null);
    const videoRef = useContext(VideoContext); 
    const audioRef = useContext(AudioContext); 

    const [ zIndex, setZindex ] = useState(-1); // 로딩되면 zindex 1로
    const [ startClassName, setClassName ] = useState(styles.start_button_box); // 스타트시 로고 노출
    const [ pointerEv, setPointerEv ] = useState("none"); // 기본 포인터 동작 none으로 시작(엔터 클릭 못하게)
    const [ opacity, setOpacity ] = useState(0); // 스타트버튼 오퍼시티
    const [ opacityL, setOpacityL ] = useState(1); // 로딩 오퍼시티
    const [ opacityT, setOpacityT ] = useState(1); // 타이틀 오퍼시티
    const [ isLoading, setIsLoading ] = useState(true); // 아이프레임 온로드 체크 // 초기값 false 로 하고? 이펙트에서 [] 이미지받으면 true로?? 아니면 app.js에서 내려줘?
    const [ bindArr, setBindArr ] = useState([]); // mpSdk 를 포함한 모든 태그 생성용 어레이 스테이트
    const [ fullyReady, setFullyReady ] = useState(false); // bindarr 다 받아오면
    const [ params, setParams ] = useState(''); // 처음 시작시 mpModels 가지고 iframe src 값 설정(꼭 필요함)
    const [ modelInfo, setModelInfo ] = useState(null); // 모델 정보 스테이트
    const [ mpsdk, setMpsdk ] = useState(null); // mpSdk
    // const [ iframeLoaded, setIframeLoaded ] = useState(false); // iframe 로드 완료

    /* ========= hide tag nav ========= */
    const hideTagNav = (mpSdk) => {
        mpSdk.Tag.toggleNavControls(false);
    };

    // 엔터버튼 누를때 실행
    const handleStart = async () => {
        // 임베드 되었으면 새창으로 띄우기!
        if(embed && window.parent) { 
            window.open(window.location.href);
        } else {
            setIsLoading(false);
            hideTagNav(mpsdk);

            // screenxyz로고 노출이면 0.8초간 노출, 아니면 바로실행
            if(mpModels.screenxyz){
                setClassName(styles.change); // 스타트 클릭시 스크린로고 노출
                timerRef.current = setTimeout(() => {
                    setOpacity(0);
                    setZindex(1);
                }, 800); // 0.8 sec
            }else{
                setOpacity(0);
                setZindex(1);
            }
        }       
    };

    // 아이프레임 로드 체커
    const handleLoad = () => {
        // setIframeLoaded(true);

        // mpsdk 가 있어야 기존태그 정보 등등 받아올 수 있음 === iframe 로드 후에 실행가능
        const setData = async (mpSdk) => {
            // const bindArr = [];
            /** ====== if embeded > hide title & btnSize up ====== */  
            if( embed === false ) { // 
                const bindArr = await showcaseLoader(mpSdk, mpModels, videoRef, isPopup, setIspopup, setTagSid, changeLoadState, dispatch);
                setBindArr(bindArr);
            }
        };

        /** ======= set default video behavior ======== */
        const videoInit = () => {
            videoRef.current.value = 'off';
            videoRef.current.load();
            videoRef.current.pause();
        };

        if(mpModels.video[0]) videoInit();

        const window = selIframe.current.contentWindow;
        window.MP_SDK.connect(window, process.env.NEXT_PUBLIC_MPSDKKEY)
            .then((sdk)=>{
                setMpsdk(sdk); // sdk 객체 setState
                setData(sdk); // sdk 객체 이용하여 setData
            });
    };

    // 기본 useEffect : css vh 값 변경 / 사운드,비디오 언락 / 임베드일 경우 실행동작 포함
    useEffect(() => {
        /** ====== if embeded(height : 400px) => hide title & btnSize up ====== */  
        if( embed && window.parent) { 
            // playBtn.current.style.width = '36vh';
            setOpacityT(0);
            setOpacityL(0);
            setOpacity(1);
            setPointerEv("all");
        } 

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
            if(timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
            window.removeEventListener('resize', setScreenSize);
            window.removeEventListener('blur', unLocker);
        };
    }, []);

    // 기본 아이프레임 src 설정용, 이상하게도 이거 없으면 제대로 아이프레임 로드가 안됨. 꼭 유지할 것
    useEffect(()=>{
        const modelSid = mpModels.sid;
        const toParams = `m=${modelSid}&newtags=1&lang=en&play=1&title=0&brand=0&qs=1&help=0&applicationKey=${process.env.NEXT_PUBLIC_MPSDKKEY}`;
        setParams(toParams);
    },[mpModels])

    // 하단 메타포트 로고 screenxyz로 변경 함수
    const changeBottomLogo = () => {
        const innerIframe = selIframe.current.contentWindow.document;
        const seleclink = innerIframe.querySelectorAll(".mp-nova-btn-label");
        const shareBttn = innerIframe.querySelector('.icon-share');
        const fullscreen = innerIframe.querySelector('.fullscreen-mode');
        const aTag = "<a class='termchange' style='display:flex; align-items:center; justify-content:center;' href='https://screenxyz.net' target='_blank'><img src='/assets/ui/footer_logo_screen.svg' alt='screenlogo' width=60px height=12px></a>";

        seleclink.forEach((e)=>{
            if(e.innerText === 'Terms'){
                e.insertAdjacentHTML('afterend', aTag);
                e.remove();
            }
        })
        /** ======== if kakaotalk > remove share & fullscreen button ========== */
        if (navigator.userAgent.indexOf('KAKAO') >= 0){ 
            if(shareBttn)shareBttn.remove();
            if(fullscreen)fullscreen.remove();
        }
    };

    // 태그 등등 로드 완료시 useEffect : 엔터버튼 누를수 있게 하고 하단로고 변경
    useEffect(()=>{
        // loadCheck 은 appStateChecker 에서 진행됨. 완료시 엔터버튼 클릭 가능하게끔!
        if(loadCheck){
            setOpacityL(0);
            setOpacity(1);
            setPointerEv("all");
            changeBottomLogo();
        }  
    },[loadCheck])

    /** ==== togle fullscreen function ==== */
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // isLoading false 면(로딩 완료되었으면) && mpsdk 가 있으면 => 공유버튼 제어
    useEffect(() => {
        if(isLoading === false && mpsdk){
            const uniqueUrl = `https://xr.screenxyz.net/${mpModels.unique}`;
            const innerIframe = selIframe.current.contentWindow.document;
            const fullsc = innerIframe.querySelector('.fullscreen-mode');
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            const widthCheck = window.innerWidth;

            const shareBtn = innerIframe.querySelector('.icon-share').parentElement;

            if(window.self !== window.top) shareBtn.style.display = 'none'; // 만약 iframe 임베드 상태면 숨겨라
            
            const fullscreenBtn = document.createElement('button');
                fullscreenBtn.setAttribute('class', 'material-symbols-outlined');
                fullscreenBtn.classList.add('customfull');
                fullscreenBtn.innerText = 'fullscreen';
                fullscreenBtn.style.zIndex = "9999";
                fullscreenBtn.style.pointerEvents ='auto';

            // 800 이상에 모바일 아니면
            if(fullsc !== null && fullsc !== undefined && !isMobile && widthCheck > 800){
                fullsc.insertAdjacentElement('afterend', fullscreenBtn);
                fullscreenBtn.addEventListener('click', toggleFullScreen);
            }

            mpsdk.Measurements.mode.subscribe(function (measurementModeState) {
                if(measurementModeState.active === true) {
                    if(fullscreenBtn){ fullscreenBtn.style.display = 'none' }
                } else if(measurementModeState.active === false) {
                    if(fullscreenBtn){
                        fullscreenBtn.style.display = 'block';
                        // let divider = innerIframe.querySelector('.divider');
                        // divider.parentNode.appendChild(fullscreenBtn);
                    }
                }
            });
            
            mpsdk.Model.getDetails() // mpSdk 조작 여기서 (modelDetails)=>{return modelDetails}
                .then((modelInfo)=> {
                    setModelInfo(modelInfo); // 드롭다운태그메뉴를 위한 modelInfo
                    setFullyReady(true); // fullyReady => 드롭다운태그메뉴 생성!

                    /** ====== share modal on > tag list off ======= */
                    const shareModalCon = innerIframe.querySelector('.modal-background');
                    const bottomControls = innerIframe.querySelector('.bottom-controls');

                    let config = {
                        attributes: true,	// observe target's attribute change
                    };
                    // let customDropdown = document.querySelector('.dropdown_custom')
                    const listToggle = function(mutationsList, observer) {
                        
                        for(let mutation of mutationsList) {
                            if (mutation.target.childElementCount === 1) {
                                /** ======== share modal change! =============== */
                                let modalBody = innerIframe.querySelector('dialog');
                                let input = innerIframe.querySelectorAll('input'); //mobile no input
                                let mobiModi = innerIframe.querySelector('.share-controls');

                                // console.log(input)
                                // console.log(mobiModi)
                                // console.log(window.navigator.canShare)

                                /** ======= using mutation observer > share modal change ======== */
                                if(modalBody && input.length>=1){
                                    input[0].remove();
                                    let inputGroup = innerIframe.querySelectorAll('.input-group');
                                    let newinput = document.createElement('input');
                                    newinput.setAttribute('class', 'input');
                                    newinput.setAttribute('type', 'text');
                                    newinput.setAttribute('value', uniqueUrl);
                                    
                                    inputGroup[0].insertAdjacentElement('afterbegin', newinput);
                                    let newinputSel = innerIframe.querySelector('.input');

                                    function copyTo(){
                                        window.navigator.clipboard.writeText(uniqueUrl);
                                    };

                                    let copybttn = innerIframe.querySelectorAll('button');

                                    copybttn[6].onclick = copyTo;

                                    let social = innerIframe.querySelector('.social-icons');
                                    if(social){social.remove();}
                                    let checkbox = innerIframe.querySelector('.checkbox-element');
                                    if(checkbox){checkbox.remove();}
                                    let modalbody = innerIframe.querySelector('.modal-body');

                                    function modalstylechange() {
                                        modalbody.style.paddingBottom = '5px';
                                        modalbody.style.height = '75px';
                                        modalbody.style.overflow = 'hidden';
                                    };
                                    if(modalbody){ modalstylechange()};

                                } else if (modalBody && mobiModi){            
                                    let modalbody = innerIframe.querySelector('.modal-body');
                                        function modalstylechange() {
                                        modalbody.style.paddingBottom = '5px';
                                        modalbody.style.height = '75px';
                                        modalbody.style.overflow = 'hidden';
                                        modalbody.style.textAlign = "center";
                                        };
                                    if(modalbody){ modalstylechange()};

                                    let mobiBttn = innerIframe.querySelectorAll('.share-modal-button');
                                    if(mobiBttn.length > 1){
                                        mobiBttn[0].remove();
                                        mobiBttn[1].remove();
                                    }
                                    
                                    let newtxxt = document.createElement('p');
                                    newtxxt.innerText = "Link Copied!" ;
                                    mobiModi.insertAdjacentElement('beforeend', newtxxt);

                                    /** ==== when mobile auto open share api ==== */
                                    if (window.navigator.canShare && mutation.target.className.includes('open')) {

                                        window.navigator.share({
                                            title: mpModels.title, //modelInfo.name,
                                            text: mpModels.description, //modelInfo.summary,
                                            url: uniqueUrl,
                                        })
                                        .then(() => {
                                            console.log('Thanks for sharing!');
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        });

                                    } else if(window.navigator.canShare === undefined || window.navigator.canShare === null){
                                        /** ==== when desktop write Url to clipbaord ==== */
                                        window.navigator.clipboard.writeText(uniqueUrl);
                                    }
                                };
                                let customDropdown = document.querySelector(`.${styles.dropdown_custom}`)
                                customDropdown.style.display = 'none';

                            } else {
                                let customDropdown = document.querySelector(`.${styles.dropdown_custom}`)
                                customDropdown.style.display = 'block';

                                if(fullsc !== null && fullsc !== undefined && !isMobile && widthCheck > 800){
                                    const divider = innerIframe.querySelector('.divider');
                                    divider.parentNode.appendChild(fullscreenBtn);
                                    fullscreenBtn.addEventListener('click', toggleFullScreen);
                                }
                            }
                        }
                    };

                    const bottomObserve = function()  {
                        changeBottomLogo();       
                    }

                    const observer = new MutationObserver(listToggle); // mutationObserver 로 공유버튼이 있을시 기기별 동작 제어
                    observer.observe(shareModalCon, config);

                    const observer2 = new MutationObserver(bottomObserve); // mutationObserver 로 하단 ui 변경시 체인지 로고
                    observer2.observe(bottomControls, config);
                })
                .catch(err => console.log(err));
        }
    }, [isLoading, mpsdk]);

    // style={{ backgroundImage: `url('${mpModels.backUrl}')` }} 메인 유아이 백그라운드 이미지 원래 이렇게 넣었음
    return(
        <>
            { mpModels.video[0] && ( <VideoComp mpModels={mpModels} bindArr={bindArr}/> )}
            { isLoading && ( 
                <div className={styles.loading_page} >
                    <div className={styles.tint}>
                        <div className={styles.basic_title} style={{ height : opacityT === 0 ? "30px" : "fit-content", fontSize : opacityT === 0 && "1rem" }} dangerouslySetInnerHTML={{__html : mpModels.title }}></div>
                        <div className={styles.start_button} >
                            
                            <div className={styles.helpbox} style={{height: embedMiddle && "70%"}}>
                                <div className={styles.helpboxflex} style={{display : embed && "none", height : embedMiddle && "50%"}}>
                                    <div style={{position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                                        <div className={styles.mousebox}>
                                            <div className={styles.mouse}></div>
                                        </div>
                                        <div className={styles.textone}>
                                            <div className={styles.helptextbox}>
                                                <p className={styles.helptext} style={{whiteSpace: "pre-line", position: "relative", width: "100%"}}>{mouseHelpText}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{position: "relative", width: "100%", height: "100%", flexDirection: "column", display: "flex"}}>
                                        <div className={styles.keyboardbox}>
                                            <div className={styles.keyboard}></div>
                                        </div>
                                        <div className={styles.texttwo}>
                                            <div className={styles.helptextbox}>
                                                <p className={styles.helptext} style={{whiteSpace: "pre-line", position: "relative", width: "100%"}}>{keyboardHelpText}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.helpbottom} style={{position:"relative", width: "100%", display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", boxSizing: "border-box"}}>
                                    <HelpLoader opacity={opacityL} embed={embed} embedMiddle={embedMiddle} />
                                    <div 
                                        className={startClassName} 
                                        ref={playBtn} 
                                        style={{ pointerEvents: pointerEv, opacity : opacity, top: embed && "2.5rem", fontSize: embedMiddle && "1.5rem", width: embedMiddle && "6rem", height: embedMiddle && "2.5rem", fontSize: embed && "1.2rem", width: embed && "5rem", height: embed && "2rem"}}
                                        onClick={handleStart}>
                                            <p style={{ display: startClassName === styles.change ? "none" : "block"}}>enter</p>
                                    </div>
                                </div>

                                { mpModels.downLogo[0] && !embed && ( <div className={styles.basic_logo} style={{ backgroundImage : `url('${mpModels.lowLogoUrl}')`, backgroundSize : 'contain', backgroundRepeat : "no-repeat", backgroundPosition :"center"}}></div> )}

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {fullyReady && mpsdk && (<DropdownTagList iframe={selIframe.current} bindArr={bindArr} mpModels={mpModels} modelInfo={modelInfo} mpSdk={mpsdk}></DropdownTagList>)}
            <div className={styles.container_showcase}>
                <iframe 
                    title="mpIframe"
                    id="myIframe" 
                    ref={selIframe} 
                    className={styles.showcaseTop}
                    width="100%" 
                    height="100%" 
                    allow="geolocation"
                    // sandbox="allow-scripts allow-same-origin"
                    allowFullScreen
                    src={process.env.NEXT_PUBLIC_BUNDLEADDRESS + params}
                    style={{ zIndex : zIndex, filter : (isInfoPopup||isPopup) ? "blur(1px)" : "none" }}
                    onLoad={handleLoad}>
                </iframe>
            </div>
        </>
    )
}

export default MainUi;

// import NewTagSubscribi from "@/utils/newtagsubscribe.js";
// import ifCustomData from "@/utils/ifcustomdata.js";
// import newSettedArr from "@/utils/newsettedarr.js";
// import newUniqueArr from "@/utils/newuniquearr.js";
// import sorting from "@/utils/sorting.js";
// import customImporter from "@/utils/customimporter.js";

 // console.log(mpModels)
// const [ arr1 , arr2 ] = await NewTagSubscribi(mpsdk); // mpSdk 태그 정보 가져오기, 앱 페이즈 체크
// const [ tagData, tagAttachData ] = await appStateCheck(mpsdk, arr1, arr2) // 앱 스테이트 (매터포트 로딩) 체크
// const [ customTagData, customTagAttachData, videoXyz, controlXyz ] = await customImporter(mpsdk, mpModels, tagData, tagAttachData); // 모델삽입있을 경우에만 작동하는 커스텀 임포터 
// const reducedTagData = await ifCustomData(customTagData); // 커스텀 태그가 있으면 합치기
// const settedArr = await newSettedArr(reducedTagData); // 메뉴 카테고리 폴더 생성을 위한 추출 
// const uniqueArr = await newUniqueArr(settedArr); // 추출된 카테고리 set
// const [ sumArr, notSortedArr, sortedArr ] = await sorting(reducedTagData, uniqueArr, settedArr); // 태그데이타 소팅하고 최종 카테고리 어레이, 카테고리 없는 어레이 리턴

// bindArr.push(sumArr, notSortedArr, uniqueArr, customTagAttachData, sortedArr, mpsdk, videoXyz, controlXyz);


// /** ======== watching tag state ======== */
// function newTagOn(mpSdk) { // 이 함수 자체를 드롭다운태그리스트로 옮겨도 ???
//     mpSdk.Tag.openTags.subscribe({
//         prevState: {
//             hovered: null,
//             docked: null,
//             selected: null,
//         },
//         onChanged(newState) {
//             const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
//             if (selected !== this.prevState.selected) {
//                 if (selected) {
//                     // if 밖에서 dispatch 하면, 근처 클릭으로도 스테이트 변경됨 주의
//                     dispatch(setTagSid(selected)); // 리덕스 스테이트로 처리 
//                     dispatch(setIspopup(!isPopup));
//                     dispatch(setTagSid(selected));
//                 }
//             }
//             this.prevState = {
//                 ...newState,
//                 selected,
//             };
//         },
//     })
// };

// async function appStateCheck(mpSdk, arr1, arr2){
//     mpSdk.App.state.subscribe(function (appState) {   
//         if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length >= 1){
//             dispatch(changeLoadState(true)); // 로드스테이트 true 
//             console.log('%c data receiving completed!', 'background: #333333; color: #8dceff');
//             if(arr2.length >= 1) {
//                 console.log('%c attachments receiving completed!', 'background: #333333; color: #8dceff');
//             }else{
//                 console.log('%c This model has no attachments!', 'background: #333333; color: #8dceff');
//             };
            
//         } else if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length === 0 && arr2.length === 0){
//             dispatch(changeLoadState(true));
//             console.log('%c there is no tag data', 'background: #333333; color: #8dceff');
            
//         };
//     });
//     return [arr1, arr2];
// };