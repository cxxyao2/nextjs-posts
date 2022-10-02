import { NextPage } from 'next'
import Image from 'next/image'
import GitIconComponent from '../components/svg-git'
import LinkedinIconComponent from '../components/svg-linkedin'
import TwitterIconComponent from '../components/svg-twitter'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const About: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user?.name) {
      router && router.push('/auth/signin?from=/about')
    }
  }, [session])

  if (!session?.user?.name) {
    return null
  }

  return (
    <div className='flex flex-col items-center md:flex-row md:w-4/5 mx-auto rounded-md bg-white overflow-hidden'>
      <div className='text-white bg-gradient-to-r from-indigo-800 to-indigo-400 p-4 w-full md:max-w-sm flex flex-col items-center  gap-4'>
        <Image
          src='/avatar/petunia.webp'
          alt='author'
          width={100}
          height={100}
          objectFit='cover'
          className='rounded-full'
        />
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className=' text-lg font-semibold'>Jennifer Cheng</div>
          <div className=''>Full Stack Developer</div>
          <div className='text-gray-200 w-4/5'>
            A frontend developer with over 4 years of experience and a backend
            developer with more than 10 years of experience. A huge fan of
            typescript and Node.js. Passionate about Angular, React and NEXT.js.
          </div>
        </div>
      </div>
      <div className=' text-gray-800 p-4 text-center md:ml-4'>
        <div className='w-full  text-lg'>INFORMATION</div>
        <hr className='border-gray-200 border-t-1 my-4'></hr>
        <div className='flex flex-row gap-4 justify-around items-center'>
          <div>
            <div className='font-semibold mb-2'>Email</div>
            <div>myemail@hotmail.com</div>
          </div>
          <div>
            <div className='font-semibold mb-2'>Phone</div>
            <div>000-000-0000</div>
          </div>
        </div>
        <div className='mt-8 mb-2  font-semibold'> Worked For</div>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div>ADNM</div>
          <div>Yonyou</div>
          <div>Finet.Hk</div>
        </div>
        <hr className=' border-t-1 border-gray-200 mt-8 mb-4'></hr>

        <div className='flex justify-center item-center gap-4'>
          <GitIconComponent
            fill='rgb(129 140 248)'
            className='w-8 h-8 rounded-md'
          />
          <TwitterIconComponent
            fill='rgb(129 140 248)'
            className='w-8 h-8 rounded-md'
          />
          <LinkedinIconComponent
            fill='rgb(129 140 248)'
            className='w-8 h-8 rounded-md'
          />
        </div>
      </div>
    </div>
  )
}

export default About
