import newTagOn from "./newTagOn";
import tagSubscribe from "./tagSubscribe";
import appStateCheck from "./appStateChecker";
import setTagAttachment from "./setTagAttachments";
import setUniqueCategory from "./setUniqueCategory";
import classify from "./classify";
import makeSceneObject from "./makeSceneObject";
import customImporter from "./customimporter";

// async function LoadedShowcaseHandler(mpSdk, bindArr, videoRef){
async function LoadedShowcaseHandler(mpSdk, mpModels, videoRef, isPopup, setIspopup, setTagSid, changeLoadState, dispatch){
    try{
        /** ========= hide pointer ========= */
        const hidepointer = (mpSdk) => {
            mpSdk.Settings.update("features/cursor", false)
                .then(function (data) {
                    console.log('CURSOR : ' + data);
                });
        };
        /* ========= hide pucks ========= */
        const sweepPucks = (mpSdk) => {
            mpSdk.Settings.update("features/sweep_pucks", false)
                .then(function (data) {
                    console.log('PUCK : ' + data);
                });
        };
        


        /** =================== init ===================== */
        // 포인터, 퍽, 태그내비게이션 숨기기
        hidepointer(mpSdk);
        sweepPucks(mpSdk);

        // 태그 동작방식 변경
        newTagOn(mpSdk, isPopup, setIspopup, setTagSid, dispatch);
        // 매터포트로부터 태그데이터 가져오기
        const [ tags, attachs ] = await tagSubscribe(mpSdk);
        // 모델삽입있을 경우에만 작동하는 커스텀 임포터
        let [ customTagData, customTagAttachData, videoXyz, controlXyz ] = await customImporter(mpSdk, mpModels, tags, attachs);  
        // 태그 기본 설정 : 커스텀첨부와 기존첨부 하나로 합치기, 소트추출, 전체 소팅되어 있음
        customTagData = setTagAttachment(customTagData);
        // 드롭다운 생성을 위한 고유 카테고리 어레이 생성, 소팅 되어있음
        const uniqueCategory = setUniqueCategory(customTagData);
        // 드롭다운 생성을 위한 태그 합친것(분류안됨+분류됨), 분류안됨, 분류됨
        const [sumArr, unCategorized, categorized] = classify(customTagData, uniqueCategory);
        // 씬 오브젝트 생성(회색배경 비디오 등등)
        makeSceneObject(mpSdk, mpModels, videoRef, videoXyz, controlXyz);
        // 앱 스테이트 체크
        appStateCheck(mpSdk, customTagData, customTagAttachData, changeLoadState, dispatch);

        return [ sumArr, unCategorized, categorized, customTagAttachData, uniqueCategory ];
        
    }catch(error){
        console.log(error);
        throw(error);
    }
}
export default LoadedShowcaseHandler;

// const isVideo = bindArr[6].isVideo;
// const isControl = bindArr[7].isControl;    

// /** ============= init function =============== */
// hidepointer();
// sweepPucks();
// hideTagNav();
// // newTagOn(); 

// /** ========================= sceneObject line ======================== */
// /** ============ class make whiteSky ============ */
// function skyFactory() {
//     return new makeWhiteSky(mpSdk);
// };
// mpSdk.Scene.register('makeSky', skyFactory);
//     /** ============ class make Video ============ */
// function VideoFactory() {
//     return new makeVideo(mpSdk, videoRef.current, bindArr, isControl);
// };
// if(isVideo){
//     mpSdk.Scene.register('makeVideo', VideoFactory);
// }
// /** ============= class video controller ================ */
// function ppFactory() {
//     return new vidController(bindArr, mpSdk, videoRef.current);
// };
// if(isControl){
//     mpSdk.Scene.register('makePp', ppFactory);
// }
// const lights = {
//     "initial_light": {
//         "enabled": true,
//         "color": {"r": 1,"g": 1,"b": 1},
//         "intensity": 0.8
//     },
// }

// const [sceneObject] = await mpSdk.Scene.createObjects(1);
// sceneObject.addNode().addComponent('mp.ambientLight', lights.initial_light); //amb light
// sceneObject.addNode().addComponent('makeSky', skyFactory);
// // if(insertPlane){sceneObject.addNode().addComponent('makePlane', planeFactory);}
// if(isVideo){
//     sceneObject.addNode().addComponent('makeVideo', VideoFactory); 
//     if(isControl){
//         sceneObject.addNode().addComponent('makePp', ppFactory); 
//     } 
// }
// //Scene Start//
// sceneObject.start();