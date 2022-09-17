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
            <div className='w-full h-screen  relative overflow-hidden'>
              <NavBar />
              <SideBar />
              <main className='container h-full mt-16 mx-auto '>
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>
          </ShoppingCardProvider>
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)
