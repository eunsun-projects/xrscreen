
import admin from 'firebase-admin'
import * as tocken from "../../xrscreenxyz-firebase-key.json"

async function init(){
    try {

        // 1. ↓ 로그인 된 앱이 없다면 
        if (admin.apps.length === 0){

            // xrscreenxyz로 새로 로그인
            admin.initializeApp({
                credential: admin.credential.cert(tocken, 'xrscreenxyz'),
                storageBucket: 'xrscreenxyz.appspot.com'
            });
            console.log('XRscreenxyz Initialized');

            return admin;

        // 2. ↓ 로그인이 되어 있고(0보다 크다면) 이미 xrscreenxyz 아니라면(기존에 다른 앱 로그인되었을 경우)
        }else if (admin.apps.length > 0 && admin.app().options.credential.projectId !== 'xrscreenxyz') {

            // 모든 앱 로그아웃하고 xrscreenxyz로 로그인
            await Promise.all(admin.apps.map(app => app.delete()));
            admin.initializeApp({
                credential: admin.credential.cert(tocken, 'xrscreenxyz'),
                storageBucket: 'xrscreenxyz.appspot.com'
            });
            console.log('XRscreenxyz Initialized');

            return admin;
            
        // 3. ↓ 로그인이 되어 있고 그것이 xrscreenxyz 라면 (기존에 xrscreenxyz이 로그인 된 경우)
        }else if(admin.apps.length > 0 && admin.app().options.credential.projectId === 'xrscreenxyz'){

            return admin;
        }
    
    } catch (error) {
        /*
        * We skip the "already exists" message which is
        * not an actual error when we're hot-reloading.
        */
        if (!/already exists/u.test(error.message)) {
            // console.log(admin.apps)
            // console.log(admin.app())
            console.error('Firebase admin initialization error', error.stack)
        }

        return error;
    }
}

const adminReady = await init();

export default adminReady


// const authTocken = {
//     "type": process.env.AUTH_TYPE,
//     "project_id": process.env.AUTH_PROJECT_ID,
//     "private_key_id": process.env.AUTH_PRIVATEKEY_ID,
//     "private_key": process.env.AUTH_PRIVATEKEY,
//     "client_email": process.env.AUTH_CLIENT_EMAIL,
//     "client_id": process.env.AUTH_CLIENT_ID,
//     "auth_uri": process.env.AUTH_URI,
//     "token_uri": process.env.TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
//     "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
//     "universe_domain": process.env.UNIVERSE_DOMAIN
// }

// const authTocken2 = {
//     type: process.env.AUTH_TYPE,
//     project_id: process.env.AUTH_PROJECT_ID,
//     private_key_id: process.env.AUTH_PRIVATEKEY_ID,
//     private_key: process.env.AUTH_PRIVATEKEY,
//     client_email: process.env.AUTH_CLIENT_EMAIL,
//     client_id: process.env.AUTH_CLIENT_ID,
//     auth_uri: process.env.AUTH_URI,
//     token_uri: process.env.TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
//     universe_domain: process.env.UNIVERSE_DOMAIN
// }