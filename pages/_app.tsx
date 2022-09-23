import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { store } from '../store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'

import NavBar from '../components/nav-bar'
import { ShoppingCardProvider } from '../context/ShoppingCartContext'
import Footer from '../components/footer'
import SideBar from '../components/sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class'>
        <Provider store={store}>
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
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
