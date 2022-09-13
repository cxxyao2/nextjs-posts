import Link from 'next/link'
import { useShoppingCart } from '../context/ShoppingCartContext'

const Header = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  return (
    <div>
      <nav className=' w-full fixed top-0 z-20 h-14 px-4 text-sm bg-white flex  flex-row justify-between items-center mb-3 shadow-sm shadow-neutral-300'>
        <Link href='/'>
          <a className='px-4 py-3 rounded-lg  hover:bg-blue-200 active:bg-violet-300'>
            Dev Log
          </a>
        </Link>

        <div className='flex flex-row justify-between items-center  space-x-4'>
          <Link href='/about'>
            <a>About</a>
          </Link>

          <Link href='/store'>
            <a>Store</a>
          </Link>
          <Link href='/cart'>
            <button
              className='w-12 h-12 p-2 border rounded-full shadow-sm shadow-gray-400 text-indigo-400  relative hover:bg-indigo-800 hover:text-white'
              onClick={openCart}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
                fill='currentColor'>
                <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
              </svg>
              <div className='absolute bottom-0 right-0 rounded-full translate-x-1 translate-y-1 bg-red-600 text-white  flex justify-center items-center w-6 h-6'>
                {cartQuantity}
              </div>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header
