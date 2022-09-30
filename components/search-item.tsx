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
    <div className='col-span-full md:col-span-6 lg:col-span-4 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200'>
      <figure className='flex flex-row justify-between items-center space-x-2 md:flex-col md:space-y-2'>
        <div className='relative block self-center align-middle w-1/5 md:w-4/5  overflow-hidden'>
          <span className='block z-10 absolute p-1 top-0 left-0 bg-orange-200 text-sm md:hidden'>
            Best Seller
          </span>
          <Image
            alt='product'
            width={100}
            height={100}
            layout='responsive'
            objectFit='cover'
            src={item.imageUrl}></Image>
        </div>
        <div className='p-2 md:p-4 text-center md:text-left'>
          <blockquote>
            <p className='font-semibold text-slate-800 text-left text-clip md:text-center'>
              <span className='hidden md:mx-1 md:text-xs  md:bg-orange-300'>
                Best Seller
              </span>
              <span>Name:{item.name}</span>
            </p>
            <div className='group '>
              <div> a short excertpt</div>
              <button className='wx-2 group'>
                <EllipsisHorizontalIcon className='w-6 h-6 text-slate-600' />
              </button>
              <div className='hidden group-hover:block -mt-10'>
                {item.description}
              </div>
            </div>
          </blockquote>
        </div>
        <figcaption className='font-medium p-2 md:p-4'>
          <div className='text-sm text-sky-500 dark:text-sky-400'>
            {item.price}
          </div>
          <div className='font-semifold text-slate-700 dark:text-slate-500 '>
            stock: 22
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

export default SearchItem
