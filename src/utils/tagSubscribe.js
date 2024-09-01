const tagSubscribe = async (mpSdk) => {
    let tagArr = [];
    let attachArr = [];

    const tagPromise = new Promise((resolve, reject) => {
        mpSdk.Tag.data.subscribe({
            onAdded: function (index) {
                mpSdk.Tag.allowAction(index, {
                    docking : false,
                    navigating : true,
                    opening : false
                });
            },
            onCollectionUpdated(collection) {
                // console.log('태그목록 ', collection);
                for(const value of Object.values(collection)){
                    tagArr = [...tagArr, {...value}];
                };
                resolve(tagArr);
            }
        });
    });
    
    const attachPromise = new Promise((resolve, reject) => {
        mpSdk.Tag.attachments.subscribe({
            onCollectionUpdated(collection) {
                // console.log('첨부파일 ', collection )
                for(const value of Object.values(collection)){
                    attachArr = [...attachArr, value];
                };
                resolve(attachArr);
            },
        });
    })

    const [ tags, attachs ] = await Promise.all([tagPromise, attachPromise]);

    return [ tags, attachs ];
}

export default tagSubscribe;