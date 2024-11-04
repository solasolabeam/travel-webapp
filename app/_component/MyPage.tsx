'use client'
import { useEffect, useState } from "react"
import { HeaderSearch } from "../store"
import { Card } from "./SidoGugun"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons"
import { useSession } from "next-auth/react"

export default function MyPage() {
    const [list, setList] = useState<HeaderSearch[]>([])
    const [clickBookMark, setClickBookMark] = useState('list-acitve')
    const [clickRecent, setClicRecent] = useState('')
    const session = useSession()

    async function showBookmark() {
        const res = await fetch('/api/get/getbookmark')
        const data = await res.json()
        setClickBookMark('list-acitve')
        setClicRecent('')
        setList([...data])
    }

    function showRecentSpot() {
        const storedData = sessionStorage.getItem('tourSpot')
        const sessionData = storedData ? JSON.parse(storedData) : []
        setClickBookMark('')
        setClicRecent('list-acitve')
        setList([...sessionData])
    }

    useEffect(() => {
        showBookmark()
    }, [])

    return (
        <>
            {/* <div className="header-bannerbar">
                <p>마이페이지</p>
            </div> */}
            <div className="mypage-myinfo-area">
                <div className="mypage-myinfo-container">
                    <div className="mypage-myinfo-img">
                        <FontAwesomeIcon icon={faUser} size="10x" color="#dfdfdf"/>
                    </div>
                    <div className="mypage-myinfo-list">
                        <p>{session.data?.user?.name}</p>
                    </div>
                </div>
                <div className="mypage-myinfo-container">
                    <div className="mypage-myinfo-img">
                    <FontAwesomeIcon icon={faEnvelope} size="10x" color="#dfdfdf"/>
                    </div>
                    <div className="mypage-myinfo-list">
                        <p>{session.data?.user?.email}</p>
                    </div>
                </div>
            </div>
            <div className="mypage-container">
                <div className="mypage-selectbar">
                    <ul>
                        <li className={`${clickBookMark}`} onClick={showBookmark}>나의 북마크</li>
                        <li className={`${clickRecent}`} onClick={showRecentSpot}>최근 본 장소</li>
                    </ul>
                </div>
                {
                    list.length != 0 &&
                    <Card headerSearch={list} contentName={''} />
                }
            </div>
        </>
    )
}