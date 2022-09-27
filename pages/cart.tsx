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
import { useState, useEffect } from 'react'

import Button from '../components/button'
import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/shoppingcart-context'
import { Customer } from '../models/customer'
import { formatCurrency } from '../utils/formatCurrency'
import SelectModal from '../components/select-modal'
import Meta from '../components/meta'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'

const Cart: NextPage = () => {
  const { cartItems: items, cartAmount, customers } = useShoppingCart()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showNotification, notification } = useNotificationContext()

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!selectedCustomer) {
      showNotification({
        id: 'Cart',
        message: 'Please select a customer',
        status: true
      })
      return
    }

    if (cartAmount === 0) {
      showNotification({
        id: 'Cart',
        message: 'Please select a customer',
        status: true
      })
      return
    }

    // save order header
    try {
    } catch (error) {}
    // save order detail
    try {
    } catch (error) {}
  }

  return (
    <div className='relative'>
      <Meta
        title='Checkou Cart'
        keywords='Items'
        description='Gasoline, lucricate, diesel fuel'
      />
      {notification && <Notification {...notification} />}
      <form>
        <div className='mb-2 flex justify-start items-center space-x-2 md:space-x-6 pb-1 border-b border-indigo-200'>
          <span>Customer Name:</span>
          <span
            className={`bg-white px-4 py-2 text-sm font-semibold rounded-sm  ${
              selectedCustomer ? 'text-gray-600' : 'text-red-600'
            }`}>
            {selectedCustomer ? selectedCustomer.name : 'Select a customer'}
          </span>
          <button
            className='p-1 bg-indigo-300 rounded-md px-2'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()

              setIsModalOpen(true)
            }}>
            <PlusIcon className='w-6 h-6 text-white' />
          </button>
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
              0{/* TODO  {formatCurrency(cartAmount)} */}
            </span>
          </div>
          <button
            type='submit'
            className={`px-1 ring-2 ring-orange-100  rounded-sm ${
              cartAmount === 0
                ? 'bg-gray-300 text-gray-600'
                : 'bg-orange-500 text-white'
            }`}
            onClick={(e) => handleCheckout(e)}>
            Check Out{' '}
            <ChevronDoubleRightIcon
              className={`inline ml-2 w-6 h-6  ${
                cartAmount === 0
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-orange-500 text-white'
              }`}
            />
          </button>
        </div>
      </form>

      <SelectModal
        title='Select a customer'
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        initialItems={customers}
        currentId={selectedCustomer?.id || null}
        onClose={(id) => {
          if (id === null) {
            setSelectedCustomer(null)
          }
          id &&
            setSelectedCustomer(() => {
              const index = customers.findIndex((c) => c.id === id)
              if (index >= 0) return customers[index]
              return null
            })
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}

export default Cart
