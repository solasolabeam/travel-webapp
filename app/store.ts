import { configureStore, createSlice } from '@reduxjs/toolkit';
import getContentType from './pages/api/contentType';

interface num {
  value: number;
}


let counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  },
});

let contentType = createSlice({
  name: 'contentType', //state이름 ~
  initialState: getContentType, //값
  reducers: {
  }
})

let sido = createSlice({
  name: 'sido', // state 이름
  initialState: [], // 초기 상태값
  reducers: {
    changeSido(state, action) {
      // Immer가 상태 불변성을 관리하므로 상태를 직접 수정해도 됨
      // 또는 state.push(...action.payload) 처럼 작성 가능
      return action.payload; 
    }
  }
});

let sidoVal = createSlice({
  name: 'sidoVal', //state이름 ~
  initialState: '', //값
  reducers: {
    changeSidoVal(state, action) {
      return action.payload
    }
  }
})

let gugun = createSlice({
  name: 'gugun', //state이름 ~
  initialState: [], //값
  reducers: {
    changeGugun(state, action) {
      return action.payload
    }
  }
})

let gugunVal = createSlice({
  name: 'gugunVal', //state이름 ~
  initialState: '', //값
  reducers: {
    changeGugunVal(state, action) {
      return action.payload
    }
  }
})

let contentTypeVal = createSlice({
  name: 'contentTypeVal',
  initialState: '',
  reducers: {
    changeContentTypeVal(state, action) {
      return action.payload
    }
  }
})

let cat1Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat1CVal(state, action) {
      return action.payload
    }
  }
})

let cat2Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat2CVal(state, action) {
      return action.payload
    }
  }
})

let cat3Val = createSlice({
  name: 'cat1Val',
  initialState: '',
  reducers: {
    changeCat3CVal(state, action) {
      return action.payload
    }
  }
})

let headerSearch = createSlice({
  name: 'headerSearch',
  initialState: [],
  reducers: {
    changeHeaderSearch(state, action) {
      return action.payload
    }
  }
})

let keyword = createSlice({
  name: 'keyword',
  initialState: '',
  reducers: {
    changeKeyword(state, action) {
      return action.payload
    }
  }
})

let addRow = createSlice({
  name: 'addRow',
  initialState: 1,
  reducers: {
    changeRow(state, action) {
      return action.payload
    }
  }
})

let bannerIdx = createSlice({
  name: 'bannerIdx',
  initialState: '0',
  reducers: {
    changeBanner(state, action) {
      return action.payload
    }
  }
})

export let { changeSido } = sido.actions
export let { changeSidoVal } = sidoVal.actions
export let { changeGugun } = gugun.actions
export let { changeGugunVal } = gugunVal.actions

export let { changeContentTypeVal } = contentTypeVal.actions
export let { changeCat1CVal } = cat1Val.actions
export let { changeCat2CVal } = cat2Val.actions
export let { changeCat3CVal } = cat3Val.actions
export let { changeHeaderSearch } = headerSearch.actions
export let { changeKeyword } = keyword.actions

export let { changeRow } = addRow.actions
export let { changeBanner } = bannerIdx.actions


export let { increment, decrement } = counter.actions


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


