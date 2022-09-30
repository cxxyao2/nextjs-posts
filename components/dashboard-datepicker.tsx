import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { PlusIcon } from '@heroicons/react/24/solid'
import SvgDescendComponent from './svg-descending'

type DatePickerProp = {
  onRefresh: (startDate: Date, endDate: Date, isAscending: boolean) => void
}
const DashBoardDatePicker = ({ onRefresh }: DatePickerProp) => {
  const [startDate, setStartDate] = useState(() => {
    const yyyy = new Date().getFullYear()
    const firstDayOfYear = new Date(yyyy, 0, 1)
    return firstDayOfYear
  })
  const [endDate, setEndDate] = useState(new Date())
  const [isAscending, setIsAscending] = useState(true)
  return (
    <div className='sm:flex sm:justify-between sm:items-center mb-8'>
      <ul className='flex flex-wrap justify-center sm:justify-start mb-8 -space-x-2 -ml-px'>
        <li>
          <a
            className='block'
            href='#'>
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
            href='#'>
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
            href='#'>
            <img
              src='/avatar/winnie.jpeg'
              className='w-9 h-9 rounded-full shadow-md shadow-gray-500'
              alt='User 03'
            />
          </a>
        </li>
        <li>
          <button className='outline-none focus:outline-indigo-400 flex items-center ml-2'>
            <PlusIcon className='flex justify-center item-center w-9 h-9 rounded-full bg-white text-indigo-500 shadown-sm transition duration-150'>
              <span className='sr-only'>add new user</span>
            </PlusIcon>
          </button>
        </li>
      </ul>

      <div className='flex flex-col md:flex-row items-center gap-2 '>
        <div className='flex flex-row gap-2'>
          <div
            onClick={() => setIsAscending((prev) => !prev)}
            className='bg-white p-2 rounded-sm shadow-md shadow-gray-500'>
            <SvgDescendComponent
              fill='currentColor'
              className={`w-5 h-5 text-gray-500 ${
                isAscending ? '' : 'rotate-180'
              } transition-transform `}
            />
          </div>

          <ReactDatePicker
            className='p-1 rounded-sm text-center'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}></ReactDatePicker>
          <span className='mx-1'>-</span>
        </div>

        <div className='flex flex-row gap-2'>
          <ReactDatePicker
            className='p-1 rounded-sm text-center'
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}></ReactDatePicker>
          <button
            className='text-white text-center bg-indigo-500 px-2 rounded-sm'
            onClick={() => onRefresh(startDate, endDate, isAscending)}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashBoardDatePicker
