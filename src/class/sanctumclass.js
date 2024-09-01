import Vas from "./vasclass";
import * as THREE from 'three';

export default class Sanctum extends Vas{
    constructor(canvasdiv, title, actions, boolActions, textures, paintings, models, lights){
        super(canvasdiv, title, actions, boolActions, textures, paintings, models, lights);
        this.initReflection();
    }
    //기본 카메라 설정
    initCamera(){
        if(this.title === 'sanctum'){ // 공간에 따라 시작위치 변경
            this._camera.position.set(0, this.player.height, 45); 
            this._camera.lookAt(new THREE.Vector3(0, this.player.height, 0));
            this._scene.add(this._camera);
        }
    }
    //기본 빛 추가
    addWorldLight(){
        if(this.title === 'sanctum'){
            const ambLight = new THREE.AmbientLight(0xfffff0, 0.1);
            this._scene.add(ambLight);
            const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1);
            this._scene.add(light);
        }
    }
    initReflection(){
        const sphereRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        sphereRenderTarget._pmremGen = new THREE.PMREMGenerator(this._renderer);
        const steelCamera = new THREE.CubeCamera( 1, 1000, sphereRenderTarget );
        this.steelCamera = steelCamera;
    }
    // 벽 바닥 천장 추가 
    addWallFloorCeiling(){
        let fTexture;
        let wTexture;
        let cTexture;
        if(this.title === 'sanctum'){
            fTexture = this.textures[0].src;
            wTexture = this.textures[1].src;
            cTexture = this.textures[2].src;
        }

        // Texture of the floor 바닥 생성
        this.loadTexture(fTexture)
            .then((texture) => {
                let planeGeometry;
                if(this.title === 'sanctum'){
                    planeGeometry = new THREE.PlaneGeometry(85, 110); /////
                }
                
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 1); 
    
                const material = new THREE.MeshPhongMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                });
    
                const floorPlane = new THREE.Mesh(planeGeometry, material);
                floorPlane.receiveShadow = true;
                floorPlane.rotation.x = Math.PI / 2;
                floorPlane.position.y = -Math.PI;
                this._scene.add(floorPlane);
    
                this.loadingCount += 1;
                this.actions.increase();
            })
            .catch((error) => console.log(error));
        
        // Create wall material 벽 생성
        this.loadTexture(wTexture)
            .then((wallTexture)=>{
                let frontWall;
                let leftWall;
                let rightWall;
                let backWall;
                let middleWall;
                // Front Wall
                if(this.title === 'sanctum'){
                    wallTexture.wrapS = THREE.RepeatWrapping;
                    wallTexture.wrapT = THREE.RepeatWrapping;
                    wallTexture.repeat.set(2, 2); 

                    frontWall = new THREE.Mesh( 
                        new THREE.BoxGeometry(60, 30, 0.001), // (가로, 높이, 두께)
                        new THREE.MeshLambertMaterial({ map: wallTexture })
                    );
                    frontWall.position.z = -50; // push the wall forward in the Z axis
            
                    // Left Wall
                    leftWall = new THREE.Mesh( 
                        new THREE.BoxGeometry(100, 30, 0.001), 
                        new THREE.MeshLambertMaterial({ map: wallTexture }) 
                    );
                    leftWall.rotation.y = Math.PI / 2; 
                    leftWall.position.x = -30; 
            
                    // Right Wall
                    rightWall = new THREE.Mesh( 
                        new THREE.BoxGeometry(100, 30, 0.001), 
                        new THREE.MeshLambertMaterial({ map: wallTexture })
                    );
                    rightWall.position.x = 30;
                    rightWall.rotation.y = Math.PI / 2; 
            
                    // Back Wall
                    backWall = new THREE.Mesh(
                        new THREE.BoxGeometry(60, 30, 0.001),
                        new THREE.MeshLambertMaterial({ map: wallTexture })
                    );
                    backWall.position.z = 50;

                    this.wallGroup.add(frontWall, backWall, leftWall, rightWall); 
                }
                // Enable shadows on objects
                frontWall.castShadow = true;
                frontWall.receiveShadow = true;
                leftWall.castShadow = true; 
                leftWall.receiveShadow = true;
                rightWall.castShadow = true;
                rightWall.receiveShadow = true;
                backWall.castShadow = true;
                backWall.receiveShadow = true;

                this._scene.add(this.wallGroup); 
                this.loadingCount += 1;
                this.actions.increase();
            })
            .catch((err)=> console.log(err));

        // Create the ceiling 천장 생성
        this.loadTexture(cTexture)// load the image/texture
            .then((ceilingTexture)=>{
                let ceilingGeometry;
                ceilingTexture.wrapS = THREE.RepeatWrapping;
                ceilingTexture.wrapT = THREE.RepeatWrapping;
                ceilingTexture.repeat.set(5, 5);
                if(this.title === 'sanctum'){
                    ceilingGeometry = new THREE.PlaneGeometry(100, 110);
                }
                const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceilingTexture });
                const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
                ceilingPlane.receiveShadow = true;

                ceilingPlane.rotation.x = Math.PI / 2; // 90 degrees
                ceilingPlane.position.y = 15;

                this._scene.add(ceilingPlane);

                this.loadingCount += 1;
                this.actions.increase();
            })
            .catch((err)=> console.log(err));
    }
    // 모델 로더 업데이트
    modelLoad(model, position){
        return new Promise((resolve, reject) => {
        this._modelLoader.load(
            model.obj, 
            (gltf)=>{
                const box = new THREE.Box3().setFromObject( gltf.scene );
                const size = box.getSize( new THREE.Vector3() );
                const scaleFactor = 10 / Math.max(size.x, size.y, size.z);
                gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
                this.objGroup.add(gltf.scene);
    
                gltf.scene.traverse(function(object){
                    if ( object.isMesh ) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                    } else {
                        object.castShadow = true;
                        object.receiveShadow = true;
                    }
                })
                gltf.scene.castShadow = true;
                gltf.scene.receiveShadow = true;
                gltf.scene.name = model.userdata.info.title;
                gltf.scene.userData = model.userdata;
                gltf.scene.number = model._id;
                gltf.scene.scaleFactor = scaleFactor;
                gltf.scene.children[0].customProperty = 'obj';
                gltf.scene.position.set(position.x, position.y, position.z);
                this.objGroup.customProperty = 'objsGroup';
                this._scene.add(this.objGroup); 

                // 오브젝트01 반사를 위한 설정
                // if(gltf.scene.name === 'object01'){    
                //     gltf.scene.add(this.steelCamera)
                //     gltf.scene.children[0].material.envMapIntensity = 1; 
                //     gltf.scene.children[0].material.reflectivity = 1; 
                // }
                if(gltf.scene.name === 'object01'){    
                    gltf.scene.add(this.steelCamera)
                    const steel = gltf.scene.children[0];
                    this.steel = steel;
                    steel.material.envMapIntensity = 1; 
                    steel.material.reflectivity = 1; 
                }
                if(gltf.scene.name === 'object03') {
                    gltf.scene.rotation.y = -Math.PI / 2;
                    gltf.scene.scale.set(4,4,4);
                }
        
                resolve(gltf.scene); // Resolve the promise when the model has loaded
    
            }, ( xhr ) => {
                let loadCounter = ( xhr.loaded / xhr.total * 100 );
                if(loadCounter < 100){
                    this.loadingBoxGroup.add(this.loadingBox(position));
                    this._scene.add(this.loadingBoxGroup);
                } 
                else if(loadCounter === 100){
                    this._scene.remove(this.loadingBoxGroup);
                } 
            },  
            function ( error ) {
                console.error( error );
                reject(error);
            });
        })
    };
    // 오브젝트02 서서히 올라갔다 내려갔다
    octaAnimation(){
        if(this.objGroup.getObjectByName("object02")){
            const to = this.objGroup.getObjectByName("object02");
            to.rotation.y += 0.001; // slowly rotate the model
            to.position.y = -9 + Math.sin(Date.now() / 1000) * 1; // slowly move up and down
        }
    };
    // 오브젝트01 반사를 위해서!!!!!!!!!!
    ufanReflection(){
        // 그지같이 자꾸 언디파인드 나옴..,.
        if(this.steel){
            const renderTarget = this.steelCamera.renderTarget._pmremGen.fromCubemap(this.steelCamera.renderTarget.texture);
            this.steel.material.envMap = renderTarget.texture;

            this.steelCamera.position.copy( this.steel.position )
            this.steelCamera.update( this._renderer, this._scene );
        }
    }
    // render 함수 오버라이딩
    render() {
        if (!this.running) return;
        this._renderer.render(this._scene, this._camera);
        this.loopForCollision();
        this.informDisplay();
        this.controlSet();
        this.ixMovementUpdate();
        this.octaAnimation(); 
        this.ufanReflection();
    }
}