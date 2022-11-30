import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useShoppingCart } from '../contexts/shoppingcart-context'
import IProduct from '../models/product'
import { formatCurrency } from '../utils/formatCurrency'
import Button from './button'

const StoreItem = (props: IProduct) => {
  const { id, name, price, imageUrl } = props
  const {
    getItemQuantity,
    increaseItemQuantity,

    decreaseItemQuantity,
    removeFromCart
  } = useShoppingCart()
  const quantity = getItemQuantity(id)
  const [usPrice, setUsPrice] = useState('')

  useEffect(() => {
    setUsPrice(formatCurrency(price))
  }, [price])

  return (
    <div
      className='col-span-12 sm:col-span-6 md:col-span-4  bg-white shadow-md rounded-sm border border-slate-200
     drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'>
      <div className='relative block  mx-auto w-4/5 sm:w-full overflow-hidden rounded-sm'>
        <Image
          src={imageUrl}
          alt={name}
          width={180}
          height={135}
          layout='responsive'
          priority={true}
        />
      </div>

      <div className='flex w-full px-2  justify-between items-baseline mb-4'>
        <span className='block text-base text-blue-600'>{name}</span>
        <span className='block text-sm text-blue-600/80'>{usPrice}</span>
      </div>
      <div className='mt-auto w-full p-2'>
        {quantity === 0 ? (
          <Button
            className=' w-full '
            onClick={() => increaseItemQuantity(props)}>
            + Add to Cart
          </Button>
        ) : (
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <Button
                className='!px-3'
                onClick={() => decreaseItemQuantity(id)}>
                -
              </Button>
              <div>
                <span className='text-sm dark:text-gray-700'>
                  {' '}
                  {quantity} in cart
                </span>
              </div>
              <Button
                className='!px-3'
                onClick={() => increaseItemQuantity(props)}>
                +
              </Button>
            </div>
            <Button
              className='!bg-red-400'
              onClick={() => removeFromCart(id)}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreItem
