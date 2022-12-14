import Image from 'next/image'
import IProduct from '../models/product'

type SearchItemProps = {
  item: IProduct
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div className='col-span-full md:col-span-6 lg:col-span-4   shadow-sm rounded-sm  shadow-slate-400 bg-white'>
      <div className='flex flex-row  justify-start items-center space-x-4  md:flex-col md:space-y-2'>
        <div className='relative flex-shrink-0 block self-center align-middle  overflow-hidden w-20 md:w-full h-20 md:h-40 '>
          <Image
            alt='product'
            layout='fill'
            objectFit='cover'
            src={item.imageUrl}></Image>
        </div>
        <div className='p-1 md:p-2  md:text-center '>
          <blockquote className="max-w-[100px] md:max-w-[300px]">
            <p className='font-semibold text-slate-800 text-left  md:text-center text-clip overflow-hidden'>
              <span className='dark:text-gray-600'>Name:{item.name}</span>
            </p>
            <div className='group   md:max-w-full'>
              <div className='block line-clamp-1 group-hover:hidden text-left text-gray-800 md:text-center'>
                {item.description}
              </div>
              <div className='hidden  group-hover:block text-left text-gray-800  '>
                {item.description}
              </div>
            </div>
          </blockquote>
        </div>
        <div className='font-medium p-1 min-w-[100px] md:p-2'>
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
