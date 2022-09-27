import ReactDOM from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

type ModalProps = {
  message: string
  isOpen: boolean
  onAfterOpen: () => void
  onClose: () => void
  children: React.ReactNode
}

const OkCancelModal = ({
  message,
  isOpen,
  onAfterOpen,
  onClose,
  children
}: ModalProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const modalWrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window) {
      onAfterOpen()
    }
  }, [])

  const content = (
    <div
      className='absolute bg-gary-200/50 w-full mx-auto lg:ml-[10%]  -translate-y-1/2 min-h-[80%] z-[70] top-2/4 left-0 right-0 bottom-0  flex flex-col justify-center items-center'
      onClick={onClose}>
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
              {message}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
              className='outline-indigo-400 text-black-400 text-lg p-1'>
              <XMarkIcon className='w-6 h-6 text-gray-800' />
            </button>
          </div>

          <div className='p-4 max-h-[300px] overflow-y-auto'>
            <form ref={formRef}>{children}</form>
          </div>
        </div>
      </div>
    </div>
  )

  if (!isOpen) return null
  return ReactDOM.createPortal(content, document.body)
}

export default OkCancelModal
