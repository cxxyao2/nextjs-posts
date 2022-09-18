import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusIcon,
  HeartIcon,
  RadioIcon
} from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useRouter } from 'next/router'

const SideBar = () => {
  const { data: session } = useSession()
  const { isVisibleSideBar, setIsVisibleSideBar } = useShoppingCart()
  const router = useRouter()
  if (!isVisibleSideBar) return null

  return (
    <>
      <button
        className='z-30 text-2xl text-black fixed top-4 left-1/3 '
        onClick={() => setIsVisibleSideBar(false)}>
        x
      </button>
      <div
        className={`z-20 fixed top-0  left-0 bg-white text-gray-900 p-5 text-sm
      border-r border-gray-400 w-1/2 md:max-w-sm h-full overflow-y-auto
       ${
         isVisibleSideBar ? 'translate-x-0' : '-translate-x-full'
       } ease-in-out duration-300`}
        onClick={() => setIsVisibleSideBar(false)}>
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
          <button
            className='flex items-center space-x-2 hover:text-gray-400'
            onClick={() => router.push('/store')}>
            <MagnifyingGlassIcon className='h-5 w-5 ' />
            <p>Search </p>
          </button>
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
    </>
  )
}

export default SideBar
