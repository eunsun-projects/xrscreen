"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function PopupLoginBtn ({serverSession}) {
    const { data: session, status } = useSession();

    const popupCenter = (url, title) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;
        const width =
        window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

        const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;

        const systemZoom = width / window.screen.availWidth;

        const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
        const top = (height - 550) / 2 / systemZoom + dualScreenTop;

        const newWindow = window.open(
            url,
            title,
            `width=${500 / systemZoom},height=${550 / systemZoom
            },top=${top},left=${left}`
        );

        newWindow?.focus();

        if (status === "authenticated") {
            newWindow.close();
        }
    };

    const style = {
        height: '1.5rem'
    }

    if (status === "authenticated") { //status === "authenticated"
        return (
            <div style={style}>
                <span> Welcome {session.user.email} 😀</span>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    } else if(!serverSession){ //if (status === "unauthenticated")
        return (
            <div style={style}>
                <span>Please Login</span>
                <button onClick={() => popupCenter("/signin", "Sample Sign In")} >
                    Sign In with Google
                </button>
            </div>
        )
    } else if(status === "unauthenticated"){
        return(
            <div style={style}>
                <span>Please Login</span>
                <button onClick={() => popupCenter("/signin", "Sample Sign In")} >
                    Sign In with Google
                </button>
            </div>
        )
    }

    return (
        <div style={style}>
            <span>Loading...</span>
        </div>
    )
}
