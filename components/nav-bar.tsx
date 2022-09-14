import Link from 'next/link'
import { useRouter } from 'next/router'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SvgComponent from './svgtest'

const NavBar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
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
        className='px-2 rounded-md hover:shadow-md hover:shadow-indigo-400 font-mono'
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
        <SunIcon
          className='w-6 h-6  dark:text-gray-200 text-gray-600'
          onClick={() => setTheme('light')}></SunIcon>
      )
    }

    return (
      <MoonIcon
        className='w-6 h-6 rounded-md text-gray-600 hover:shadow hover:shadow-indigo-400'
        onClick={() => {
          console.log('click light')
          setTheme('dark')
        }}></MoonIcon>
    )
  }

  const ancoreStyle = (link: string): string => {
    return 'p-2 rounded-md hover:bg-indigo-400 hover:text-white'.concat(
      currentRoute === link ? ' text-white bg-indigo-500' : ''
    )
  }

  return (
    <div>
      <nav className='w-full fixed top-0 z-20 h-14 px-4 t text-sm dark:bg-black bg-white flex  flex-row justify-between items-center mb-3 shadow-sm shadow-neutral-300'>
        <div>
          <Link href='/'>
            <a>
              <SvgComponent
                fill='rgb(234 88 12)'
                className='w-12 h-12 rounded-md hover:shadow-md hover:shadow-gray-300'></SvgComponent>
            </a>
          </Link>
        </div>

        <div className='flex  justify-between items-center space-x-4'>
          <Link href='/about'>
            <a className={ancoreStyle('/about')}>About</a>
          </Link>

          <Link href='/store'>
            <a className={ancoreStyle('/store')}>Store</a>
          </Link>
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
          <div className='hidden md:flex md:flex-row'>
            {handleLocaleChange()}
            {handleThemeChange()}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
