
export default async function modelsCoordinates(mpSdk, mpModels, tagData, tagAttachData){
            
            const videoXyz = {
                isVideo : true,
                position : [0.7, 1.35, -0.77],
                backPosition : [0.7, 1.35, -0.78],
                rotation : [0, 0, 0], 
                scale : [0.7, 0.45, 0.6]
            };
            const controlXyz = {
                isControl : true,
                position : [0.7, 1.35, -0.76]
            }

            const [coordiObject] = await mpSdk.Scene.createObjects(1);

            const lights = {
                "initial_light": {
                    "enabled": true,
                    "color": {"r": 1,"g": 1,"b": 1},
                    "intensity": 0.6
                },
            }
            coordiObject.addNode().addComponent('mp.ambientLight', lights.initial_light);

            coordiObject.start();

            //models to load//
            let objectsToLoad = [
                {
                    id: '1',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-1.3, 1.35, -0.77],
                    rotation: [0, 90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '2',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-2.7, 1.35, -0.77],
                    rotation: [0, 90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '3',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-3.82, 1.38, -0.02],
                    rotation: [0, 180, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '4',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-3.82, 1.38, 1.443],
                    rotation: [0, 180, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '5',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-2.72, 1.4, 2.23],
                    rotation: [0, -90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '6',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [-1.3, 1.408, 2.23],
                    rotation: [0, -90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '7',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [0.138, 1.410, 2.23],
                    rotation: [0, -90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '8',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [1.22, 1.37, 1.408],
                    rotation: [0, 0, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '9',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [1.23, 1.37, 0.017],
                    rotation: [0, 0, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
                {
                    id: '10',
                    type: 'mp.fbxLoader',
                    inputs: {
                        url: '',
                    },
                    position: [0.75, 1.4, -0.77],
                    rotation: [0, -90, 0],
                    scale: [0.00244, 0.00244, 0.00244],
                },
            ];

            let origin = [...mpModels.objsUrl];
                origin.sort();

            const urld = objectsToLoad.map((item, index) =>{
                return {
                    ...item,
                    inputs : { url : origin[index] }
                }
            })
            
            // console.log(urld);
            
            await loadScene(mpSdk, urld);

            // console.log('model loaded!');

    return [ tagData, tagAttachData, videoXyz, controlXyz ];
}

async function loadScene(mpSdk, objects) {
    let lookup = {};
    let toBind = [];

    const [objectObject] = await mpSdk.Scene.createObjects(1);
    
    for (let i = 0, length = objects.length; i < length; i++) {
        let node = await objectObject.addNode();
        // let node = await mpSdk.Scene.createNode();
        // let node = await object.createNode();
        let position = objects[i].position;
        let scale = objects[i].scale;
        let rotation = objects[i].rotation;
        let id = objects[i].id;
        let bind = objects[i].bind;
        let component = node.addComponent(objects[i].type, objects[i].inputs);

            if (id) {
                lookup[id] = component;
            }
            if (bind) {
                toBind.push({
                component,
                bind,
                });
            }

    node.obj3D.position.set(position[0], position[1], position[2]);
    node.obj3D.scale.set(scale[0], scale[1], scale[2]);
    node.obj3D.rotateX(rotation[0] * Math.PI / 180);
    node.obj3D.rotateY(rotation[1] * Math.PI / 180);   
    node.obj3D.rotateZ(rotation[2] * Math.PI / 180);
    node.obj3D.updateMatrixWorld(true);
    // node.start();
    }
    objectObject.start();

    console.log('%c 3d object Loaded!', 'background: #333333; color: #8dceff')
};