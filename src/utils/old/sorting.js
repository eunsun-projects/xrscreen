let notSortedArr = []; //{분류없음}
let cate = []; // not {분류없음} unsorted
let cateSorted = []; // not {분류없음} sorted > Array packed
let forFinal = []; // not {분류없음} sorted > unpacked
let finalArr = []; // final Array [...분류없음 + ...sorted] index matched menuContent 

/** ========= sort All array =========== */
async function sorting(tag_2_data, uniqueArr, settedArr){
    if(tag_2_data.length >= 1){

      uniqueArr.sort(function(a, b) { //tag_2_data ****
        const upperCaseA = a.toUpperCase();
        const upperCaseB = b.toUpperCase();
        if(upperCaseA > upperCaseB) return 1;
        if(upperCaseA < upperCaseB) return -1;
        // if(upperCaseA === upperCaseB) return 0;
        return 0;
      });

      settedArr.sort(function(a, b) { //tag_2_data ****
        const upperCaseA = a.label.toUpperCase();
        const upperCaseB = b.label.toUpperCase();
        if(upperCaseA > upperCaseB) return 1;
        if(upperCaseA < upperCaseB) return -1;
        // if(upperCaseA === upperCaseB) return 0;
        return 0;
      });

      notSortedArr = settedArr.filter(it => { return it.sortt == null});
      finalArr = settedArr.filter(it => { return it.sortt == null }); //to ready
      cate = settedArr.filter(it => { return Array.isArray(it.sortt)});

      for(let i = 0; uniqueArr.length > i; i++){
          cateSorted[i] = cate.filter(it => { return it.sortt[1] === uniqueArr[i]}) //.includes(uniqueArr[i])
      };

      for(let i = 0; cateSorted.length > i; i++){
          cateSorted[i].sort(function(a, b) { 
              const upperCaseA = a.label.toUpperCase();
              const upperCaseB = b.label.toUpperCase();
              if(upperCaseA > upperCaseB) return 1;
              if(upperCaseA < upperCaseB) return -1;
              // if(upperCaseA === upperCaseB) return 0;
              return 0;
          })
      };

      // console.log(cateSorted);
      // cateSorted.map((e) => {
      //     forFinal.push(...e)
      //     return forFinal;
      // });

      cateSorted.forEach((e) => {
        forFinal.push(...e)
      });

      Array.prototype.push.apply(finalArr, forFinal);
    }
    return [finalArr, notSortedArr, forFinal];
};
export default sorting;