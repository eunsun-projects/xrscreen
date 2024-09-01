import { configureStore, createSlice } from '@reduxjs/toolkit';

let load = createSlice({
    name : 'loadstate',
    initialState : { value : false},
    reducers : {
        changeLoadState(state, action){
            state.value = action.payload;
        }
    }
});

let tagSid = createSlice({
    name : 'tagSid',
    initialState : { value : null },
    reducers : {
        setTagSid(state, action){
            state.value = action.payload;
        }
    }
});

let isPopup = createSlice({
    name : 'isPopup',
    initialState : { value : false },
    reducers : {
        setIspopup(state, action){
            state.value = action.payload;
        }
    }
});

let isInfoPopup = createSlice({
    name : 'isInfoPopup',
    initialState : { value : false },
    reducers : {
        setIsInfoPopup(state, action){
            state.value = action.payload;
        }
    }
});

let isLightBox = createSlice({
    name : 'isLightBox',
    initialState : { value : false },
    reducers : {
        setIsLightBox(state, action){
            state.value = action.payload;
        }
    }
});

let showDropDown = createSlice({
    name : 'showDropDown',
    initialState : { value : false },
    reducers : {
        setShowDropDown(state, action){
            state.value = action.payload;
        }
    }
});

let activeMenu = createSlice({
    name : 'activeMenu',
    initialState : { value : null },
    reducers : {
        setActiveMenu(state, action){
            state.value = action.payload;
        }
    }
});

let bgmsList = createSlice({
    name : 'bgmsList',
    initialState : { value : [] },
    reducers : {
        setBgmsList(state, action){
            state.value = action.payload;
        }
    }
})

export let { changeLoadState } = load.actions;
export let { setTagSid } = tagSid.actions;
export let { setIspopup } = isPopup.actions;
export let { setIsLightBox } = isLightBox.actions;
export let { setIsInfoPopup } = isInfoPopup.actions;
export let { setShowDropDown } = showDropDown.actions;
export let { setActiveMenu } = activeMenu.actions;
export let { setBgmsList } = bgmsList.actions;

// export const loadReducer = load.reducer;
// export const tagSidReducer = tagSid.reducer;
// export const isPopupReducer = isPopup.reducer;
// export const isLightBoxReducer = isLightBox.reducer;
// export const isInfoPopupReducer = isInfoPopup.reducer;
// export const showDropDownReducer = showDropDown.reducer;
// export const activeMenuReducer = activeMenu.reducer;
// export const bgmsListReducer = activeMenu.reducer

export const store = configureStore({
    reducer: { 
        load : load.reducer,
        tagSid : tagSid.reducer,
        isPopup : isPopup.reducer,
        isLightBox : isLightBox.reducer,
        isInfoPopup : isInfoPopup.reducer,
        showDropDown : showDropDown.reducer,
        activeMenu : activeMenu.reducer,
        bgmsList : bgmsList.reducer,
    }
}) 