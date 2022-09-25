import Link from 'next/link'
import { useRouter } from 'next/router'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SvgNozzleComponent from './svg-nozzle'
import LoginButton from './login-btn'

const NavBar = () => {
  const {
    openCart,
    cartQuantity,
    setIsVisibleSideBar,
    downloadProductList,
    downloadCustomerList
  } = useShoppingCart()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentRoute = router.pathname

  useEffect(() => {
    setMounted(true)
    downloadProductList()
    downloadCustomerList()
  }, [])

  const handleLocaleChange = () => {
    const value = router.locale === 'en' ? 'fr' : 'en'
    return (
      <button
        className='w-8 py-1 rounded-md hover:shadow-md hover:shadow-indigo-400'
        onClick={() =>
          router.push(router.route, router.asPath, { locale: value })
        }>
        {value}
      </button>
    )
  }

  const handleThemeChange = () => {
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme
    if (currentTheme === 'dark') {
      return (
        <button onClick={() => setTheme('light')}>
          <SunIcon className='w-6 h-6 self-center rounded-full  dark:text-gray-200 text-gray-600'></SunIcon>
        </button>
      )
    }

    return (
      <button
        onClick={() => {
          console.log('click light')
          setTheme('dark')
        }}>
        <MoonIcon className='w-6 h-6 self-center rounded-full text-gray-600 hover:shadow hover:shadow-indigo-400'></MoonIcon>
      </button>
    )
  }

  const ancoreStyle = (link: string): string => {
    return 'invisible md:visible md:p-2 md:rounded-md md:hover:bg-indigo-400 md:hover:text-white'.concat(
      currentRoute === link ? ' text-white bg-indigo-500' : ''
    )
  }

  return (
    <header className='sticky top-0 z-20  dark:bg-black bg-white border-b border-slate-200 '>
      <div className='px-4 md:px-6 lg:px-8'>
        <nav className='h-14 md:h-16  -mb-px  text-sm  flex  flex-row justify-between items-center '>
          <div>
            <Link href='/'>
              <a className='flex flex-row items-center'>
                <Bars3Icon
                  className='w-6 h-6 text-gray-500 lg:hidden'
                  onClick={() => {
                    setIsVisibleSideBar(true)
                  }}></Bars3Icon>
                <SvgNozzleComponent
                  fill='rgb(129 140 248)'
                  className='w-10 h-10 rounded-md  hover:shadow-md hover:shadow-gray-300'></SvgNozzleComponent>
                <span className='inline'>Excel Gas</span>
              </a>
            </Link>
          </div>

          <div className='flex justify-between items-center space-x-4'>
            <Link href='/about'>
              <a className={ancoreStyle('/about')}>About</a>
            </Link>

            <Link href='/store'>
              <a className={ancoreStyle('/store')}>Store</a>
            </Link>

            <Link href='/search'>
              <a>
                <MagnifyingGlassIcon className='inline-flex w-8 h-8 text-indigo-500  hover:text-indigo-400' />
              </a>
            </Link>

            {cartQuantity > 0 && (
              <Link href='/cart'>
                <button
                  className='w-12 h-12 p-2 border rounded-full shadow-sm shadow-gray-400 text-indigo-400  relative'
                  onClick={openCart}>
                  <ShoppingCartIcon className='text-indigo-400 hover:text-indigo-300' />
                  <div className='absolute bottom-0 right-0 rounded-full translate-x-1 translate-y-1 bg-red-600 text-white  flex justify-center items-center w-6 h-6'>
                    {cartQuantity}
                  </div>
                </button>
              </Link>
            )}

            <div className='hidden md:inline-flex md:flex-row'>
              {handleLocaleChange()}
              {handleThemeChange()}
            </div>
            <LoginButton className='p-2 rounded-md hover:bg-indigo-400 hover:text-white' />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
