async function ifCustomData(tag_2_data){

    if(tag_2_data.length > 0){
        const reduced = tag_2_data.reduce((acc, {id, enabled, attachments, customAttach, label, color, description, stemVector, stemHeight, stemVisible, floorIndex, roomId, anchorPosition}) => {
            acc[id] ??= {
                id : id,
                enabled : enabled,
                attachments : [customAttach || attachments],
                color : color,
                label : label,
                description : description,
                stemVector : stemVector,
                stemHeight : stemHeight,
                stemVisible : stemVisible,
                floorIndex : floorIndex,
                roomId: roomId,
                anchorPosition: anchorPosition
            };
            return acc;
        }, {});
        tag_2_data = Object.values(reduced);
        return tag_2_data;
    }else{
        return tag_2_data
    }
}
export default ifCustomData;