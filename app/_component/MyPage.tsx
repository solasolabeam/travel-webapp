'use client'
import { useEffect } from "react"

export default function MyPage() {
    useEffect(() => {
        document.body.style.backgroundColor = '#eee';

        return () => {
            document.body.style.backgroundColor = '';
        }
    })
    return (
        <div className="header-bannerbar">
            <p>마이페이지</p>
        </div>
    )
}