import Config from "../../../config/config.export";
import { storage } from "@/firebase/firebaseServer";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import NotFound from "../not-found"; 
import Screenmp from "../../components/mpMain/00/screenmp";
import Image from "next/image";

export const getData = async () => {
    try {

            const response = await fetch(`${Config().baseUrl}/api/firebase`);
            const result = await response.json();


            return result.models;

    } catch(err) {
        console.log(err)
    }
};

export const getModel = async (models, slug) => {
    const model = models.find(e => e.unique === slug);

    const getUrls = async (model, type) => {
        let parentFolder = '';
        switch (type) {
            case "video":
                parentFolder = "videos";
                break;
            case "object":
                parentFolder = "glbs";
                break;
            case "plane":
                parentFolder = "planes";
                break;
            case "bgm":
                parentFolder = "bgm";
                break;
        }
        const getUrlPromiseAll = async (parentFolder) => {
            const reference = ref(storage, `${parentFolder}/assets${model.route}`);
            const list = await listAll(reference);
            const urlPromises = list.items.map(itemRef => getDownloadURL(itemRef));

            // 모든 URL을 병렬로 가져옵니다.
            const urls = await Promise.all(urlPromises);
            return urls
        }
        
        // 가져온 URL을 적절한 모델 배열에 추가합니다.
        if (type === 'video') {
            const urls = await getUrlPromiseAll(parentFolder);
            model.vidsUrl.push(...urls);
        } else if (type === 'object') {
            const urls = await getUrlPromiseAll(parentFolder);
            model.objsUrl.push(...urls);
        } else if (type === 'plane') {
            const urls = await getUrlPromiseAll(parentFolder);
            model.planesUrl.push(...urls);
        } else if (type === 'bgm'){
            const bgmsRef = ref(storage, `bgms/assets${model.route}`);

            const bgmList = await listAll(bgmsRef);
            const bgmUrlPromises = bgmList.items.map(itemRef => {
                model.songNames.push(itemRef.name); // 여기 하나더 있음..
                return getDownloadURL(itemRef);
            });

            const bgmUrls = await Promise.all(bgmUrlPromises);
            model.bgmsUrl.push(...bgmUrls);

            const cdRef = ref(storage, `images/assets/bgmLogo${model.route}`);
            const cdlist = await listAll(cdRef);
            const cdUrlPromises = cdlist.items.map(itemRef => getDownloadURL(itemRef));

            const cdUrls = await Promise.all(cdUrlPromises);
            model.cdUrl.push(...cdUrls);
        }
    }

    const imagesRef = ref(storage, 'images');
    const isObjects = model.object[0];
    const isDownLogo = model.downLogo[0];
    const isVideo = model.video[0];
    const isPlane = model.plane[0];
    const isBgm = model.isBgm[0];
    const isLogo = model.logo[0];
    model.logoUrl = '';
    model.lowLogoUrl = '';
    model.songNames = [];
    model.bgmsUrl = [];
    model.cdUrl = [];
    model.vidsUrl = [];
    model.objsUrl = [];
    model.planesUrl = [];

    const backurl = `/assets/background${model.route}.webp`
    model.backUrl = backurl;

    if(isDownLogo){
        const imgRef = ref(imagesRef, `assets/downLogo${model.route}${model.route}.png`);
        const downLogoUrl = await getDownloadURL(imgRef);          
        model.lowLogoUrl = downLogoUrl; // 어레이일 필요가 없어서
    };

    if(isObjects) await getUrls(model, "object");
    if(isVideo) await getUrls(model, "video");
    if(isPlane) await getUrls(model, "plane");
    if(isBgm) await getUrls(model, 'bgm');

    if(isLogo){
        const logoRef = ref(imagesRef, `assets/logo`);
        const list = await listAll(logoRef);
        const urlPromises = list.items.map(itemRef => getDownloadURL(itemRef));
        const urls = await Promise.all(urlPromises);

        for(const url of urls){
            if(url.includes(model.unique)){
                model.logoUrl = url;
            }
        }
    }

    return model;
};
// });

export async function generateStaticParams() {
    const models = await getData();
    return models.map((post) => ({
        slug: post.unique, // post.slug
    }))
};

