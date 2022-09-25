// todo
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { useRef, useState } from 'react'
import Modal from 'react-modal'

import Button from '../components/button'
import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Customer } from '../models/customer'
import { formatCurrency } from '../utils/formatCurrency'
import Image from 'next/image'

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#__next')

const Cart: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  let filterRef = useRef<HTMLInputElement>(null)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
    if (filterRef) filterRef.current?.focus()
  }

  function closeModal() {
    setIsOpen(false)
  }
  const { cartItems: items, cartAmount } = useShoppingCart()
  const [customer, setCustomer] = useState({} as Customer)

  return (
    <>
      <div className='mb-2 flex justify-start items-center space-x-2 md:space-x-6 pb-1 border-b border-indigo-200'>
        <span>Customer Name:</span>
        <span className='bg-white px-4 py-2 text-sm font-semibold rounded-sm text-gray-600'>
          {customer.id ? customer.name : 'Select a customer'}
        </span>
        <Button
          aria-role='search'
          className=''
          onClick={() => openModal()}>
          <PlusIcon className='w-6 h-6 text-white' />
        </Button>
      </div>
      <div className='divide-y divide-slate-400 dark:divide-indigo-400 bg-white dark:bg-slate-200'>
        {items.map((item) => (
          <CartItem
            item={item}
            key={item.name}></CartItem>
        ))}
      </div>
      <div className='flex justify-between items-baseline mt-3'>
        <div>
          Total:{' '}
          <span className='ml-2 font-semibold'>
            {formatCurrency(cartAmount)}
          </span>
        </div>
        <div className='ring-2 ring-orange-300 rounded-sm'>
          Check Out{' '}
          <ChevronDoubleRightIcon className='inline wl-2 w-6 h-6 text-gray-600' />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Selet Customer'>
        <div className='dark:text-slate-700'>
          <div className='flex justify-between pb-2 '>
            <div>Select A Customer</div>
            <button onClick={closeModal}>X</button>
          </div>

          <div className='border-b-2 pb-1 border-gray-200 my-2'>
            <input
              ref={filterRef}
              className='outline-none w-full'
              type='text'
              placeholder='Enter customer name...'
            />
          </div>
          <ul className='overflow-auto divide-y-2 divide-gray-400'>
            <li className=' flex flex-between p-2'>
              <Image
                src='/avatar/duck.jpg'
                width={30}
                height={30}
                alt='duck avatar'
                className='rounded-full'
              />
              <div>Duck Direct ofr xxx</div>
              <CheckIcon className='w-8 h-8 text-white bg-blue-400 rounded-full' />
            </li>
            <li className=' flex flex-between'>
              <Image
                src='/avatar/duck.jpg'
                width={30}
                height={30}
                alt='duck avatar'
                className='rounded-full'
              />
              <div>Duck Direct ofr xxx</div>
              <XMarkIcon className='w-8 h-8 text-white bg-blue-400 rounded-full' />
            </li>
          </ul>
        </div>
      </Modal>
    </>
  )
}

export default Cart
