import { Swiper, SwiperSlide } from "swiper/react"
import { useAppDispatch } from "../hooks"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { changeBanner } from "../store"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";

export default function Slide() {
    const idx = [1, 2, 3, 4];
    const dispatch = useAppDispatch()
    return (
        <>
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                // navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                className='header-slide-container'
                onSlideChange={(e) => dispatch(changeBanner(e.activeIndex))}
            >
                {
                    idx.map((v, i) => {
                        return (
                            <SwiperSlide className='header-slide-area' key={i}>
                                <Image src={`/img/banner${v}.jpg`} className='header-slide-img' alt="banner" width={1000} height={1000} priority/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    )
}