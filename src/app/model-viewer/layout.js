export async function generateMetadata({ params }) {
    return{
        title : 'model-viewer',
        description : 'screenxyz 3d model-viewer sample',
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
            title: 'model-viewer', 
            description: 'screenxyz 3d model-viewer sample', 
            url: 'https://xr.screenxyz.net/model-viewer', 
            siteName: "screenxyz's 3d model-viewer",
            images: [
                {
                    url: '/assets/thumbs/model_viewer_thumb.webp',
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
            title: 'model-viewer',
            description: 'screenxyz 3d model-viewer sample',
            creator: 'screenxyz',
            images: [],
        },
    }
}

export default function ModelViewerLayout({children}){
    return(
        <>{children}</>
    )
} 