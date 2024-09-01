const setUniqueCategory = (tagData) => {
    if(tagData.length > 0){
        const minus = tagData.filter(e => e.sortt !== null);
        const set = new Set(minus.map(item => {
            return item.sortt && item.sortt[1] ? item.sortt[1] : "";
        }));
        const uniqueArr = [...set]; 

        uniqueArr.sort((a, b) => {
            // a 또는 b가 undefined일 수 있으므로, 빈 문자열로 대체하여 비교합니다.
            return a.localeCompare(b);
        });;

        return uniqueArr.filter(item => item !== ""); // 빈 문자열 제거
    }else{
        return [];
    };
}

export default setUniqueCategory;