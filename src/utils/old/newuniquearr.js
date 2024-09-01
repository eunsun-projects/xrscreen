let uniqueArr = [];

/** ========= make uniqueArr that contain deduped inform ========= */
async function newUniqueArr(settedArr){
    if(settedArr.length >= 1){
        let minus = settedArr.filter(e => e.sortt !== null);
            const set = new Set(minus.map(item => item.sortt[1]));
            uniqueArr = [...set]; 
    }else{
        uniqueArr = [];
    };
    return uniqueArr;           
};
export default newUniqueArr;