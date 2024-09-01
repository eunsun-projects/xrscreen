import { storage } from "../../firebase/firebaseServer.js";
import { ref, getDownloadURL } from "firebase/storage";
import ScreenAutoReload from "../../components/mpMain/00/screenAutoReload.js";

export async function getData() {

    // console.log(userinfo.email)

    async function getBackUrl(){
        const imagesRef = ref(storage, 'images');
        const backRef = ref(imagesRef, `/assets/background/public/defragmentation.webp`);
        const url = getDownloadURL(backRef);
        return url;
    }

    const model = {
        title : "조각모음",
        name : "23_defragmentation",
        unique : "defrag-auto-reload",
        sid : "nnuReNVjN1A",
        route : "/defrag-auto-reload",
        url : "https://xr.screenxyz.net/defrag-auto-reload",
        description : "2023 언폴드엑스 기획자캠프 선정프로젝트, 조각모음 defragmentation, 2023.09.02_09.26, 문래예술공장 갤러리M30",
        keywords : "조각모음,언폴드X,unfoldX,defragmentation",
        isPublic : true,
        downLogo : [ false , '' ],
        isBgm : [ false , '' ],
        logo : [ false, '' ],
        object : [ true , 'models-defragmentation.js'],
        plane : [ false, ''],
        video : [ true, "low3_final.mp4" ],
        backUrl : ''
    };

    model.backUrl = await getBackUrl();
            
    return model;
};

export async function generateMetadata({ params }) {
    const model = await getData(); 

    if(model !== undefined){
        return{
            title : model.title,
            description : model.description,
            generator: 'Next.js',
            applicationName: 'xrscreenxyz',
            referrer: 'origin-when-cross-origin',
            keywords: ['screenxyz', 'vr', 'xr'],
            authors: [{ name: 'Eun' }, { name: 'Eun', url: 'https://xr.screenxyz.net' }],
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
                icon: '/logo192.png',
                shortcut: '/logo192.png',
                apple: '/logo192.png',
                other: {
                    rel: 'apple-touch-icon-precomposed',
                    url: '/logo192.png',
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
            title : "error 404",
            description : "error page",
        }
    }
}

export default async function Page() {
    const model = await getData();
    
        return(
            <ScreenAutoReload name={model.name} />
        )
}