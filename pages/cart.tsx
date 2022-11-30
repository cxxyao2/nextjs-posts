import { GetServerSideProps, NextPage, Redirect } from 'next'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

import CartItem from '../components/cart-item'
import { useShoppingCart } from '../context/shoppingcart-context'
import { Customer } from '../models/customer'
import SelectModal from '../components/select-modal'
import Meta from '../components/meta'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'
import { ChevronDoubleRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { downloadCustomerList } from '../serivces/master-service'

import { formatCurrency } from '../utils/formatCurrency'
import getStripe from '../lib/getStripe'
import { saveOrder } from '../serivces/order-service'

interface Props {
  customers: Customer[]
  errorFromServer: string
}

const Cart: NextPage<Props> = ({ customers, errorFromServer }) => {
  const {
    cartItems: items,
    setCartItems,
    cartAmount,
    customers: oldCustomers,
    setCustomers
  } = useShoppingCart()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const { showNotification, notification } = useNotificationContext()
  const [totalAmount, setTotalAmount] = useState('0')

  useEffect(() => {
    if (!oldCustomers || oldCustomers.length === 0) setCustomers(customers)
    if (errorFromServer) {
      showNotification({
        id: 'Cart',
        message: errorFromServer,
        status: 'error'
      })
    }
  }, [])

  useEffect(() => {
    setTotalAmount(formatCurrency(cartAmount))
  }, [cartAmount])

  const handleCheckout = async () => {
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      lineItems: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      mode: 'subscription',
      successUrl: `https://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancle`,
      customerEmail: 'customer@email.com'
    })
    console.warn(error.message)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    saveOrder([...items], selectedCustomer.id)
      .then((_) => {
        setCartItems([])
        showNotification({
          id: '',
          message: 'Order has saved successfully.',
          status: 'success'
        })
        setShowForm(false)
        handleCheckout().then()
      })
      .catch((error) => {
        showNotification({
          id: '',
          message: JSON.stringify(error),
          status: 'error'
        })
      })
  }

  return (
    <div>
      <Meta
        title='Checkou Cart'
        keywords='Items'
        description='Gasoline, lucricate, diesel fuel'
      />
      {notification && <Notification {...notification} />}
      {!showForm && (
        <div>
          Back to{' '}
          <Link href='/'>
            <a className='text-lg font-semibold text-indigo-400'>Homepage</a>
          </Link>
        </div>
      )}
      {showForm && (
        <form className='relative'>
          <div className='mb-2 flex justify-start items-center space-x-2 md:space-x-6 pb-1 border-b border-indigo-200'>
            <span>Customer Name:</span>
            <span
              className={`bg-white px-4 py-2 text-sm font-semibold rounded-sm  ${
                selectedCustomer ? 'text-gray-600' : 'text-red-600'
              }`}>
              {selectedCustomer ? selectedCustomer.name : 'Select a customer'}
            </span>
            <button
              className='outline-none p-1 bg-indigo-400 rounded-md px-2 focus:outline-indigo-500'
              autoFocus={true}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsModalOpen(true)
              }}>
              <PlusIcon className='w-6 h-6 text-white' />
            </button>
          </div>
          <div className='divide-y divide-slate-400 dark:divide-indigo-400 bg-white dark:bg-slate-200'>
            {items &&
              items.map((item) => (
                <CartItem
                  item={item}
                  key={item.name}></CartItem>
              ))}
          </div>
          <div className='flex justify-between items-baseline mt-3'>
            <div>
              Total: <span className='ml-2 font-semibold'>{totalAmount}</span>
            </div>
            <button
              type='submit'
              className={`px-1 outline-none focus:outline-orange-700  rounded-sm ${
                cartAmount === 0
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-orange-500 text-white'
              }`}
              onClick={(e) => handleSubmit(e)}>
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
      )}

      <SelectModal
        title='Select a customer'
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        initialItems={customers.slice()}
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
