async function customImporter(mpSdk, mpModels, tagData, tagAttachData){
    const isObject = mpModels.object[0];
    const isPlane = mpModels.plane[0];

    if(isObject && isPlane){
        // console.log(mpModels.object[1])
        let objectModule = await import(`../models/${mpModels.object[1]}`);
        let planeModule = await import(`../models/${mpModels.plane[1]}`);
            // console.log(importedModule)
            await planeModule.default(mpSdk, mpModels, tagData, tagAttachData);
            return await objectModule.default(mpSdk, mpModels, tagData, tagAttachData);
    }else if(isObject){
        let objectModule = await import(`../models/${mpModels.object[1]}`);
        return await objectModule.default(mpSdk, mpModels, tagData, tagAttachData);
    }else if(isPlane){
        let planeModule = await import(`../models/${mpModels.plane[1]}`);
        return await planeModule.default(mpSdk, mpModels, tagData, tagAttachData);
    }else{
        return [tagData, tagAttachData, {}, {}];
    }
}
export default customImporter;