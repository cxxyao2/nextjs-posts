// todo
import {
  AtSymbolIcon,
  CheckIcon,
  ChevronDoubleRightIcon,
  MinusSmallIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import Modal from 'react-modal'

import Button from '../components/button'
import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Customer } from '../models/customer'
import { formatCurrency } from '../utils/formatCurrency'
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

Modal.setAppElement('#__next')

const Cart: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  let filterRef = useRef<HTMLInputElement>(null)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    if (filterRef) filterRef.current?.focus()
  }

  function closeModal() {
    setIsOpen(false)
  }
  const { cartItems: items, cartAmount, customers } = useShoppingCart()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>({})
  const [validCustomers, setValidCustoemrs] = useState<Customer[]>([])

  useEffect(() => {
    setValidCustoemrs(customers)

    return () => {
      setSelectedCustomer({})
      setValidCustoemrs([])
    }
  }, [])

  const filterCustomer = (e: React.FormEvent<HTMLInputElement>): void => {
    const filtered = customers.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(e.currentTarget?.value.toLowerCase() ?? '')
    )
    setValidCustoemrs(filtered)
  }

  return (
    <>
      <div className='mb-2 flex justify-start items-center space-x-2 md:space-x-6 pb-1 border-b border-indigo-200'>
        <span>Customer Name:</span>
        <span className='bg-white px-4 py-2 text-sm font-semibold rounded-sm text-gray-600'>
          {selectedCustomer.id ? selectedCustomer.name : 'Select a customer'}
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
        <button className='ring-2 ring-orange-300 rounded-sm'>
          Check Out{' '}
          <ChevronDoubleRightIcon className='inline wl-2 w-6 h-6 text-gray-600' />
        </button>
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

          <div className='border-b-2 pb-1 border-gray-200  my-2'>
            <input
              ref={filterRef}
              className='outline-none w-full dark:bg-white dark:text-gray-600'
              type='text'
              placeholder='Enter customer name...'
              onChange={filterCustomer}
            />
          </div>
          <ul className='overflow-y-auto h-52 divide-y-2 divide-gray-200'>
            {validCustomers.map((item) => (
              <li
                key={item.id}
                className=' flex justify-between p-2 gap-6 '>
                <Image
                  src='/avatar/duck.jpg'
                  width={50}
                  height={50}
                  alt='duck avatar'
                  className='rounded-full flex-grow-0'
                />
                <div className='flex-1 flex flex-col'>
                  <span className='font-semibold text-sm'>{item.name}</span>
                  <span className='text-sm'>
                    <AtSymbolIcon className='inline w-4 h-4 text-gray-400' />
                    {item.email}
                  </span>
                </div>
                <button
                  className='outline-hidden focus:outline focus:outline-slate-400'
                  onClick={() => {
                    setSelectedCustomer(item)
                    closeModal()
                  }}>
                  {item.id === selectedCustomer.id && (
                    <CheckIcon
                      className={` w-8 h-8  mx-2 bg-blue-300 rounded-full text-white
                     `}
                    />
                  )}
                  {item.id !== selectedCustomer.id && (
                    <MinusSmallIcon
                      className={` w-8 h-8 text-gray-700 mx-2 bg-blue-300 rounded-full  `}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  )
}

export default Cart
