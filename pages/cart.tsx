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

const Cart: NextPage = () => {
  const { cartItems: items, cartAmount, customers } = useShoppingCart()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showNotification } = useNotificationContext()

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!selectedCustomer) {
      showNotification({
        id: 'Cart',
        message: 'Please select a customer',
        status: false
      })
      return
    }

    if (cartAmount === 0) {
      showNotification({
        id: 'Cart',
        message: 'Please select a customer',
        status: false
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
    <>
      <Meta
        title='Checkou Cart'
        keywords='Items'
        description='Gasoline, lucricate, diesel fuel'
      />
      <form>
        <div className='mb-2 flex justify-start items-center space-x-2 md:space-x-6 pb-1 border-b border-indigo-200'>
          <span>Customer Name:</span>
          <span
            className={`bg-white px-4 py-2 text-sm font-semibold rounded-sm  ${
              selectedCustomer ? 'text-gray-600' : 'text-red-600'
            }`}>
            {selectedCustomer ? selectedCustomer.name : 'Select a customer'}
          </span>
          <Button
            aria-role='search'
            className=''
            onClick={() => setIsModalOpen(true)}>
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
    </>
  )
}

export default Cart
