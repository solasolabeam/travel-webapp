'use client';

import { useAppDispatch, useAppSelector } from './hooks';
import { increment, decrement } from './store';

export default function Home() {
  const cnt = useAppSelector((state)=> state.counter)
  const contentType = useAppSelector((state)=> state.contentType)
  const dispatch = useAppDispatch();
  console.log('contentType', contentType)
  console.log('cnt', cnt)
  return (
    <div>
      <h1>Counter: {cnt}</h1>
      <h1> {contentType[0].code}</h1>
      <h1> {contentType[0].name}</h1>
      <h1> {contentType[0].url}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
