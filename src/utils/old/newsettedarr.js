let settedArr = [];

/** ========= function that extract sortt: for menulist sort => make new arr : settedArr ========= */
async function newSettedArr(tag_2_data){
    const regexExp = /\{([^\]\[\r\n]*)\}/; //do not set global flag

    if (tag_2_data.length >= 1) {
        tag_2_data.forEach((e,i) => {
            settedArr[i] ??= {
                sortt : e.description.match(regexExp), //[1]
                ...e
            }
        });
        return settedArr;
    } else {
        return settedArr;
    }
};
export default newSettedArr;