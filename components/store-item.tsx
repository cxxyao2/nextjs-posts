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
    <div className='bg-white rounded-sm    flex flex-col justify-start items-center  min-w-[200px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]'>
      <div className='relative w-full overflow-hidden rounded-sm'>
        <Image
          src={imgUrl}
          alt={name}
          width={200}
          height={180}
          objectFit='cover'
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
