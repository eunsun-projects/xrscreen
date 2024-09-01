"use client"
import styles from './page.module.css';

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const vanko = /vanko/gi;

export default function Hubbtn({item}){

    const mainClick = () => {
        window.location.href = item.url
    };

    if(korean.test(item.text)){
        return(
            <div className={styles.navitem} onClick={mainClick} style={{fontSize: "1rem"}}>{item.text}</div>
        )
    }else if(vanko.test(item.text)){
        return(
            <div className={styles.navitem} onClick={mainClick} style={{color: "white", textShadow:'0 0 10px white', border:'1px solid black', backgroundImage:'url(/assets/etc/starpixel.webp)', backgroundSize:'10rem'}}>{item.text}</div>
        )
    }else{
        return(
            <div className={styles.navitem} onClick={mainClick} >{item.text}</div>
        )
    }
    
}