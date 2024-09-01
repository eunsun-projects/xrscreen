/** ======== loading checking ======= */
export default async function loadingCheck(mpSdk, arr1, arr2, dispatch){

    mpSdk.App.state.subscribe(function (appState) {   
        if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length >= 1){
            dispatch(changeLoadState(true)); // 로드스테이트 true 
            console.log('%c data receiving completed!', 'background: #333333; color: #8dceff');
            if(arr2.length >= 1) {
                console.log('%c attachments receiving completed!', 'background: #333333; color: #8dceff')
            }else{
                console.log('%c This model has no attachments!', 'background: #333333; color: #8dceff')
            }
        } else if(appState.phase === mpSdk.App.Phase.PLAYING && arr1.length === 0 && arr2.length === 0){
            dispatch(changeLoadState(true));
            console.log('%c there is no tag data', 'background: #333333; color: #8dceff')
        };
    });
    
    return [arr1, arr2]
};  