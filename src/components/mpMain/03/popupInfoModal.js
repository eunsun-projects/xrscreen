"use client"
import { React, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setIsInfoPopup } from "@/store/store.js";
import styles from '@/app/[slug]/styles.module.css';

export default function PopupInfoModal({iframe, modelInfo, mpModels}){  

    const isInfoPopup = useSelector((state)=>state.isInfoPopup.value);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState('');
    // const [imgSrc, setImgSrc] = useState('');
    const popupRef = useRef();

    // console.log(mpModels)

    const handleExit = () => { // x 버튼 클릭시
        dispatch(setIsInfoPopup(false));
        setIsOpen(!isOpen);
    };

    const infoSum = () => {
        const originPhone = modelInfo.phone.replace(/\+1/, ""); // 메타포트 디테일 입력시 전화번호 앞에 +1 붙일것

        let changedPhone;
            if(originPhone.length === 12){
                changedPhone = originPhone.replace(/(^02.{0}|^01.{1}|[0-9]{4})([0-9]*)([0-9]{4})/g, "$1-$2-$3");
            }else{
                changedPhone = originPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]*)([0-9]{4})/g, "$1-$2-$3");
            }
        setPhone(changedPhone);
    }

    useEffect(() => {
        infoSum();
        // console.log(mpModels)
        // setImgSrc(mpModels.lowLogoUrl); // `/assets/logo/${mpModels.logo[1]}`
    }, []);

    useEffect(()=>{

        const handleClickOutside = (event) => {
            if(popupRef.current && !popupRef.current.contains(event.target)){
                dispatch(setIsInfoPopup(false));
            }
        };

        let innerIframe;
        if (iframe) {
            innerIframe = iframe.contentWindow.document;
            innerIframe.body.addEventListener('mousedown', handleClickOutside); // click 대신 mousedown
            innerIframe.body.addEventListener('touchstart', handleClickOutside);
        };

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            if(iframe){
                innerIframe.body.removeEventListener('mousedown', handleClickOutside);
                innerIframe.body.removeEventListener('touchstart', handleClickOutside);
            } 
        };
    }, [iframe, popupRef])

    return(
        <>
            {isInfoPopup && (
                <div className={styles.popup_overlay} ref={popupRef}>
                    <div className={styles.popup_exit} onClick={handleExit}>x</div>
                    <div className={styles.txtArea}>
                        <div className={styles.txtTitleArea}>
                            <h2 className={styles.txtEleT}>{modelInfo.name}</h2>
                        </div>
                        {mpModels.logo[0] === true && (
                            <div className={styles.imgArea}>
                                <img src={mpModels.logoUrl} style={{ cursor : 'default' }} alt='thumbnail images'></img>
                            </div>
                        )}

                        <div className={styles.pArea}>
                            <p className={styles.txtEleP} dangerouslySetInnerHTML={{__html : modelInfo.summary }}></p>
                        </div>

                        {modelInfo.contactName.length > 0 && (
                            <div className={styles.pArea}>
                                <p className={styles.txtEleP}>{modelInfo.contactName}</p>
                            </div>
                        )}
                        
                        {modelInfo.contactEmail.length > 0 && (
                            <div className={styles.pArea}>
                                <p className={styles.txtEleP}>{modelInfo.contactEmail}</p>
                            </div>
                        )}

                        {modelInfo.phone.length > 0 && (
                            <div className={styles.pArea}>
                                <p className={styles.txtEleP}>{phone}</p>
                            </div>
                        )}

                        {modelInfo.formattedAddress.length > 0 && (
                            <div className={styles.pArea}>
                                <p className={styles.txtEleP}>{modelInfo.formattedAddress }</p>
                            </div>
                        )}

                        {modelInfo.externalUrl.length > 0 ?? (
                            <div className={styles.pArea}>
                                <p className={styles.txtEleP}>{modelInfo.externalUrl}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}   
        </>
    )
}