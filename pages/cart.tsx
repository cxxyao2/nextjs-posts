// todo
import {
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { useState } from 'react'
import Button from '../components/button'
import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Customer } from '../models/customer'
import { formatCurrency } from '../utils/formatCurrency'

const Cart: NextPage = () => {
  const { cartItems: items, cartAmount } = useShoppingCart()
  const [customer, setCustomer] = useState({} as Customer)

  return (
    <>
      <div className='mb-2 flex justify-start items-center space-x-4 pb-1 border-b border-indigo-200'>
        <span>Customer Name:</span>
        <span className='bg-white px-4 py-2 text-sm font-semibold rounded-sm text-gray-600'>
          {customer.id ? customer.name : 'Select a customer'}
        </span>
        <Button
          aria-role='search'
          className=''
          onClick={() => {}}>
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
    </>
  )
}

export default Cart
