import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../slices/counterSlice'
import type { RootState } from '../store'

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      {' '}
      <div className='text-blue-400'>new count is {count}</div>
      <button
        onClick={() => dispatch(increment())}
        className='w-full h-10 bg-green-400'>
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className='w-full h-10 bg-red-400'>
        Decrement
      </button>
    </>
  )
}

export default Counter
