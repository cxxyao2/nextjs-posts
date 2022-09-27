import { NextPage } from 'next'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <div className='text-center'>
      Please confirm your url or return to{' '}
      <Link href='/'>
        <a className='no-underline text-indigo-400 font-bold text-lg'>
          Homepage
        </a>
      </Link>
    </div>
  )
}

export default NotFound
