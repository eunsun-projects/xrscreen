"use client"
import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsLightBox } from "@/store/store.js";
import useScript from '../03/usescript.js'; 
import styles from '@/app/[slug]/styles.module.css';

export default function Lightbox({attach}){

    const isLightBox = useSelector((state)=>state.isLightBox.value);
    const dispatch = useDispatch();
    const mvSrc = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js";
    const [ loading, error ] = useScript(mvSrc, 'afterbegin', 'module');

    const [zoom, setZoom] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [glbSrc, setGlbSrc] = useState('');
    const [annots, setAnnots] = useState([]);
    const [moblie, setMobile] = useState(false);
    const modelRef = useRef();

    const lightboxRef = useRef();
    const imgRef = useRef();
    
    const handleExit = () => { // x 버튼 클릭시
        dispatch(setIsLightBox(!isLightBox));
    };

    const handleZoom = () => {
        setZoom(true);
    };

    const handleZoomOut = () => {
        setZoom(false);
    };

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

    useEffect(()=>{

        if(window.innerWidth < 768){
            setMobile(true)
        }else{
            setMobile(false)
        }

        if(/.jpg|.png|.webp/.test(attach[0].src)){
            setImgSrc(attach[0].src);
        }else if(attach[0].src.includes('glbs') ){
            setGlbSrc(attach[0].src);
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
        const lightbox = lightboxRef.current;
        if (lightbox) {
            lightbox.addEventListener('touchstart', preventMultiFingerTouch, false);
            lightbox.addEventListener('touchend', preventDoubleTapZoom, false);
        }
        return()=>{
            if (lightbox) {
                lightbox.removeEventListener('touchstart', preventMultiFingerTouch);
                lightbox.removeEventListener('touchend', preventDoubleTapZoom);
            }
        }
    },[])

    useEffect(()=>{
        if(moblie) {
            // console.log('hdf')
            imgRef.current.scrollBy(100,0)
        }
    }, [zoom, moblie])

    return(
        <>
            { error && <p>Error!</p> }
            { loading }
            { isLightBox && (
                <div className={styles.lightBoxBack} ref={lightboxRef}>
                    <div className={styles.lightbox_exit} onClick={handleExit}>x</div>
                    <div ref={imgRef} className={styles.lightBoxScroll} style={{ width : "100%", height : "100%", position : "absolute", display : "flex", justifyContent : "center", alignItems : zoom ? "flex-start" : "center", overflowY : zoom ? "scroll" : "hidden"}}>
                        <div className={styles.lightBoxCon} style={{ transform : zoom ? 'scale(1.5)' : 'scale(1)', transformOrigin : moblie ? "left top" : "center top", objectPosition: "center", objectFit : "contain", marginTop : zoom ? "3rem" : "0rem" }} >
                            {imgSrc && ( <img alt={styles.xyzlightbox} className={styles.lightBoxImg} src={attach[0].src}></img> )}
                            {glbSrc && (
                                    <>
                                        <div className={styles.con3dArea}>
                                            <model-viewer
                                                src = {glbSrc}
                                                alt = '3dmodel'
                                                camera-controls
                                                auto-rotate
                                                shadow-intensity="1"
                                                onClick={handle3dClick}
                                                ref={(ref) => {
                                                    modelRef.current = ref;
                                                }}
                                                // class="lightBox3d"
                                                style={{maxWidth : "100%", width: moblie ? "22rem" : "50rem", height : "85vh", maxHeight : "100%"}}
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
                                    </>
                                )}
                        </div>
                    </div>

                    {imgSrc && (
                    <div className={styles.zoomDiv}>
                        <div className={styles.closeUp} onClick={handleZoom}>zoom_in</div>
                        <div className={styles.closeOut} onClick={handleZoomOut}>zoom_out</div>
                    </div>)}
                </div>
            )}
        </>
    )
}