import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = React.PropsWithChildren<{
  onChange: (arg:string)=>void
}>
const SearchInput = ({onChange}:Props) => {
  return (
    <div className=' focus:outline-2 focus:outline-indigo-200 flex h-[40px] flex-row justify-center items-center   shadow-md shadow-slate-300'>
    <input
      onChange={(e)=>onChange(e.target.value)}
      type='text'
      tabIndex={1}
      autoComplete='off'
      placeholder=''
      aria-label='search'
      className=' text-sm w-2/3 outline-none h-[32px] rounded-tl-md rounded-bl-md   p-1  dark:text-slate-600 dark:bg-white'
    />
    <button
      tabIndex={2}
      className=' outline-none focus:outline-orange-400 rounded-tr-md rounded-br-md bg-slate-200 p-1'>
      <MagnifyingGlassIcon className='w-6 h-6 text-indigo-400' />
    </button>
  </div>
  )
}

export default SearchInput