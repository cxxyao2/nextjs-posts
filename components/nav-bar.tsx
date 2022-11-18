import Link from 'next/link'
import { useRouter } from 'next/router'
import { useShoppingCart } from '../context/shoppingcart-context'
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
import { signOut, useSession } from 'next-auth/react'

const NavBar = () => {
  const { data: session } = useSession()
  const { openCart, cartQuantity, setIsVisibleSideBar } = useShoppingCart()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentRoute = router.pathname

  useEffect(() => {
    setMounted(true)
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
          setTheme('dark')
        }}>
        <MoonIcon className='w-6 h-6 self-center rounded-full text-indigo-500 hover:shadow'></MoonIcon>
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
      <div className='px-4 md:px-6 lg:px-8 shadow-sm shadow-indigo-400'>
        <nav className='h-14 md:h-16  -mb-px  text-sm  flex  flex-row justify-between items-center  '>
          <div>
            <Link href='/'>
              <a className='flex flex-row items-center' aria-label='Toggle sidebar'>
                <Bars3Icon
                  className='w-6 h-6 text-gray-500 lg:hidden'
                  onClick={() => {
                    setIsVisibleSideBar(true)
                  }}></Bars3Icon>
                <SvgNozzleComponent
                  fill='rgb(129 140 248)'
                  className='w-10 h-10 rounded-md'></SvgNozzleComponent>
                <span className='inline'>Gas</span>
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
            {session?.user?.name && (
              <a
                href='# '
                className='p-2 rounded-md hover:bg-indigo-400 hover:text-white active:text-white active:bg-indigo-500'
                onClick={() => {
                  localStorage.removeItem('tokenFromServer')
                  signOut()
                }}>
                SignOut
              </a>
            )}
            {!session?.user?.name && (
              <Link href='/auth/signin'>
                <a className={ancoreStyle('/auth/signin')} >Signin</a>
              </Link>
            )}

            <Link href='/search'>
              <a aria-label='Search Products'>
                <MagnifyingGlassIcon className='inline-flex w-8 h-8 text-indigo-400 rounded-md' />
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
              {false && handleLocaleChange()}
              {handleThemeChange()}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
