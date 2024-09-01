const appStateCheck = (mpSdk, tags, attachs, changeLoadState, dispatch) => {
    mpSdk.App.state.subscribe(function (appState) {   
        if(appState.phase === mpSdk.App.Phase.PLAYING){
            dispatch(changeLoadState(true)); // 로드스테이트 true 
            if(tags.length >= 1) {
                console.log('%c data receiving completed!', 'background: #333333; color: #8dceff');
            }else{
                console.log('%c This model has no tag data', 'background: #333333; color: #8dceff');
            }
            if(attachs.length >= 1) {
                console.log('%c attachments receiving completed!', 'background: #333333; color: #8dceff');
            }else{
                console.log('%c This model has no attachments!', 'background: #333333; color: #8dceff');
            }
        }
    });
}

export default appStateCheck;