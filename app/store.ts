import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'; // 예시 슬라이스

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
