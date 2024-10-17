'use client'
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useState } from "react"
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
import { useAppSelector } from "../hooks"
import noIMG from '@/public/img/No_Image_Available.jpg'
import Image from "next/image"
import { useRouter } from "next/navigation"

interface locationData {
    addr1: string,
    addr: string,
    areacode: string,
    booktou: string,
    cat1: string,
    cat2: string,
    cat3: string,
    contentid: string,
    contenttypeid: number,
    createdtime: string,
    dist: string,
    firstimage: string,
    firstimage2: string,
    cpyrhtDivCd: string,
    mapx: number,
    mapy: number,
    mlevel: string,
    modifiedtime: string,
    sigungucode: string,
    tel: string,
    title: string,
    contentName?: string,
    contentUrl?: string,
    sidoName?: string,
};
export default function MyLocation() {
    const [list, setList] = useState<locationData[]>([])
    const [lat, setLat] = useState(0)       //위도 Y좌표
    const [lng, setLng] = useState(0)       //경도 X좌표
    const [isOpen, setIsOpen] = useState<boolean[]>([]) // 인포윈도우 Open 여부를 저장하는 state 입니다.
    const [currentLoc, setCurrentLoc] = useState<string>('')
    const [contentID, setContentID] = useState<string>('') // 컨텐츠 타입

    useEffect(() => {
        // 주변장소 데이터
        async function getLocation(pos: GeolocationPosition) {
            var url = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1';
            var params = {
                serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
                numOfRows: '100',
                pageNo: '1',
                MobileOS: 'ETC',
                MobileApp: 'AppTest',
                contentTypeId: contentID,
                arrange: 'A', //정렬구분
                mapX: String(pos.coords.longitude),     //경도
                mapY: String(pos.coords.latitude),     //위도
                radius: '2000',   //거리반경
                listYN: 'Y',   //목록구분

            };

            const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
            const requrl = `${url}?${queryString}&_type=json`;

            setLat(pos.coords.latitude)
            setLng(pos.coords.longitude)

            const res = await fetch(requrl)
            const data = await res.json()

            let item = data.response.body.items.item
            //관광지 문화시설 행사 숙박 건만
            item = item.filter((v: locationData) => {
                return v.contenttypeid == 12 || v.contenttypeid == 14 || v.contenttypeid == 15 || v.contenttypeid == 32
            })
            setList([...item])

            let array: boolean[] = []
            list.forEach(v => {
                array.push(false)
            })
            setIsOpen(array)
        }


        function showErrorMsg(error: GeolocationPositionError) { // 실패했을때 실행
            switch (error.code) {
                case error.PERMISSION_DENIED: //Geolocation API의 사용 요청을 거부
                    alert("위치 요청을 허용해 주세요!")
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("가져온 위치 정보를 사용할 수 없습니다.")
                    break;

                case error.TIMEOUT:
                    alert("위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.")
                    break;
            }
        }

        navigator.geolocation.getCurrentPosition(getLocation, showErrorMsg);

    }, [contentID])
    
    useEffect(() => {
        kakao.maps.load(function () {
            // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
            const geocoder = new kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(lat, lng);
            const callback = function (
                result: Array<{
                    address: kakao.maps.services.Address;
                    road_address: kakao.maps.services.RoadAaddress | null;
                }>,
                status: kakao.maps.services.Status
            ) {
                if (status === window.kakao.maps.services.Status.OK) {
                    setCurrentLoc(result[0].address.address_name)
                }
            };
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        });

    }, [lat, lng]); // lat과 lng이 변경될 때마다 다시 실행

    return (
        <div className="loc-container">
            <div className="loc-list">
                <div className="loc-list-search">
                    <div>
                        {lat != 0 ? <><FontAwesomeIcon icon={faCrosshairs} /><span>  {currentLoc}</span></> : <span>위치정보 권한을 허용해주세요</span>}
                    </div>
                    <div>
                        <ul>
                            <li onClick={() => setContentID('')}>전체</li>
                            <li onClick={() => setContentID('12')}>관광지</li>
                            <li onClick={() => setContentID('14')}>문화시설</li>
                            <li onClick={() => setContentID('15')}>행사</li>
                            <li onClick={() => setContentID('32')}>숙박</li>
                        </ul>
                    </div>

                </div>
                <div className="loc-list-result">
                    {
                        list.map((v, i) => {
                            return (
                                <Around value={v} key={i} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="loc-map">
                <Map
                    center={{ lat: lat, lng: lng }}     //지도의 중심좌표
                    style={{ width: "100%", height: "100%" }}        //지도 크기
                    level={5}                                       //지도 확대 레벨
                >
                    <MapMarker position={{ lat: lat, lng: lng }} />

                    {
                        list.map((v, i) => {
                            return (
                                <MapMarker
                                    position={{ lat: v.mapy, lng: v.mapx }}
                                    image={{
                                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    onClick={() => {
                                        isOpen[i] = !isOpen[i]
                                        setIsOpen([...isOpen])
                                    }}
                                    key={i}
                                ></MapMarker>
                            )
                        })
                    }
                    {
                        list.map((v, i) => {
                            return (
                                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                                    position={{ lat: v.mapy, lng: v.mapx }}
                                    key={i}
                                >
                                    {/* 커스텀 오버레이에 표시할 내용입니다 */}
                                    {
                                        isOpen[i] &&
                                        <div className="overlay-container">
                                            <div className="overlay-title">
                                                <p>{v.title}</p>
                                                <p onClick={() => {
                                                    isOpen[i] = !isOpen[i]
                                                    setIsOpen([...isOpen])
                                                }}>
                                                    X</p>
                                            </div>
                                            <div className="overlay-content">
                                                <div className="overlay-content-left">
                                                    {
                                                        v.firstimage == '' ?
                                                            <Image src={noIMG} alt="no img" />
                                                            :
                                                            <Image
                                                                src={`${v.firstimage.substr(0, 4)}s${v.firstimage.substr(4)}`}
                                                                alt="관광명소 이미지"
                                                                width={364}
                                                                height={248}
                                                            />
                                                    }
                                                </div>
                                                <div className="overlay-content-right">
                                                    <ul>
                                                        <li>{v.addr1}</li>
                                                        <li>{v.tel}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </CustomOverlayMap>
                            )
                        })
                    }
                </Map>
            </div>
        </div>
    )
}

function Around({ value }: { value: locationData }) {
    const router = useRouter()
    const contentType = useAppSelector(state => state.contentType)
    const sido = useAppSelector(state => state.sido)

    function listClick(value: locationData) {

        // 콘텐츠 명 setting
        contentType.forEach(item => {
            if (value.contenttypeid == item.code) {
                value['contentName'] = item.name
                value['contentUrl'] = item.url
            }
        })
        // 시/도 명 setting
        sido.forEach(item => {
            if (value.areacode == item.code) {
                value['sidoName'] = item.name
            }
        })

        const url = new URLSearchParams({
            ...value,
            contenttypeid: String(value.contenttypeid),
            mapx: String(value.mapx),
            mapy: String(value.mapy),
        }).toString()
        router.push(`${value.contentUrl}/detail?${url}`)
        console.log('url', url)
    }
    return (
        <div onClick={() => listClick(value)}>
            <div className="list-img">
                <div>
                    {
                        value.firstimage == '' && !value.firstimage ?
                            <Image src={noIMG} alt="no img" />
                            :
                            <Image
                                src={`${value.firstimage.substr(0, 4)}s${value.firstimage.substr(4)}`}
                                alt="관광명소 이미지"
                                width={364}
                                height={248}
                            />
                    }
                </div>
            </div>
            <div className="list-item">
                <ul>
                    <li>{value.title}</li>
                    <li><span className="material-symbols-outlined">apartment</span>{value.addr1}</li>
                    <li><span className="material-symbols-outlined">call</span>{value.tel}</li>
                </ul>
            </div>
        </div>
    )
}