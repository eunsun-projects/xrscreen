import Fxsample from "./components/fxsample";
import styles from '@/app/fxsample/styles.module.css'

export async function generateMetadata({ params }) {
    return{
        title : 'fx-sample',
        description : 'screenxyz web audio sample',
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
            title: 'fx-sample', // db 상 모델 타이틀
            description: 'screenxyz web audio sample', // db 상 모델 설명
            url: 'https://xr.screenxyz.net/fxsample', // db 상 모델 url
            siteName: "screenxyz's XR service",
            images: [
                {
                    url: '',
                    // width: 800,
                    // height: 600,
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
            title: 'fx-sample',
            description: 'screenxyz web audio sample',
            creator: 'screenxyz',
            images: [],
        },
    }
}


export default async function Page({ params }) {
    return(
        <div className={styles.webaproot}>
            <Fxsample></Fxsample>
        </div>
    )
}