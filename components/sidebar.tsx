import Link from 'next/link'

const SideBar = () => {
  return (
    <>
      <div className='fixed z-30 top-0 left-0 md:top-16 bg-white'>
        <div className='ml-8 flex flex-col justify-start gap-6 overflow-y-auto max-w-xs '>
          <div className='w-full p-2 flex flex-row space-x-4'>
            <Link href='/'>
              <a className=''>Home</a>
            </Link>
          </div>
          <div className='w-full p-2 flex flex-row space-x-4'>
            <Link href='/'>
              <a className=''>Home</a>
            </Link>
          </div>{' '}
          <div className='w-full p-2 flex flex-row space-x-4'>
            <Link href='/'>
              <a className=''>Home</a>
            </Link>
          </div>{' '}
          <div className='w-full p-2 flex flex-row space-x-4'>
            <Link href='/'>
              <a className=''>Home</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
