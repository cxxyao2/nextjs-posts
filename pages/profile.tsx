import {
  ArchiveBoxIcon,
  AtSymbolIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
type ProfileProps = {
  userName: string | null | undefined
}

const Profile = ({ userName }: ProfileProps) => {
  const router = useRouter()
  const [person, setPerson] = useState<string | null | undefined>(null)
  useEffect(() => {
    setPerson(userName)
    // let position = router.asPath.search('person')
    // if (position >= 0) {
    //   let pername = router.asPath.substring(position)
    //   pername = pername.substring(7)
    //   setPerson(pername)
    //   return
    // }
    // router.push('/auth/signin')
  }, [userName])

  if (!person) return null
  return (
    <div className='bg-white shadow-md shadow-gray-400 rounded-md w-4/5 md:w-1/2 m-auto pb-4 flex flex-col items-center text-gray-600'>
      <div className='h-24 w-full bg-blue-400 rounded-tl-md rounded-tr-md'></div>
      <img
        src='avatar/duck.jpg'
        alt='avatar'
        className='w-24 h-24 -mt-12 rounded-full '
      />
      <div className='flex flex-col justify-center items-center gap-2'>
        <div className='font-semibold text-lg'>{person}</div>
        <div className='text-sm font-gray-400'>sales manager</div>
      </div>
      <div className='flex flex-row justify-between items-center space-x-8 md:space-x-16 my-2'>
        <div className='flex flex-col items-center'>
          <p className='font-semibold text-indigo-400'>200</p>
          <p>client</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='font-semibold text-indigo-400'>$200,000</p>
          <p>sales</p>
        </div>
      </div>
      <div>
        <blockquote className='text-orange-400 text-center p-1'>
          &quot; When the going gets tough, the tough gets going.&quot;
        </blockquote>
      </div>
      <div className='flex flex-col mt-4 md:mt-8 md:flex-row justify-center items-start gap-2 md:gap-6'>
        <div className='px-2 py-1 shadow shadow-gray-400 rounded-md flex gap-1 items-center justify-center'>
          <AtSymbolIcon className='w-4 h-4 text-gray-400 mx-1' />
          <p>Email</p>
        </div>
        <div className='px-2 py-1 shadow shadow-gray-400 rounded-md flex gap-1 items-center justify-center'>
          <ArchiveBoxIcon className='w-4 h-4 text-gray-400 mx-1' />
          <p>Background</p>
        </div>
        <div className='px-2 py-1 shadow shadow-gray-400 rounded-md flex gap-1 items-center justify-center'>
          <SparklesIcon className='w-4 h-4 text-gray-400 mx-1' />
          <p>Achievement</p>
        </div>
      </div>
    </div>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userName = context.query.person

  if (userName && userName != 'null') {
    return {
      props: {
        userName
      }
    }
  }

  const session = await getSession(context)
  if (session && session.user?.name) {
    return {
      props: {
        userName: session.user?.name
      }
    }
  }

  return {
    redirect: {
      destination: '/auth/signin?from=/profile',
      permanent: false
    }
  }
}
