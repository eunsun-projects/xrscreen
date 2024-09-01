import loadScene from "../utils/loadScene";
import styles from '@/app/[slug]/styles.module.css';
import '@/app/globals.css';

export default async function modelsSrc(mpSdk, mpModels, tagData, tagAttachData){
    const videoXyz = {
        isVideo : true,
        position : [6.9,1.5,-1.9],
        backPosition : [6.91,1.5,-1.9],
        rotation : [0,-1.57,0], 
        scale : [1.2,1.2,1.2]
    };
    const controlXyz = {
        isControl : false,
        position : [0,0,0]
    };
    let origin = [...mpModels.objsUrl];
        origin.sort();
        // console.log(origin)

        const lights = {
            "version": "1.0",
                "initial_light_1": {
                    "enabled": true,
                    "color": {"r": 100,"g": 100,"b": 100},
                    "intensity": 0.015
                },
                "initial_light_2": {
                    "enabled": true,
                    "intensity": 0.008,
                    "color": { "r": 160,"g": 160,"b": 160},
                    "position": { "x": -1,"y": 1,"z": -3.6},
                    "distance": 1,
                    "decay": 1,
                    "castShadow": true,
                    "debug": false
                },
                "initial_light_point": {
                    "enabled": true,
                    "intensity": 0.008,
                    "color": { "r": 160,"g": 160,"b": 160},
                    "position": { "x": -1,"y": 1,"z": 3},
                    "distance": 0,
                    "decay":1,
                    "castShadow": true,
                }
            };  
    
        let container = document.createElement('div');
        container.setAttribute('class',`${styles.popup_overlay}`); 
        let upperdiv = document.querySelector(`.${styles.container_showcase}`);

        console.log(upperdiv)

        //makeShadow//
        class makeShadow {
            constructor() {
            this.inputs = {
                visible: true,
            };
            this.onInit = function () {
                const THREE = this.context.three;
                const node = new THREE.Object3D();
        
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
        
                const shadowMesh_1 = new THREE.Mesh(shadowGeo, shadowMat);
        
                shadowMesh_1.position.set(2.7, 0.05, -3.2);
                shadowMesh_1.scale.set(1.5, 1.5, 1.5);
                shadowMesh_1.rotation.set(1.57, 0, 0);
        
                node.add(shadowMesh_1);
        
                const shadowMesh_2 = new THREE.Mesh(shadowGeo, shadowMat);
        
                shadowMesh_2.position.set(2.7, 0.05, -3.2);
                shadowMesh_2.scale.set(1.5, 1.5, 1.5);
                shadowMesh_2.rotation.set(1.57, 0, 0);
        
                node.add(shadowMesh_2);
        
                const shadowMesh_3 = new THREE.Mesh(shadowGeo, shadowMat);
        
                shadowMesh_3.position.set(0.6, 0.05, -3.2);
                shadowMesh_3.scale.set(1.7, 1.7, 1.7);
                shadowMesh_3.rotation.set(1.57, 0, 0);
        
                node.add(shadowMesh_3);
        
                const shadowMesh_4 = new THREE.Mesh(shadowGeo, shadowMat);
        
                shadowMesh_4.position.set(0.6, 0.05, -3.2);
                shadowMesh_4.scale.set(1.7, 1.7, 1.7);
                shadowMesh_4.rotation.set(1.57, 0, 0);
        
                node.add(shadowMesh_4);
        
                this.outputs.objectRoot = node;
                this.outputs.collider = node;
            }
            }
        };
        function shadowFactory() {
            return new makeShadow();
        };
        mpSdk.Scene.register('makeShadow', shadowFactory);
    
        //custombillboard//
        class makeBoard {
            eventType = 'INTERACTION.CLICK';
            constructor(){
            this.inputs = {
                visible: false,
            };
            this.onInit = function () {
            
                // Exit
                let exit = document.createElement('div');
                exit.setAttribute('class', `${styles.popup_exit}`);
                exit.innerText = "x";
                container.insertAdjacentElement('beforeend', exit);
                
                let area = document.createElement('div');
                area.setAttribute('class', 'imgArea');
                        
                let area_img = document.createElement('img');
                area_img.setAttribute('src', "/assets/etc/longpage.jpg");
                area_img.style.maxHeight = '300vh';
                area_img.style.width = '100%';
                
                area.insertAdjacentElement('afterbegin', area_img);
                container.insertAdjacentElement('beforeend', area);
                exit.addEventListener('click', e => {
                    container.remove();
                });
            }
            this.onEvent = function() {
            }
            }
        };
        function boardFactory() {
            return new makeBoard();
        };
        mpSdk.Scene.register('makeBoard', boardFactory);
    
        //function that provides access to three.js framework objects//
        await mpSdk.Scene.configure(function(renderer, three){
            renderer.physicallyCorrectLights = true; // configure PBR
            renderer.shadowMap.enabled = false; // configure shadow mapping
            renderer.shadowMap.bias = -0.0001;
            renderer.shadowMap.type = three.PCFSoftShadowMap;
        });
    
        const [sceneObject] = await mpSdk.Scene.createObjects(1);
        //amb light_1
        sceneObject.addNode().addComponent('mp.ambientLight', lights.initial_light_1);
        //direct light_1
        sceneObject.addNode().addComponent('mp.directionalLight', lights.initial_light_2);
        //direct light_2
        sceneObject.addNode().addComponent('mp.directionalLight', lights.initial_light_point);
    
        const customNode = sceneObject.addNode();
        customNode.addComponent('makeShadow', shadowFactory);
        customNode.addComponent('makeBoard', boardFactory);
        customNode.start();

        const stopNode = sceneObject.addNode();
        const stopobjs = [
            {
                "obj" : {
                    "visible" : true,
                    "url" : origin[0],
                    "localScale" : {"x": 0.14, "y": 0.14, "z": 0.14},
                    "localRotation" : {"x": 0, "y": 0, "z": 0},
                    "localPosition": {"x": 0.8, "y": 1.12, "z": -1.2},
                }},
            {
                "obj" : {
                    "visible" : true,
                    "url" : origin[1],
                    "localScale" : {"x": 0.12, "y": 0.12, "z": 0.12},
                    "localRotation" : {"x": 0, "y": 0, "z": 0},
                    "localPosition": {"x": 6.75, "y": 1.05, "z": -3.55},
                }
            }
        ];
        const stopmodels = stopobjs.map(model => model.obj);
        stopmodels.forEach(obj => stopNode.addComponent('mp.gltfLoader', obj));
        stopNode.start();
    
        const clickableObjs = {
                "pink" : {
                    "name" : "pink",
                    "visible" : true,
                    "url" : origin[2],
                    "localScale" : {"x": 0.071, "y": 0.071, "z": 0.071},
                    "localRotation" : {"x": 0, "y": 0, "z": 0},
                    "localPosition": {"x": 5.56, "y": 0, "z": -1.448},
                },
                "boy" : {
                    "visible" : true,
                    "url" : origin[3],
                    "localScale" : {"x": 0.188, "y": 0.188, "z": 0.188},
                    "localRotation" : {"x": 0, "y": 0, "z": 0},
                    "localPosition": {"x": 0.6, "y": -0.1, "z": -3.2},
                },
            };
                
        const input_node = sceneObject.addNode('input_node');
        const pinkobjcomp = input_node.addComponent('mp.gltfLoader', clickableObjs.pink);
        const boycomp = input_node.addComponent('mp.gltfLoader', clickableObjs.boy);
        const inputComponent = input_node.addComponent('mp.input', {
            eventsEnabled: true,
            userNavigationEnabled: true,
        });
        input_node.start();
        const emit_path_1 = sceneObject.addPath({
            id: 'clicklistener_1',
            type: mpSdk.Scene.PathType.EMIT,
            node: input_node,
            component: pinkobjcomp,
            property: 'INTERACTION.CLICK',
        });
        const emit_path_2 = sceneObject.addPath({
            id: 'clicklistener_2',
            type: mpSdk.Scene.PathType.EMIT,
            node: input_node,
            component: boycomp,
            property: 'INTERACTION.CLICK',
        });
                
        const emit_spy_1 = {
            path: emit_path_1,
            onInit() {    
            },
            onEvent(event) {
                console.log('ImageBox Clicked', event);  
                if(container) {
                    container.remove();
                    new makeBoard();
                    upperdiv.insertAdjacentElement('afterbegin', container);
                    preventScale();
                    lightBoxSet();
                    }
                else{
                    new makeBoard();
                    upperdiv.insertAdjacentElement('afterbegin', container);
                    preventScale();
                    lightBoxSet();
                    }
            }
        };
        sceneObject.spyOnEvent(emit_spy_1);
                
        const emit_spy_2 = {
            path: emit_path_2,
            onInit() {
            },
            onEvent(event) {
                console.log('ImageBox Clicked', event);
                if(container) {
                    container.remove();
                    new makeBoard();
                    upperdiv.insertAdjacentElement('afterbegin', container);
                    preventScale();
                    lightBoxSet();
                    }
                else{
                    new makeBoard();
                    upperdiv.insertAdjacentElement('afterbegin', container);
                    preventScale();
                    lightBoxSet();
                    }
            } 
        }
        sceneObject.spyOnEvent(emit_spy_2);
                            
        //models to load
        const objectsToLoadY = [
            {
                id: 'yongjun',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [2, 1.2, 0.3],
                rotation: [0, 0, 0],
                scale: [0.04, 0.04, 0.04],
            },
            {
                id: 'misun',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [2.5, 1, 0.3],
                rotation: [0, 0, 0],
                scale: [0.015, 0.015, 0.015],
            },
            {
                id: 'kooning',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [5, 1.3, -3.2],
                rotation: [0, 0, 0],
                scale: [0.07, 0.07, 0.07],
            },
            {
                id: 'ryuin',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [5.8, 1.3, -3.2],
                rotation: [0, 0, 0],
                scale: [0.067, 0.067, 0.067],
            },
            {
                id: 'picasso',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [4, 1.4, -3.2],
                rotation: [0, 0, 0],
                scale: [0.075, 0.075, 0.075],
            },
            {
                id: 'chicken',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [2.7, 0, -3.2],
                rotation: [0, 0, 0],
                scale: [0.35, 0.35, 0.35],
            },
            {
                id: 'headstower',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [-0.7, 0.55, -0.85],
                rotation: [0, 0, 0],
                scale: [0.1, 0.1, 0.1],
            },
            {
                id: 'head_1',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [4, 1.77, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_4',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [4, 1.33, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_7',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [4, 0.85, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_2',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [3.5, 1.77, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_5',
                type: 'mp.gltfLoader',
                inputs: {
                    url: 'b',
                },
                position: [3.5, 1.33, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'boccioni',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [3.5, 0.88, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_3',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [3, 1.77, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'head_6',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [3, 1.33, 0.3],
                rotation: [0, 0, 0],
                scale: [0.026, 0.026, 0.026],
            },
            {
                id: 'kooning2',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [3, 0.88, 0.3],
                rotation: [0, 0, 0],
                scale: [0.03, 0.03, 0.03],
            },
            {
                id: 'blownhead',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [6.4, 0.77, 0.25],
                rotation: [0, 0, 0],
                scale: [0.15, 0.15, 0.15],
            },
            {
                id: 'ufan',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [5.9, 0.8, -0.12],
                rotation: [0, 0, 0],
                scale: [0.16, 0.16, 0.16],
            },
            {
                id: 'dubuffet',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [5.4, 0.8, 0.2],
                rotation: [0, 0, 0],
                scale: [0.17, 0.17, 0.17],
            },
            {
                id: 'balzac',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [4.43, 1.13, 0.4],
                rotation: [0, 0, 0],
                scale: [0.06, 0.06, 0.06],
            },
            {
                id: 'wp',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [0.85, 0.95, -1.1],
                rotation: [0, 0, 0],
                scale: [0.05, 0.05, 0.05],
            },
            {
                id: 'wh',
                type: 'mp.gltfLoader',
                inputs: {
                    url: '',
                },
                position: [1.2, 0.97, -1.07],
                rotation: [0, 0, 0],
                scale: [0.12, 0.12, 0.12],
            },
        ];       
        
        const objectsToLoadZ = [
            {
                id: 'youngwon',
                type: 'mp.gltfLoader',
                inputs: {
                    url: origin[origin.length -1],
                },
                position: [5.3, 2.3, -3.2],
                rotation: [0, -90, 0],
                scale: [0.07, 0.07, 0.07],
            }
        ];

        const yObj = origin.slice(4, origin.length -2);

        const yUrld = objectsToLoadY.map((item, index)=>{
            return {
                ...item,
                inputs : { url : yObj[index] }
            }
        });
    
        const toBind1 = await loadScene(sceneObject, yUrld, 'y');
        const toBind2 = await loadScene(sceneObject, objectsToLoadZ, 'z');
    
        function preventScale(){
            let existing_overlay = document.querySelector('.popup-overlay');
            let lightbox = document.querySelector('.lightBoxImg');
        
            if(existing_overlay){
                existing_overlay.addEventListener('touchstart', function (event) {
                    if (event.touches.length > 1) {
                            event.preventDefault(); 
                    } 
                }, false);
                let lastTouchEnd = 0;     
                existing_overlay.addEventListener('touchend', function (event) {
                let now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                            event.preventDefault(); 
                    } lastTouchEnd = now; 
                }, false);
            }
            
            if(lightbox){
                lightbox.addEventListener('touchstart', function (event) {
                    if (event.touches.length > 1) {
                        event.preventDefault(); 
                    } 
                }, false);
                let lastTouchEnd = 0;
                lightbox.addEventListener('touchend', function (event) {
                let now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault(); 
                    } lastTouchEnd = now; 
                }, false);
            }
            };
    
            function lightBoxSet(){
                const imgArea = document.querySelector('img');
                    imgArea.style.cursor = 'pointer';
            };


    sceneObject.start();

    console.log('%c 3d object Loaded!', 'background: #333333; color: #8dceff')
    return [ tagData, tagAttachData, videoXyz, controlXyz ];
}

