// import { changeLoadState } from "../store/store.js";

/** ========= background tag loading(newway) =========== */
// async function NewTagSubscribi(sdk, dispatch){
//     try {
//         const [ arr1, arr2 ] = await tagSubscribe(sdk);        
//         const [ tagData, tagAttachData ] = await loadingCheck(sdk, arr1, arr2, dispatch);

//         return [tagData, tagAttachData];
//     }
//     catch(e){
//         console.log(e)
//     }
// };

export default async function NewTagSubscribi(sdk){
    try {
        const [ arr1, arr2 ] = await tagSubscribe(sdk);        
        // const [ tagData, tagAttachData ] = await loadingCheck(sdk, arr1, arr2, dispatch);

        return [ arr1,  arr2 ];
    }
    catch(e){
        console.log(e)
    }
};

async function tagSubscribe(mpSdk){
    let tag_2_data = [];
    let tag_2_attach_data = [];

    const promise1 = new Promise((resolve, reject) => {
        mpSdk.Tag.data.subscribe({
            onAdded: function (index, item, collection) {
                mpSdk.Tag.allowAction(index, {
                    docking : false,
                    navigating : true,
                    opening : false
                });
                // mpSdk.Tag.resetIcon(item.id);
                // tag_2_data.push({...item})
                // tag_2_data = [...collection];
            },
            onCollectionUpdated(collection) {
                // console.log('The full collection of Tags looks like', collection);
                for(let i in collection){
                    tag_2_data.push(collection[i]);
                }
                // console.log(tag_2_data)
                resolve(tag_2_data)
            }
        })
    });
    
    const promise2 = new Promise((resolve, reject) => {
        /** ========= tag attachement > array =========== */
        mpSdk.Tag.attachments.subscribe({
            onAdded: function (index, item, collection) {
                // tag_2_attach_data.push({...item});
                // console.log('An attachemnt was added to the collection', index, item, collection);
                // tag_2_attach_data = [...collection]
            },
            onCollectionUpdated(collection) {
                // console.log('The entire collection of attachments', collection);
                for(let i in collection){
                    tag_2_attach_data.push(collection[i]);
                }
                // console.log(tag_2_attach_data);
                resolve(tag_2_attach_data);
            },
        })
    });
    
    
    const [ arr1, arr2 ] = await Promise.all([promise1, promise2]);

    return [ arr1, arr2 ];
}

/** ======== loading checking ======= */
// async function loadingCheck(mpSdk, arr1, arr2, dispatch){

//     mpSdk.App.state.subscribe(function (appState) {   
//         if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length >= 1){
//             dispatch(changeLoadState(true)); // 로드스테이트 true 
//             console.log('%c data receiving completed!', 'background: #333333; color: #8dceff');
//             if(arr2.length >= 1) {
//                 console.log('%c attachments receiving completed!', 'background: #333333; color: #8dceff')
//             }else{
//                 console.log('%c This model has no attachments!', 'background: #333333; color: #8dceff')
//             }
//         } else if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length === 0 && arr2.length === 0){
//             dispatch(changeLoadState(true));
//             console.log('%c there is no tag data', 'background: #333333; color: #8dceff')
//         };
//     });
    
//     return [arr1, arr2]
// };      
