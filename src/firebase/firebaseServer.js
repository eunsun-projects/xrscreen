// Import the functions you need from the SDKs you need
import "firebase/compat/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}; 

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp); 

async function firebaseInitModel(){

    let modelsCopy = [];

    const publicModels = query(collection(db, 'mp_models'), where("isPublic", "==", true));
    const querySnapshot = await getDocs(publicModels);

    async function setSnapShot(snapShot){

        snapShot.forEach((e)=>{
            let data = e.data();
            data.time = ''; // time 객체는 prop 전송 안되므로,
            modelsCopy.push(data);
        });
        return modelsCopy;
    };

    const models = await setSnapShot(querySnapshot);

    return models; // userinfo
};

async function firebaseInitHub(){
    let hubsCopy = [];

    const hubData = query(collection(db, 'screenhub'));
    const hubSnapshot = await getDocs(hubData);

    async function setHub(snapShot){
        snapShot.forEach((e)=>{
            hubsCopy.push(e.data());
        })
        return hubsCopy;
    };

    const hubs = await setHub(hubSnapshot);

    return hubs
};

async function firebaseInitModelViewer(){
    let mvsCopy = [];

    const mvData = query(collection(db, 'modelviewer_basic'));
    const mvSnapshot = await getDocs(mvData);

    async function setMv(snapShot){
        snapShot.forEach((e)=>{
            mvsCopy.push(e.data());
        })
        return mvsCopy;
    };

    const modelViewers = await setMv(mvSnapshot);

    return modelViewers
};
// const user = await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_FIREBASEID, process.env.NEXT_PUBLIC_FIREBASEPW) // 게스트 로그인
// const models = await firebaseInitModel(); // userinfo

export { firebaseApp, db, auth, storage, firebaseInitModel, firebaseInitHub, firebaseInitModelViewer}; // userinfo, firebaseInitHub