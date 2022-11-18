import {
  EllipsisHorizontalIcon,
  LockClosedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'
import IProduct from '../models/product'

type SearchItemProps = {
  item: IProduct
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div className='col-span-full md:col-span-6 lg:col-span-4   shadow-sm rounded-sm  shadow-slate-400 bg-white'>
      <div className='flex flex-row  justify-start items-center space-x-4  md:flex-col md:space-y-2'>
        <div className='relative block self-center align-middle w-1/5 md:w-4/5  overflow-hidden'>
          <Image
            alt='product'
            width={100}
            height={100}
            layout='responsive'
            objectFit='cover'
            src={item.imageUrl}></Image>
        </div>
        <div className='p-1 md:p-2  md:text-center '>
          <blockquote>
            <p className='font-semibold text-slate-800 text-left  md:text-center text-clip '>
              <span className='dark:text-gray-200'>Name:{item.name}</span>
            </p>
            <div className='group max-w-[200px] md:max-w-full'>
              <div className='block line-clamp-1 group-hover:hidden text-left md:text-center'>
                {item.description}
              </div>
              <div className='hidden group-hover:block text-left '>
                {item.description}
              </div>
            </div>
          </blockquote>
        </div>
        <div className='font-medium p-1 md:p-2'>
          <div className='text-sm text-sky-700 dark:text-sky-400'>
            Price: ${item.price}
          </div>
          <div className='font-semifold text-slate-700 dark:text-slate-500 '>
            Stock: {item.stock}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
