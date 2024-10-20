'use client'

// import { usePathname } from "next/navigation";
// import { useEffect } from "react"

export default function BannerBar() {
    // const pathname = usePathname()
    // useEffect(() => {
    //     console.log('pathname', pathname)
    //     const bannerElement = document.querySelector<HTMLDivElement>('.header-bannerbar');
    //     if (bannerElement) {
    //         if (pathname == '/tour') {
    //             bannerElement.style.backgroundImage = 'url("/img/tourBanner.jpg")'
    //         } else if (pathname == '/culture') {
    //             bannerElement.style.backgroundImage = 'url("/img/123.jpg")'
    //         } else if (pathname == '/event') {
    //             bannerElement.style.backgroundImage = 'url("/img/banner1.jpg")'
    //         } else if (pathname == '/hotel') {
    //             bannerElement.style.backgroundImage = 'url("/img/banner1.jpg")'
    //         } else if (pathname == '/mylocation') {
    //             bannerElement.style.backgroundImage = 'url("/img/banner1.jpg")'
    //         }
    //     }
    // }, [])
    return (
        <div className="header-bannerbar">
            <p>관광지</p>
        </div>
    )
}