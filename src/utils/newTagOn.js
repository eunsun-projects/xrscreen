/** ======== watching tag state ======== */
const newTagOn = (mpSdk, isPopup, setIspopup, setTagSid, dispatch) => { 
    mpSdk.Tag.openTags.subscribe({
        prevState: {
            hovered: null,
            docked: null,
            selected: null,
        },
        onChanged(newState) {
            const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
            if (selected !== this.prevState.selected) {
                if (selected) {
                    // if 밖에서 dispatch 하면, 근처 클릭으로도 스테이트 변경됨 주의
                    dispatch(setTagSid(selected)); // 리덕스 스테이트로 처리 
                    dispatch(setIspopup(!isPopup));
                    dispatch(setTagSid(selected));
                }
            }
            this.prevState = {
                ...newState,
                selected,
            };
        },
    })
};

export default newTagOn;