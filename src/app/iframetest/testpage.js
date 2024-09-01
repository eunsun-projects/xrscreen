"use client"
import { useEffect, useRef, useState } from 'react'
import styles from "@/app/[slug]/styles.module.css"
import HelpLoader from "@/components/loaders/helploader"

const mouseHelpText = '마우스 휠을 통해 줌 인 줌 아웃이 가능합니다.\n마우스 드래그를 통해 공간을 둘러볼 수 있습니다.'
const keyboardHelpText = '키보드 방향키를 통해 위치를 이동할 수 있습니다.'

const embed = false;

export default function TestTest(){

    const [ startClassName, setClassName ] = useState(styles.start_button_image); // 스타트시 로고 노출

    const [ opacity, setOpacity ] = useState(0); // 스타트버튼 오퍼시티
    const [ opacityL, setOpacityL ] = useState(1); // 로딩 오퍼시티
    const [ opacityT, setOpacityT ] = useState(1); // 타이틀 오퍼시티
    const [ opacityB, setOpacityB ] = useState(1); // 하단로고 오퍼시티
    const [ pointerEv, setPointerEv ] = useState("all")

    const playBtn = useRef();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setOpacityL(0)
            setOpacity(1)
            clearTimeout(timer)
        }, 5000)
    },[])


    return(
        <div className={styles.loading_page} style={{ backgroundImage: `url('/assets/tests/defragmentation.webp')` }}>
            <div className={styles.tint}>
                <div className={styles.basic_title} style={{ opacity : opacityT, height : opacityT === 0 ? "20px" : "fit-content" }}>테스트임다</div>
                <div className={styles.start_button} >

                    <div className={styles.helpbox}>
                        <div className={styles.helpboxflex}>
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

                        <div className={styles.helpbottom} style={{position:"relative", width: "100%", height:"28%", display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", boxSizing: "border-box"}}>
                            <HelpLoader opacity={opacityL} embed={embed}/>
                            <div className={styles.start_button_box} ref={playBtn} style={{ pointerEvents: pointerEv, opacity : opacity }}><p>enter</p></div>
                        </div>
                    </div>

                    <div className={styles.basic_logo} style={{ backgroundImage : `url('/assets/tests/sujanggo.png')`, backgroundSize : 'contain', backgroundRepeat : "no-repeat", backgroundPosition :"center"}}></div>
                </div>
            </div>
        </div>
    )
}

{/* <div className={styles.loading_page} style={{ backgroundImage: `url('${mpModels.backUrl}')` }}>
    <div className={styles.tint}>
        <div className={styles.basic_title} style={{ opacity : opacityT, height : opacityT === 0 ? "20px" : "fit-content" }} dangerouslySetInnerHTML={{__html : mpModels.title }}></div>
        <div className={styles.start_button} >
            
            {embed === false && (
                <>
                    <div className="loading" style={{ opacity : opacityL }}>loading</div>
                    <div className="lds-ellipsis" style={{ opacity : opacityL }}><div></div><div></div><div></div><div></div></div>
                </>
            )}
                
            <div className={startClassName} ref={playBtn} style={{ pointerEvents: pointerEv, opacity : opacity }} onClick={handleStart}></div>
            <div className={styles.basic_logo} style={{ opacity : opacityB }} ></div>
            { mpModels.downLogo[0] && ( <div className={styles.basic_logo} style={{ backgroundImage : `url('${mpModels.lowLogoUrl}')`, backgroundSize : 'contain', backgroundRepeat : "no-repeat", backgroundPosition :"center"}}></div> )}
        </div>
    </div>
</div> */}