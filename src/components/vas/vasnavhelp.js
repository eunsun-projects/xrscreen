"use client"
import styles from "@/app/vas/[slug]/page.module.css"
import VasIntro from "./vasintro"
import { useState } from "react"
import Link from "next/link"
import VasCanvas from "./vascanvas"

export default function VasNavHelp({title, mobile}){

    const [enter, setEnter] = useState(false);

    const handlePause = () => {
        setEnter(false)
    }
    
    return(
        <>
            <div className={styles.vastopnav}>
                <div className={styles.topnavbox} onClick={handlePause}>
                    <span className={styles.materialicons}>pause</span>
                </div>
                <Link href={'/vas'} style={{ color : "white"}}>
                    <div className={styles.topnavbox}>
                        <span className={styles.materialicons}>close</span>
                    </div>
                </Link>
                <Link href={'/'} style={{ color : "white"}}>
                    <div className={styles.topnavbox}>
                        <span className={styles.materialicons}>home</span>
                    </div>
                </Link>
            </div>

            {!enter && <VasIntro title={title} setEnter={setEnter} />}

            <div className={styles.worksinfo}></div>

            {!enter && <div className={styles.filtered}></div>}

            {mobile !== null && <VasCanvas title={title} mobile={mobile} enter={enter}/>}
            
        </>
    )
}