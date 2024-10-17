'use client'
import recomTourData from '../_data/recomTourData'
import recomCulData from '../_data/recomCulData'
import recomEventData from '../_data/recomEventData'
import recomHotelData from '../_data/recomHotelData'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination, Scrollbar } from 'swiper/modules'

export default function RecommendPart() {
    const router = useRouter()
    return (
        <div className='recommand-wrap'>

            {/* 관광지 */}
            <p className='comment'>푸른 바다와 오름, 그리고 한 폭의 그림 같은 자연 🏖️</p>
            <Swiper
                slidesPerView={4}
                // onSlideChange={null}
                // onSwiper={null}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 5
                    }
                }}
                pagination={{
                    clickable: true,
                }}
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                modules={[Autoplay, Pagination]}
                className="recommand-tour-container"
            >

                {
                    recomTourData.map((v, i) => {
                        return (
                            <SwiperSlide key={i}>
                                < div className="recommand-tour-area" >
                                    <img src={`${v.firstimage}`} onClick={
                                        () => {
                                            const url = new URLSearchParams(v).toString()
                                            router.push(`/${v.tag}/detail/?${url}`)
                                        }
                                    } />
                                    <div>
                                        <p>{v.title}</p>
                                        <p>{v.addr}</p></div>
                                </div>
                            </SwiperSlide >
                        )
                    })
                }
            </Swiper >

            {/* 행사 */}
            < p className='comment' > 한국 전역에서 다양한 문화와 즐거움을 한꺼번에 경험 🌟</p >
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 1,     // 슬라이더 회전 각 : 클수록 슬라이딩시 회전이 커짐
                    stretch: 5,   // 슬라이더간 거리(픽셀) : 클수록 슬라이더가 서로 많이 겹침
                    depth: 150,     // 깊이 효과값 : 클수록 멀리있는 느낌이 강해짐
                    modifier: 2,    // 효과 배수 : 위 숫자값들에 이 값을 곱하기 처리하여 효과를 강하게 처리함
                    slideShadows: false, // 슬라이더 그림자 : 3D 효과를 강조하기 위한 회전시 흐릿한 효과
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="recommand-event-container"
            >
                {
                    recomEventData.map((v, i) => {
                        return (
                            <SwiperSlide className='recommand-event-area' key={i}>
                                <img src={`${v.firstimage}`} onClick={
                                    () => {
                                        const url = new URLSearchParams(v).toString()
                                        router.push(`/${v.tag}/detail/?${url}`)
                                    }
                                } />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            {/* 문화시설 */}
            <p className='comment'>한국의 역사와 문화를 직접 체험해보세요</p>
            <Swiper
                slidesPerView={4}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }
                }}
                // onSlideChange={null}
                // onSwiper={null}
                // scrollbar={{
                //   hide: false,
                // }}
                scrollbar={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Scrollbar]}
                className="recommand-common-container"
            >
                {
                    recomCulData.map((v, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="recommand-common-area">
                                    <div>
                                        <img src={`${v.firstimage}`} onClick={
                                            () => {
                                                const url = new URLSearchParams(v).toString()
                                                router.push(`/${v.tag}/detail/?${url}`)
                                            }
                                        } />
                                    </div>
                                    <div>
                                        <p>{v.title}</p>
                                        <p>{v.addr}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            {/* 숙박시설 */}
            <p className='comment'>호화로운 온천 리조트에서 편안한 휴식</p>
            <Swiper
                slidesPerView={4}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }
                }}
                // onSlideChange={null}
                // onSwiper={null}
                // scrollbar={{
                //   hide: false,
                // }}
                scrollbar={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Scrollbar]}
                className="recommand-common-container"
            >
                {
                    recomHotelData.map((v, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="recommand-common-area">
                                    <div>
                                        <img src={`${v.firstimage}`} onClick={
                                            () => {
                                                const url = new URLSearchParams(v).toString()
                                                router.push(`/${v.tag}/detail/?${url}`)
                                            }
                                        } />
                                    </div>
                                    <div>
                                        <p>{v.title}</p>
                                        <p>{v.addr}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div >
    )
}