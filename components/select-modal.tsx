// todo
import {
  CheckIcon,
  MinusSmallIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useRef, useState, useEffect } from 'react'
import Modal from 'react-modal'

import Image from 'next/image'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

interface IModelItem {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}

type SelectModalProp = {
  isOpen: boolean
  initialItems: IModelItem[]
  currentId?: string
  setSelectedId: (id?: string) => void
}

const SelectModal = ({
  initialItems,
  isOpen,
  currentId,
  setSelectedId
}: SelectModalProp) => {
  let filterRef = useRef<HTMLInputElement>(null)

  function afterOpenModal() {
    if (filterRef) filterRef.current?.focus()
  }

  function closeModal(id?: string) {
    setSelectedId(id)
  }
  const [validItems, setValidCustoemrs] = useState<IModelItem[]>([])

  useEffect(() => {
    setValidCustoemrs(initialItems)

    return () => {
      setValidCustoemrs([])
    }
  }, [])

  const filterItem = (e: React.FormEvent<HTMLInputElement>): void => {
    const filtered = initialItems.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(e.currentTarget?.value.toLowerCase() ?? '')
    )
    setValidCustoemrs(filtered)
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => closeModal()}
      style={customStyles}
      contentLabel='Selet Customer'>
      <div className='dark:text-slate-700'>
        <div className='flex justify-between pb-2 '>
          <div>Select A Item</div>
          <button onClick={() => closeModal()}>X</button>
        </div>

        <div className='border-b-2 pb-1 border-gray-200  my-2'>
          <input
            ref={filterRef}
            className='outline-none w-full dark:bg-white dark:text-gray-600'
            type='text'
            placeholder='Enter keyword...'
            onChange={filterItem}
          />
        </div>
        <ul className='overflow-y-auto h-52 divide-y-2 divide-gray-200'>
          {validItems.map(({ id, name, description, icon: NewIcon }) => (
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
                  closeModal(id)
                }}>
                {id === currentId && (
                  <TrashIcon
                    className={` w-8 h-8  mx-2 bg-blue-300 rounded-full text-white
                     `}
                  />
                )}
                {id !== currentId && (
                  <CheckIcon
                    className={` w-8 h-8 text-gray-200 mx-2 bg-blue-300 rounded-full  `}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default SelectModal
