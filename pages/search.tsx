import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchItem from '../components/search-item'

const SearchPage = () => {
  return (
    <>
      <div className='bg-white  p-4 rounded-sm dark:bg-slate-200'>
        <div className='bg-indigo-400'>
          <div className=' focus:outline-2 focus:outline-indigo-200 flex h-[40px] flex-row justify-center items-center   shadow-md shadow-slate-300'>
            <input
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
          <div className='bg-indigo-500 px-6 py-3'>
            <ul className='flex flex-row text-white font-semifold justify-center items-center space-x-8 mx-auto'>
              <ol>
                <a
                  tabIndex={3}
                  href='#'
                  className='outline-none border-b-2 pb-1 border-indigo-400 focus:border-gray-100  transition-colors duration-300 cursor-pointer'>
                  Product{' '}
                </a>
              </ol>
              <ol>
                <a
                  tabIndex={4}
                  className='outline-none  border-b-2 pb-1 border-indigo-400 focus:border-gray-100 transform transition-colors duration-300 cursor-pointer'>
                  Client{' '}
                </a>
              </ol>
              <ol>
                <a
                  tabIndex={5}
                  className='ouline-none border-b-2 pb-1 border-indigo-400 focus:border-gray-100 transform transition-colors duration-300 cursor-pointer'>
                  Service{' '}
                </a>
              </ol>
            </ul>
          </div>
        </div>

        <section id='searched'>
          <h2 className='font-semibold text-lg'>Results</h2>
          <div className='grid grid-cols-12 gap-6'>
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
            <SearchItem></SearchItem>
          </div>
        </section>
      </div>
    </>
  )
}

export default SearchPage
