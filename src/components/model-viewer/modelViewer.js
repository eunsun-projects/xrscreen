"use client"
import React, {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import styles from '@/app/model-viewer/page.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { firebaseInitModelViewer } from "@/firebase/firebaseServer";
import ModelViewerApp from '@/class/modelViewerApp';

export default function ModelViewer({models}){

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedValue, setSelectedValue] = useState(0);
    const [lastTapTime, setLastTapTime] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [queryNum, setQueryNum] = useState(null);
    const [db, setDb] = useState(models);
    const [idleTime, setIdleTime] = useState(0);
    const [loading, setLoading] = useState(true);
    const [swipeOn, setSwipeOn] = useState(false);
    const [copied, setCopied] = useState(false);
    const [app, setApp] = useState(null);
    const [infoClick, setInfoClick] = useState(false);

    const eachBoxRefs = useRef([]);
    const lightBtnRefs = useRef([]);
    const viewmodeRefs = useRef([]);
    const effectsRefs = useRef([]);
    const swipeRef = useRef();
    const temporalRef = useRef();
    const canvasRef = useRef();
    const mainRef = useRef();
    const loadingRef = useRef();
    
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };

    const delCache = () => {
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                return caches.delete(key);
            }));
        });
        console.log('캐시삭제완료')
    };

    const scrollSmoothly = (x, y) => {
        const swipe = swipeRef.current;
        const startTime = performance.now();
        const duration = 300; 
        const startX = swipe.scrollLeft;
        const startY = swipe.scrollTop;

        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 0부터 1까지의 진행 상황
        
            swipe.scrollTo(startX + x * progress, startY + y * progress);
        
            if (elapsedTime < duration) {
                requestAnimationFrame(animate); // 다음 프레임 요청
            }
        }
        requestAnimationFrame(animate); // 첫 번째 프레임 요청
    };

    const setSearchParams = (params) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.set('num', String(params));
        const search = urlSearchParams.toString();
        const query = search ? `?${search}` : ""; 
        // router.push(`${pathname}${query}`); // scroll false 면 왜 경고 사라짐??
        history.replaceState({}, '', `${pathname}${query}`);
    };

    const handleShare = () => {
        if(window.innerWidth > 575 && !isMobile()){
            window.navigator.clipboard.writeText(window.location.href);
            console.log('desktop');
        }else if(window.innerWidth <= 575 || isMobile()){
            console.log('mobile');
            /** ==== when mobile auto open share api ==== */
            if (navigator.share) {
                navigator.share({
                    title: '3d model-viewer',
                    text: "screenxyz's 3d model-viewer",
                    url: window.location.href,
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(console.error);
            } else {
                /** ==== when desktop write Url to clipbaord ==== */
                window.navigator.clipboard.writeText(window.location.href);
            }
        }
        setCopied(true);

        const timer = setTimeout(()=>{
            setCopied(false);
            clearTimeout(timer);
        },700)
    };

    const handleNaviClick = (e) => {
        if(!app) return;
        if(e.target.innerHTML === 'navigate_before'){
            
            app.midboxBeforeAction(e);

            if(selectedValue > 0 && selectedValue <= db.length -1){
                // setLoading(true);
                // const timer = setTimeout(()=>{
                //     setLoading(false);
                //     clearTimeout(timer);
                // }, 400);

                app._setupModel(db[selectedValue - 1], setLoadingProgress)
                setSearchParams(selectedValue -1);
                setSelectedValue(prev => prev -1)
            }else if(selectedValue === 0){
                console.log('first~~')
            } 
        }else if(e.target.innerHTML === 'navigate_next'){

            app.midboxNextAction(e);

            if(selectedValue >= 0 && selectedValue <= db.length -2){
                // setLoading(true);
                // const timer = setTimeout(()=>{
                //     setLoading(false);
                //     clearTimeout(timer);
                // }, 400);

                app._setupModel(db[selectedValue + 1], setLoadingProgress)
                setSearchParams(selectedValue +1);
                setSelectedValue(prev => prev +1)
            }else if(selectedValue === db.length -1){
                console.log('last~~~')
            } 
        }
    };

    const handleMouseDown = (e) => {
        if(app){
            if(app.nowLoading === 0 || e.detail === 2){
                alert('조금만 천천히 하세요');
            }
        }     
    };

    const handleTouchEnd = (e) => {
        const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)
        // e.preventDefault(); // 클릭이벤트 발생 방지;
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - lastTapTime;

        if(timeDifference < delay && timeDifference > 0){
            alert('조금만 천천히 하세요');
        } else {
            if(app.nowLoading === 0){
                alert('조금만 천천히 하세요');
            }
        }
        setLastTapTime(currentTime) // 마지막 탭 시간을 현재 시간으로 업데이트
    };

    const toggle = (target) => {
        const lightIcons = lightBtnRefs.current;
        if(target.classList.value.includes(styles.xyzon)){
            lightIcons.forEach((el)=>{
                el.classList.remove(styles.xyzon);
            });
            app._removeLight();
        }else{
            lightIcons.forEach((el)=>{
                el.classList.remove(styles.xyzon);
            });
            target.classList.add(styles.xyzon);
            app._lightModeChange(target.innerHTML);
        }
    };

    const handleLightClick = (e) => {
        if(app !== undefined && app !== null){
            switch(e.target.innerHTML){
                case '360' :
                        app.toggleRotation(e.target)
                    break;
                case 'wb_sunny' :
                        toggle(e.target);
                    break;
                case 'wb_iridescent' :
                        toggle(e.target);
                    break;
                case 'lightbulb' :
                        toggle(e.target);
                    break;
                case 'highlight' :
                        toggle(e.target);
                    break;
                case 'grid_on' :
                        app.toggleWireframe(e.target);
                    break;
                case 'contrast' :
                        app.toggleMap(e.target);
                    break;
                case 'graphic_eq' :
                        app.toggleGlitch(e.target);
                    break;
            }
        }else{
            console.log('not ready!');
            return;
        }
    };

    const handleSwipeBoxClick = (e) => {
        if(!app) return;
        
        app.swipeboxAction(e);
        const dataSet = Number(e.target.dataset.num);
        if(!isNaN(dataSet)){
            app._setupModel(db[dataSet], setLoadingProgress)
            setSearchParams(dataSet);
            setSelectedValue(dataSet);
        }
        // if(dataSet !== selectedValue && e.target.innerHTML !== 'navigate_before' && e.target.innerHTML !== 'navigate_next'){
        //     setLoading(true);
        //     const timer = setTimeout(()=>{
        //         setLoading(false);
        //         clearTimeout(timer);
        //     }, 400);
        // }
    };

    const handleSwipeUpDown = () => {
        setSwipeOn(!swipeOn);
        const center = window.innerWidth / 2
        const rect = eachBoxRefs.current[selectedValue].getBoundingClientRect();
        scrollSmoothly(rect.left - center, 0)
    };

    const handleInfoClick = () => {
        setInfoClick(!infoClick);
    }

    const idleTimeReset = () => {
        setIdleTime(0);
        console.log('idleTime reset');
    };

    useEffect(() => {
        // console.log(loadingProgress);  // 이제 여기서 로딩 진행 상황을 확인할 수 있습니다.
        if(loadingProgress < 100){
            setLoading(true)
        }else{
            setLoading(false)
        }
    }, [loadingProgress]);

    useEffect(() => { // 처음 실행할때만 되게끔 의존성 배열에서 searchParams 제거
        if(app){
            const num = searchParams.get('num');
            // console.log('변경있음?')

            if (num === null) {
                setSearchParams(0); // 쿼리스트링 값이 없으면 0으로 설정
                setSelectedValue(0);
                setQueryNum(0);
                app._initModel(0, setLoadingProgress); // 직접 모델 인잇
            } else {
                const parsedNum = parseInt(num, 10);
                
                if (!isNaN(parsedNum)) {
                    setSelectedValue(parsedNum);
                    setQueryNum(parsedNum);
                    app._initModel(parsedNum, setLoadingProgress); // 직접 모델 인잇
                } else {
                    setSearchParams(0); // 쿼리스트링 값이 NaN이면 0으로 설정
                    setSelectedValue(0);
                    setQueryNum(0);
                    app._initModel(0, setLoadingProgress); // 직접 모델 인잇
                }
            }
        }
    }, [app, searchParams]); // searchParams 변경 시 useEffect를 다시 실행

    useEffect(()=>{

        const app = new ModelViewerApp(mainRef, loadingRef, canvasRef, temporalRef, db, lightBtnRefs, viewmodeRefs, effectsRefs, swipeRef, eachBoxRefs, 0, styles);
        setApp(app);   

        /** ====== Generate a resize event if the device doesn't do it ====== */  
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            mainRef.current.style.setProperty('--vh', `${vh}px`)
        };
        setVh();

        window.addEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);
        // window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', `${vh}px`));
        window.addEventListener('resize', setVh);

        document.body.addEventListener('click', idleTimeReset);

        const interval = setInterval(()=>{
            setIdleTime(prev => prev + 1);
            if (idleTime >= 3) { // 3 minutes
                console.log('reload!')
                window.location.href = "/model-viewer";
            }
        }, 60000)

        return() => {
            if(app) app._destroy();
            window.removeEventListener('resize', setVh);
            document.body.removeEventListener('click', idleTimeReset);
            clearInterval(interval);
        }
    },[])

    // useEffect(()=>{
    //     setSearchParams(selectedValue);
    // },[selectedValue]);

    return(
        <div className={styles.gui_main_3d} ref={mainRef} style={{backgroundColor: "#c7c7c7"}}>
            
            {copied && <div className={styles.xyzcopied}>URL copied!</div>}

            <div className={styles.temporal} ref={temporalRef} style={{ display : loading ? "block" : "none" }}></div>

            <div className={styles.xyz_none_landscape}><h3>Looks good in portrait mode!</h3></div> 

            <div className={styles.gui_wrapper_3d} onMouseDown={handleMouseDown} onTouchEnd={handleTouchEnd}>

                <div className={styles.top_3d}>
                    <span className={`${styles.material_icons_outlined} ${styles.xyz_share}`} onClick={handleShare}>share</span>
                    <Link href="/" scroll={false}><span className={styles.material_icons_outlined}>home</span></Link>
                </div>

                <div className={styles.mid_3d} >
                    <div className={styles.mid_left_3d}>       
                        <span className={styles.material_icons_outlined} onClick={handleNaviClick} style={{pointerEvents : loading ? "none" : "all"}}>navigate_before</span>
                    </div>
                    <div className={styles.mid_right_3d}>
                        <span className={styles.material_icons_outlined} onClick={handleNaviClick} style={{pointerEvents : loading ? "none" : "all"}}>navigate_next</span>
                    </div>
                    {/* <div className={styles.xyzloading} ref={loadingRef} style={{opacity: loadCounter === 100 ? "0" : "1"}}>{`Loading.. ${Math.round(loadCounter)}%`}</div> */}
                    <div className={styles.xyzloading} ref={loadingRef}></div>
                    {loading && (
                        <div style={{position: "fixed", backgroundColor: "#c7c7c7", width: "60%", height: "60%", top: "50%", left: "50%", transform : "translate(-50%,-50%)"}}>
                            <div className="lds-ellipsis" style={{position: "fixed"}}><div></div><div></div><div></div><div></div></div>
                        </div>)}
                </div>

                <div className={`${styles.mid_info} ${swipeOn ? styles.mid_info_open : ''}`} style={{display: infoClick ? "flex" : "none"}}>
                    {db && db[selectedValue].title.length > 0 && <p>{db[selectedValue].title}</p> }
                    {db && db[selectedValue].author.length > 0 && <p>{db[selectedValue].author}</p> }
                    {db && db[selectedValue].year.length > 0 && <p>{db[selectedValue].year}</p> }
                    {db && db[selectedValue].size.length > 0 && <p>{db[selectedValue].size}</p> }
                    {db && db[selectedValue].material.length > 0 && <p>{db[selectedValue].material}</p> }
                </div>

                <div className={styles.btm_3d}>

                    <div className={styles.btm_left_3d}> 
                        {swipeOn ?
                        <span className={`${styles.material_icons_outlined} ${styles.less}`} onClick={handleSwipeUpDown}>expand_more</span> 
                        : <span className={`${styles.material_icons_outlined} ${styles.less}`} onClick={handleSwipeUpDown}>expand_less</span> 
                        }
                        <span className={`${styles.material_icons_outlined} ${styles.que} ${infoClick ? styles.xyzon : ''}`} onClick={handleInfoClick}>question_mark</span> 
                    </div>

                    <div className={styles.btm_right_3d} onClick={handleLightClick}>
                        <span className={styles.material_icons_outlined}>360</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzlight}`} ref={(el) => el && (lightBtnRefs.current.push(el))}>wb_sunny</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzlight}`} ref={(el) => el && (lightBtnRefs.current.push(el))}>wb_iridescent</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzlight}`} ref={(el) => el && (lightBtnRefs.current.push(el))}>lightbulb</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzlight}`} ref={(el) => el && (lightBtnRefs.current.push(el))}>highlight</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzview}`} ref={(el) => el && (viewmodeRefs.current.push(el))}>grid_on</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzview}`} ref={(el) => el && (viewmodeRefs.current.push(el))}>contrast</span>
                        <span className={`${styles.material_icons_outlined} ${styles.xyzeffects}`} ref={(el) => el && (effectsRefs.current.push(el))}>graphic_eq</span>
                    </div>

                </div>

                <div className={`${styles.gui_swipe_3d} ${swipeOn ? '' : styles.xyzhide}`} ref={swipeRef} onClick={handleSwipeBoxClick}>
                        <div className={styles.gui_swipe_each_box}>
                            {db && db.map((e,i)=>(
                                <div key={e.nick+i} ref={(el) => el && (eachBoxRefs.current.push(el))} className={styles.gui_swipe_each} data-num={e.num} style={{backgroundImage : `url(${e.poster})`, outline: selectedValue === i ? "3px solid #88fc93" : "none", pointerEvents: loading ? "none" : "all"}}></div>
                            ))}
                        </div>

                        <div className={`${styles.gui_down_arrow} ${styles.xyzbefore}`}>
                            <span className={styles.material_icons_outlined} data-name='xyzbefore'>navigate_before</span>
                        </div>
                        <div className={`${styles.gui_down_arrow} ${styles.xyzafter}`}>
                            <span className={styles.material_icons_outlined} data-name='xyzafter'>navigate_next</span>
                        </div>
                    </div>
            </div>
            <div className={styles.xyzcanvas} ref={canvasRef}></div>
        </div>
    )
}