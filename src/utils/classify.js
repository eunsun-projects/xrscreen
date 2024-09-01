const classify = (tagData, uniqueArr) => {
    if(tagData.length > 0){
        const unCategorized = tagData.filter(e => e.sortt === null);

        const categorized = tagData.filter((e, i) => { 
            if(Array.isArray(e.sortt) && uniqueArr.includes(e.sortt[1])) return e;
        });

        categorized.sort(function(a, b) { 
            const upperCaseA = a.label.toUpperCase();
            const upperCaseB = b.label.toUpperCase();
            if(upperCaseA > upperCaseB) return 1;
            if(upperCaseA < upperCaseB) return -1;
            return 0;
        });

        const sumArr = [...unCategorized, ...categorized];

        return [sumArr, unCategorized, categorized];
    }else{
        return [[], [], []];
    }
}

export default classify;