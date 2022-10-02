import { NextPage } from 'next'
import Image from 'next/image'
import GitIconComponent from '../components/svg-git'
import LinkedinIconComponent from '../components/svg-linkedin'
import TwitterIconComponent from '../components/svg-twitter'

const About: NextPage = () => {
  return (
    <div className='flex flex-col items-center md:flex-row md:max-w-3/5 mx-auto rounded-md bg-white overflow-hidden'>
      <div className='text-white bg-indigo-400 p-4 w-full md:max-w-sm flex flex-col items-center  gap-4'>
        <Image
          src='/avatar/petunia.webp'
          alt='author'
          width={100}
          height={100}
          objectFit='cover'
          className='rounded-full  '
        />

        <div className='flex flex-col items-center justify-center gap-2'>
          <div className=' text-lg font-semibold'>Jennifer Cheng</div>
          <div className=''>Full Stack Developer</div>
          <div className='text-gray-200'>
            A frontend developer with over 3 years of experience. A huge fan of
            typescript. Passionate about Angular, React and NEXT.js.
          </div>
        </div>
      </div>
      <div className='bg-white text-gray-800 p-4 text-center'>
        <div className='w-full  text-lg'>INFORMATION</div>
        <br className='gray-200 border-t-1'></br>
        <div className='flex flex-row gap-4 justify-around items-center'>
          <div>
            <div>Email</div>
            <div>xxx@</div>
          </div>
          <div>
            <div>Phone</div>
            <div>514</div>
          </div>
        </div>
        <div> Worked For</div>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div>A company</div>
          <div>A company</div>
          <div>A company</div>
          <div>A company</div>
        </div>
        <br></br>
        <div className='xxx'></div>
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
