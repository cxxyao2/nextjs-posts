import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchItem from '../components/search-item'
import { useState } from 'react'
import SearchClient from '../components/search-client'
import SearchService from '../components/search-service'

const SearchPage = () => {
  const [tab, setTab] = useState(1)
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
                  onFocus={() => setTab(1)}
                  onClick={() => setTab(1)}
                  href='#'
                  tabIndex={3}
                  className={`outline-none pb-1 focus:border-b-2  focus:border-gray-200 ${
                    tab === 1 ? 'border-b-2  border-gray-200' : ''
                  }  transition-colors duration-300 cursor-pointer`}>
                  Product{' '}
                </a>
              </ol>
              <ol>
                <a
                  onFocus={() => setTab(2)}
                  onClick={() => setTab(2)}
                  tabIndex={4}
                  className='outline-none pb-1 focus:border-b-2  focus:border-gray-200  transform transition-colors duration-300 cursor-pointer'>
                  Client{' '}
                </a>
              </ol>
              <ol>
                <a
                  onFocus={() => setTab(3)}
                  onClick={() => setTab(3)}
                  tabIndex={5}
                  className='outline-none pb-1 focus:border-b-2  focus:border-gray-200 transform transition-colors duration-300 cursor-pointer'>
                  Service{' '}
                </a>
              </ol>
            </ul>
          </div>
        </div>

        <section id='searched'>
          <h2 className='font-semibold text-lg text-slate-600'>Results</h2>
          <div className='grid grid-cols-12 gap-6'>
            {tab === 1 && (
              <>
                <SearchItem></SearchItem>
                <SearchItem></SearchItem>
                <SearchItem></SearchItem>
                <SearchItem></SearchItem>
              </>
            )}
            {tab === 2 && <SearchClient />}
            {tab === 3 && (
              <>
                <SearchService />
                <SearchService />
                <SearchService />
                <SearchService />
                <SearchService />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default SearchPage
