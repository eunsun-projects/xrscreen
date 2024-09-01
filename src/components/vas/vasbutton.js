'use client'
import styles from '@/app/vas/page.module.css'
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function VasButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
    },[])

    return(
        <>
            <button onClick={toggleDropdown} className={styles.selectbtn}>select▼</button>
            {isOpen === true && (
                <ul className={styles.dropdownmenu}>
                    <Link href={'/vas/square'} style={{color:"#00ffbe"}}><li className={styles.dropdownitem}>정방형공간</li></Link>
                    <Link href={'/vas/rect'} style={{color:"#00ffbe"}}><li className={styles.dropdownitem}>세장형공간</li></Link>
                    <Link href={'/vas/dig'} style={{color:"#00ffbe"}}><li className={styles.dropdownitem}>ㄷ자형공간</li></Link>
                </ul>
            )}
        </>
    )
}