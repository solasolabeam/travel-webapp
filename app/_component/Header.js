import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { changeCat1CVal, changeCat2CVal, changeCat3CVal, changeContentTypeVal, changeGugun, changeGugunVal, changeKeyword, changeRow, changeSido, changeSidoVal } from "../store/store";
import Slide from "./Slide";

import getBannerData from "../data/bannerData";
import { useEffect, useState } from "react";
import { key } from "../api/key";

export default function Header() {

  const [banner, setBanner] = useState(getBannerData)
  let contentType = useSelector(state => state.contentType)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let bannerIdx = useSelector(state => state.bannerIdx)

  function getSubCat(code) {
    dispatch(changeContentTypeVal(code))
    dispatch(changeSidoVal(''))
    dispatch(changeGugunVal(''))
    dispatch(changeCat3CVal(''))
    dispatch(changeKeyword(''))
    dispatch(changeRow(1))

    if (code == 12) {     //관광지
      dispatch(changeCat1CVal('A01'))
      dispatch(changeCat2CVal('A0101'))
    } else if (code == 14) {  //문화시설
      dispatch(changeCat1CVal('A02'))
      dispatch(changeCat2CVal('A0206'))
    } else if (code == 15) {  //축제/공연
      dispatch(changeCat1CVal('A02'))
      dispatch(changeCat2CVal('A0208'))
    } else if (code == 32) {  //숙박
      dispatch(changeCat1CVal('B02'))
      dispatch(changeCat2CVal('B0201'))
    }
  }

  useEffect(() => {
    async function getSido() {
      var url = 'https://apis.data.go.kr/B551011/KorService1/areaCode1';
      var params = {
        serviceKey: key,
        numOfRows: '20',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
      };
  
      const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
      const requrl = `${url}?${queryString}&_type=json`;
  
      const res = await fetch(requrl)
      const data = await res.json()

      dispatch(changeSido([...data.response.body.items.item]))
    }

    getSido()
  }, [])

  return (
    <>
      {/* 로고 & 페이지 이름 */}
      <div className='header-container'>
        <div>
          <p style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>TripMate</p>
        </div>
        <div>
          <img src="/sopung.png" />
        </div>
      </div>

      {/* 상단 카테고리 */}
      <div className='category-container'>
        <ul>
          <li onClick={() => { navigate('/') }} >인기</li>
          {
            contentType.map((v, i) => {
              return (
                <li key={v.code} onClick={() => {
                  getSubCat(v.code)
                  navigate(v.url)
                }} >{v.name}</li>
              )
            })
          }
          <li onClick={() => { navigate('/mylocation') }} >주변장소찾기</li>
        </ul>
      </div>

      {/* 상단배너 */}
      <Banner banner={banner} bannerIdx={bannerIdx} />
    </>
  )
};

function Banner({ banner, bannerIdx }) {
  return (
    <div className="header-bg-container" style={{ background: banner[bannerIdx].bgColor }}>
      <div className="header-bg-area">
        <div className="header-bg-left">
          <p>{banner[bannerIdx].title}</p>
          <p dangerouslySetInnerHTML={{ __html: banner[bannerIdx].tag }}></p>
        </div>
        <div className="header-bg-right">
          {/* 배너 슬라이드 */}
          <Slide />
        </div>
      </div>
    </div>
  )
}
