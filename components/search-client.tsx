import { Customer } from '../models/customer'

import Image from 'next/image'

type SearchClientProps = {
  client: Customer
}
const SearchClient = ({ client }: SearchClientProps) => {
  return (
    <div className='col-span-full md:col-span-6  xl:col-span-3  shadow-sm rounded-sm  shadow-slate-400'>
      <div className=' p-2 flex flex-row justify-between space-x-4 items-center shadow-md shadow-gray-400'>
        <div className='relative w-10 h-10 rounded-full overflow-hidden outline-2 outline-white'>
          <Image
            src='/avatar/duck.jpg'
            alt=''
            objectFit='cover'
            width={50}
            height={50}
          />
        </div>
        <div className='flex-1 self-start truncate'>
          <div> {client.name}</div>
          <div className='text-sm'> Sales Manager</div>
        </div>
        <div className='border rounded-md border-gray-400 py-2 px-4 text-sm'>
          View
        </div>
      </div>
    </div>
  )
}

export default SearchClient
