'use client'

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { changeCat1CVal, changeCat2CVal, changeCat3CVal, changeContentTypeVal, changeGugunVal, changeKeyword, changeRow, changeSido, changeSidoVal } from "../store"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faRightToBracket, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const session = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const contentType = useAppSelector(state => state.contentType)

  console.log('sessionsession', session)
  function getSubCat(code: number) {
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
      const url = 'https://apis.data.go.kr/B551011/KorService1/areaCode1';
      const params = {
        serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
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
        <div className="header-logo">
          <div>
            <p style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>TripMate</p>
          </div>
          <div>
            <img src="/img/sopung.png" />
          </div>
        </div>
        <div className='header-sign'>
          {
            session.data ?
              <>
                <div className="sign-name">
                  <span style={{ color: '#bebebe' }}>{session.data?.user?.name || "Loading"}</span>
                  <span>님 안녕하세요!</span>
                </div>
                <div className="sign-logout">
                  <button onClick={() => { signOut() }}>로그아웃 <FontAwesomeIcon icon={faRightFromBracket} /></button>
                </div>
                <div className="sign-mypage">
                  <button onClick={() => { signOut() }}>마이페이지 <FontAwesomeIcon icon={faUser} /></button>
                </div>
              </>
              :
              <>
                <div className="sign-login">
                  <button onClick={() => { signIn() }}>로그인 <FontAwesomeIcon icon={faRightToBracket} /></button>
                </div>
                <div className="sign-register">
                  <button>회원가입 <FontAwesomeIcon icon={faUserPlus} /></button>
                </div>
              </>
          }
        </div>
      </div>

      {/* 상단 카테고리 */}
      <div className='category-container'>
        <ul>
          <li onClick={() => { router.push('/') }} >인기</li>
          {
            contentType.map((v) => {
              return (
                <li key={v.code} onClick={() => {
                  getSubCat(v.code)
                  router.push(v.url)
                }} >{v.name}</li>
              )
            })
          }
          <li onClick={() => { router.push('/mylocation') }} >주변장소찾기</li>
        </ul>
      </div>
    </>
  )
}


