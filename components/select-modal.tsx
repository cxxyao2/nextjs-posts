import ReactDOM from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import { CheckIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface IModelItem {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}

type ModalProps = {
  title: string
  isOpen: boolean
  onAfterOpen: () => void
  onClose: (id: string | null | undefined) => void
  initialItems: IModelItem[]
  currentId: string | null
}

const SelectModal = ({
  title,
  isOpen,
  onAfterOpen,
  onClose,
  initialItems,
  currentId
}: ModalProps) => {
  const filterRef = useRef<HTMLInputElement>(null)
  const modalWrapperRef = useRef<HTMLDivElement>(null)
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    onAfterOpen()
  }, [])

  const content = (
    <div
      className='absolute bg-gary-200/50 w-full mx-auto lg:ml-[10%]  -translate-y-1/2 min-h-[80%] z-[70] top-2/4 left-0 right-0 bottom-0  flex flex-col justify-center items-center'
      onClick={() => onClose(undefined)}>
      <div className='w-4/5 md:w-3/5 h-4/5  '>
        <div
          className='h-full w-full  bg-white text-black border-t-4 border-indigo-400 flex flex-col rounded-md shadow shadow-gray-400'
          ref={modalWrapperRef}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          <div className='flex flex-row justify-between px-4 py-2 '>
            <span className='bg-white text-gray-800 text-semibold'>
              {title}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose(undefined)
              }}
              className='outline-indigo-400 text-black-400 text-lg p-1'>
              <XMarkIcon className='w-6 h-6 text-gray-800' />
            </button>
          </div>

          <div className='p-4 max-h-[300px] overflow-y-auto'>
            <div className='border-b-2 pb-1 border-gray-200  my-2'>
              <input
                ref={filterRef}
                className='outline-none w-full dark:bg-white dark:text-gray-600'
                type='text'
                placeholder='Enter keyword...'
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus={true}
              />
            </div>

            <ul className='overflow-y-auto h-52 divide-y-2 divide-gray-200'>
              {Array.isArray(initialItems) &&
                initialItems
                  .slice()
                  .filter((item) => item.name?.toLowerCase().includes(keyword))
                  .map(({ id, name, description, icon: NewIcon }) => (
                    <li
                      key={id}
                      className=' flex justify-between p-2 gap-6 '>
                      <Image
                        src='/avatar/duck.jpg'
                        width={50}
                        height={50}
                        alt='duck avatar'
                        className='rounded-full flex-grow-0'
                      />
                      <div className='flex-1 flex flex-col'>
                        <span className='font-semibold text-sm'>{name}</span>
                        <span className='text-sm'>
                          {NewIcon ?? null}
                          {description}
                        </span>
                      </div>
                      <button
                        className='outline-hidden focus:outline focus:outline-slate-400'
                        onClick={() => {
                          if (id === currentId) {
                            return onClose(null)
                          }
                          return onClose(id)
                        }}>
                        {id === currentId && (
                          <TrashIcon
                            className={` w-8 h-8  mx-2 bg-blue-300 rounded-full text-white focus:bg-blue-400
                     `}
                          />
                        )}
                        {id !== currentId && (
                          <CheckIcon
                            className={` w-8 h-8 text-gray-200 mx-2 bg-blue-300 rounded-full focus:bg-blue-400  `}
                          />
                        )}
                      </button>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  if (!isOpen) return null
  return ReactDOM.createPortal(content, document.body)
}

export default SelectModal
