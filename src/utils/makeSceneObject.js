import makeWhiteSky from "./makewhitesky";
import { makeVideo, vidController } from "./makevideo";

const makeSceneObject = async (mpSdk, mpModels, videoRef, videoxyz, control) => {
    let video;
    if(videoRef !== undefined) video = videoRef.current;

    const skyFactory = () => {
        return new makeWhiteSky(mpSdk);
    };
    mpSdk.Scene.register('makeSky', skyFactory);

    const VideoFactory = () => {
        return new makeVideo(mpSdk, video, videoxyz, control.isControl);
    };
    if(mpModels.video[0]) mpSdk.Scene.register('makeVideo', VideoFactory);
    const ppFactory = () => {
        return new vidController(videoxyz, control, mpSdk, video);
    };
    if(control.isControl) mpSdk.Scene.register('makePp', ppFactory);

    const lights = {
        "initial_light": {
            "enabled": true,
            "color": {"r": 1,"g": 1,"b": 1},
            "intensity": 0.8
        },
    }

    const [sceneObject] = await mpSdk.Scene.createObjects(1);
    sceneObject.addNode().addComponent('mp.ambientLight', lights.initial_light); //amb light
    sceneObject.addNode().addComponent('makeSky', skyFactory);

    if(mpModels.video[0]){
        sceneObject.addNode().addComponent('makeVideo', VideoFactory); 
        if(control.isControl) sceneObject.addNode().addComponent('makePp', ppFactory);
    }

    sceneObject.start();
}

export default makeSceneObject;