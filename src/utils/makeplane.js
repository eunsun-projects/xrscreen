class makePlane {
    constructor(mpSdk, urls, xyzs, floors) {
        this.mpSdk = mpSdk;
        this.urls = urls;
        this.xyzs = xyzs;
        this.floors = floors;
        this.inputs = {
            visible: true,
        };
        this.onInit = function () {

            const po = this.xyzs[0].position; //현재는 배열을 통째로 파라미터 받고.. 한개뿐이라 [0]
            const sc = this.xyzs[0].scale;
            const ro = this.xyzs[0].rotation;
            const floor = this.floors[0].floor;
            const mpSdk = this.mpSdk;

            const THREE = this.context.three;
            const scene = new THREE.Scene();
            const node = new THREE.Object3D();
    
            const planeGeo = new THREE.PlaneGeometry(1, 1);
            const plane_texture_url = this.urls[0] // 현재는 1개 뿐이어서..
            const planeTexture = new THREE.TextureLoader().load(plane_texture_url);
            const planeMaterial = new THREE.MeshBasicMaterial({
                map: planeTexture,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                shadowSide: null,
            });

            const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
            planeMesh.position.set(po[0], po[1], po[2]);
            planeMesh.scale.set(sc[0], sc[1], sc[2]);
            planeMesh.rotation.set(ro[0], ro[1], ro[2]);

            node.add(planeMesh);
            scene.add(node)

            this.outputs.objectRoot = node;
            this.outputs.collider = node;
        
            mpSdk.Floor.data.subscribe({
                onCollectionUpdated: function (collection) {
                let testi = Array.from(Object.keys(collection));
                    if(testi.length > 1){
                        mpSdk.Floor.current.subscribe(function (currentFloor) {
                            if (currentFloor.sequence === -1) {      
                                planeMaterial.opacity = 1;
                            } else if (currentFloor.sequence === floor) {
                                planeMaterial.opacity = 1;
                            } else {
                                planeMaterial.opacity = 0.1;
                            }
                        });
                    }
                }
            });
        };
    }
};

export default makePlane;