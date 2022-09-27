import { GetServerSideProps, NextPage, Redirect } from 'next'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'

import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/shoppingcart-context'
import { Customer } from '../models/customer'
import SelectModal from '../components/select-modal'
import Meta from '../components/meta'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'
import { ChevronDoubleRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { downloadCustomerList } from '../utils/master-data'
import { redirect } from 'next/dist/server/api-utils'

interface Props {
  customers: Customer[]
  errorFromServer: string
}

const Cart: NextPage<Props> = ({ customers, errorFromServer }) => {
  const { cartItems: items, cartAmount, setCustomers } = useShoppingCart()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showNotification, notification } = useNotificationContext()

  useEffect(() => {
    setCustomers(customers)
    if (errorFromServer) {
      showNotification({
        id: 'Cart',
        message: errorFromServer,
        status: 'error'
      })
    }
  }, [])

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!selectedCustomer) {
      showNotification({
        id: 'Cart',
        message: 'Please select a customer',
        status: 'error'
      })
      return
    }

    if (cartAmount === 0) {
      showNotification({
        id: 'Cart',
        message: 'Please select a product',
        status: 'error'
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
    <div>
      <Meta
        title='Checkou Cart'
        keywords='Items'
        description='Gasoline, lucricate, diesel fuel'
      />
      <form className='relative'>
        {notification && <Notification {...notification} />}

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
              0 {/* {formatCurrency(cartAmount)} */}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin?from=/cart',
        permanent: false
      }
    }
  }

  const data = await downloadCustomerList()

  return {
    props: {
      customers: data.customers,
      errorFromserver: data.errorMessage
    }
  }
}

export default Cart
