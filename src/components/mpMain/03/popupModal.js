"use client"
import { React, useRef, useState, useEffect, useCallback, Suspense } from 'react';
import useScript from './usescript.js'; 
import { useSelector, useDispatch } from "react-redux";
import { setIspopup, setTagSid, setIsLightBox } from "@/store/store.js";
import Lightbox from "@/components/mpMain/04/lightbox.js";
import styles from '@/app/[slug]/styles.module.css';

export default function PopupModal({iframe, bindArr, mpSdk}){

    const tagSid = useSelector((state)=>state.tagSid.value);
    const isPopup = useSelector((state)=>state.isPopup.value);
    const isLightBox = useSelector((state)=>state.isLightBox.value);
    const dispatch = useDispatch();

    const finalArr = bindArr[0]; 
    const attachData = bindArr[3];

    const mvSrc = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js";
    const [ loading, error ] = useScript(mvSrc, 'afterbegin', 'module');

    const modelRef = useRef();
    const popupRef = useRef();
    const popupVidRef = useRef(); // 첨부 비디오의 ref 

    const [annots, setAnnots] = useState([]);
    const [tag, setTag] = useState({}); // 선택된 태그 
    const [attach, setAttach] = useState([]); // 선택된 태그 어태치
    const [youtube, setYoutube] = useState(''); // youtube 주소 처리
    const [vimeo, setVimeo] = useState(''); // vimeo 주소 처리
    const [videoH, setVideoH] = useState(0); // 비디오 높이 동적 처리용 스테이트
    const [videoW, setVideoW] = useState(0); // 비디오 높이 동적 처리용 스테이트
    const [mobile, setMobile] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const handle3dClick = (event) => {
        const { clientX, clientY } = event;
    
        if (modelRef.current) {
            let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
            if (hit) {
                setAnnots((annots) => {
                return [...annots, hit];
                });
            }
        }
    };
    const getDataPosition = (annot) => {
        return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
    };
    
    const getDataNormal = (annot) => {
        return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
    };

    const mpCameraReset = useCallback(()=>{
        mpSdk.Camera.zoomReset()
            .then(function () {
                // console.log('Camera zoom has been reset');
            })
        mpSdk.Camera.rotate(1, 1)
            .then(function() {
                // console.log('Camera rotation complete.')
            })
            .catch(function(error) {
                console.log(error)
            });
    },[mpSdk]);

    const handleExit = () => { // x 버튼 클릭시
        mpSdk.Tag.close(tagSid); // 커스텀 팝업을 x 버튼으로 종료해도 mpsdk tag close 이벤트가 발생하도록
        dispatch(setIspopup(!isPopup));
        dispatch(setIspopup(false));
        mpCameraReset();
        // setTag({}); // setTag 초기화 하면, 다시 클릭했을때 객체 날아감
    };

    const handleLightBox = () => {
        dispatch(setIsLightBox(!isLightBox))
    };

    const handleLoadedMetaData = () => {
        // tag 첨부파일에 video 있을 경우 해당 video 의 실제 널이, 높이 값을 기준으로 state 적용
        let vHeight = popupVidRef.current?.videoHeight; // 비디오 src의 높이 값 동적 계산
        let vWidth = popupVidRef.current?.videoWidth; // 비디오 src의 넓이 값 동적 계산

        setVideoH(vHeight / 2);
        setVideoW(vWidth / 2);
        setVideoLoaded(true);
    };

    useEffect(()=>{
        /** ======= tag data filter > matched tagsid ======== */
        const getCaption = (tagSid)=>{
            if(tagSid === null){
                return;
            } else {
                let filtered = finalArr.filter(caption => caption.id === tagSid)[0];
                    const linkUrl = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
                    function linkParser(...groups) {
                        let linkcontainer = `<a href="${groups[2]}" target="_blank">${groups[1]}</a>`;
                        return linkcontainer;
                    };
                    let changedLink = filtered.description.replace(linkUrl, linkParser); // change link pattern
                    let ridBr = changedLink.replace(/\n/g, "<br />"); // change n to br
                    let final = ridBr.replace(/\{([^\]\[\r\n]*)\}/g,""); // delete {***} pattern
                    filtered.description = final;

                if(filtered.attachments[0] !== undefined){

                    let attach = attachData.filter((e) => {
                            return filtered.attachments[0] === e.id
                        }) // 어태치어레이와 선택된 태그데이터의 어태치정보의 id 일치여부 필터
                        
                    // console.log(attach) ///////
                    
                    if(attach.length === 1){

                        let src = attach[0].src;
                        const youtubeUrl = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;
                        const vimeoUrl = /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;

                        if(attach[0].type === "tag.attachment.image"){
                            setAttach(attach);
                        }else if(attach[0].type === "tag.attachment.rich" && attach[0].src === ""){
                            setAttach(attach); // 지금은 그대로 setAttach하지만 확장성을 위해 if절 세 개 만들어둠
                        }else if(attach[0].type === "tag.attachment.rich" && attach[0].src.includes('.mp4')){
                            setAttach(attach);
                        }else if(attach[0].type === "tag.attachment.rich" && attach[0].src.includes('.glb')){
                            setAttach(attach);
                        }else if(attach[0].src.includes('youtu')){
                            function youtubeParser(url, ...groups) {
                                const base = "https://www.youtube.com/embed/#ID#";
                                return groups && groups[6].length === 11
                                ? base.replace("#ID#", groups[6])
                                : url;
                            }
                            const replaced = src.replace(youtubeUrl, youtubeParser);

                            setYoutube(replaced);
                            setAttach(attach);
                        }else if(attach[0].src.includes('vimeo')){
                            function vimeoParser(url, ...groups) {
                                const base = "https://player.vimeo.com/video/#ID#";
                                return groups[3].length === 9 
                                ? base.replace("#ID#", groups[3])
                                : url;
                            }
                            const replaced = src.replace(vimeoUrl, vimeoParser);

                            setVimeo(replaced);
                            setAttach(attach);
                        }
                    }else{
                        attach = []; // 일치하는 값이 없거나 한개 이상(오류상황)이면 강제 빈 배열 리턴
                        setAttach(attach);
                    }
                }
                // console.log(filtered) /////////
                setTag(filtered);
                dispatch(setIspopup(true));
            }     
        }
        getCaption(tagSid);

    // console.log(youtube)
    // console.log(vimeo)
    // console.log(attach)

    }, [tagSid]);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if(popupRef.current && !popupRef.current.contains(event.target)){
                // dispatch(setTagSid(null));
                dispatch(setIspopup(false));
                mpCameraReset();
            }
        }

        let innerIframe;
        if (iframe) {
            innerIframe = iframe.contentWindow.document;
            innerIframe.body.addEventListener('mousedown', handleClickOutside); // click 대신 mousedown
            innerIframe.body.addEventListener('touchstart', handleClickOutside);
        };

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            innerIframe.body.removeEventListener('mousedown', handleClickOutside);
            innerIframe.body.removeEventListener('touchstart', handleClickOutside);
        };

    }, [iframe, attach, mpCameraReset]);

    useEffect(() => {

        if(window.innerWidth < 768){
            setMobile(true)
        }else{
            setMobile(false)
        }

        let lastTouchEnd = 0;
        function preventMultiFingerTouch(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }
        function preventDoubleTapZoom(e) {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }
        const popUp = popupRef.current;
        if (popUp) {
            popUp.addEventListener('touchstart', preventMultiFingerTouch, false);
            popUp.addEventListener('touchend', preventDoubleTapZoom, false);
        }
        // Clean up function
        return () => {
            if (popUp) {
                popUp.removeEventListener('touchstart', preventMultiFingerTouch);
                popUp.removeEventListener('touchend', preventDoubleTapZoom);
            }
        };
    }, []);

    return (
        <>
            { error && <p>Error!</p> }
            { loading }
            { isLightBox && (<Lightbox attach={attach}></Lightbox> )}
            { isPopup && (
                <div className={styles.popup_overlay} ref={popupRef}>
                    <div className={styles.popup_exit} onClick={handleExit}>x</div>
                    <div className={styles.txtArea}>
                        <div className={styles.txtTitleArea}>
                            <h2 className={styles.txtEleT}>{tag.label}</h2>
                        </div>
                        {attach.length > 0 && (
                            <>
                            {attach[0].type === "tag.attachment.image" && (
                                <div className={styles.imgArea}>
                                    <img alt='xyz' src={attach[0].src} onClick={handleLightBox}></img>
                                </div>
                            )}
                            {attach[0].type === "tag.attachment.rich" && attach[0].src.includes('.gif') && (
                                <div className={styles.imgArea}>
                                    <img alt='xyz' src={attach[0].src} onClick={handleLightBox}></img>
                                </div>
                            )}
                            {attach[0].type === "tag.attachment.rich" && attach[0].src.includes('.mp4') && (
                                <div className={styles.imgMp4Area}>
                                    <video
                                        ref={popupVidRef}
                                        playsInline
                                        loop
                                        muted
                                        autoPlay
                                        onLoadedMetadata={handleLoadedMetaData}
                                        width={mobile ? videoW / 2 : videoW}
                                        height={mobile ? videoH / 2 : videoH}
                                        src={attach[0].src}
                                        typeof="video/mp4"
                                        crossOrigin="anonymous"
                                        style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease-in"}}
                                    ></video>
                                    {!videoLoaded && (
                                        <div style={{ width : "100%", height: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>
                                            <div className="lds-ellipsis" style={{top: "0%", left: "0%", transform: "none"}}><div></div><div></div><div></div><div></div></div>
                                        </div>
                                    )}
                                </div> 
                            )}
                            {attach[0].src.includes('.glb') && !isLightBox && (
                                <>
                                    <div className={styles.con3dArea}>
                                        <model-viewer
                                            src = {attach[0].src}
                                            alt = '3dmodel'
                                            camera-controls
                                            auto-rotate
                                            shadow-intensity="1"
                                            onClick={handle3dClick}
                                            ref={(ref) => {
                                                modelRef.current = ref;
                                            }}
                                        >
                                            {annots.map((annot, idx) => (
                                                <button
                                                key={`hotspot-${idx}`}
                                                className={styles.view_button}
                                                slot={`hotspot-${idx}`}
                                                data-position={getDataPosition(annot)}
                                                data-normal={getDataNormal(annot)}
                                                ></button>
                                            ))}
                                        </model-viewer>
                                    </div>
                                    <div className={styles.closeUp} onClick={handleLightBox}>zoom_in</div>
                                </>
                            )}
                            {youtube.length > 0 && (
                                <div className={styles.video_container}>
                                    <iframe
                                        src={youtube}
                                        width='100%'
                                        height='100%'
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            {vimeo.length > 0 && (
                                <div className={styles.video_container}>
                                    <iframe
                                        src={vimeo}
                                        width='100%'
                                        height='100%'
                                        title="vimeo-player"
                                        frameBorder="0" 
                                        allowFullScreen
                                    >
                                    </iframe>
                                </div>
                            )}
                            </>         
                        )}
                        {Object.keys(tag).length > 0 &&(
                            <div className={styles.pArea}>
                                {tag.description.length >= 100 && (
                                    <p className={styles.txtElePs} dangerouslySetInnerHTML={{__html : tag.description }} ></p>
                                )}
                                {tag.description.length < 100 && (
                                    <p className={styles.txtElePs} dangerouslySetInnerHTML={{__html : tag.description }}></p>
                                )}
                            </div>
                        )}             
                    </div>
                </div>
            )}
        </>
    )
}