"use client"
import styles from "@/app/vas/[slug]/page.module.css"

export default function VasKeyarrow({vas, mobile}){

    const handleDown = (e) => {
        vas.onMoveKeyDown(e.target.dataset.arrow);
    }

    const handleUp = (e) => {
        vas.onMoveKeyUp(e.target.dataset.arrow);
    }

    return(
        <div className={styles.vaskeys} onMouseDown={handleDown} onMouseUp={handleUp} onTouchStart={handleDown} onTouchEnd={handleUp}>

            <div className={styles.vasarr} style={{position: "relative", top: "-4px", display: mobile ? "none" : "flex"}} data-arrow="ArrowUp">
                <span className={styles.materialicons} data-arrow="ArrowUp">arrow_upward</span>
            </div>

            <div className={styles.vaskeybelow} style={{display: mobile ? "none" : "flex"}}>
                <div className={styles.vasarr} data-arrow="ArrowLeft">
                    <span className={styles.materialicons} data-arrow="ArrowLeft">arrow_back</span>
                </div>
                <div className={styles.vasarr} data-arrow="ArrowDown">
                    <span className={styles.materialicons} data-arrow="ArrowDown">arrow_downward</span>
                </div>
                <div className={styles.vasarr} data-arrow="ArrowRight">
                    <span className={styles.materialicons} data-arrow="ArrowRight">arrow_forward</span>
                </div>
            </div>

            <div className={`${styles.vasarr} ${styles.xyzspace}`} style={{width: mobile ? "70px" : "96%", height:"12px",marginTop:"6px"}} data-arrow="space"></div>
        </div>
    )
}