'use client'
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function LoginBtn() {
    return(
        <button onClick={() => signIn("google") }>로그인</button>
        // <Link href={'/signin'}>로그인</Link>
    )
}