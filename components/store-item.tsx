import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import Button from './button'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
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
  }, [])

  return (
    <div
      className='col-span-full sm:col-span-6 md:col-span-4  bg-white shadow-lg rounded-sm border border-slate-200
     drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]'>
      <div className='relative block mx-auto w-4/5 sm:w-full overflow-hidden rounded-sm'>
        <Image
          src={imgUrl}
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
            addedClasses=' w-full '
            onClick={() => increaseItemQuantity(id)}>
            + Add to Cart
          </Button>
        ) : (
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <Button
                addedClasses='!px-3'
                onClick={() => decreaseItemQuantity(id)}>
                -
              </Button>
              <div>
                <span className='text-sm'> {quantity} in cart</span>
              </div>
              <Button
                addedClasses='!px-3'
                onClick={() => increaseItemQuantity(id)}>
                +
              </Button>
            </div>
            <Button
              addedClasses='!bg-red-400'
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
