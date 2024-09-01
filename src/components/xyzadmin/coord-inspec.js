"use client"
import { useEffect, useRef, useState, memo, React } from "react";
import styles from './styles.module.css';

const CoordInspector = memo(function CoordInspector({selected}){

    const [ params, setParams ] = useState('');
    const [ sdk, setSdk ] = useState({});
    const [ load, setLoad ] = useState(false);
    const [ sectionCache, setSectionCache ] = useState({});
    const [ isButton1, setIsButton ] = useState(false);
    const [ isButton2, setIsButton2 ] = useState(false);
    const [ positionStr, setPositionStr ] = useState('');
    const [ posX, setPosX ] = useState('');
    const [ posY, setPosY ] = useState('');
    const [ arrStr, setArrStr ] = useState([]);

    const selIframe = useRef();
    let interval = useRef();

    // 디바운스 함수.. 멋지다
    function debounce(func, wait) {
        let timeout;
    
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
    
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleLoad = () => {
        const showcaseWindow = selIframe.current.contentWindow;
        showcaseWindow.MP_SDK.connect(showcaseWindow, process.env.NEXT_PUBLIC_MPSDKKEY)
            .then((mpSdk)=>{
                console.log('%c Coordinate Inspector On!', 'background: #333333; color: #8dceff');
                setSdk(mpSdk);
                mpSdk.App.state.subscribe(function (appState) {   
                    if(appState.phase === mpSdk.App.Phase.PLAYING){
                        setLoad(true);
                    }
                })
            })
            .catch(err => console.log(err));
    };

    const handleGet = () => {
        let posiStr = `position: ${pointToString(sectionCache.position)}<br>normal: ${pointToString(sectionCache.normal)}<br>floorId: ${sectionCache.floorId}`;
        setPositionStr(posiStr);
        setIsButton2(true);
        setIsButton(false);
        selIframe.current.focus();

        function pointToString(point) {
            let x = point.x.toFixed(3);
            let y = point.y.toFixed(3);
            let z = point.z.toFixed(3);
        return `{ x: ${x}, y: ${y}, z: ${z} }`;
        };
    };

    const handleRecord = () => {
        let replaced = positionStr.replace(/<br>/gi, ' ');
        let copy = [...arrStr]
        copy.push(replaced);
        setArrStr(copy);
    };

    const handleMove = debounce((e) =>{
            let x = e.clientX;
            let y = e.clientY;
            let size = {};
            let poseCache;
            sdk.Camera.pose.subscribe(function(pose) {
                poseCache = pose;
            });

            let intersectionCache;
            sdk.Pointer.intersection.subscribe(function(intersection) {
                intersectionCache = intersection;
            });
            const delayBeforeShow = 600;
            interval = setInterval(() => {
                if (!intersectionCache || !poseCache) {
                    return;
                }
                if(selIframe.current !== null && selIframe.current !== undefined){
                    size = {
                        w: selIframe.current.clientWidth,
                        h: selIframe.current.clientHeight,
                    };
                }         
                let coord = sdk.Conversion.worldToScreen(intersectionCache.position, poseCache, size);
                if(coord){
                    setSectionCache(intersectionCache);
                }
            }, 10);

            if (new Date().getTime() > delayBeforeShow) {
                if (isButton1) {
                    setIsButton(false);
                }
                setPosX(`${x}px`);
                setPosY(`${y+20}px`);
                setIsButton(true);
            }
    }, 400);

    useEffect(()=>{
        const modelSid = selected.sid;
        const toParams = `m=${modelSid}&newtags=1&lang=en&play=1&title=0&brand=0&qs=1&help=0&applicationKey=${process.env.NEXT_PUBLIC_MPSDKKEY}`;
        setParams(toParams);
    },[selected]);

    useEffect(()=>{
        let iframe = selIframe.current;
        if(load && iframe !== null){
            const innerIframe = iframe.contentWindow.document;
            innerIframe.addEventListener('mousemove',(e)=>handleMove(e),true)
        }
        return() => {
            if(load && iframe !== null){
                const innerIframe = iframe.contentWindow.document;
                innerIframe.removeEventListener('mousemove',(e)=>handleMove(e),true)
                clearInterval(interval);
            }
        }
    },[load, handleMove]) 

    return(
        <>
            <div className={styles.container_coord_inspector}>
                <div className={styles.textinput}>
                    { positionStr.length > 0 && ( <p style={{ marginBottom : '0'}} dangerouslySetInnerHTML={{__html : positionStr }}></p>  )}
                    <button className={styles.record_button} type="button" style={{ display : isButton2 ? 'block' : 'none' }} onClick={handleRecord}>toRecord</button>
                </div>
                <button className={styles.get_button} type="button" style={{ display : isButton1 ? 'block' : 'none', left : posX, top : posY }} onClick={handleGet}>Get Position</button>
                <div className={styles.container_showcase} style={{ height : "60%"}}>
                    { params.length > 0 && (
                        <iframe 
                            title="mpIframe"
                            id="myIframe" 
                            ref={selIframe} 
                            className={styles.shocase_coord}
                            width="100%" 
                            height="100%" 
                            allowFullScreen
                            src={process.env.NEXT_PUBLIC_BUNDLEADDRESS + params}
                            onLoad={handleLoad}
                        >
                        </iframe>
                    )}
                </div>
                <div className={styles.arrDiv}>
                    {arrStr.length > 0 && (
                        <div>
                            {arrStr.length > 0 && arrStr.map((e,i)=>{
                                return <p key={'position'+i} style={{ marginBottom : "0" }}>{e}</p>
                            })}
                        </div>    
                    )}
                </div>
            </div>            
        </>    
    )
});
export default CoordInspector;