
'use client'
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkNone } from "@fortawesome/free-regular-svg-icons";
import noIMG from '@/public/img/No_Image_Available.jpg'
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { HeaderSearch } from "../store";
import getContentType from "../_data/contentType";

interface CategoryItem {
  code: string,
  name: string,
  rnum: number
}

export default function SidoGugun() {
  const [sido, setSido] = useState<CategoryItem[]>([])
  const [sidoVal, setSidoVal] = useState<string>('')
  const [gugun, setGugun] = useState<CategoryItem[]>([])
  const [gugunVal, setGugunVal] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [cat3Val, setCat3Val] = useState<string>('')
  const [headerSearch, setHeaderSearch] = useState<HeaderSearch[]>([])
  const [addRow, setAddRow] = useState<number>(1)

  const [subCat, setSubCat] = useState<CategoryItem[]>([]);
  const [isClicked, setIsClicked] = useState<boolean[]>([])
  const [contentName, setContentName] = useState<string>('')
  const [isCardLoad, setIsCardLoad] = useState<boolean>(true)
  const [isCateLoad, setIsCateLoad] = useState<boolean>(true)

  const contentTypeVal = useAppSelector(state => state.contentTypeVal)
  const cat1Val = useAppSelector(state => state.cat1Val)
  const cat2Val = useAppSelector(state => state.cat2Val)



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
      setSido([...data.response.body.items.item])
    }

    getSido()
  }, [])


  useEffect(() => {
    activeSearch()
  }, [addRow, contentTypeVal, cat3Val])
  useEffect(() => {
    async function tourAPI() {
      const url = 'https://apis.data.go.kr/B551011/KorService1/categoryCode1';
      const params = {
        serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
        numOfRows: '20',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        contentTypeId: contentTypeVal,
        cat1: cat1Val,
        cat2: cat2Val,
        cat3: cat3Val,
      };
      const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
      const requrl = `${url}?${queryString}&_type=json`;

      const response = await fetch(requrl)
      const data = await response.json()

      setSubCat([...data.response.body.items.item])
      setIsCateLoad(false)
      const array: boolean[] = []
      data.response.body.items.item.forEach(() => { array.push(false) })

      setIsClicked([...array])
    }

    tourAPI()
    const content = getContentType.find(v => v.code === Number(contentTypeVal))
    if (content) {
      setContentName(content.name)
    }
  }, [contentTypeVal])

  // 시/도를 설정 후 구/군 조회
  function sidoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const url = 'https://apis.data.go.kr/B551011/KorService1/areaCode1';
    const params = {
      serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
      areaCode: e.target.value,
      numOfRows: '80',
      pageNo: '1',
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
    };

    const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
    const requrl = `${url}?${queryString}&_type=json`;
    fetch(requrl)
      .then((response) => response.json())
      .then((data) => {
        if (e.target.value == '') {
          setGugun([])
        } else {
          setGugun([...data.response.body.items.item])
        }
      })
    setGugunVal('')
    setSidoVal(e.target.value)
  }

  function activeEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { // 'Enter' 키를 문자열로 비교
      if (addRow === 1) {
        activeSearch()
      } else {
        setAddRow(1)
      }
    }
  }

  async function activeSearch() {
    let url = 'https://apis.data.go.kr/B551011/KorService1/';

    interface Params {
      serviceKey: string;
      numOfRows: string;
      pageNo: string;
      MobileOS: string;
      MobileApp: string;
      listYN: string;
      arrange: string;
      contentTypeId: string;
      areaCode: string; // 시/도
      sigunguCode: string; // 구/군
      cat1?: string; // 선택적 속성
      cat2?: string; // 선택적 속성
      cat3?: string; // 선택적 속성
      keyword?: string; // 검색어 선택적 속성
    }

    const params: Params = {
      serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY!,
      numOfRows: String(6 * addRow),
      pageNo: '1',
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      listYN: 'Y',
      arrange: 'R',
      contentTypeId: contentTypeVal,
      areaCode: sidoVal,
      sigunguCode: gugunVal,
      cat1: cat1Val,
      cat2: cat2Val,
      cat3: cat3Val,
    };

    if (keyword === '') {
      url += 'areaBasedList1';
    } else {
      url += 'searchKeyword1';
      params.keyword = keyword; // 검색어 필수!
    }

    // params 객체에서 undefined인 값을 제거하여 새로운 객체를 생성
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([value]) => value !== undefined)
    );

    // URLSearchParams에 필터링된 params를 넘김
    const queryString = new URLSearchParams(filteredParams).toString();
    const requrl = `${url}?${queryString}&_type=json`;

    const res = await fetch(requrl)
    const data = await res.json()

    if (data.response.body.items.length == 0) {
      setHeaderSearch([])
    } else {
      setHeaderSearch([...data.response.body.items.item])
      setIsCardLoad(false)
    }
  }

  function getRow() {
    setAddRow(addRow + 1)
  }

  function subCatClick(v: string, i: number) {
    const newItem = isClicked.map((value, idx) => {
      return i == idx ? !value : false
    })

    // // 서브카테고리 on/off 감지
    setIsClicked([...newItem])

    // // 서브카테고리 on/off 여부 판별
    const check = newItem.every(el => el == false)
    // 클릭한 서브카테고리의 하위데이터 조회
    if (check) {
      setCat3Val('')
    } else {
      setCat3Val(v)
    }
  }
  return (
    <>
      {/* SIdo Parts */}
      <div className='category-search-container'>
        <select className="sido-select" name='sido' onChange={(e) => sidoChange(e)} value={sidoVal}>
          <option value=''>시/도</option>
          {
            sido.map((v) => {
              return (
                <option value={v.code} key={v.code}>{v.name}</option>
              )
            })
          }
        </select>
        <select className="gugun-select" name='gugun' value={gugunVal} onChange={(e) => setGugunVal(e.target.value)}>
          <option value='' >구/군</option>
          {
            gugun.map((v) => {
              return (
                <option value={v.code} key={v.code}>{v.name}</option>
              )
            })
          }
        </select>
        <div>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyUp={(e) => activeEnter(e)} />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" onClick={() => {
            if (addRow === 1) {
              activeSearch()
            } else {
              setAddRow(1)
            }
          }} />
        </div>
      </div>

      {/* SubCat Parts */}
      <div className="subCat-line"></div>
      <div className="subCat-container">
        {
          isCateLoad ?
            <CateLoading />
            :
            subCat.map((v, i) => {
              return (
                <div className={isClicked[i] ? 'subCat-selected' : ''} key={v.code}
                  onClick={() => subCatClick(v.code, i)}
                >
                  <p>{v.name}</p>
                </div>
              )
            })

        }
      </div>

      {/* Cart Parts */}
      {
        isCardLoad ?
          <CardLoading />
          :
          headerSearch.length != 0 ?
            <Card headerSearch={headerSearch} addRow={addRow} contentName={contentName} />
            :
            <div className="no-item">
              <p>"검색 결과가 존재하지 않습니다"</p>
            </div>
      }

      <div className="card-btn">
        <button className={`${(headerSearch.length == 0 || headerSearch.length % 6 != 0) && 'none'}`} onClick={() => { getRow() }}>더보기</button>
      </div>
    </>
  );
}

