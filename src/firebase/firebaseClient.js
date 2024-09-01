"use client"
// Import the functions you need from the SDKs you need
import "firebase/compat/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

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
const storage = getStorage(firebaseApp); 
const auth = getAuth(firebaseApp);
const analytics = isSupported().then(yes => yes ? getAnalytics(firebaseApp) : null);


// 이거 지우지 말것, 클라이언트에서도 이 함수 써야함
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

    return hubs;
};

export { firebaseApp, db, auth, storage, analytics, firebaseInitHub };