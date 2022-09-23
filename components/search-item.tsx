import {
  EllipsisHorizontalIcon,
  LockClosedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#__next')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0%',
    transform: 'translate(-50%,-50%)'
  }
}

const SearchItem = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  let subtitle: any

  const afterOpen = () => {
    subtitle.style.color = '#f00'
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className='col-span-full md:col-span-6 lg:col-span-4 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200'>
      <figure className='flex flex-row justify-between items-center space-x-2 md:flex-col md:space-y-2'>
        <div className='relative block self-center align-middle w-1/5 md:w-4/5  overflow-hidden'>
          <span className='hidden sm:block sm:z-10 sm:absolute sm:p-1 sm:top-0 sm:left-0 sm:bg-orange-200 sm:text-sm'>
            Best Seller
          </span>
          <Image
            alt='product'
            width={100}
            height={100}
            layout='responsive'
            objectFit='cover'
            src='/images/products/gas2.jpg'></Image>
        </div>
        <div className='p-2 md:p-4 text-center md:text-left'>
          <blockquote>
            <p className='font-semibold text-slate-800 text-left text-clip md:text-center'>
              <span className='mx-1 text-xs sm:hidden bg-orange-300'>
                Best Seller
              </span>
              <span>
                Wavian USA JCOO20avian USA JCOO2avian USA JCOO2avian USA JCOO2
              </span>{' '}
              <button
                className='wx-2'
                onClick={() => setModalIsOpen((prev) => !prev)}>
                <EllipsisHorizontalIcon className='w-6 h-6 text-slate-600' />
              </button>
            </p>
          </blockquote>
        </div>
        <figcaption className='font-medium p-2 md:p-4'>
          <div className='text-sm text-sky-500 dark:text-sky-400'>Saraa</div>
          <div className='font-semifold text-slate-700 dark:text-slate-500 '>
            stock: 22
          </div>
        </figcaption>
      </figure>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'>
        <div className='flex justify-between p-1 items-center'>
          <div ref={(_subtitle) => (subtitle = _subtitle)}>
            Product Description
          </div>
          <button
            onClick={closeModal}
            className='focus: outline-indigo-400'>
            <XMarkIcon className='w-6 h-6 text-gray-600' />
          </button>
        </div>
        <hr className='border-b-1 my-1 border-gray-400' />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
          accusamus rerum ex vero deserunt obcaecati eligendi vel nemo in, iure
          repudiandae vitae expedita earum facilis saepe soluta voluptatum
          dolore reprehenderit!
        </p>
      </Modal>
    </div>
  )
}

export default SearchItem
