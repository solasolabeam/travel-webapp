'use client'
import Slide from "./Slide";
import getBannerData from "../_data/bannerData"
import { useAppSelector } from "../hooks";
import { usePathname } from "next/navigation";


export default function Banner() {
    const bannerIdx = useAppSelector(state => state.bannerIdx)
    const pathname = usePathname()
    return (
        <>
            {
                pathname !== '/mypage' && pathname !== '/register'
                &&
                <div className="header-bg-container" style={{ background: getBannerData[bannerIdx].bgColor }}>
                    <div className="header-bg-area">
                        <div className="header-bg-left">
                            <p>{getBannerData[bannerIdx].title}</p>
                            <p dangerouslySetInnerHTML={{ __html: getBannerData[bannerIdx].tag }}></p>
                        </div>
                        <div className="header-bg-right">
                            {/* 배너 슬라이드 */}
                            <Slide />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}