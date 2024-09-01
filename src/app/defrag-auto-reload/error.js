'use client'
import { useRouter } from 'next/navigation';
import { React, useEffect } from "react";

export default function Error({error, reset}){
    const router = useRouter();

    useEffect(()=> {
        console.error(error);
    },[error])

    return (
        <div style={{ display : "flex", justifyContent : "center", flexDirection : "column", position : "absolute", top : "50%", left : "50%", transform : "translate(-50%, -50%)"}}>
            <h4>oops! some error occurred. please try again later</h4>
            <button style={{ margin : "0 auto", width : "40%" }} onClick={()=> router.push('/')}>return Home</button>
        </div>
    )
}