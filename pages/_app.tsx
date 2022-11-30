import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from 'next-themes'

import NavBar from '../components/nav-bar'
import { ShoppingCardProvider } from '../context/shoppingcart-context'
import Footer from './footer'
import SideBar from '../components/sidebar'
import { NotificationContextProvider } from '../context/notification-context'
import ErrorBoundary from '../components/error-boundary'
import { DashBoardContextProvider } from '../context/dashboard-context'
import Spinner from '../components/spinner'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <NotificationContextProvider>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <ShoppingCardProvider>
              <DashBoardContextProvider>
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
                    <Spinner />
                  </div>
                </div>
              </DashBoardContextProvider>
            </ShoppingCardProvider>
          </ThemeProvider>
        </SessionProvider>
      </NotificationContextProvider>
    </ErrorBoundary>
  )
}

export default MyApp
