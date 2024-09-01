import AdminLogin from "../../components/xyzadmin/adminLogin"
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
    return{
        title : "XYZ Admin",
        description : "xyz's admin page!",
        icons: {
            icon: '/logo192.png',
            shortcut: '/logo192.png',
            apple: '/logo192.png',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/logo192.png',
            },
        }
    }
}

export default function XyzAdmin(){

    const host = headers().get("host");

    return(
        <AdminLogin host={host}/>
    )
}