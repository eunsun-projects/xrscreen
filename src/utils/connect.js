import LoadedShowcaseHandler from "./showcasehandler.js";

/** ========= showcaseLoader ========== */
async function showcaseLoader(mpSdk, mpModels, videoRef, isPopup, setIspopup, setTagSid, changeLoadState, dispatch){ 
    try {
        const bindArr = await LoadedShowcaseHandler(mpSdk, mpModels, videoRef, isPopup, setIspopup, setTagSid, changeLoadState, dispatch);
        console.log('%c Hello SCREENXYZ! ignore geoip error', 'background: #333333; color: #8dceff');

        return bindArr;
    }
    catch(err) {
        console.error(err);
        throw(err);
    }   
};

export default showcaseLoader;
