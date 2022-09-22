import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { PlusIcon, ArrowSmallDownIcon } from '@heroicons/react/24/solid'
import SvgDescendComponent from './svg-descending'

const DashBoardDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isDescending, setIsDescending] = useState(true)
  return (
    <div className='sm:flex sm:justify-between sm:items-center mb-8'>
      <ul className='flex flex-wrap justify-center sm:justify-start mb-8 -space-x-2 -ml-px'>
        <li>
          <a
            className='block'
            href='javascript:void(0)'>
            <img
              src='/avatar/duck.jpg'
              className='w-9 h-9 rounded-full shadow-md shadow-gray-500'
              alt='User 01'
            />
          </a>
        </li>
        <li>
          <a
            className='block'
            href='javascript:void(0)'>
            <img
              src='/avatar/petunia.webp'
              className='w-9 h-9 rounded-full shadow-md shadow-gray-500'
              alt='User 02'
            />
          </a>
        </li>
        <li>
          <a
            className='block'
            href='javascript:void(0)'>
            <img
              src='/avatar/winnie.jpeg'
              className='w-9 h-9 rounded-full shadow-md shadow-gray-500'
              alt='User 03'
            />
          </a>
        </li>
        <li>
          <PlusIcon className='flex justify-center item-center w-9 h-9 rounded-full bg-white text-indigo-500 shadown-sm transition duration-150 ml-2'>
            <span className='sr-only'>add new user</span>
          </PlusIcon>
        </li>
      </ul>

      <div className='flex flex-row items-center space-x-4 '>
        <div
          onClick={() => setIsDescending((prev) => !prev)}
          className='bg-white p-2 rounded-sm shadow-md shadow-gray-500'>
          <SvgDescendComponent
            fill='currentColor'
            className={`w-5 h-5 text-gray-500${
              isDescending ? '' : 'rotate-180'
            } transition-transform `}
          />
        </div>
        <div>
          <ReactDatePicker
            className='p-1 rounded-sm text-center'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}></ReactDatePicker>
        </div>
        <span className='mx-1'>-</span>
        <ReactDatePicker
          className='p-1 rounded-sm text-center'
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}></ReactDatePicker>
        <button className='text-white text-center bg-indigo-500 px-2 rounded-sm'>
          Refresh
        </button>
      </div>
    </div>
  )
}

export default DashBoardDatePicker
