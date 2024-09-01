"use client"
import styles from "@/app/vas/[slug]/page.module.css"
import { useState } from "react"

export default function VasCaption({bool, info}){
    const [big, setBig] = useState(false);

    const handleBig = () => {
        setBig(true);
    }
    const handleSmall = () => {
        setBig(false);
    }

    return(
        <div style={{display: bool === true ? 'block':'none'}}>
            
            {/* 여기를 안보이게 하고*/}
            <div className={styles.workinfo} style={{display: big === false ? 'block' : 'none'}}>
                <h3>{info.title}</h3>
                {/* span을 클릭하면 */}
                <span className={`${styles.materialicons} ${styles.infofull}`} onClick={handleBig}>open_in_full</span>
                <p>{'artist : ' + info.artist}</p>
                <p>{'year : ' + info.year}</p>
                <p>{'material : ' + info.mate}</p>
            </div>

            {/* 여기를 보이게하고*/}
            <div className={styles.bigtxt} style={{display: big === true ? 'block' : 'none'}}>
                {/* <h3></h3> */}
                {/* span을 클릭하면 */}
                <span className={`${styles.materialicons} ${styles.infoclose}`} onClick={handleSmall}>close_fullscreen</span>
                <p>{'artist : ' + info.artist}</p>
                <p>{'year : ' + info.year}</p>
                <p>{'material : ' + info.mate}</p>
                <p style={{whiteSpace:"pre-line"}}>{'introduction : \n' + info.desc}</p>
            </div>

        </div>
    )
}