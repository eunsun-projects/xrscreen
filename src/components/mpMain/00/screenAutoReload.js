'use client'
import { React, useEffect, useRef, useState } from "react";
import { storage, firebaseApp, db, auth } from "@/firebase/firebaseClient"; // 클라이언트에서 다시 app 초기화 반드시 필요함
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics"; 
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import VideoContext from "@/context/videoContext.js";
import AudioContext from "@/context/audioContext.js";
import MainUiReload from "../01/mainui-reload";;

export default function ScreenAutoReload ({name}) {

    const videoRef = useRef();
    const audioRef = useRef();
    const loadingRef = useRef();

    const [customModel, setModel] = useState({});
    const [loading, setLoading] = useState(true); // 백그라운드 이미지 로딩 상태
    const [embed, setEmbed] = useState(false);

    useEffect(()=>{
        signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_FIREBASEID, process.env.NEXT_PUBLIC_FIREBASEPW) // 게스트 로그인
        .then((user)=>{

        function getUrls(mm, arr, type, refe){
            let parentFolder;
            let urlKey;
            switch (type){
                case "video" :
                    parentFolder = "videos";
                    urlKey = "vidsUrl";
                    break;
                case "object" :
                    parentFolder = "glbs";
                    urlKey = "objsUrl";
                    break;
                case "plane" :
                    parentFolder = "planes";
                    urlKey = "planesUrl";
                    break;
            }           
                const ref = refe(storage, `${parentFolder}/assets${mm.route}`);
                listAll(ref)
                    .then((res) => {
                        res.items.forEach((itemRef) => {
                            getDownloadURL(itemRef)
                                .then((url) => {
                                    arr.push(url);
                                    // console.log(objsUrlArr)
                                    return arr;
                                })
                                .then((arr)=>{
                                    mm[urlKey] = arr;
                                })
                                .catch((error) => {
                                    console.log(error)
                                });
                        });
                    }).catch((error) => {
                        console.log(error)
                    });
                return mm
        };     

        function firebaseSet(matchedModel){
            if(matchedModel){
                const mm = matchedModel;
                const imagesRef = ref(storage, 'images');
                const isObjects = mm.object[0];
                const isDownLogo = mm.downLogo[0];
                const isVideo = mm.video[0];
                const isPlane = mm.plane[0];
                const isBgm = mm.isBgm[0];
                const isLogo = mm.logo[0];
                mm.songNames = [];
                let objsUrlArr = [];
                let vidsUrlArr = [];
                let planesUrlArr = [];
                let bgmsUrlArr = [];
                let cdUrlArr = [];

                const backRef = ref(imagesRef, `/assets/background/public${mm.route}.webp`);
                    getDownloadURL(backRef)
                        .then((url)=>{
                            const img = new Image();
                            img.src = url
                            img.onload = () => setLoading(false);
                            img.onerror = (error) => {
                                console.error('Failed to load image:', error);  // 로딩 중에 발생하는 에러를 콘솔에 출력
                                setLoading(false);  // 이미지 로딩이 실패한 경우에도 로딩 상태를 false로 설정
                            };
                            mm.backUrl = url;
                        })
                        .catch(err => console.log(err));

                if(isDownLogo){
                    const imgRef = ref(imagesRef, `assets/downLogo${mm.route}${mm.route}.png`);
                            getDownloadURL(imgRef)
                                .then((url)=>{
                                    const img = new Image();
                                    img.src = url
                                    img.onload = () => setLoading(false);
                                    img.onerror = (error) => {
                                        console.error('Failed to load image:', error);  // 로딩 중에 발생하는 에러를 콘솔에 출력
                                        setLoading(false);  // 이미지 로딩이 실패한 경우에도 로딩 상태를 false로 설정
                                    };
                                    mm.lowLogoUrl = url; // 어레이일 필요가 없어서
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                };

                if(isObjects){
                    getUrls(mm, objsUrlArr, "object", ref);
                }else{
                    mm.objsUrl = [];
                };

                if(isVideo){ // 비디오가 여러개일 경우 수정 필요함..
                    getUrls(mm, vidsUrlArr, "video", ref);
                }else{
                    mm.vidsUrl = [];
                };

                if(isPlane){
                    getUrls(mm, planesUrlArr, "plane", ref);
                }else{
                    mm.planesUrl = [];
                };

                if(isLogo){
                    const logoRef = ref(imagesRef, `assets/logo`);
                    listAll(logoRef)
                        .then((res)=>{
                            res.items.forEach((itemRef) => {
                                if(itemRef.name === mm.logo[1]){
                                    getDownloadURL(itemRef)
                                        .then((url)=>{
                                            mm.logoUrl = url;
                                        })
                                        .catch((err)=>console.log(err));
                                }
                            });
                        })
                        .catch((err)=>console.log(err))
                }else{
                    mm.logoUrl = '';
                };

                if(isBgm){
                    const bgmsRef = ref(storage, `bgms/assets${mm.route}`);
                    listAll(bgmsRef)
                        .then((res) => {
                            res.items.forEach((itemRef) => {
                                // console.log(itemRef.name)
                                mm.songNames.push(itemRef.name); // 여기 하나더 있음..
                                getDownloadURL(itemRef)
                                    .then((url) => {
                                        bgmsUrlArr.push(url);
                                        return bgmsUrlArr;
                                    })
                                    .then((arr)=>{
                                        mm.bgmsUrl = arr;
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    });
                            });
                        }).catch((error) => {
                            console.log(error)
                        });
                    const cdRef = ref(imagesRef, `assets/bgmLogo${mm.route}`);
                    listAll(cdRef)
                        .then((res)=>{
                            res.items.forEach((itemRef) => {
                                getDownloadURL(itemRef)
                                    .then((url)=>{
                                        cdUrlArr.push(url);
                                        return cdUrlArr;
                                    })
                                    .then((arr)=>{
                                        mm.cdUrl = arr;
                                    })
                                    .catch((err)=>console.log(err));
                            });
                        })
                        .catch((err)=>console.log(err))
                }else{
                    mm.bgmsUrl = [];
                    mm.cdUrl = [];
                }
                return mm
            }     
        };

        const modelQuery = query(collection(db, 'mp_models'), where("name", "==", name));
        getDocs(modelQuery)
            .then((snapshot)=>{
                snapshot.forEach((e)=>{
                    const result = firebaseSet(e.data());
                    // console.log(result)
                    setModel(result); // firebaseSet 함수 실행하여, 받아온 데이터를 수정하고 그것으로 setModel 스테이트 변경
                })
            })
            .catch(err => console.log(err))

        const analytics = isSupported() ? getAnalytics(firebaseApp) : null;
        logEvent(analytics, 'notification_received');

        if(loadingRef.current.clientHeight < 400 && window.parent){
            setEmbed(true);
        }

    })
    .catch(err=>console.log(err));
    },[name]);

    useEffect(()=>{
        let idleTime = 0;

        document.body.addEventListener('click',()=> idleTime = 0); // 자리비움 체크용

        const timer = setInterval(()=>{
            idleTime = idleTime + 1;

            console.log(idleTime)

            if (idleTime >= 5) { // 5 minutes
                // alert('장시간 화면클릭이 없어 새로고침됩니다.')
                window.location.reload();
            }
        }, 60000)

        return () => {
            document.body.removeEventListener('click',()=> idleTime = 0); 
            clearInterval(timer);
        }
    },[])
    
    return(
        <>
            <VideoContext.Provider value={videoRef}>
            <AudioContext.Provider value={audioRef}>
                {loading ? ( 
                        <div className='loading-back' ref={loadingRef}>
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div> 
                    ) : 
                    ( Object.keys(customModel).length >0 && ( <MainUiReload mpModels={customModel} embed={embed}></MainUiReload> ))
                }
                
            </AudioContext.Provider>
            </VideoContext.Provider>
        </>
    )
}
