import { NextPage } from 'next'
import { BeakerIcon } from '@heroicons/react/24/outline'

const About: NextPage = () => {
  return (
    <div>
      About
      <div>
        <BeakerIcon className='h-6 w-6 text-blue-500'></BeakerIcon>
      </div>
    </div>
  )
}

export default About
