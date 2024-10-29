'use client'

import { useAppDispatch, useAppSelector } from "../hooks"

import { changeCat1CVal, changeCat2CVal, changeContentTypeVal } from "../store"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faRightToBracket, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const session = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const contentType = useAppSelector(state => state.contentType)

  function getSubCat(code: number) {
    dispatch(changeContentTypeVal(code))

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
            session.status == 'loading'
              ?
              <img src="/img/loading.gif" style={{ marginRight: '50px' }} />
              :
              session.data ?
                <>
                  <div className="sign-name">
                    <span style={{ color: 'black', fontWeight: 'bold' }}>{session.data?.user?.name || "Loading"}</span>
                    <span>님 안녕하세요!</span>
                  </div>
                  <div className="sign-logout">
                    <button onClick={() => { signOut() }}>로그아웃 <FontAwesomeIcon icon={faRightFromBracket} /></button>
                  </div>
                  <div className="sign-mypage">
                    <button onClick={() => { router.push('/mypage') }}>마이페이지 <FontAwesomeIcon icon={faUser} /></button>
                  </div>
                </>
                :
                <>
                  <div className="sign-login">
                    <button onClick={() => { signIn() }}>로그인 <FontAwesomeIcon icon={faRightToBracket} /></button>
                  </div>
                  <div className="sign-register">
                    <button onClick={() => { router.push('/register') }}>회원가입 <FontAwesomeIcon icon={faUserPlus} /></button>
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