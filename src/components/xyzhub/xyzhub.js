"use client"
import {React, useEffect, useState} from "react"
import styles from './page.module.css';
import { firebaseInitHub, analytics } from "@/firebase/firebaseClient";
import { logEvent } from "firebase/analytics";

const screenName = 'xyzhub'; // 현재 화면의 이름
const screenClass = 'Xyzhub'; // 현재 화면을 나타내는 클래스 또는 컴포넌트의 이름

function Xyzhub({hubs}){
    const [examOpen, setExamOpen] = useState(false);
    const [spaceOpen, setSpaceOpen] = useState(false);
    const [example, setExample] = useState(hubs[1]);
    const [space, setSpace] = useState(hubs[2]);

    const handleExam = () => {
        setExamOpen(!examOpen)
    };
    const handleSpace = () => {
        setSpaceOpen(!spaceOpen)
    };

    const examClick = (e) => () => {
        window.location.href = e.url
    };

    const spaceClick = (e) => () => {
        window.location.href = e.url
    };

    useEffect(()=>{

        firebaseInitHub()
            .then((screenhub)=>{
                const example = Object.values(screenhub[0]); // 다양한 샘플
                    example.sort((a,b) => {
                        if (a.num > b.num) return 1;
                        if (a.num < b.num) return -1;
                        return 0;
                    });
                setExample(example);
                const space = Object.values(screenhub[2]); // vr 공간
                    space.sort((a,b) => {
                        if (a.num > b.num) return 1;
                        if (a.num < b.num) return -1;
                        return 0;
                    });
                setSpace(space);
            })
            .catch(err => console.log(err));

            analytics
                .then((a)=>{
                    // 그 후 Firebase Analytics에 로그를 보냅니다.
                    logEvent(a, 'screen_view', {
                        firebase_screen: screenName,
                        firebase_screen_class: screenClass
                    });
                })
                .catch(err => console.log(err))

    }, [])

    return(
        <>      
            <div className={styles.navmenu} style={{marginTop:"2rem"}}>
                <div className={styles.navitem} onClick={handleExam}><p style={{fontSize:'1rem'}}>PROEJECT_WEB</p></div>
                {examOpen && example && (
                    <ul className={styles.navitembox} style={{marginBlockStart: '0px', marginBlockEnd: '0px', paddingInlineStart: '0px'}}>
                        {
                            example.map((e, i) => {
                                return(
                                    <li className={styles.navitem} key={i} onClick={examClick(e)}><p>{e.text}</p></li>
                                )
                            })
                        }
                    </ul>
                )}
            </div>
            
            <div className={styles.navmenu} style={{marginTop:"2rem"}}>
                <div className={styles.navitem} onClick={handleSpace}><p style={{fontSize:'1rem'}}>PROJECT_VR</p></div>
                {spaceOpen && space && (
                    <ul className={styles.navitembox} style={{marginBlockStart: '0px', marginBlockEnd: '0px', paddingInlineStart: '0px'}}>
                        {
                            space.map((e, i)=>{
                                return(
                                    <li className={styles.navitem} key={i} onClick={spaceClick(e)}><p>{e.text}</p></li>
                                )
                            })
                        }
                    </ul>
                )}
            </div>
        </>
    )
}
export default Xyzhub;