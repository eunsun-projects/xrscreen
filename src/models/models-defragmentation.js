import { inputData, objectsToLoadY } from "./data-defragmentation";
import randomString from '../utils/randomstring.js';
import loadScene from "../utils/loadScene";

export default async function modelsDefragmentation(mpSdk, mpModels, tagData, tagAttachData){

    const videoXyz = {
        isVideo : true,
        position : [ 16.9, 4, 2.5],
        backPosition : [16.9, 4, 2.55],
        rotation : [0,-2.9,0], 
        scale : [2.5,4.5,2.5]
    };

    const controlXyz = {
        isControl : true,
        position : [16.9, 3.9, 2.48],
    };

    let origin = [...mpModels.objsUrl];
        origin.sort();

    /** ===================== 태그 작업 ========================= */

    await mpSdk.Asset.registerTexture('introduction', '/assets/ui/tagicon_intro.png');
    await mpSdk.Asset.registerTexture('poster', '/assets/ui/tagicon_poster.png');

    const customTags = [];  
    const customAttach = [];
    const tempRandomStr = [];

    // 태그 첨부파일 데이터 props 를 customAttach 배열에 푸쉬
    tagAttachData.forEach(e => customAttach.push({...e})); // tagAttachData 가 없을 경우(matterport 콘솔에서 태그 달지 않았을 경우) 빈 배열 리턴

    // 입력한 데이터 길이만큼 랜덤스트링 11자 생성, 어태치먼트 아이디 값으로 쓰기위해
    for(let i = 0; inputData.length > i; i++){ 
        tempRandomStr[i] ??= randomString(11);
    };

    // 받아온 모델 url 값을 생성할 모델 정보 객체의 url 에 저장
    // origin.forEach((e,i)=>{ 
    //     objectsToLoadY[i].inputs.url = e; 
    // });

    objectsToLoadY.forEach((e,i)=>{
        e.inputs.url = origin[i % origin.length];
    })

    // 받아온 모델 url 값을 inputData 에 적용, 태그 모달창 용
    // 처음 코드 디자인 할 때는 glb만 들어갈 것으로 생각했었는데, mp4도 넣어야 하는 상황이 됐으므로, firebase storage > glbs 폴더에 그냥 형식 맞춰서 mp4 넣을 것
    // origin.forEach((e,i)=>{ 
    //     inputData[i].url = e;
    // });

    inputData.forEach((e,i)=>{
        if(e.xyzAttach === "none"){
            e.url = "";
        }else if(e.xyzAttach === "mp4" || e.xyzAttach === "glb"){
            e.url = origin[e.number];
            // e.url = origin[i % origin.length];
        }else if(e.xyzAttach === "link"){
            e.url = "https://vimeo.com/855343258";
        }
    });

    const introAndPoster = inputData.filter((e,i)=>{
        return e.number === 10 || e.number === 21
    });

    // 어태치먼트 아이디 위에 생성해놓은 tempRandomStr 의 값으로 적용, 타입은 rich 타입
    inputData.forEach((e,i) => { 
        customAttach[i] ??= {
            id : tempRandomStr[i],
            src : e.url,
            type : "tag.attachment.rich"
        }  
    });

    // 입력한 데이터 값으로 커스텀태그 객체 값 적용
    inputData.forEach((e,i) =>{ 
        customTags[i] ??= {
            number : e.number,
            id : e.id,
            enabled : e.enabled,
            customAttach : [tempRandomStr[i]],
            color : e.color,
            label : e.label,
            description : e.description,
            stemVector : e.stemVector,
            stemHeight : e.stemHeight,
            stemVisible : e.stemVisible,
            floorIndex : e.floorIndex,
            roomId: e.roomId,
            anchorPosition: e.anchorPosition
        }
    });

    // 메타포트 콘솔에서 생성한 태그 데이터가 있다면 커스텀태그 배열에 추가
    tagData.forEach((e)=>{ 
        customTags.push({...e});
    })

    // 커스텀 태그 배열을 기준으로 태그 생성!
    customTags.forEach(e => { 
        mpSdk.Tag.add(e);
        // tagData.push({...e});
    });


    // mpSdk.Tag.data.subscribe({
    //     onCollectionUpdated(collection) {
    //         console.log('The full collection of Tags looks like', collection);
    //     }
    // });
    // console.log(introAndPoster)
    await mpSdk.Tag.editIcon(introAndPoster[0].id, 'poster');
    await mpSdk.Tag.editIcon(introAndPoster[1].id, 'introduction');

    /** ================= 객체 작업 ==================== */

    //function that provides access to three.js framework objects. 
    await mpSdk.Scene.configure(function(renderer, three){
        // configure PBR
        renderer.physicallyCorrectLights = false;
        // configure shadow mapping
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.bias = -0.0001;
        renderer.shadowMap.type = three.PCFSoftShadowMap;
    });
    
    const lights = {
        "version": "1.0",
            "ambient": {
                "enabled": true,
                "color": {"r": 1,"g": 1,"b": 1},
                "intensity": 0.0001
            },
            "directional_joo": {
                "enabled": true,
                "intensity": 0.4,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": {
                    "x": 13,
                    "y": 10,
                    "z": -8
                },
                "target": {
                    "x": 11.78761950513903,
                    "y": 0,
                    "z": -2.2582975121618842
                },
                "castShadow": false,
                "debug": false
            },
            "directional_jang": {
                "enabled": true,
                "intensity": 0.4,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": { 
                    "x": 13,
                    "y": 10,
                    "z": -8
                },
                "target": {
                    'x': 21.76999854741998,
                    'y': 1.5,
                    'z': -8.986029396839877
                },
                "castShadow": false,
                "debug": false
            },
            "directional_oh": {
                "enabled": true,
                "intensity": 0.4,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": { 
                    "x": 13,
                    "y": 10,
                    "z": -8
                },
                "target": {
                    'x': 9.004537548053872,
                    'y': 0,
                    "z": -8.542391366439461
                },
                "castShadow": false,
                "debug": false
            },
            "point": {
                "enabled": true,
                "intensity": 0.08,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": { 
                    "x": 13,
                    "y": 10,
                    "z": -8
                },
                "distance": 0,
                "decay":1,
                "castShadow": false,
                "debug": false
            }
    };

    ///makeShadow///
    class makeShadow {
        constructor() {
            this.inputs = {
                visible: true,
            };
            this.onInit = function () {
                const THREE = this.context.three;
                const node = new THREE.Object3D();
        
                this.outputs.objectRoot = node;
        
                let shadowGeo = new THREE.PlaneGeometry(1, 1);
                const shadow_texture_url = "/assets/ui/shadow_blur_dark.png";
                const shadowTexture = new THREE.TextureLoader().load(shadow_texture_url);
                const shadowMat = new THREE.MeshBasicMaterial({
                    map: shadowTexture,
                    transparent: true,
                    depthWrite: false,
                    side: THREE.DoubleSide,
                    shadowSide: null,
                });
                
                objectsToLoadY.forEach(obj => {
                    let shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
                    shadowMesh.position.set(obj.shadowPosition.x, 0.03, obj.shadowPosition.z);
                    shadowMesh.scale.set(obj.shadowScale.x, obj.shadowScale.y, obj.shadowScale.z);
                    shadowMesh.rotation.set(1.57,0,0);
                    node.add(shadowMesh);

                })
            }
        }
    };
    function shadowFactory() {
        return new makeShadow();
    };
    mpSdk.Scene.register('makeShadow', shadowFactory);

    const [sceneObject] = await mpSdk.Scene.createObjects(1);
    // amb light
    // sceneObject.addNode().addComponent('mp.ambientLight', lights.ambient);
    // directional light
    sceneObject.addNode().addComponent('mp.directionalLight', lights.directional_joo);
    sceneObject.addNode().addComponent('mp.directionalLight', lights.directional_jang);
    sceneObject.addNode().addComponent('mp.directionalLight', lights.directional_oh);
    // point light
    // sceneObject.addNode().addComponent('mp.pointLight', lights.point);

    const customNode = sceneObject.addNode();
    customNode.addComponent('makeShadow', shadowFactory);

    const toBind = await loadScene(sceneObject, objectsToLoadY, 'y');   

    sceneObject.start();


    console.log('%c 3d object Loaded!', 'background: #333333; color: #8dceff');

    // 커스텀 태그일 경우 customTag 와 customAttach 리턴 + 기본 비디오, 컨트롤 객체 리턴
    return [ customTags, customAttach, videoXyz, controlXyz ];
}