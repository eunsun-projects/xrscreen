const setTagAttachment = (tagData) => {
    const regexExp = /\{([^\]\[\r\n]*)\}/; //do not set global flag

    if(tagData.length > 0) {
        const mapped = tagData.map((e, i) =>{
            let attachments = [];
            if(e.attachments && e.customAttach){
                attachments = [ ...e.attachments, ...e.customAttach ];
            }else if(e.attachments){
                attachments = [...e.attachments];
            }else if(e.customAttach){
                attachments = [...e.customAttach];
            }else{
                attachments = [];
            }
            return {
                ...e,
                sortt : e.description.match(regexExp), //[1]
                attachments : attachments
            }
        });

        mapped.sort(function(a, b) { 
            const upperCaseA = a.label.toUpperCase();
            const upperCaseB = b.label.toUpperCase();
            if(upperCaseA > upperCaseB) return 1;
            if(upperCaseA < upperCaseB) return -1;
            return 0;
        });

        return mapped;
    } else {
        return [];
    }
}

export default setTagAttachment;