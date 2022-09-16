import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusIcon,
  HeartIcon,
  RadioIcon
} from '@heroicons/react/24/outline'

const SideBar = () => {
  return (
    <div className=' z-30 fixed top-0 left-0 md:hidden bg-white text-gray-900 p-5 text-sm border-r border-gray-400 w-1/2 md:max-w-sm overflow-y-auto '>
      <div className='space-y-4 overflow-auto'>
        <button className='flex items-center space-x-2 hover:text-gray-400'>
          <HomeIcon className='h-5 w-5 ' />
          <p>Home </p>
        </button>
        <button className='flex items-center space-x-2 hover:text-gray-400'>
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
  )
}

export default SideBar
