"use client"
import { React, useContext, memo, useRef, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTagSid, setIsInfoPopup, setShowDropDown, setActiveMenu, setIspopup } from "@/store/store.js";
import PopupModal from '@/components/mpMain/03/popupModal';
import PopupInfoModal from '@/components/mpMain/03/popupInfoModal';
import AudioComp from '@/components/mpMain/03/audioComp';
import AudioContext from '@/context/audioContext';
import styles from '@/app/[slug]/styles.module.css';

const DropdownTagList = memo(function DropdownTagList({iframe, bindArr, mpModels, modelInfo, mpSdk}) {  

    const tagSid = useSelector((state)=>state.tagSid.value);
    const isPopup = useSelector((state)=>state.isPopup.value);
    const isInfoPopup = useSelector((state)=>state.isInfoPopup.value);
    const showDropDown = useSelector((state)=>state.showDropDown.value);
    const activeMenu = useSelector((state)=>state.activeMenu.value);
    const bgmsList = useSelector((state)=>state.bgmsList.value);

    const audioRef = useContext(AudioContext); 

    const dispatch = useDispatch();

    const [activeCateMenu, setActiveCateMenu] = useState({}); // 불린으로 설정하지 않고 
    const [scrollHeight, setScrollHeight] = useState({}); // 메뉴 숨겨진 카테고리 열렸을때 높이 설정용
    const [active2, setActive2] = useState({});
    const [music, setMusic] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [hover, setHover] = useState(false);

    const notSortedArr = bindArr[1]; // unCategorized
    const uniqueArr = bindArr[4]; // unique
    const forFinal = bindArr[2]; // categorized
    // const mpSdk = bindArr[5];
    const isBgm = mpModels.isBgm[0];

    const dropdownRef = useRef();

    const handleInfoClick = () => {
        dispatch(setIsInfoPopup(true));
    };

    const handleLabelClick = (id) => {
        dispatch(setIspopup(!isPopup));
        dispatch(setTagSid(id));
        navigateTag(id);
    };

    // 카테고리 없는 라벨 클릭
    const handleUnCateLabelClick = (id, index) => () => {
        dispatch(setIspopup(!isPopup));
        dispatch(setTagSid(id));
        dispatch(setActiveMenu(index));
        navigateTag(id);
    };

    const handleDropdownClick = () => {
        dispatch(setShowDropDown(!showDropDown));
    };

    const handleCateMenuClick = (index) => (e) => { // 고차함수로 변환
        const wasActive = index === activeCateMenu[index]; // 활성화 상태를 저장
        setActiveCateMenu(prev => ({...prev, [index]: wasActive ? null : index}));

        const content = e.currentTarget.nextElementSibling;
        const scroll = content.scrollHeight + "px";

        setScrollHeight(prev => ({...prev, [index]: wasActive ? '0' : scroll}));
        setActive2(prev => ({...prev, [index]: wasActive ? '' : styles.active2}));
    };

    const handleMusicDropdown = () => {
        setMusic(!music);
    };

    /** ========= matching settedArr = uniqueArr ========= */
    function listMatching(category){ // 이것도 스테이트로 변경???????
        // const uniqueSet = new Set(uniqueArr); // uniqueArr배열을 셋 타입으로 변환 uniqueSet.has()
        const finded = forFinal.filter(item => item.sortt[1] === category); // 
        return finded;
    };

    /** ======== list click > navigate to tag function ======== */
    function navigateTag(sid){
        mpSdk.Mattertag.navigateToTag(sid, mpSdk.Mattertag.Transition.FLY); //will deprecated???????
        mpSdk.Tag.allowAction(sid, {
            docking : false,
            navigating : false,
            opening : false
        }); 
    };

    useEffect(() => {
        const audio = audioRef.current;
        const handlePlayPause = (e) => {
            if(e.type === "play"){
                setPlaying(true)
            }else if(e.type === "pause"){
                setPlaying(false)
            }
        };

        if(audio !== null && audio !== undefined){
            audio.addEventListener('play', handlePlayPause);
            audio.addEventListener('pause', handlePlayPause);
        };

        return () => {
                if(audio !== null && audio !== undefined){
                    audio.removeEventListener('play', handlePlayPause);
                    audio.removeEventListener('pause', handlePlayPause);
                };
            }
    },[])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                if(isPopup){
                    // console.log('isPopup')
                    dispatch(setIspopup(!isPopup));
                }
                if(isInfoPopup){
                    // console.log('isinfoPopup')
                    dispatch(setIsInfoPopup(false));
                }
                if(showDropDown) {
                    // console.log('isDropdown')
                    dispatch(setShowDropDown(false));
                }
                dispatch(setActiveMenu(null)); // 소트 없는 메뉴의 액티브 상태 컨트롤
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

    }, [iframe]);

    return (
        <>  
            { isInfoPopup && ( <PopupInfoModal iframe={iframe} modelInfo={modelInfo} mpModels={mpModels}></PopupInfoModal> )}
            {tagSid !== null && (<PopupModal key={tagSid} iframe={iframe} bindArr={bindArr} mpSdk={mpSdk}></PopupModal>)}
            <div className={styles.dropdown_custom} ref={dropdownRef} style={{ filter : (isPopup || isInfoPopup) ? "blur(1px)" : "none"}}>
                {modelInfo && (
                    <button className={styles.dropbtn}>
                        <span className={styles.dropbtn_content} style={{ flexBasis : isBgm > 0 ? "80%" : "90%" }} onClick={handleDropdownClick}>{modelInfo.name}</span>
                        {isBgm > 0 && (<span style={{ color : playing || music ? "#2e2d2b" : null }} className="material-symbols-rounded headphone_btn" onClick={handleMusicDropdown}>headphones</span>)}
                        <span className={styles.dropbtn_click} onClick={handleDropdownClick}>arrow_drop_down</span>
                    </button>
                )}         

                    {isBgm > 0 && ( <AudioComp isSelect={music} mpModels={mpModels}/> )} 

                    <div className={`${styles.dropdown_content} ${showDropDown ? styles.show : ''}`} >
                        <div className={styles.menucontentInfo} onClick={handleInfoClick}>
                            <div className={styles.listInfoIcon}>▶︎</div>
                            <div className={styles.listLabel}>Information</div>
                        </div>
                        
                        {notSortedArr.length >0 && notSortedArr.map((item, index) => (
                            <div key={item.id} className={`${styles.menucontent} ${activeMenu === index ? styles.active : ''}`} onClick={handleUnCateLabelClick(item.id, index)}>
                                <div className={styles.listIcon} style={{backgroundColor: `rgb(${item.color.r * 255}, ${item.color.g * 255}, ${item.color.b * 255})`}}></div>
                                <div className={styles.listLabel}>{item.label}</div>
                            </div>
                        ))}

                        {uniqueArr.length > 0 && uniqueArr.map((item, index) => (
                            <Fragment key={index}>
                                <button key={item} className={`${styles.collap} ${activeCateMenu === index ? active2[index] : active2[index]}`} onClick={handleCateMenuClick(index)}>
                                    <span>{item}</span>
                                </button>
                                <div key={item+index} className={styles.innerWrapper} style={{ maxHeight : activeCateMenu === index ? scrollHeight[index] : scrollHeight[index] }}>
                                    {listMatching(item).map((e, i)=>(
                                        <div key={e.id} className={styles.menucontent} onClick={() => handleLabelClick(e.id)}>
                                            <div className={styles.listIcon} style={{backgroundColor: `rgb(${e.color.r * 255}, ${e.color.g * 255}, ${e.color.b * 255})`}}></div>
                                            <div className={styles.listLabel}>{e.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>
            </div>
        </>
    );
})
export default DropdownTagList;