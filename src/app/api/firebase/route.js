import adminReady from "../../../firebase/firebaseAdmin";

/** new ways ! */
export async function GET(req) {

    try{        

        const firestore = adminReady.firestore();
        // const auth = admin.auth();
        
        // get mp models data
        const modelsCollection = await firestore.collection('mp_models').where("isPublic", "==", true).get();
        const modelsData = modelsCollection.docs.map((doc) => {
            let data = doc.data();
            data.time = '';
            return data;
        });

        // get hubs data
        const hubsCollection = await firestore.collection('screenhub').get();
        const hubsData = hubsCollection.docs.map((doc)=> doc.data());


        // get model-viewer data
        const viewerCollection = await firestore.collection('modelviewer_basic').get();
        const viewerData = viewerCollection.docs.map((doc)=> doc.data());

        const responseObject = {
            models : modelsData,
            hubs : hubsData,
            viewer : viewerData
        }

        return Response.json(responseObject, {status: 200});

    } catch (error) {

        return Response.json({ message: "An error occurred", error: error.message }, {status:401});

    }
}