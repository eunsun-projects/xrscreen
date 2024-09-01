import { inputData, objectsToLoadY } from "./data-gpuonline.js";
import randomString from '../utils/randomstring.js';
import loadScene from "../utils/loadScene";
import makeShadowMat from "@/class/shadowMat.js";

export default async function modelsDefragmentation(mpSdk, mpModels, tagData, tagAttachData){

    const videoXyz = {
        isVideo : false,
        position : [0,0,0],
        backPosition : [0,0,0],
        rotation : [0,0,0], 
        scale : [0,0,0]
    };
    const controlXyz = {
        isControl : false,
        position : [0,0,0]
    };

    let origin = [...mpModels.objsUrl];
        origin.sort();

    /** ===================== 태그 작업 ========================= */

    const customTags = [];  
    const customAttach = [];
    const tempRandomStr = [];

    // 태그 첨부파일 데이터 props 를 customAttach 배열에 푸쉬
    tagAttachData.forEach(e => customAttach.push({...e})); // tagAttachData 가 없을 경우(matterport 콘솔에서 태그 달지 않았을 경우) 빈 배열 리턴

    // 입력한 데이터 길이만큼 랜덤스트링 11자 생성, 어태치먼트 아이디 값으로 쓰기위해
    for(let i = 0; inputData.length > i; i++){ 
        tempRandomStr[i] ??= randomString(11);
    };

    objectsToLoadY.forEach((e,i)=>{
        e.inputs.url = origin[i % origin.length];
    })

    inputData.forEach((e,i)=>{
        if(e.xyzAttach === "none"){
            e.url = "";
        }else if(e.xyzAttach === "mp4" || e.xyzAttach === "glb"){
            e.url = origin[e.number];
            // e.url = origin[i % origin.length];
        }else if(e.xyzAttach === "link"){
            e.url = ""; //https://vimeo.com/855343258
        }
    });

    // 태그 아이콘 변경하고 싶으면 inputData 배열에서 순서 찾아서 필터 돌리면 됨
    // const introAndPoster = inputData.filter((e,i)=>{
    //     return e.number === 10 || e.number === 21
    // });

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


    /** ================= 객체 작업 ==================== */

    //function that provides access to three.js framework objects. 
    // 그림자 캐스팅을 위해선 여기 설정이 꼭 필요함 
    await mpSdk.Scene.configure(function(renderer, three){
        // configure PBR
        renderer.physicallyCorrectLights = false; // 여기는 false 
        // configure shadow mapping
        renderer.shadowMap.enabled = true; // 여기는 true
        renderer.shadowMap.bias = -0.00001; //-0.000001
        renderer.shadowMap.type = three.PCFSoftShadowMap;
    });
    
    const lights = {
        "version": "1.0",
            "ambient": {
                "enabled": true,
                "color": {"r": 1,"g": 1,"b": 1},
                "intensity": 0.3,
                "name" : "amb",
                "castShadow" : true
            },
            "directional": {
                "enabled": true,
                "intensity": 0.5,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": {
                    "x": 3,
                    "y": 5,
                    "z": -1
                },
                "target": {
                    "x": 2,
                    "y": 0,
                    "z": -1
                },
                "castShadow": true,
                "debug": false
            },
            "point": {
                "enabled": true,
                "intensity": 1,
                "color": { "r": 1,"g": 1,"b": 1},
                "position": { 
                    "x": 2,
                    "y": 4,
                    "z": -1
                },
                "distance": 0,
                "decay":1,
                "castShadow": true,
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
    // function shadowFactory() {
    //     return new makeShadow();
    // };
    // mpSdk.Scene.register('makeShadow', shadowFactory);

    function shadowMatFactory(){
        return new makeShadowMat();
    };
    mpSdk.Scene.register('makeShadowMat', shadowMatFactory);

    const [sceneObject] = await mpSdk.Scene.createObjects(1);
    
    // amb light
    // sceneObject.addNode().addComponent('mp.ambientLight', lights.ambient);
    // directional light
    sceneObject.addNode().addComponent('mp.directionalLight', lights.ambient);

    // 그림자 캐스트를 위한 노드 생성
    const lightNode = sceneObject.addNode();

    lightNode.addComponent('mp.directionalLight', lights.directional);
    lightNode.addComponent('mp.pointLight', lights.point);

    lightNode.obj3D.castShadow = true;
    lightNode.obj3D.receiveShadow = true;

    // customNode 안쓸듯...
    const customNode = sceneObject.addNode();
    // customNode.addComponent('makeShadow', shadowFactory);
    // customNode.obj3D.castShadow = true;
    // customNode.obj3D.recieveShadow = true;

    const toBind = await loadScene(sceneObject, objectsToLoadY, 'y');   

    lightNode.addComponent('makeShadowMat', shadowMatFactory);

    sceneObject.start();


    console.log(lightNode.obj3D.children)

    // lightNode.obj3D.children[1] === pointLight
    lightNode.obj3D.children[1].children[0].shadow.radius = 8;
    lightNode.obj3D.children[1].children[0].shadow.mapSize.width = 1024;
    lightNode.obj3D.children[1].children[0].shadow.mapSize.height = 1024;
    lightNode.obj3D.children[1].children[0].shadow.camera.near = 1;
    lightNode.obj3D.children[1].children[0].shadow.camera.far = 10000;
    lightNode.obj3D.children[1].children[0].shadow.camera.focus = 1;
    // lightNode.obj3D.children[0].children[0].shadow.needsUpdate = true;


    console.log('%c 3d object Loaded!', 'background: #333333; color: #8dceff');

    // 커스텀 태그일 경우 customTag 와 customAttach 리턴 + 기본 비디오, 컨트롤 객체 리턴
    return [ customTags, customAttach, videoXyz, controlXyz ];
}