"use client"
import styles from "@/app/vas/[slug]/page.module.css"
import Vas from "@/class/vasclass"
import { useEffect, useRef, useState } from "react"
import VasKeyarrow from "./vaskeyarrow"
import useLoadingCounter from "@/hooks/useLoadingState"
import useBoolState from "@/hooks/useBoolState"
import VasCaption from "./vascaption"
import textures from '@/components/vasdata/textureinfo';
import gltfObjs from '@/components/vasdata/modelsinfo'
import lights from '@/components/vasdata/lightinfo';
import paintings from "../vasdata/paintinginfo";
import sanctumLights from "@/app/vas/sanctum/data/lightinfo";
import sanctumModels from "@/app/vas/sanctum/data/modelsinfo";
import sanctumTextures from "@/app/vas/sanctum/data/textureinfo";
import Sanctum from "@/class/sanctumclass"

export default function VasCanvas({title, mobile, enter}){

    const [vasApp, setVasApp] = useState(null);
    const [nipplejs, setNipplejs] = useState(null);
    const [options, setOptions] = useState(null);
    const [counter, actions] = useLoadingCounter();
    const [isInfo, boolActions] = useBoolState();

    const canvasDivRef = useRef();
    const joysticRef = useRef();
    const raf = useRef();

    useEffect(()=>{
        let app;
        // 클래스 인스턴스 생성
        if(title === 'sanctum'){
            app = new Sanctum(canvasDivRef.current, title, actions, boolActions, sanctumTextures, [], sanctumModels, sanctumLights);
            setVasApp(app);
        }else{
            app = new Vas(canvasDivRef.current, title, actions, boolActions, textures, paintings, gltfObjs, lights);
            // 클래스 인스턴스 state 저장
            setVasApp(app);
        }

        // 초기화 및 설정 메소드 호출
        // vasApp.init(); // 초기화는 인스턴스 안에서
        app.addWorldLight(); // 빛 추가 시작
        app.addWallFloorCeiling(); // 벽 바닥 천장 추가 시작
        app.addModelAndLight(); // 모델 및 빛 추가 (있을경우) 시작
        app.addPaintings(); // 2d 작품 추가 (있을경우) 시작
        app.addPedestal(); // 좌대 추가 (true 인경우) 시작
        app.rotate(); // 화면 회전 기능 추가 시작
        app.onKeydownUp(); // 키보드로 이동기능 추가 시작

        // 이벤트 핸들러 등록
        window.onresize = app.resize.bind(app);
        // 초기 사이즈 조정
        app.resize();

        // 렌더링 루프 시작
        function animate() {
            app.render(); // 실제 렌더링 함수
            raf.current = requestAnimationFrame(animate);
        }
        animate();

        // 클린업 함수
        return () => {
            app.destroy();
            if (raf.current) {
                cancelAnimationFrame(raf.current);
            }
            // 이벤트 핸들러 제거
            window.onresize = null;
        };
    },[])


    useEffect(()=>{
        if(mobile){
            const options = { 
                zone : joysticRef.current, 
                mode : 'static',
                position : { right: '50%', bottom: '50%' },
                // threshold : 0.1,
                size : 70
            };
            const nipplejs = require('nipplejs');
            setNipplejs(nipplejs);
            setOptions(options);
        } 
    },[mobile]);

    useEffect(()=>{
        if(!vasApp) return;
        if(!mobile) return;

        const manager = nipplejs.create(options);

        manager.on('move', (event, data) => {
            if(data.direction && data.angle.radian) {
                const radian = data.angle.radian; // radian 판단
                if (!vasApp.checkCollision()) { // 충돌 상태가 아닐 때만 움직임을 처리
                    if(radian < 0.524 || radian > 5.756) { // right
                        vasApp.controls.w = false;
                        vasApp.controls.a = false;
                        vasApp.controls.s = false;
                        vasApp.controls.d = true;
                    } else if(radian < 1.046 && radian > 0.524) { // right up
                        vasApp.controls.w = true;
                        vasApp.controls.a = false;
                        vasApp.controls.s = false;
                        vasApp.controls.d = true;
                    } else if(radian < 2.092 && radian > 1.046) { // up
                        vasApp.controls.w = true;
                        vasApp.controls.a = false;
                        vasApp.controls.s = false;
                        vasApp.controls.d = false;
                    } else if(radian < 2.615 && radian > 2.092) { // left up
                        vasApp.controls.w = true;
                        vasApp.controls.a = true;
                        vasApp.controls.s = false;
                        vasApp.controls.d = false;
                    } else if(radian < 3.662 && radian > 2.615) { // left
                        vasApp.controls.w = false;
                        vasApp.controls.a = true;
                        vasApp.controls.s = false;
                        vasApp.controls.d = false;
                    } else if(radian < 4.186 && radian > 3.662) { // left down
                        vasApp.controls.w = false;
                        vasApp.controls.a = true;
                        vasApp.controls.s = true;
                        vasApp.controls.d = false;
                    } else if(radian < 5.233 && radian > 4.186) { // down
                        vasApp.controls.w = false;
                        vasApp.controls.a = false;
                        vasApp.controls.s = true;
                        vasApp.controls.d = false;
                    } else if(radian < 5.756 && radian > 5.233) { // down right
                        vasApp.controls.w = false;
                        vasApp.controls.a = false;
                        vasApp.controls.s = true;
                        vasApp.controls.d = true;
                    }
                } 
            }
        });

        manager.on('end', () => {
            // console.log('end')
            vasApp.controls.w = false;
            vasApp.controls.a = false;
            vasApp.controls.s = false;
            vasApp.controls.d = false;
        });

        // 컴포넌트가 unmount될 때 이벤트 리스너와 객체를 정리합니다.
        return () => {
            if(manager) manager.destroy();
        };
    }, [vasApp, nipplejs, mobile, options]);

    return(
        <>  
            <div style={{width : "100%", height: "100%", position: "absolute", pointerEvents: "none", display: mobile ? "block" : "none"}}>
                <div ref={joysticRef} style={{width : "100px", height: "100px", position: "absolute", right: "1%", bottom : "4%",  zIndex: "100", pointerEvents: enter ? "all" : "none"}}></div>
            </div>

            <div className={styles.canvastop} ref={canvasDivRef}></div>
            
            {vasApp && <VasKeyarrow vas={vasApp} mobile={mobile} />} 
            {isInfo.bool && <VasCaption bool={isInfo.bool} info={isInfo.info}/>}
        </>
    )
}