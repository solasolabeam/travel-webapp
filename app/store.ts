import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import getContentType from './contentType';

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  },
});

const contentType = createSlice({
  name: 'contentType', //state이름 ~
  initialState: getContentType, //값
  reducers: {
  }
})

type SidoState = { rnum: number, code: string, name: string }[];
const initSidoState: SidoState = [];
const sido = createSlice({
  name: 'sido', // state 이름
  initialState: initSidoState, // 초기 상태값
  reducers: {
    changeSido(state, action: PayloadAction<SidoState>) {
      // Immer가 상태 불변성을 관리하므로 상태를 직접 수정해도 됨
      // 또는 state.push(...action.payload) 처럼 작성 가능
      return action.payload;
    }
  }
});

const sidoVal = createSlice({
  name: 'sidoVal', //state이름 ~
  initialState: '', //값
  reducers: {
    changeSidoVal(state, action) {
      return action.payload
    }
  }
})

type GugunState = { rnum: number, code: string, name: string }[];
const initGugunState: GugunState = [];
const gugun = createSlice({
  name: 'gugun', //state이름 ~
  initialState: initGugunState, //값
  reducers: {
    changeGugun(state, action) {
      return action.payload
    }
  }
})

const gugunVal = createSlice({
  name: 'gugunVal', //state이름 ~
  initialState: '', //값
  reducers: {
    changeGugunVal(state, action) {
      return action.payload
    }
  }
})

const contentTypeVal = createSlice({
  name: 'contentTypeVal',
  initialState: '',
  reducers: {
    changeContentTypeVal(state, action) {
      return action.payload
    }
  }
})

const cat1Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat1CVal(state, action) {
      return action.payload
    }
  }
})

const cat2Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat2CVal(state, action) {
      return action.payload
    }
  }
})

const cat3Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat3CVal(state, action) {
      return action.payload
    }
  }
})

export interface HeaderSearch {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: number;
  mapy: number;
  mlevel: number;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
  zipcode: string;
}
const initHeaderSearch: HeaderSearch[] = [];
const headerSearch = createSlice({
  name: 'headerSearch',
  initialState: initHeaderSearch,
  reducers: {
    changeHeaderSearch(state, action) {
      return action.payload
    }
  }
})

const keyword = createSlice({
  name: 'keyword',
  initialState: '',
  reducers: {
    changeKeyword(state, action) {
      return action.payload
    }
  }
})

const addRow = createSlice({
  name: 'addRow',
  initialState: 1,
  reducers: {
    changeRow(state, action) {
      return action.payload
    }
  }
})

const bannerIdx = createSlice({
  name: 'bannerIdx',
  initialState: '0',
  reducers: {
    changeBanner(state, action) {
      return action.payload
    }
  }
})

export const { changeSido } = sido.actions
export const { changeSidoVal } = sidoVal.actions
export const { changeGugun } = gugun.actions
export const { changeGugunVal } = gugunVal.actions

export const { changeContentTypeVal } = contentTypeVal.actions
export const { changeCat1CVal } = cat1Val.actions
export const { changeCat2CVal } = cat2Val.actions
export const { changeCat3CVal } = cat3Val.actions
export const { changeHeaderSearch } = headerSearch.actions
export const { changeKeyword } = keyword.actions

export const { changeRow } = addRow.actions
export const { changeBanner } = bannerIdx.actions


export const { increment, decrement } = counter.actions


export const store = configureStore({
  reducer: {
    counter: counter.reducer,
    contentType: contentType.reducer,
    sido: sido.reducer,
    sidoVal: sidoVal.reducer,
    gugun: gugun.reducer,
    gugunVal: gugunVal.reducer,

    contentTypeVal: contentTypeVal.reducer,
    cat1Val: cat1Val.reducer,
    cat2Val: cat2Val.reducer,
    cat3Val: cat3Val.reducer,
    headerSearch: headerSearch.reducer,
    keyword: keyword.reducer,

    addRow: addRow.reducer,
    bannerIdx: bannerIdx.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


