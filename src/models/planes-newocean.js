import makePlane from "../utils/makeplane";

export default async function planesNewOcean(mpSdk, mpModels, tagData, tagAttachData){
    const planeXyzs = [{
        isPlane : true,
        id : "00_newocean",
        position : [-15.3,0.018,-18.6],
        rotation : [1.57,0,3.14], 
        scale : [2.5,2.5,2.5,]
    }];

    let planeUrls = [...mpModels.planesUrl];
        planeUrls.sort();

    const planeFloors = [{
        id : "00_newocean",
        floor : 1
    }];

    /** ============ class plane object ============== */
    function planeFactory() {
        return new makePlane(mpSdk, planeUrls, planeXyzs, planeFloors);
    };
    mpSdk.Scene.register('makePlane', planeFactory);

    const [sceneObject] = await mpSdk.Scene.createObjects(1);
    sceneObject.addNode().addComponent('makePlane', planeFactory);
    sceneObject.start();

    console.log('%c plane object Loaded!', 'background: #333333; color: #8dceff')

    return [tagData, tagAttachData, {}, {}] //비디오, 컨트롤 없기때문에.. 빈 객체 리턴
};