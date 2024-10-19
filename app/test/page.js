'use client'
import { signIn, signOut } from "next-auth/react"

export default function Test() {
    return (
        <>
            <button onClick={() => { signIn() }}>로그인</button>
            <button onClick={() => { signOut() }}>로그아웃</button>
        </>
    )
}