import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'

import NavBar from '../components/nav-bar'
import { ShoppingCardProvider } from '../context/shoppingcart-context'
import Footer from './footer'
import SideBar from '../components/sidebar'
import { NotificationContextProvider } from '../context/notification-context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <SessionProvider>
        <ThemeProvider attribute='class'>
          <ShoppingCardProvider>
            <div className='flex h-screen  relative overflow-hidden'>
              <SideBar />
              <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
                <NavBar />
                <main>
                  <div className='px-2 md:px-4 lg:px-8 py-8 w-full mx-auto max-w-9xl'>
                    <Component {...pageProps} />
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          </ShoppingCardProvider>
        </ThemeProvider>
      </SessionProvider>
    </NotificationContextProvider>
  )
}

export default appWithTranslation(MyApp)
