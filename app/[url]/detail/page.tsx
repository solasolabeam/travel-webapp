'use client'

import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noIMG from '@/public/img/No_Image_Available.jpg'
import Image from "next/image";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { HeaderSearchPlus } from "@/app/_component/SidoGugun";
import { HeaderSearch } from "@/app/store";
import { useEffect } from "react";

interface IntroItem {
    //tour
    contenttypeid: number;
    accomcount: string,
    chkbabycarriage: string,
    chkcreditcard: string,
    chkpet: string,
    expagerange: string,
    expguide: string,
    opendate: string,
    parking: string,
    restdate: string,
    useseason: string,
    usetime: string,

    //culture
    scale: string,
    usefee: string
    infocenterculture: string,
    usetimeculture: string,
    restdateculture: string,
    parkingculture: string,
    chkcreditcardculture: string,

    // Event
    agelimit: string,
    spendtime: string,
    sponsor1: string,
    sponsor1tel: string,
    sponsor2: string,
    sponsor2tel: string,
    playtime: string,
    usetimefestival: string,
    eventplace: string,
    eventstartdate: string,
    eventenddate: string,

    //hotel
    scalelodging: string,
    accomcountlodging: string,
    checkintime: string,
    checkouttime: string,
    roomtype: string,
    chkcooking: string,
    foodplace: string,
    refundregulation: string,
    parkinglodging: string,
    pickup: string,
    infocenterlodging: string,
    reservationlodging: string,
}

interface CommonItem {
    contentid: string,
    contenttypeid: string,
    title: string,
    createdtime: string,
    modifiedtime: string,
    tel: string,
    telname: string,
    homepage: string,
    booktour: string,
    overview: string,
}

async function detailCommon(detailData: HeaderSearchPlus) {
    const url = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1';
    const params = {
        serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
        numOfRows: '10',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        contentId: detailData.contentid,
        defaultYN: 'Y',
        overviewYN: 'Y',
    };

    const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
    const requrl = `${url}?${queryString}&_type=json`;

    const res = await fetch(requrl)
    const data = await res.json();
    return data.response.body.items.item
}

async function detailIntro(detailData: HeaderSearch) {
    const url = 'https://apis.data.go.kr/B551011/KorService1/detailIntro1';
    const params = {
        serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
        numOfRows: '10',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        contentId: detailData.contentid,
        contentTypeId: detailData.contenttypeid,
    };

    const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
    const requrl = `${url}?${queryString}&_type=json`;

    const res = await fetch(requrl)
    const data = await res.json();
    return data.response.body.items.item
}

export default function Detail({ searchParams }: { searchParams: HeaderSearchPlus }) {
    const detailData = searchParams
    const lat = Number(detailData.mapy)
    const lng = Number(detailData.mapx)

    useEffect(() => {
        const storedData = sessionStorage.getItem('tourSpot');
        const sessionData: HeaderSearch[] = storedData ? JSON.parse(storedData) : []
        sessionData.push(searchParams)

        const uniqueArray = sessionData.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.contentid === item.contentid
            ))
        );
        sessionStorage.setItem('tourSpot', JSON.stringify(uniqueArray))


    }, [])



    const { data: common } = useQuery<CommonItem[]>({
        queryKey: ['detailCommon'],
        queryFn: () => detailCommon(detailData)
    })
    const { data: intro } = useQuery<IntroItem[]>({
        queryKey: ['detailIntro'],
        queryFn: () => detailIntro(detailData)
    })

    return (
        <div className="detail-container">
            <div className="detail-content">
                <p>{detailData.contentName}</p>
                <hr />
            </div>
            <div className="detail-title">
                <p>{detailData.title}</p>
                <p><FontAwesomeIcon icon={faLocationDot} />  {detailData.addr1}</p>
                <hr />
            </div>
            <div className="detail-img">
                {
                    detailData.firstimage == '' && !detailData.firstimage ?
                        <Image src={noIMG} alt="no img" />
                        :
                        <Image
                            src={`${detailData.firstimage.substr(0, 4)}s${detailData.firstimage.substr(4)}`}
                            alt="관광명소 이미지"
                            width={2000}
                            height={2000}
                        />
                }
            </div>
            <div className="detail-desc">
                {
                    common && <p dangerouslySetInnerHTML={{ __html: common[0].overview }}></p>
                }
            </div>
            <div className="detail-info">
                <div className="botton-info-title">
                    <div>
                        <p>이용 안내</p>
                    </div>
                </div>
                <div className="botton-info-area">
                    {
                        intro?.map((v, i) => {
                            return (
                                <div key={i}>
                                    {v.contenttypeid == 12 && <Tour value={v} />}
                                    {v.contenttypeid == 14 && <Culture value={v} />}
                                    {v.contenttypeid == 15 && <Event value={v} />}
                                    {v.contenttypeid == 32 && <Hotel value={v} />}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="detail-map">
                <Map
                    center={{ lat: lat, lng: lng }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <MapMarker position={{ lat: lat, lng: lng }}></MapMarker>
                </Map>
            </div>
        </div>
    )
}

function Tour({ value }: { value: IntroItem }) {
    return (
        <>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>수용인원</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.accomcount }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>유모차대여</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.chkbabycarriage }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>신용카드가능</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.chkcreditcard }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>애완동물동반가능</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.chkpet }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>체험가능연령</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.expagerange }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>체험안내</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.expguide }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>개장일</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.opendate }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주차시설</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.parking }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>쉬는날</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.restdate }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>이용시기</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.useseason }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>이용시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.usetime }}></p></div>
            </div>
        </>
    )
}
function Culture({ value }: { value: IntroItem }) {
    return (
        <>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>규모</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.scale }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>이용요금</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.usefee }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>문의및안내</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.infocenterculture }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>이용시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.usetimeculture }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>쉬는날</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.restdateculture }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주차시설</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.parkingculture }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>신용카드가능정보</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.chkcreditcardculture }}></p></div>
            </div>
        </>
    )
}
function Event({ value }: { value: IntroItem }) {
    return (
        <>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>관람가능연령</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.agelimit }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>관람소요시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.spendtime }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주최자정보</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.sponsor1 }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주최자연락처</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.sponsor1tel }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주관사정보</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.sponsor2 }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주관사연락처</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.sponsor2tel }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>공연시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.playtime }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>이용요금</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.usetimefestival }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>행사장소</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.eventplace }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>행사시작일</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.eventstartdate }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>행사종료일</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.eventenddate }}></p></div>
            </div>
        </>
    )
}
function Hotel({ value }: { value: IntroItem }) {
    return (
        <>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>규모</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.scalelodging }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>수용가능인원</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.accomcountlodging }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>입실시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.checkintime }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>퇴실시간</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.checkouttime }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>객실유형</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.roomtype }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>객실내취사여부</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.chkcooking }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>식음료장</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.foodplace }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>환불규정</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.refundregulation }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>주차시설</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.parkinglodging }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>픽업서비스</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.pickup }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>문의및안내</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.infocenterlodging }}></p></div>
            </div>
            <div className="botton-info-flex">
                <div className="botton-info-area-tag"><p>예약안내</p></div><div className="botton-info-area-space"></div><div className="botton-info-area-content"><p dangerouslySetInnerHTML={{ __html: value.reservationlodging }}></p></div>
            </div>
        </>
    )
}