export interface HeaderSearchPlus extends HeaderSearch {
  contentName?: string
}

interface HeaderSearchWithChk extends HeaderSearch {
  isChk: boolean
}

interface props {
  headerSearch: HeaderSearch[],
  addRow: number,
  contentName: string
}

async function getBookMark() {
  return (await fetch('/api/get/getbookmark')).json()
}

function Card(props: props): JSX.Element {
  const [cardPixel, setCardPixel] = useState<string>('')
  const router = useRouter()
  const Pathname = usePathname()
  const [chkList, setChkList] = useState<boolean[]>([])
  const { data: session }: { data: Session | null } = useSession()
  const { data: bookmarkData } = useQuery({
    queryKey: ['getBookMark'],
    queryFn: getBookMark,
  })

  const mutation = useMutation({
    mutationFn: async (value: HeaderSearch) => {
      await fetch('api/put/bookmarkChk', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      return
    },
    onSuccess: () => {
      console.log('success')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  async function bookMarkChk(value: HeaderSearch, i: number) {
    if (!session) {
      alert('no')
      return;
    }
    chkList[i] = !chkList[i]
    setChkList([...chkList])

    mutation.mutate(value)
  }

  useEffect(() => {
    //로그인 시 북마크 가능
    if (session) {
      if (bookmarkData) {
        const data: HeaderSearchWithChk[] = props.headerSearch.map((v) => {
          return {
            ...v,
            isChk: bookmarkData?.some((value: HeaderSearch) => value.contentid == v.contentid)
          }
        })
        const clickData = data.map((v) => v.isChk);
        setChkList(clickData)
      }
    } else {
      setChkList([])
    }
  }, [props.headerSearch])

  return (
    <div className='card-container' style={{ gridTemplateRows: `repeat(${props.addRow * 2},${cardPixel})` }}>
      {
        props.headerSearch.map((v: HeaderSearchPlus, i) => {
          v['contentName'] = props.contentName
          const url = new URLSearchParams(
            Object.entries(v).filter(([, v]) => v !== undefined)
          );
          return (
            <div className='card-layout' key={i}
              onClick={() => {
                router.push(`${Pathname}/detail?${url}`)
              }}
            >
              <div className='card-area-top'>
                {
                  v.firstimage == '' ?
                    <Image src={noIMG} alt="no img" />
                    :
                    <Image
                      src={`${v.firstimage.slice(0, 4)}s${v.firstimage.slice(4)}`}
                      alt="관광명소 이미지"
                      width={364}
                      height={248}
                      style={{ width: '100%', height: '100%' }} // 스타일로 비율 유지
                    />
                }
              </div>
              <div className='card-area-bot'>
                <p className='card-tag'>{props.contentName}</p>
                {
                  chkList[i] ?
                    <FontAwesomeIcon icon={faBookmark} color="gold" className="card-bookmark"
                      onClick={(e) => {
                        e.stopPropagation()
                        bookMarkChk(v, i)

                      }}
                    />
                    :
                    <FontAwesomeIcon icon={faBookmarkNone} className="card-bookmark"
                      onClick={(e) => {
                        e.stopPropagation()
                        bookMarkChk(v, i)
                      }}
                    />
                }

                <p className='card-title'> {v.title}</p>
                <p className='card-addr'><FontAwesomeIcon icon={faLocationDot} /> {v.addr1}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

function CardLoading() {
  const item = Array.from({ length: 6 })
  return (
    <div className='card-container'>
      {
        item.map((_, i) => (
          <div className="card-layout" key={i}>
            <div className="card-area-top" style={{ background: '#eee', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            </div>
            <div className="card-area-bot">
              <p className="card-tag"><span style={{ width: '150px', height: '20px', background: '#eee', display: 'inline-block' }}></span></p>
              <p className="card-title"><span style={{ width: '150px', height: '20px', background: '#eee', display: 'inline-block' }}></span></p>
              <p className="card-addr"><span style={{ width: '300px', height: '20px', background: '#eee', display: 'inline-block' }}></span></p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

function CateLoading() {
  const item = Array.from({ length: 9 })
  return (
    <>
      {
        item.map((_, i) => (
          <div key={i} style={{ border: '1px solid #eee' }}><span style={{ width: '100px', height: '20px', background: '#eee', display: 'inline-block', borderRadius: '25px', textAlign: 'center' }}></span></div>
        ))
      }
    </>
  )
}