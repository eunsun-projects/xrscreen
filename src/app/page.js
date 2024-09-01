import Config from "../../config/config.export";
import Xyzhub from "../components/xyzhub/xyzhub.js"
import React, { Suspense } from 'react';
import styles from "../components/xyzhub/page.module.css";
import Hubbtn from "../components/xyzhub/hubbtn"
import Landscape from "../components/xyzhub/ifLandscape"
import Link from "next/link";

export async function getData(){
    try {
            // const pack = {
            //     req: 'hubgetreq',
            // };
            const req = {
                method: 'GET',
                cache : 'no-store',
                headers: {
                    // 'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${process.env.NEXT_PUBLIC_POST_TOKEN}`
                },
                // body: JSON.stringify(pack)
            };

            const response = await fetch(`${Config().baseUrl}/api/hubmain`, req); 
            const result = await response.json();

            const hubs = Object.values(result.hubs[1]);

            hubs.sort((a,b) => {
                if (a.num > b.num) return 1;
                if (a.num < b.num) return -1;
                return 0;
            });

            const hubs2 = Object.values(result.hubs[0]);

            hubs2.sort((a,b) => {
                if (a.num > b.num) return 1;
                if (a.num < b.num) return -1;
                return 0;
            });

            const hubs3 = Object.values(result.hubs[2]);

            hubs3.sort((a,b) => {
                if (a.num > b.num) return 1;
                if (a.num < b.num) return -1;
                return 0;
            });

            return [hubs, hubs2, hubs3];
    } catch(err) {
        console.log(err)
    }
}

export async function generateMetadata() {
    return{
        title : "xr.screenxyz",
        description : "screenxyz hub :)",
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
            title: "xr.screenxyz",
            description: "screenxyz hub :)",
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
            title: "xr.screenxyz",
            description: "screenxyz hub :)",
            creator: 'screenxyz',
            images: ['/logo512.png',],
        },
    }
}

export default async function Home() {
    // const host = headers().get("host");
    const hubs = await getData();

    // console.log(hubs)

    return (
        <Suspense fallback={
            <div className='loading-back'>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div> }>

            <Landscape />

            <div className={styles.hubbox} >
                {/* <Link href={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3.1rem" viewBox="0 0 98.457 103.865">
                        <path id="symbol" data-name="symbol" d="M6877.469-5253.135l-8.286-4.05.717-1.467,8.969,4.383-.553,1.134Zm4.2-1.968,8.473-5.281.864,1.388-8.473,5.281Zm-2.773.81v-9.982h1.636v9.982Zm-22-8.892.716-1.469,8.971,4.383-.718,1.47Zm36.54.75,8.473-5.279.864,1.386-8.474,5.281Zm-48.823-6.752.716-1.467,8.971,4.382-.718,1.469Zm58.212,1.817v-9.984h1.635v9.984Zm-23.929-.784v-9.984h1.634v9.984Zm-46.565-7.035.718-1.467,8.969,4.382-.717,1.469Zm35.466-7.607.765-1.445,8.825,4.669-.765,1.445Zm13.29,2.527,8.473-5.281.864,1.387-8.472,5.279Zm21.738-.771v-9.984h1.635v9.984Zm24.245-1.08v-9.982h1.384v9.982Zm-71.356-7.07.765-1.443,8.825,4.667-.765,1.445Zm37.14,1.588,8.473-5.281.864,1.387-8.474,5.281Zm-35.58-4.18,8.473-5.281.864,1.387-8.472,5.281Zm-13.643-3.8.764-1.443,8.824,4.668-.763,1.445Zm10.944,3.958v-9.982h1.633v9.982Zm37.84-6.4.652-1.5,9.153,3.987-.654,1.5Zm10.41,3.319v-9.984h1.635v9.984Zm24.245-1.08v-9.984h1.384v9.984Zm-95.523-6.185.765-1.445,8.824,4.669-.765,1.445Zm37.494,2.86,8.474-5.279.864,1.386-8.474,5.281Zm10.665-4.452.654-1.5,9.151,3.987-.652,1.5ZM6830-5303.3v-9.983h1.384v9.983Zm47.468-1.228v-9.984h1.634v9.984Zm-22.89-.962v-9.984h1.633v9.984Zm48.25-2.893v-9.984h1.635v9.984Zm24.245-1.08v-9.982h1.384v9.982Zm-97.073-7.7v-9.982h1.384v9.982Zm14.169-4.54.652-1.5,9.153,3.987-.652,1.5Zm12.815,2.173,8.473-5.279.864,1.388-8.471,5.279Zm20.483,1.139v-9.982h1.634v9.982Zm15.726-5.206.654-1.5,9.153,3.987-.654,1.5Zm11.422,2.313,8.473-5.279.864,1.386-8.473,5.281Zm22.457-1.848v-9.982h1.384v9.982Zm-95.612-4.107.652-1.5,9.153,3.985-.652,1.5Zm49.024-1.892.652-1.5,9.153,3.987-.652,1.5Zm-11.9,2.372,8.474-5.279.864,1.386-8.474,5.281Zm47.793-1.855,8.473-5.281.864,1.387-8.472,5.281Zm-83.585-1.76,8.473-5.279.864,1.386-8.472,5.281Zm47.393-3.615,8.473-5.279.864,1.386-8.473,5.281Zm35.611-4.037.654-1.5,9.153,3.987-.654,1.5Zm-71.4.422,8.473-5.279.864,1.386-8.473,5.281Zm58.692-5.957.652-1.5,9.153,3.987-.652,1.5Zm-11.3,2.342,8.473-5.279.864,1.386-8.473,5.281Zm-35.79-3.615,8.472-5.279.864,1.386-8.472,5.281Zm11.6-7.23,7.92-4.935h.769l.648,1.042-8.473,5.281Z" transform="translate(-6830.001 5357)"/>
                    </svg>
                </Link> */}

                <div className={styles.title}>
                    <p>screenxyz HUB</p>
                    {/* <p style={{fontSize:'1.2rem'}}>_-_-_-_-_-_-_-_-_-_-</p> */}
                </div>

                <div className={styles.navmenu} style={{fontSize:'1.3rem'}}>
                        {
                            hubs && hubs[0].map((e, i) => {
                                return(
                                    <React.Fragment key={i}>
                                        <Hubbtn item={e}/>
                                    </React.Fragment>
                                )
                            })
                        }
                    <Xyzhub hubs={hubs} /> 
                </div>
            </div>
        </Suspense>
    )
}

//screenhub={hubs}