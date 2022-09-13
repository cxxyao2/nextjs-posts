import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { store } from '../store'
import { Provider } from 'react-redux'

import Header from '../components/header'
import { ShoppingCardProvider } from '../context/ShoppingCartContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ShoppingCardProvider>
        <>
          <Header />
          <main className='container mx-auto pt-14 px-4 overflow-auto'>
            <Component {...pageProps} />
          </main>
        </>
      </ShoppingCardProvider>
    </Provider>
  )
}

export default MyApp
