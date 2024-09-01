async function loadScene(sceneObject, objects, axis) {
    let lookup = {};
    let toBind = [];
    // let raq = 0;
    // let idleTime = 0;

    // const [objectObject] = await mpSdk.Scene.createObjects(1);

    for (let i = 0, length = objects.length; i < length; i++) {
        let node = await sceneObject.addNode();
        // let node = await mpSdk.Scene.createNode();
        // let node = await object.createNode();

        let position = objects[i].position;
        let scale = objects[i].scale;
        let rotation = objects[i].rotation;
        let id = objects[i].id;
        let bind = objects[i].bind;
        let castShadow = objects[i].castShadow;
        let component = node.addComponent(objects[i].type, objects[i].inputs);

            if (castShadow) {
                node.obj3D.castShadow = true;
                node.obj3D.receiveShadow = true;
            }
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

        function tick() {
            requestAnimationFrame(tick);
                if( axis === 'x' ){ node.obj3D.rotation.x += 0.004 }
                else if( axis === 'y' ){ node.obj3D.rotation.y += 0.003 }
                else if( axis === 'z' ){ node.obj3D.rotation.z += 0.004 }
        };
        if(axis){
            tick();
        }else{
            console.log('animate == false')
        };
            // setInterval(()=>{
            //     idleTime = idleTime + 1;
            //     if (idleTime >= 3) { // 3 minutes
            //         cancelAnimationFrame(raq);
            //         tick();
            //     }
            // }, 60000)
    };
    return toBind;
    // objectObject.start();
};
export default loadScene;