export async function generateMetadata({ params }) {
    const { slug } = params;
    const models = await getData();
    const model = await getModel(models, slug); // 1초 정도 걸림

    if(slug.length > 1 && model !== undefined && model !== null && slug === model.unique){
        return{
            title : model.unique,
            description : model.description,
            generator: 'Next.js',
            applicationName: 'xrscreenxyz',
            referrer: 'origin-when-cross-origin',
            keywords: ['screenxyz', 'vr', 'xr'],
            authors: [{ name: 'screenxyz' }, { name: 'screenxyz', url: 'https://xr.screenxyz.net' }],
            formatDetection: {
                email: false,
                address: false,
                telephone: false,
            },
            metadataBase: new URL('https://xr.screenxyz.net'),
            alternates: {
                canonical: '/',
                languages: {
                    'ko-KR': '/',
                },
            },
            openGraph: {
                title: model.title, // db 상 모델 타이틀
                description: model.description, // db 상 모델 설명
                url: model.url, // db 상 모델 url
                siteName: "screenxyz's XR service",
                images: [
                    {
                        url: model.backUrl,
                        width: 800,
                        height: 600,
                    }
                ],
                locale: 'ko_KR',
                type: 'website',
            },
            robots: {
                index: false,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: false,
                    noimageindex: true,
                },
            },
            icons: {
                icon: '/logo192_3.png',
                shortcut: '/logo192_3.png',
                apple: '/logo192_3.png',
                other: {
                    rel: 'apple-touch-icon-precomposed',
                    url: '/logo192_3.png',
                },
            },
            twitter: {
                card: 'summary_large_image',
                title: model.title,
                description: model.description,
                creator: 'screenxyz',
                images: [model.backUrl],
            },
        }
    }else{
        return{
            title : "error page!",
            description : "error page",
            icons: {
                icon: '/logo192_3.png',
                shortcut: '/logo192_3.png',
                apple: '/logo192_3.png',
                other: {
                    rel: 'apple-touch-icon-precomposed',
                    url: '/logo192_3.png',
                },
            },
        }
    }
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
    const { slug } = params;
    const models = await getData();
    const model = await getModel(models, slug); // 1초 정도 걸림
    
    if(slug.length > 1 && model !== undefined && model !== null && slug === model.unique){
        return(
            <>
                <div style={{position:"absolute", width: "100vw", height:"calc(var(--vh, 1vh)*100)"}}>
                    <Image src={model.backUrl} fill={true} style={{objectFit: "cover"}} priority={true} alt="background image" />
                </div>
                <Screenmp model={model} />
            </>
        )
    }else{
        // return notFound(); 
        return(
            <NotFound />
        )
    }
}

// async function getUrls(mm, type, refe){
//     let parentFolder;
//     let urlKey;
//     switch (type){
//         case "video" :
//             parentFolder = "videos";
//             urlKey = "vidsUrl";
//             break;
//         case "object" :
//             parentFolder = "glbs";
//             urlKey = "objsUrl";
//             break;
//         case "plane" :
//             parentFolder = "planes";
//             urlKey = "planesUrl";
//             break;
//     }           
//     const ref = refe(storage, `${parentFolder}/assets${mm.route}`);
//     const list = await listAll(ref);

//     for await (const itemRef of list.items){
//         const url = await getDownloadURL(itemRef);
//         mm[urlKey].push(url);
//     }
//     return mm
// };

// async function firebaseSet(matchedModel){
//     if(matchedModel){
//         const mm = matchedModel;
//         const imagesRef = ref(storage, 'images');
//         const isObjects = mm.object[0];
//         const isDownLogo = mm.downLogo[0];
//         const isVideo = mm.video[0];
//         const isPlane = mm.plane[0];
//         const isBgm = mm.isBgm[0];
//         const isLogo = mm.logo[0];
//         mm.songNames = [];
//         mm.backUrl = '';
//         mm.logoUrl = '';
//         mm.bgmsUrl = [];
//         mm.cdUrl = [];
//         mm.vidsUrl = [];
//         mm.objsUrl = [];
//         mm.planesUrl = [];

//         // const backRef = ref(imagesRef, `/assets/background/public${mm.route}.webp`);
//         // const backUrl = await getDownloadURL(backRef)
//         // mm.backUrl = backUrl;
//         const backurl = `/assets/background${mm.route}.webp`
//         mm.backUrl = backurl;

//         if(isDownLogo){
//             const imgRef = ref(imagesRef, `assets/downLogo${mm.route}${mm.route}.png`);
//             const downLogoUrl = await getDownloadURL(imgRef);          
//             mm.lowLogoUrl = downLogoUrl; // 어레이일 필요가 없어서
//         };

//         if(isObjects){
//             await getUrls(mm, "object", ref);
//         }else{
//             mm.objsUrl = [];
//         };

//         if(isVideo){ // 비디오가 여러개일 경우 수정 필요함..
//             await getUrls(mm, "video", ref);
//         }else{
//             mm.vidsUrl = [];
//         };

//         if(isPlane){
//             await getUrls(mm, "plane", ref);
//         }else{
//             mm.planesUrl = [];
//         };

//         if(isLogo){
//             const logoRef = ref(imagesRef, `assets/logo`);
//             const list = await listAll(logoRef);

//             for await (const itemRef of list.items){
//                 const url = await getDownloadURL(itemRef);
//                 if(url.includes(mm.unique)){
//                     mm.logoUrl = url;
//                 }   
//             }
//             // list.items.forEach(async (itemRef) => {
//             //     if(itemRef.name === mm.logo[1]){
//             //         const url = await getDownloadURL(itemRef);
//             //         mm.logoUrl = url;
//             //     }
//             // });
//         }else{
//             mm.logoUrl = '';
//         };

//         if(isBgm){
//             const bgmsRef = ref(storage, `bgms/assets${mm.route}`);
//             const list = await listAll(bgmsRef)

//             for await (const itemRef of list.items){
//                 mm.songNames.push(itemRef.name); // 여기 하나더 있음..
//                 const url = await getDownloadURL(itemRef);
//                 mm.bgmsUrl.push(url);
//             }

//             const cdRef = ref(imagesRef, `assets/bgmLogo${mm.route}`);
//             const cdlist = await listAll(cdRef);

//             for await (const itemRef of cdlist.items){
//                 const url = await getDownloadURL(itemRef);
//                 mm.cdUrl.push(url);
//             }

//         }else{
//             mm.bgmsUrl = [];
//             mm.cdUrl = [];
//         }
//         return mm
//     }     
// };

// const result = await firebaseSet(model);