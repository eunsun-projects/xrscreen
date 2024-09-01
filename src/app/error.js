'use client'
import { useEffect } from 'react';
import styles from '@/app/styles.module.css'
import Link from 'next/link';

export const metadata = {
    title : "error :(",
    description : "some error occured!",
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
        title: "error :(",
        description: "some error occured!",
        url: "https://xr.screenxyz.net",
        siteName: "screenxyz hub",
        images: [
            {
                url: '/logo512.png',
                width: 512,
                height: 512,
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
        title: "error :(",
        description: "some error occured!",
        creator: 'screenxyz',
        images: ['/logo192_3.png',],
    },
}

export default function Error({error, reset}){

    useEffect(()=> {
        console.error(error);
    },[error])

    return(
        <div className={styles.back} style={{width:'100%', height:'100vh', overflow:'auto', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'2rem'}}>
            <p className={styles.notp}>Error</p>
            <Link href={'/'}><p style={{color:'#00ffbe'}} className={styles.notcon}>← return Home</p></Link>
        </div>
    )
}