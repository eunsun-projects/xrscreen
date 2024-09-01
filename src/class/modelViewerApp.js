import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class ModelViewerApp{
    constructor(main, loading, canvas, temporal, db, lightBtns, viewmode, effects, swipeDiv, eachboxBtns, queryNum, styles){

        this.loadCounter = 0;
        this.running = true; // 디스트로이 시 false 로 변경되는 상태 스테이트
        this.objGroup = null; // isMesh 이면 gltf.scene 을 복사 스테이트
        this.originalMaterial = null; // isMesh 이면 기본 머티리얼 복사하스테이트
        this.baseMesh = null; // isMesh 이면 mesh 를 복사 스테이트
        this.rotateObject = false; // 오브젝트 로테이션 상태 스테이트
        this.currentValue = queryNum;
        this.name = '';

        const guiTop = main.current;
        this._guiTop = guiTop;
        const loadDiv = loading.current;
        this._loadDiv = loadDiv;
        const xyzCanvas = canvas.current;
        this._xyzCanvas = xyzCanvas;
        const overlay = temporal.current;
        this._overlay = overlay;
        const _lightBtns = lightBtns.current;
        this._lightBtns = _lightBtns;
        const viewmodeBtns = viewmode.current;
        this._viewmodeBtns = viewmodeBtns;
        const effectsBtns = effects.current;
        this._effectsBtns = effectsBtns;
        const swipeEach = eachboxBtns.current;
        this._swipeEach = swipeEach;
        const swipe = swipeDiv.current;
        this._swipeDiv = swipe;
        this._db = db;
        this._styles = styles;

        // this._swipeEach[this.currentValue].style.outline = '3px solid #88fc93';

        const fixedWidth = window.innerWidth; 
        const fixedHeight = window.innerHeight;
        this._fixedWidth = fixedWidth;
        this._fixedHeight = fixedHeight;

        // console.log(queryNum)
        
        /************* renderer ***************/
        const renderer = new THREE.WebGLRenderer({ antialias: true }); //canvas : canvas,
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( fixedWidth, fixedHeight);
        renderer.setClearColor(0xffffff, 1);
        // renderer.autoClear = false;
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.bias = -0.01;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        this._xyzCanvas.appendChild(renderer.domElement ); // 캔버스에 렌더러 적용
        this._renderer = renderer;

        /************* scene ***************/
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xc7c7c7);
        scene.fog = new THREE.Fog( 0xc7c7c7, 10, 30 );
        this._scene = scene;

        /************ init App **************/
        this.delCache();
        this._setupLoader();
        this._setupBasicWorld();
        this._setupLight();
        this._setupCamera();
        this._setupControls();
        this._setupEffects();

        window.onresize = this.resize.bind(this);
		this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
    _initModel(value, setLoadingProgress){
        if(value === 0){
            this._setupModel(this._db[0], setLoadingProgress);
            this.currentValue = 0
        } else {
            this._setupModel(this._db[value], setLoadingProgress);
            this.currentValue = value;
        }
    }
    _isMobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
    _isAndroid(){
        return /Android/i.test(navigator.userAgent);
    };
    _setupLoader(){
        /************* model loader ***************/
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );
        this._loader = loader;
    };
    _setupCamera(){
        /************* camera ***************/
        const camera = new THREE.PerspectiveCamera(
            85, // FOV
            this._fixedWidth / this._fixedHeight, // aspect ratio
            0.5, // near
            50 // far 10000
        );

        this._isMobile() ? camera.position.set(0,2,17) : camera.position.set(0,5,27);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        this._camera = camera;
    };
    _setupLight(){
        /************* lights ***************/
        const colors = {
            sun : 0xfdfdf4,
            ired : 0xdcf6fe,
            bulb : 0xffe4c3,
            pin : 0xdcf6fe
        };

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 5 );
        hemiLight.position.set( 0, 20, -20 );

        const ambLight = new THREE.AmbientLight(0xfdfdf4, 0.45);

        const pointLight = new THREE.PointLight( 0xffffff, 2, 80 );
        pointLight.position.set( 0, 20, 13 );
        pointLight.castShadow = true; // default false
        pointLight.shadow.radius = 6; // 그림자 반경
        //Set up shadow properties for the light
        pointLight.shadow.mapSize.width = 1024; // 2x 그림자 품질 조정
        pointLight.shadow.mapSize.height = 1024; // 2x
        pointLight.shadow.camera.near = 1; // default
        pointLight.shadow.camera.far = 10000; // default
        // pointLight.shadow.camera.focus = 1;
        // pointLight.shadow.distance = 100;

        const sunLight = new THREE.DirectionalLight(colors.sun, 3);
        sunLight.position.set( 0, 20, 30 );

        const iredLight = new THREE.DirectionalLight(colors.ired, 3.6);
        iredLight.position.set( 0, 20, 30 );

        const bulbLight = new THREE.DirectionalLight(colors.bulb, 3.7);
        bulbLight.position.set( 0, 20, 30 );

        const pinLight = new THREE.PointLight( colors.pin, 700 );
        pinLight.position.set( 0, 10, 7 );

        this._scene.add(ambLight);
        this._scene.add(hemiLight);
        this._scene.add(pointLight)
        this._ambLight = ambLight;
        this._pointLight = pointLight;
        this._sunLight = sunLight;
        this._iredLight = iredLight;
        this._bulbLight = bulbLight;
        this._pinLight = pinLight;
    };
    _setupBasicWorld(){
        const shadowMeshGeo = new THREE.PlaneGeometry( 1000, 1000 );
            shadowMeshGeo.rotateX(- Math.PI / 2);
        const shadowMeshMat = new THREE.ShadowMaterial();
            shadowMeshMat.opacity= 0.5;
        const shodowMesh = new THREE.Mesh( shadowMeshGeo, shadowMeshMat );
            shodowMesh.position.y = -5;
            shodowMesh.receiveShadow = true;
        this._scene.add( shodowMesh );

        // basic material
        const basicMaterial = new THREE.MeshBasicMaterial( { color: 0xfff7e0 })
        this.basicMaterial = basicMaterial;

        // phong material
        const phongMaterial = new THREE.MeshPhongMaterial({
            color: 0x8a8a8a,  // 예시
            // specular: 0x050505,
            // shininess: 100,
        });
        phongMaterial.roughness = 0.4;
        phongMaterial.metalness = 0.9;
        this.phongMaterial = phongMaterial;

        const physicalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            reflectivity : 0.5,
            transmission : 0.8,
            roughness : 0.2,
            metalness : 0,
            clearcoat : 0.2,
            clearcoatRoughness : 0.25,
            ior : 1.7,
            thickness : 10.0
        })
        this.physicalMaterial = physicalMaterial;
    };
    _setupModel(model, setLoadingProgress){
        this._loader.load(
            model.model, // model.obj
            (gltf)=>{
                const box = new THREE.Box3().setFromObject( gltf.scene );
                const size = box.getSize( new THREE.Vector3() );
                const scaleFactor = this._isMobile ? 4 / Math.max(size.x, size.y, size.z) : 6 / Math.max(size.x, size.y, size.z);
                gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

                gltf.scene.rotation.y = -1;
                // gltf.scene.position.y = -3;
                gltf.scene.position.set(0, -5, 0) //0, -3, 17

                this.objGroup = gltf.scene; // 그룹 참조 저장 회전 등을 위해

                gltf.scene.name = model.nick;
                gltf.scene.number = model.num;

                this._scene.add(gltf.scene);

                gltf.scene.traverse((object)=>{
                    if ( object.isMesh ) {
                        object.castShadow = true; // traverse 돌려서 mesh 인 애들 전부 castshadow
                        object.receiveShadow = true;

                        // wireframe helper
                        const wireframeGeometry = new THREE.WireframeGeometry( object.geometry );
                        const wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
                        const wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
                        wireframe.visible = false;
                        object.add( wireframe );

                        this.originalMaterial = object.material; //  머티리얼 복사
                        this.imageMap = object.material.map; // 이미지 맵 복사 
                        this.baseMesh = object; // 메쉬 복사
                        this.wireframe = wireframe; // 와이어프레임 복사
                    }
                })
            }, 
            ( xhr ) => {
                let loading = ( xhr.loaded / xhr.total * 100 );
                // console.log(loading)
                this.loadCounter = loading;
                if(setLoadingProgress) {
                    setLoadingProgress(loading);
                }
                // if(loading < 100) {
                //     // loadDiv.innerHTML = `Loading.. ${Math.round(loading)}%`;
                //     this.loadCounter = loading;
                //     this._setLoadCounter(true);
                //     this._overlay.style.transition = `opacity ${ loading / 100 }s ease-out ${ loading / 100 }s`;
                //     this.nowLoading = 0;
                // } else if(loading === 100){
                //     this.loadCounter = loading;
                //     this._setLoadCounter(false);
                //     this.nowLoading = 1;
                //     // loadDiv.style.opacity = "0";
                //     this._overlay.style.display = 'none';
                // } 
            }, 
            ( error ) => { 
                this._loadDiv.innerHTML = `error ocurred! restart page!`;
                this._loadDiv.style.fontSize = '1rem';
                console.error( error );
            }
        )
    };
    _setupControls(){
        /************* controls ***************/
        const controls = new OrbitControls( this._camera, this._renderer.domElement );
        controls.target.set(0, -3, 0); // 모델의 위치로 설정
        controls.minDistance = 3.5; // 객체에 가까워질 수 있는 최소 거리
        controls.maxDistance = 8; // 객체에서 멀어질 수 있는 최대 거리
        controls.autoRotate = false;
        controls.update();
        this._controls = controls;
    };
    _setupEffects(){
        /************* composer **************/
        const composer = new EffectComposer( this._renderer );

        const glitchPass = new GlitchPass();
        glitchPass.name = 'glitch'
        this.glitchPass = glitchPass;

        // const bloomPass = new UnrealBloomPass( new THREE.Vector2( this._fixedWidth, this._fixedHeight ), 1.5, 0.4, 0.85 );
        // composer.addPass( bloomPass );

        // const genCubeUrls = ( prefix, postfix ) => {
        //     return [
        //         prefix + 'px' + postfix, prefix + 'nx' + postfix,
        //         prefix + 'py' + postfix, prefix + 'ny' + postfix,
        //         prefix + 'pz' + postfix, prefix + 'nz' + postfix
        //     ];
        // };

        // const pmremGenerator = new THREE.PMREMGenerator(this._renderer)
        // const ldrUrls = genCubeUrls( '/assets/whitecube2/', '.png' );
        // const envTexture = new THREE.CubeTextureLoader().load( ldrUrls, ( ldrCubeMap ) => {
        //     this.physicalMaterial.envMap = pmremGenerator.fromCubemap(envTexture).texture
        //     pmremGenerator.dispose();
        //     this._cubeMap = ldrCubeMap;
        // });        

        const renderPass = new RenderPass( this._scene, this._camera );
        renderPass.clear = false;
        composer.addPass( renderPass );

        this._composer = composer;
    };
    _removeLight(){
        if(this._sunLight || this._iredLight || this._bulbLight || this._pinLight){
            this._scene.remove( this._sunLight );
            this._scene.remove( this._iredLight );
            this._scene.remove( this._bulbLight );
            this._scene.remove( this._pinLight );
        } 
    };
    _removeLightPlus(){
        this._removeLight();
        this._lightBtns.forEach((e)=>{
            if(e.classList.value.includes(this._styles.xyzon)) e.classList.remove(this._styles.xyzon);
        });
    };
    _lightModeChange(target){
        switch(target){
            case 'wb_sunny' :
                this._removeLight();
                this._scene.add( this._sunLight );
                break;
            case 'wb_iridescent' :
                this._removeLight();
                this._scene.add( this._iredLight );
                break;
            case 'lightbulb' : 
                this._removeLight();
                this._scene.add( this._bulbLight );
                break;
            case 'highlight' :
                this._removeLight();
                this._scene.add( this._pinLight );
                break;
        }
    };
    delCache(){
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                return caches.delete(key);
            }));
        });
    };
    resize() {
		// const width = this._xyzCanvas.clientWidth;
		// const height = this._xyzCanvas.clientHeight;
        const width = window.innerWidth;
		const height = window.innerHeight;
		const aspect = width / height;

		if (this._camera instanceof THREE.PerspectiveCamera) { // PerspectiveCamera
            // console.log('risize')
            // console.log(width)
            // console.log(height)
			this._camera.aspect = aspect;
		} else { 
			this._camera.left = aspect * -1;
			this._camera.right = aspect * 1;
		} // OrthographicCamera

		this._camera.updateProjectionMatrix();
		this._renderer.setSize(width, height);
        this._composer.setSize(width, height);

	};
    render() {
            if (!this.running) return;
            this._animate();
	};
    _animate() {
        requestAnimationFrame( this._animate.bind(this) );

        if(this.rotateObject){
            this.objGroup.rotation.y += -0.01;
        }
        this._composer.render();
    };
    _destroy() {
        this.running = false;
        this._renderer.dispose();
        this.modelDispose(this._scene);
    };
    modelDispose(scene){
        scene.children.forEach((e)=>{
            if(typeof e.number === 'number' ){
                scene.remove(e);
                if (e.children[0].geometry) {
                    // console.log('지오 폐기')
                    e.children[0].geometry.dispose();
                }
                if (e.children[0].material) {
                    // console.log('메터리얼 폐기')
                    e.children[0].material.dispose();
                }
                if (e.children[0].material.map) {
                    // console.log('텍스처 폐기')
                    e.children[0].material.map.dispose();
                }
            }       
        })
        scene.traverse(object => {
            // Geometry 삭제
            if (object.geometry) {
                object.geometry.dispose();
                console.log('geo disposed!')
            }
            // Material 삭제
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => this.disposeMaterial(material));
                    console.log('material array disposed!')
                } else {
                    this.disposeMaterial(object.material);
                    console.log('material disposed!')
                }
            }
        })
    };
    disposeMaterial(material) {
        // 텍스처 삭제
        if (material.map) material.map.dispose();
        if (material.lightMap) material.lightMap.dispose();
        if (material.bumpMap) material.bumpMap.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.specularMap) material.specularMap.dispose();
        if (material.envMap) material.envMap.dispose();
        // Material 자체 삭제
        material.dispose();
    };
    scrollSmoothly(x, y) {
        const startTime = performance.now();
        const duration = 300; 
        const startX = this._swipeDiv.scrollLeft;
        const startY = this._swipeDiv.scrollTop;
    
        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 0부터 1까지의 진행 상황
        
            this._swipeDiv.scrollTo(startX + x * progress, startY + y * progress);
        
            if (elapsedTime < duration) {
            requestAnimationFrame(animate.bind(this)); // 다음 프레임 요청
            }
        }
        requestAnimationFrame(animate.bind(this)); // 첫 번째 프레임 요청
    }
    toggleRotation(target){
        if(target.classList.value.includes(this._styles.xyzon)){
            target.classList.remove(this._styles.xyzon);
            this.rotateObject = false;
        }else{
            target.classList.add(this._styles.xyzon);
            this.rotateObject = true;
        }
    };
    xyzonViewRemove(){
        this._viewmodeBtns.forEach((e)=>{
            e.classList.remove(this._styles.xyzon);
        });
    };
    xyzonEffectsRemove(){
        this._effectsBtns.forEach((e)=>{
            e.classList.remove(this._styles.xyzon);
        });
    };
    toggleWireframe(target){
        if(target.classList.value.includes(this._styles.xyzon)){
            this.xyzonViewRemove();
            this.wireframe.visible = false;
            this.baseMesh.material = this.originalMaterial;
        }else{
            this.xyzonViewRemove();
            target.classList.add(this._styles.xyzon);
            this.wireframe.visible = true;
            this.baseMesh.material = this.basicMaterial;
            this._scene.background = new THREE.Color(0xc7c7c7)
        }
    };
    toggleMap(target){
        if(target.classList.value.includes(this._styles.xyzon)){
            this.xyzonViewRemove();
            this.baseMesh.material = this.originalMaterial;
        }else{
            this.xyzonViewRemove();
            target.classList.add(this._styles.xyzon);
            this.wireframe.visible = false;
            this.baseMesh.material = this.phongMaterial;
            this._scene.background = new THREE.Color(0xc7c7c7)
        }
    };
    toggleGlitch(target){
        if(target.classList.value.includes(this._styles.xyzon)){
            this.xyzonEffectsRemove();
            while (this._composer.passes.length > 1) {
                const pass = this._composer.passes[1];
                this._composer.removePass(pass);
            }
            this._ambLight.intensity = 0.45;
        }else{
            this.xyzonEffectsRemove();
            target.classList.add(this._styles.xyzon);
            while (this._composer.passes.length > 1) {
                const pass = this._composer.passes[1];
                this._composer.removePass(pass);
            }
            this._composer.addPass(this.glitchPass);
            this._ambLight.intensity = 5;
        }
    };
    midboxNextAction(e){
        const center = window.innerWidth / 2;
        // this._scene.children.forEach((e)=>{
        //     if(typeof e.number === 'number' ){
        //         console.log(e)
        //         this.currentValue = e.number;
        //         this.name = e.name;
        //     }
        // }); 
        if(this.currentValue >= 0 && this.currentValue !== this._db.length -1){
            this.modelDispose(this._scene);
            this.delCache(); 
            // this._setupModel(this._db[this.currentValue + 1]);

            this._swipeEach.forEach((ev)=>{
                ev.style.outline = 'none';     
            });
            this._swipeEach[this.currentValue +1].style.outline = '3px solid #88fc93'

            const rect = this._swipeEach[this.currentValue +1].getBoundingClientRect();
    
            if(center <= rect.left){
                if(this.currentValue >= this._db.length - 3){
                    console.log('dont scroll next')
                }else{
                    this.scrollSmoothly(rect.left - center, 0)
                }
            }else if(rect.right < 0){ // >= center?????
                this.scrollSmoothly(rect.left - center, 0)
            }
            this.currentValue = this.currentValue +1; // 마지막에 수행
        } else if(this.currentValue === this._db.length -1){
            console.log('this is last')
        } 

        e.target.style.color = `#88fc93`
        const timer = setTimeout(() => {
            e.target.style.color = `black`;
            clearTimeout(timer);
        }, 100);
    };
    midboxBeforeAction(e){
        const center = window.innerWidth / 2;
        // this._scene.children.forEach((e)=>{
        //     if(typeof e.number === 'number' ){
        //         this.currentValue = e.number;
        //         this.name = e.name;
        //     }
        // });
        if(this.currentValue > 0 && this.currentValue <= this._db.length -1){
            this.modelDispose(this._scene);
            this.delCache();
            this._setupModel(this._db[this.currentValue - 1]);

            this._swipeEach.forEach((ev)=>{
                ev.style.outline = 'none';
            });
            this._swipeEach[this.currentValue - 1].style.outline = '3px solid #88fc93';

            const rect = this._swipeEach[this.currentValue - 1].getBoundingClientRect();
            if(center >= rect.left){
                if(this.currentValue <= 3){
                    console.log('dont scroll before')
                }else{
                    this.scrollSmoothly(rect.left - center, 0)
                }
            }else if(rect.left  >= 2000){
                this.scrollSmoothly(rect.left - center, 0)
            }
            this.currentValue = this.currentValue -1; // 마지막에 수행
        } else if(this.currentValue === 0){
            console.log('this is first')
        } 

        e.target.style.color = `#88fc93`
        const timer = setTimeout(() => {
            e.target.style.color = `black`;
            clearTimeout(timer);
        }, 100);
    };
    swipeboxAction(e){
        const dataSet = Number(e.target.dataset.num);
        const dataName = e.target.dataset.name;

        if(typeof dataName === 'string'){
            e.target.style.color = `#88fc93`
            const timer = setTimeout(() => {
                e.target.style.color = `black`
                clearTimeout(timer);
            }, 100);
            switch(dataName){
                case 'xyzbefore':
                    this._isMobile() || window.innerWidth < 800 ? this.scrollSmoothly(-120, 0) : this.scrollSmoothly(-240, 0);
                break;
                case 'xyzafter' :    
                    this._isMobile() || window.innerWidth < 800 ? this.scrollSmoothly(120, 0) : this.scrollSmoothly(240, 0);
                break;
            }
        }

        if(!isNaN(dataSet)){
            if(this.currentValue === dataSet){
                console.log('same');
                return;
            } 
            const center = window.innerWidth / 2;
            // this._scene.children.forEach((e)=>{
            //     if(typeof e.number === 'number' ){
            //         this.currentValue = e.number;
            //         this.name = e.name;
            //     }
            // });
            this.currentValue = dataSet
            this.modelDispose(this._scene);
            this.delCache(); 
            // this._setupModel(this._db[dataSet]);

            const rect = e.target.getBoundingClientRect();

            if(center <= rect.left){
                if(this.currentValue >= this._db.length -1){
                    console.log('dont scroll next')
                }else{
                    this.scrollSmoothly(rect.left - center, 0)
                }
            }else if(center >= rect.left){
                if(this.currentValue <= 1){
                    console.log('dont scroll before')
                }else{
                    this.scrollSmoothly(rect.left - center, 0)
                }
            }
            this._swipeEach.forEach((ev)=>{
                ev.style.outline = 'none';
                
            })
            this._swipeEach[dataSet].style.outline = '2px solid #88fc93'
        }
    };    
}