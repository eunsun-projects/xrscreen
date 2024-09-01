import VasBasic from "@/components/vas/vasbasic"
import NotFound from "@/app/not-found"

export async function generateMetadata({params}){

    return(
        {
            title: 'virtual art space',
            description: 'virtual art space',
            generator: 'Next.js',
            applicationName: 'xrscreenxyz',
            referrer: 'origin-when-cross-origin',
            keywords: ['screenxyz', 'vr', 'xr', 'vas', 'virtual art space', 'xrscreenxyz', 'exhibition', 'gallery', 'art', 'music', 'painting', 'sculpture', 'design'],
            authors: [{ name: 'screenxyz' }, { name: 'screenxyz', url: 'https://xr.screenxyz.net' }],
            creator: 'screenxyz',
            publisher: 'screenxyz',
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
                title: 'virtual art space',
                description: 'virtual art space',
                url: 'https://xr.screenxyz.net/vas',
                siteName: 'screenxyz',
                images: [
                    {
                        url: '/assets/vas/img/vas_thumb.png',
                        width: 800,
                        height: 600,
                    },
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
        }
    )
}

export function setSpace(slug){
    if(slug === 'square'){
        return '정방형공간'
    }else if(slug === 'rect'){
        return '세장형공간'
    }else if(slug === 'dig'){
        return 'ㄷ자형공간'
    }else{
        return 'error'
    }
} 

export default function Vas({params}){
    const { slug } = params;
    const title = setSpace(slug);

    if(title === 'error'){
        return( 
            <NotFound />
        )
    }else{
        return(
            <VasBasic title={title}/>
        )
    }
}