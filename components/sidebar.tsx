import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusIcon,
  HeartIcon,
  RadioIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { useShoppingCart } from '../context/shoppingcart-context'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SideBar = () => {
  const { data: session } = useSession()
  const { isVisibleSideBar, setIsVisibleSideBar } = useShoppingCart()
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  // if (!isVisibleSideBar) return null

  return (
    <div>
      {isVisibleSideBar && (
        <div
          className='fixed inset-0 bg-slate-900 bg-opacity-30 z-30 lg:hidden lg:z-auto transition-opacity duration-200 opacity-100'
          aria-hidden='true'></div>
      )}
      <div
        className={`absolute z-40 top-0  left-0 bg-white text-gray-900 p-5 text-sm
      border-r border-gray-400 w-64 shrink-0 h-screen overflow-y-auto transition-all
      lg:static lg:left-auto lg:top-auto  lg:!translate-x-0
       ${
         isVisibleSideBar ? '!translate-x-0' : ''
       } ease-in-out duration-200 -translate-x-64 `}
        onClick={() => setIsVisibleSideBar(false)}>
        <button
          className='absolute text-2xl text-black  top-4 left-52 lg:hidden '
          onClick={() => setIsVisibleSideBar(false)}>
          x
        </button>
        <div className='space-y-4'>
          <div className='text-center'>{session?.user?.name}</div>
          <button
            onClick={() => signOut()}
            className='text-center  w-full rounded-sm hover:ring-2 hover:text-gray-400 hover:ring-indigo-200  hover:ring-offset-2 hover:ring-offset-indigo-200 '>
            Sign Out
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Home </p>
          </button>
          <div>
            <div className='flex justify-between items-center'>
              <button
                className='flex  hover:text-gray-400'
                onClick={() => router.push('/store')}>
                <MagnifyingGlassIcon className='h-5 w-5 shrink-0 mr-3' />
                <div>Search </div>
              </button>
              <a onClick={() => setIsExpanded((prev) => !prev)}>
                <ChevronDownIcon
                  className={`w-4 h-4 shrink-0 text-gray-800 translation duration-150 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </a>
            </div>
            {isExpanded && (
              <div>
                <ul className='pl-8 mt-1 '>
                  <li className='mb-1 last:mb-0'>
                    <a
                      aria-current='page'
                      href='/'
                      className='block text-slate-300 hover:text-slate-500 transition duration-150'>
                      <span>Main</span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current='page'
                      href='/'
                      className='block text-slate-300 hover:text-slate-500 transition duration-150'>
                      <span>Main</span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current='page'
                      href='/'
                      className='block text-slate-300 hover:text-slate-500 transition duration-150'>
                      <span>Main</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <BookOpenIcon className='h-5 w-5 ' />
            <p>Your Library</p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <PlusIcon className='h-5 w-5 ' />
            <p>More... </p>
          </button>
          <hr className='border-t-[0.1px] border-gray-400' />
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <RadioIcon className='h-5 w-5 ' />
            <p>Latest Activities </p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>
          <hr className='border-t-[0.1px] border-gray-400' />
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HeartIcon className='h-5 w-5 ' />
            <p>Your favorites </p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>{' '}
          <button className='flex items-center space-x-2 hover:text-gray-400'>
            <HomeIcon className='h-5 w-5 ' />
            <p>Placeholder </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar
