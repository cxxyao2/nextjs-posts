import { ICartItem } from '../models/cart-item'
import Button from './button'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'

type CartItemProps = {
  item: ICartItem
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const getQuantitySection = () => {
    return (
      <>
        {' '}
        <div>Quantity: {item.quantity} </div>
        <div className='mt-1'>
          <Button
            className='rounded-md'
            onClick={() => {
              removeFromCart(item.id)
            }}>
            Remove
          </Button>
        </div>
      </>
    )
  }

  return (
    <article className='flex items-start justify-between space-x-2 md:space-x-6 p-4 md:p-6 dark:text-slate-900'>
      <img
        src={item.imageUrl}
        alt={item.name}
        width='100'
        height='100'
        object-fit='cover'
        className='rounded-md bg-slate-100'
      />

      <div className=' relative flex-1 '>
        <div className='flex flex-col'>
          <div className='font-semibold text-slate-900 truncate pr-20'>
            {item.name}
          </div>
          <dl className='mt-2 flex flex-wrap text-sm leading-6 font-medium'>
            <div>
              <div>
                <dt className='sr-only'>Rating</dt>
                <dd>⭐⭐⭐⭐⭐</dd>
              </div>
              <div>
                <dt className='sr-only'>Price</dt>
                <dd className='px-1.5 font-semibold'>
                  {formatCurrency(item.price)}
                </dd>
              </div>
              <div className='mt-1 md:mt-2 font-normal '>
                <dt className='sr-only'>Descrption</dt>
                <dd className=' text-sm text-ellipsis'>{item.description}</dd>
              </div>
            </div>
            <div className='absolute md:hidden   top-0 right-0  flex flex-col items-center'>
              {getQuantitySection()}
            </div>
          </dl>
        </div>
      </div>
      <div className='hidden md:flex shrink-0 text-sm font-medium flex-col items-begin'>
        {getQuantitySection()}
      </div>
    </article>
  )
}
