/** ============ class White background ============== */
class makeWhiteSky {
    constructor(mpSdk) {
        this.inputs = {
            visible: true,
        };
        this.onInit = function () {
            const THREE = this.context.three;
            const node = new THREE.Object3D();
            const skyGeo = new THREE.BoxGeometry(1,1,1);
            const skyMat = new THREE.MeshBasicMaterial({
                color : 0xd8d8d8,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
            });
            const skyMesh = new THREE.Mesh(skyGeo, skyMat);
            skyMesh.position.set(0, -5, 0);
            skyMesh.scale.set(1000, 1000, 1000);
            skyMesh.rotation.set(1.57, 0, 0);
            node.add(skyMesh);
            this.outputs.objectRoot = node;
            this.outputs.collider = node;

            mpSdk.Mode.current.subscribe(function (mode) {
            // console.log('Current view mode is is ', mode);
                if(mode === 'mode.inside'){
                skyMesh.visible = false;
                } else if(mode === 'mode.dollhouse'||mode === 'mode.floorplan'||mode === 'mode.transitioning'){
                skyMesh.visible = true;
                }
            });
        };
    };
};
export default makeWhiteSky;