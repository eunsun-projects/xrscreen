import adminReady from "../../../firebase/firebaseAdmin";
import toLocalISOString from "@/utils/tolocaltimestring";

const sanitizeInput = (input) => {
    return input.replace(/[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|]/gim, '');
};

export async function POST(req){
    try{
        const { name, message } = await req.json();

        const sanitizedName = sanitizeInput(name);
        const sanitizedMessage = sanitizeInput(message);

        const firestore = adminReady.firestore();

        const data = {
            name: sanitizedName,
            message: sanitizedMessage,
            timestamp: new Date()
        };

        let docRef = firestore.collection('replies').doc(sanitizedName).set(data);
            docRef.id = sanitizedName;

        if(docRef === undefined || docRef === null){

            throw new Error("setDoc failed!");

        }else{

            return Response.json(docRef);

        }

    } catch(error) { 

        console.log(error)

        return Response.json({ message: error.message }, {status: 401});

    }
};

export async function GET(req){

    try{

        const firestore = adminReady.firestore();
        
        const repliesCollection = await firestore.collection('replies').orderBy('timestamp').get();
        const repliesData = repliesCollection.docs.map((doc) => {
            let data = doc.data();
            const time = new Date(data.timestamp.seconds*1000);
            const formatted = toLocalISOString(time);
                data.time = formatted;
                delete data.timestamp;
            return data;
        });

        const responseObject = {
            replies : repliesData
        }

        return Response.json(responseObject);

    } catch(error) {

        console.log(error)

        return Response.json({ message: error.message }, {status: 401});

    }
}