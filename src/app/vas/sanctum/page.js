import VasBasic from "@/components/vas/vasbasic"

export const metadata = {
            title: 'sanctum',
            description: 'virtual art space - sanctum',
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
                title: 'sanctum',
                description: 'virtual art space - sanctum',
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

export default function SanctumPage(){

    return(
        <VasBasic title={'sanctum'}/>
    )
    
}