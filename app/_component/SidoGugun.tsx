
'use client'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeCat3CVal, changeGugun, changeGugunVal, changeHeaderSearch, changeKeyword, changeRow, changeSido, changeSidoVal, HeaderSearch } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkNone } from "@fortawesome/free-regular-svg-icons";
import noIMG from '@/public/img/No_Image_Available.jpg'
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface CategoryItem {
  code: string,
  name: string,
  rnum: number
}

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
  return await res.json()
}

export default function SidoGugun() {
  const dispatch = useAppDispatch()

  const sido = useAppSelector(state => state.sido)
  const sidoVal = useAppSelector(state => state.sidoVal)
  const gugun = useAppSelector(state => state.gugun)
  const gugunVal = useAppSelector(state => state.gugunVal)
  const keyword = useAppSelector(state => state.keyword)
  const contentType = useAppSelector(state => state.contentType)

  const contentTypeVal = useAppSelector(state => state.contentTypeVal)
  const cat1Val = useAppSelector(state => state.cat1Val)
  const cat2Val = useAppSelector(state => state.cat2Val)
  const cat3Val = useAppSelector(state => state.cat3Val)

  const headerSearch = useAppSelector(state => state.headerSearch)
  const addRow = useAppSelector(state => state.addRow);

  const [subCat, setSubCat] = useState<CategoryItem[]>([]);
  const [isClicked, setIsClicked] = useState<boolean[]>([])

  const { data: sidoData } = useQuery({
    queryKey: [],
    queryFn: () => getSido()
  })

  useEffect(() => {
    if (sidoData) {
      dispatch(changeSido([...sidoData.response.body.items.item]))
    }


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

      const newItem = data.response.body.items.item
      const array: boolean[] = []
      newItem.forEach(() => { array.push(false) })

      setIsClicked([...array])
      //타입 가드 추가
      if (data && data.response && data.response.body && data.response.body.items && Array.isArray(data.response.body.items.item)) {
        setSubCat([...newItem]);
      } else {
        console.error("Unexpected data structure:", data);
      }
    }

    tourAPI()
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
          dispatch(changeGugun([]))
        } else {
          dispatch(changeGugun([...data.response.body.items.item]))
        }
      })
    dispatch(changeGugunVal(''))
    dispatch(changeSidoVal(e.target.value))
  }

  function activeEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { // 'Enter' 키를 문자열로 비교
      if (addRow === 1) {
        activeSearch()
      } else {
        dispatch(changeRow(1))
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
    let data = await res.json()

    if (data.response.body.items.length == 0) {
      dispatch(changeHeaderSearch([]))
    } else {
      data = data.response.body.items.item
      const newData = data.map((value: { contenttypeid: number, areacode: string }) => {
        let contentName = '';
        let sidoName = '';

        // 콘텐츠 명 setting
        contentType.forEach(item => {
          if (value.contenttypeid == item.code) {
            contentName = item.name
          }
        })
        // 시/도 명 setting
        sido.forEach(item => {
          if (value.areacode == item.code) {
            sidoName = item.name
          }
        })

        return { ...value, contentName: contentName, sidoName: sidoName }
      })
      dispatch(changeHeaderSearch([...newData]))
    }
  }

  function getRow() {
    dispatch(changeRow(addRow + 1))
  }

  function subCatClick(v: string | undefined, i: number) {
    const newItem: boolean[] = []

    isClicked.forEach((val, idx) => {
      if (i != idx) {
        newItem.push(false)
      } else {
        newItem.push(!val)
      }
    })

    // 서브카테고리 on/off 감지
    setIsClicked([...newItem])

    // 서브카테고리 on/off 여부 판별
    const check = newItem.every(el => el == false)
    // 클릭한 서브카테고리의 하위데이터 조회
    if (check) {
      dispatch(changeCat3CVal(''))
    } else {
      dispatch(changeCat3CVal(v))
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
        <select className="gugun-select" name='gugun' value={gugunVal} onChange={(e) => { dispatch(changeGugunVal(e.target.value)) }}>
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
          <input type="text" value={keyword} onChange={(e) => { dispatch(changeKeyword(e.target.value)) }} onKeyUp={(e) => activeEnter(e)} />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" onClick={() => {
            if (addRow === 1) {
              activeSearch()
            } else {
              dispatch(changeRow(1))
            }
          }} />
        </div>
      </div>

      {/* SubCat Parts */}
      <div className="subCat-line"></div>
      <div className="subCat-container">
        {
          subCat.map((v, i) => {
            return (
              <div className={isClicked[i] ? 'subCat-selected' : ''} key={v.code} onClick={() => subCatClick(v.code, i)}><p>{v.name}</p></div>
            )
          })

        }
      </div>

      {/* Cart Parts */}
      {
        headerSearch.length != 0 ?
          <Card headerSearch={headerSearch} addRow={addRow} />
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

interface HeaderSearchPlus extends HeaderSearch {
  contentName?: string,
  sidoName?: string
}

interface props {
  headerSearch: HeaderSearchPlus[],
  addRow: number
}

async function bookMarkChk(value: HeaderSearchPlus) {
  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value)
  }
  const res = await fetch('api/post/bookmarkChk', postData)
  return res.json()
}

