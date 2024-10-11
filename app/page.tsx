'use client';

import { useAppDispatch, useAppSelector } from './hooks';
import { increment, decrement } from './store';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export default function Home() {
  const cnt = useAppSelector((state)=> state.counter.value)
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Counter: {cnt}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
