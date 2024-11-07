import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const bannerIdx = createSlice({
  name: 'bannerIdx',
  initialState: 0,
  reducers: {
    changeBanner(state, action) {
      return action.payload
    }
  }
})

export const { changeContentTypeVal } = contentTypeVal.actions
export const { changeCat1CVal } = cat1Val.actions
export const { changeCat2CVal } = cat2Val.actions
export const { changeCat3CVal } = cat3Val.actions
export const { changeBanner } = bannerIdx.actions

export const store = configureStore({
  reducer: {
    contentTypeVal: contentTypeVal.reducer,
    cat1Val: cat1Val.reducer,
    cat2Val: cat2Val.reducer,
    cat3Val: cat3Val.reducer,
    bannerIdx: bannerIdx.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