async function getBookMarks() {
  const res = await fetch('api/post/getBookMarks')
  return res.json()
}

function Card(props: props): JSX.Element {
  const [cardPixel, setCardPixel] = useState<string>('')
  const router = useRouter()
  const Pathname = usePathname()

  const { data: bookMarkData } = useQuery({
    queryKey: ['getMarks'],
    queryFn: getBookMarks
  })
  if (bookMarkData) {
    console.log('bookMarkData', bookMarkData)
  }

  useEffect(() => {
    getBrowerWidth()
    function getBrowerWidth() {
      //PC
      if (1024 < window.innerWidth) {
        setCardPixel('500px')
      }
      //TABLET
      else if (480 < window.innerWidth) {
        setCardPixel('350px')
      }
      //MOBILE
      else {
        setCardPixel('150px')
      }
    }

    window.addEventListener('resize', getBrowerWidth)

    return () => {
      window.removeEventListener('resize', getBrowerWidth)
    }
  })


  return (
    <div className='card-container' style={{ gridTemplateRows: `repeat(${props.addRow * 2},${cardPixel})` }}>
      {
        props.headerSearch.map((v, i) => {
          const newParam = Object.fromEntries(
            Object.entries(v).map(([key, value]) => [key, value !== undefined ? String(value) : ''])
          );

          // newParam에서 필요한 값만 사용 (중복 제거)
          const filteredParam = {
            addr1: newParam.addr1,
            addr2: newParam.addr2,
            areacode: newParam.areacode,
            booktour: newParam.booktour,
            cat1: newParam.cat1,
            cat2: newParam.cat2,
            cat3: newParam.cat3,
            contentid: newParam.contentid,
            contenttypeid: newParam.contenttypeid,
            firstimage: newParam.firstimage,
            mapx: newParam.mapx,
            mapy: newParam.mapy,
            sigungucode: newParam.sigungucode,
            title: newParam.title,
            contentName: newParam.contentName,  // undefined 시 빈 문자열로 처리
            sidoName: newParam.sidoName         // undefined 시 빈 문자열로 처리
          };

          const url = new URLSearchParams(filteredParam)
          return (
            <div className='card-layout' key={i} >
              <div className='card-area'>
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
              <div className='card-area'>
                <p className='card-tag'>{v.contentName}</p>
                <FontAwesomeIcon icon={faBookmarkNone} className="card-bookmark" onClick={() => bookMarkChk(v)} />
                <p className='card-title'
                  onClick={() => {
                    router.push(`${Pathname}/detail?${url}`)
                  }}>[{v.sidoName}] {v.title}</p>
                <p className='card-addr'><FontAwesomeIcon icon={faLocationDot} /> {v.addr1}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}