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
    <div className='bg-white rounded-sm flex flex-col justify-start items-center'>
      <div className='relative w-full'>
        <Image
          src={imgUrl}
          alt={name}
          height={90}
          width={160}
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
            className=' w-full'
            onClick={() => increaseItemQuantity(id)}>
            + Add to Cart
          </Button>
        ) : (
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <Button
                className=''
                onClick={() => decreaseItemQuantity(id)}>
                -
              </Button>
              <div>
                <span className='text-sm'> {quantity} in cart</span>
              </div>
              <Button
                className=''
                onClick={() => increaseItemQuantity(id)}>
                +
              </Button>
            </div>
            <Button
              className='!bg-red-600'
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
