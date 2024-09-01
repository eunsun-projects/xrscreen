import { inputData, objs } from './data-sujanggo.js';
import randomString from '../utils/randomstring.js';

export default async function modelSujanggo(mpSdk, mpModels, tagData, tagAttachData){
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

    const customTags = [];
    const customAttach = [];
    const tempRandomStr = [];

    tagAttachData.forEach(e => customAttach.push({...e}));   

    for(let i = 0; inputData.length > i; i++){ // 입력한 데이터 길이만큼 랜덤스트링 11자 생성, 어태치먼트 아이디 값으로 쓰기위해
        tempRandomStr[i] ??= randomString(11);
    };
    
    const reduced = origin.slice(1); // 인덱스 0번 모델 안쓸것이므로 새배열 생성

    reduced.forEach((e,i)=>{ // 받아온 모델 url 값을 inputData 에 적용
        inputData[i].url = e;
    });

    inputData.forEach((e,i) => { // 어태치먼트 아이디 랜덤스트링으로 적용, 타입은 rich 타입
        customAttach[i] ??= {
            id : tempRandomStr[i],
            src : e.url,
            type : "tag.attachment.rich"
        }  
    });

    inputData.forEach((e,i) =>{ // 입력한 데이터 값으로 커스텀태그 객체 값 적용
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

    tagData.forEach((e)=>{
        customTags.push({...e});
    })

    customTags.forEach(e => {
        mpSdk.Tag.add(e);
        // tagData.push({...e});
    });

    origin.forEach((e,i)=>{
        objs[i].url = e;
    });

    //function that provides access to three.js framework objects. 
    await mpSdk.Scene.configure(function(renderer, three, ){
        // configure PBR
        renderer.physicallyCorrectLights = true;
        // configure shadow mapping
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.bias = -0.0001;
        renderer.shadowMap.type = three.PCFSoftShadowMap;
    });

    const lights = {
        "version": "1.0",
        "initial_light_1": {
            "enabled": true,
            "color": {"r": 255,"g": 255,"b": 255},
            "intensity": 0.003
        },
        "initial_light_2": {
            "enabled": true,
            "intensity": 0.006,
            "color": { "r": 160,"g": 160,"b": 160},
            "position": { "x": 9.7,"y": 5,"z": -0.8},
            "distance": 0,
            "decay": 1,
            "castShadow": true,
            "debug": false
        },
        "initial_light_box": {
            "enabled": true,
            "intensity": 0.0013,
            "color": { "r": 255,"g": 255,"b": 255},
            "position": { "x": 1,"y": 2,"z": -1},
            "target":{"x": -0.63,"y": 0.65,"z": -1.25},
            "decay":10,
            "castShadow": true,
        },
        "initial_light_point": {
            "enabled": true,
            "intensity": 0.006,
            "color": { "r": 255,"g": 255,"b": 200},
            "position": { "x": 3.2,"y": 6,"z": -1.6},
            "distance": 0,
            "decay":1,
            "castShadow": true,
        },
        "initial_light_3": {
            "enabled": true,
            "color": {"r": 255,"g": 230,"b": 175},
            "intensity": 0.003,
            "distance": 8,
            "castShadow": true,
            "position": { "x": 11,"y": 7.5,"z": -5.9},
            "target":{"x": 11,"y": 0,"z": -5.9}
        },
        "initial_light_4": {
            "enabled": true,
            "color": {"r": 255,"g": 230,"b": 200},
            "intensity": 0.003,
            "distance": 8,
            "castShadow": true,
            "position": { "x": 5,"y": 7.5,"z": -3.7},
            "target":{"x": 5,"y": 0,"z": -3.7}
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
                let shadow_texture_url = "/assets/ui/shadow_blur.png";
                const shadowTexture = new THREE.TextureLoader().load(shadow_texture_url);
                const shadowMat = new THREE.MeshBasicMaterial({
                map: shadowTexture,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                shadowSide: null,
                });
                
                objs.forEach(obj => {
                    let shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
                    shadowMesh.position.set(obj.shadowPosition.x, obj.shadowPosition.y, obj.shadowPosition.z);
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
    //global light_1
    sceneObject.addNode().addComponent('mp.ambientLight', lights.initial_light_1);
    //point light_2
    sceneObject.addNode().addComponent('mp.pointLight', lights.initial_light_2);
    //directional light_box
    sceneObject.addNode().addComponent('mp.directionalLight', lights.initial_light_box);
    //directional light_point
    sceneObject.addNode().addComponent('mp.pointLight', lights.initial_light_point);
    //directional light_3
    sceneObject.addNode().addComponent('mp.directionalLight', lights.initial_light_3);
    //directional light_4
    sceneObject.addNode().addComponent('mp.directionalLight', lights.initial_light_4);
    
    //model loop
    objs.forEach(obj => sceneObject.addNode().addComponent('mp.gltfLoader', obj));

    //shadowAdd
    sceneObject.addNode().addComponent('makeShadow', shadowFactory);

    sceneObject.start();

    console.log('%c 3d object Loaded!', 'background: #333333; color: #8dceff')
    return [ customTags, customAttach, videoXyz, controlXyz ]

}



