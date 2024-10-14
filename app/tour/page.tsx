
'use client'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { key } from "../key"
import { changeCat3CVal, changeGugun, changeGugunVal, changeHeaderSearch, changeKeyword, changeRow, changeSido, changeSidoVal, HeaderSearch } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import noIMG from '@/public/img/No_Image_Available.jpg'
import Image from "next/image";

export default function Home() {
  interface CategoryItem {
    code: string,
    name: string,
    rnum: number
  }


  let dispatch = useAppDispatch()

  let sido = useAppSelector(state => state.sido)
  let sidoVal = useAppSelector(state => state.sidoVal)
  let gugun = useAppSelector(state => state.gugun)
  let gugunVal = useAppSelector(state => state.gugunVal)
  let keyword = useAppSelector(state => state.keyword)
  let contentType = useAppSelector(state => state.contentType)

  let contentTypeVal = useAppSelector(state => state.contentTypeVal)
  let cat1Val = useAppSelector(state => state.cat1Val)
  let cat2Val = useAppSelector(state => state.cat2Val)
  let cat3Val = useAppSelector(state => state.cat3Val)

  let headerSearch = useAppSelector(state => state.headerSearch)
  let addRow = useAppSelector(state => state.addRow);

  const [subCat, setSubCat] = useState<CategoryItem[]>([]);
  const [allCat1, setAllCat1] = useState<CategoryItem[]>([]);
  const [isClicked, setIsClicked] = useState<boolean[]>([])

  useEffect(() => {
    //서비스분류코드조회
    async function getCategory() {
      var url = 'https://apis.data.go.kr/B551011/KorService1/categoryCode1';
      var key = 'WNBEfQ1MXM62Fv6qETObrCjjwWv7ji1iNrMTCVWwk6ET3BB8YmqPhT/uX6boztyIRyPzD40LtfLBGQTcimcXQA==';
      var params = {
        serviceKey: key,
        numOfRows: '10',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
      };

      const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
      const requrl = `${url}?${queryString}&_type=json`;

      const res = await fetch(requrl)
      const data = await res.json()

      //타입 가드 추가
      if (data && data.response && data.response.body && data.response.body.items && Array.isArray(data.response.body.items.item)) {
        setAllCat1([...data.response.body.items.item]);
      } else {
        console.error("Unexpected data structure:", data);
      }
    }
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
    getCategory()
  }, [])
  useEffect(() => {
    activeSearch()
  }, [addRow, contentTypeVal, cat3Val])
  useEffect(() => {
    async function tourAPI() {
      var url = 'https://apis.data.go.kr/B551011/KorService1/categoryCode1';
      var params = {
        serviceKey: key,
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

      let response = await fetch(requrl)
      let data = await response.json()

      let newItem = data.response.body.items.item
      let array: boolean[] = []
      newItem.forEach((v: boolean) => { array.push(false) })

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


  function sidoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    var url = 'https://apis.data.go.kr/B551011/KorService1/areaCode1';
    var key = 'WNBEfQ1MXM62Fv6qETObrCjjwWv7ji1iNrMTCVWwk6ET3BB8YmqPhT/uX6boztyIRyPzD40LtfLBGQTcimcXQA==';
    var params = {
      serviceKey: key,
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
      addRow === 1 ? activeSearch() : dispatch(changeRow(1));
    }
  }

  async function activeSearch() {
    var url = 'https://apis.data.go.kr/B551011/KorService1/';

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

    let params: Params = {
      serviceKey: key,
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
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    // URLSearchParams에 필터링된 params를 넘김
    const queryString = new URLSearchParams(filteredParams).toString();
    const requrl = `${url}?${queryString}&_type=json`;

    let res = await fetch(requrl)
    let data = await res.json()

    if (data.response.body.items.length == 0) {
      dispatch(changeHeaderSearch([]))
    } else {
      data = data.response.body.items.item
      let newData = data.map((value: { contenttypeid: number, areacode: string }) => {
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
    let newItem: boolean[] = []

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
    let check = newItem.every(el => el == false)
    // 클릭한 서브카테고리의 하위데이터 조회
    check ? dispatch(changeCat3CVal('')) : dispatch(changeCat3CVal(v))
  }
  return (
    <>
      {/* SIdo Parts */}
      <div className='category-search-container'>
        <select className="sido-select" name='sido' onChange={(e) => sidoChange(e)} value={sidoVal}>
          <option value=''>시/도</option>
          {
            sido.map((v, i) => {
              return (
                <option value={v.code} key={v.code}>{v.name}</option>
              )
            })
          }
        </select>
        <select className="gugun-select" name='gugun' value={gugunVal} onChange={(e) => { dispatch(changeGugunVal(e.target.value)) }}>
          <option value='' >구/군</option>
          {
            gugun.map((v, i) => {
              return (
                <option value={v.code} key={v.code}>{v.name}</option>
              )
            })
          }
        </select>
        <div>
          <input type="text" value={keyword} onChange={(e) => dispatch(changeKeyword(e.target.value))} onKeyUp={(e) => activeEnter(e)} />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" onClick={() => { addRow == 1 ? activeSearch() : dispatch(changeRow(1)) }} />
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

function Card(props: props): JSX.Element {
  const [cardPixel, setCardPixel] = useState<string>('')
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
  // let navigate = useNavigate()
  // let location = useLocation()
  return (
    <div className='card-container' style={{ gridTemplateRows: `repeat(${props.addRow * 2},${cardPixel})` }}>
      {
        props.headerSearch.map((v, i) => {
          return (
            <div className='card-layout' key={i} onClick={() => {
              navigate(`${location.pathname}/detail/${v.contentid}`, {
                state: v
              })
            }}>
              <div className='card-area'>
                {/* {v.firstimage == '' ? <Image src={noIMG} alt="no img"/> : <img src={`${v.firstimage.substr(0, 4)}s${v.firstimage.substr(4)}`} alt="관광명소 이미지"/>} */}
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
                <p className='card-title'>[{v.sidoName}] {v.title}</p>
                <p className='card-addr'><FontAwesomeIcon icon={faLocationDot} /> {v.addr1}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}