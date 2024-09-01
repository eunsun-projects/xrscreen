/** ============ class make Video ============ */
export class makeVideo {
    constructor(mpSdk, video, videoXyz, isControl) {
        this.sdk = mpSdk;
        this.videoXyz = videoXyz;
        this.video = video;
        this.isControl = isControl;
        this.onEvent = this.onEvent.bind(this);
      } 
      events = {
        'INTERACTION.CLICK': true,
        // 'INTERACTION.HOVER': true,
      }
      inputs = {
        visible: true,
      };
      onInit() {
        const position = this.videoXyz.position;
        const rotation = this.videoXyz.rotation;
        const scale = this.videoXyz.scale;
        const backPostion = this.videoXyz.backPosition;
        const video = this.video;

        const THREE = this.context.three;
        const scene = new THREE.Scene();
        const node = new THREE.Object3D();
    
        const VideoTexture_s = new THREE.VideoTexture(video);
        VideoTexture_s.minFilter = THREE.LinearFilter;
        VideoTexture_s.magFilter = THREE.LinearFilter;
        VideoTexture_s.needsUpdate = true;

        const VideoMaterial = new THREE.MeshBasicMaterial({
          map: VideoTexture_s,
          side: THREE.DoubleSide,
          toneMapped: false,
        });
        VideoMaterial.needsUpdate = true;

        const VideoGeometry = new THREE.PlaneGeometry(1, 1);

        const backbox = new THREE.MeshBasicMaterial({ color: 0x0c1427 });
        const VideoBackGeometry = new THREE.BoxGeometry(1, 1, 0.01);
      
        const VideoScreen = new THREE.Mesh(VideoGeometry, VideoMaterial);
        VideoScreen.castShadow = true;
        VideoScreen.position.set(position[0], position[1], position[2]);
        VideoScreen.rotation.set(rotation[0], rotation[1], rotation[2]);
        VideoScreen.scale.set(scale[0], scale[1], scale[2]);
        
        node.add(VideoScreen);

        const VideoBack = new THREE.Mesh(VideoBackGeometry, backbox)
        VideoBack.position.set(backPostion[0], backPostion[1], backPostion[2]);
        VideoBack.rotation.set(rotation[0], rotation[1], rotation[2]);
        VideoBack.scale.set(scale[0], scale[1], scale[2])

        node.add(VideoBack);
        scene.add(node)

        //this.outputs.texture = this.texture;
        this.outputs.objectRoot = node;
        this.outputs.collider = VideoScreen;//raycast hit detection
      };
      onEvent(eventType, data) {
        const video = this.video;
        if(this.isControl === false){
            if (eventType === 'INTERACTION.CLICK'){
                  if(video.value === "off"){
                  // video.muted = !video.muted;
                  video.muted = false
                  video.play();
                  video.value = "on";
                  // alert('재생. 다시 클릭하시면 정지됩니다')
                } else {
                  // video.muted = !video.muted;
                  video.muted = true;
                  video.pause();
                  video.value = "off"
                  //alert('실패')
                }
            };
            console.log('Scene.Object3D Clicked', eventType); // this.notify(eventType);
        }else if(this.isControl === true){
            if (eventType === 'INTERACTION.CLICK'){
                video.muted = !video.muted;
                video.pause();
                video.value = "off"
                //alert('실패') 
            };
        }
      };
};

/** ============= class video controller ================ */
export class vidController{
    constructor(videoXyz, control, mpSdk, video) {
      mpSdk ? this.sdk = mpSdk : this.sdk = null;
      this.inputs = {
        visible: true,
      };
      this.videoXyz = videoXyz;
      this.control = control;

      this.video = video;
      this.playBtn = null;
      this.pauseBtn = null;
    }
    events = {
      'INTERACTION.CLICK': true,
      // 'INTERACTION.HOVER': true,
    }
    onInit(){
        const rotation = this.videoXyz.rotation;
        const position = this.control.position;

        const THREE = this.context.three; // 매터포트 api 안에서 실행되는 것을 가정한 세팅
        const scene = new THREE.Scene();
        const node = new THREE.Object3D();

        // make play button 
        let PlayButtonAlpha = "/assets/ui/play.png"
        let ppTexture = new THREE.TextureLoader().load(PlayButtonAlpha);
        let bttnGeo = new THREE.PlaneGeometry(1,1);
        let bttnMaterial = new THREE.MeshBasicMaterial({
          map: ppTexture,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        let playButtonObject = new THREE.Mesh( bttnGeo, bttnMaterial );
        playButtonObject.position.set(position[0], position[1], position[2]);
        playButtonObject.rotation.set(rotation[0], rotation[1], rotation[2]);
        playButtonObject.scale.set(0.25, 0.25);

        node.add(playButtonObject);
                
        // make pause button
        let pauButtonAlpha = "/assets/ui/pause.png"
        let paTexture = new THREE.TextureLoader().load(pauButtonAlpha);
        let pabttnGeo = new THREE.PlaneGeometry(1,1);
        let pabttnMaterial = new THREE.MeshBasicMaterial({
          map: paTexture,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        let pauButtonObject = new THREE.Mesh( pabttnGeo, pabttnMaterial );
        pauButtonObject.position.set(position[0], position[1], position[2]);
        pauButtonObject.rotation.set(rotation[0], rotation[1], rotation[2]);
        pauButtonObject.scale.set(0.2, 0.2);
        pauButtonObject.visible = false;

        node.add(pauButtonObject);

        if(this.sdk) scene.add(node);
        
        this.outputs.objectRoot = node;
        this.outputs.collider = node;
        
        this.playBtn = playButtonObject;
        this.pauseBtn = pauButtonObject;

        function playBtnOn() { playButtonObject.visible = true ; }; // 재생버튼 보이키
        function playBtnOff() { playButtonObject.visible = false ; }; // 정지버튼 
        function pauseBtnShow() { 
          pauButtonObject.visible = true; // 일시정지버튼 보이기
            setTimeout(() => {
              pauButtonObject.visible = false; // 1초뒤 일시정지버튼 사라짐
              playButtonObject.visible = true; // 그 후 재생버튼 나타남
            }, 1000); 
        };
        this.video.addEventListener("pause", () => { console.log('paused'); pauseBtnShow(); });        
        this.video.addEventListener("ended", () => { playBtnOn(); });
        this.video.addEventListener("play", () => { playBtnOff(); });
        }
        onEvent(eventType, data) {
          const video = this.video;
          if (eventType === 'INTERACTION.CLICK'){
                if(video.value === "off"){
                video.muted = false;
                video.play();
                video.value = "on";
                // alert('재생. 다시 클릭하시면 정지됩니다')
              } else {
                video.muted = true;
                video.pause();
                video.value = "off"
                //alert('실패')
              }
          }
        };
};  