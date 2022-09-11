import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import { ShoppingCardProvider } from '../context/ShoppingCartContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCardProvider>
      <>
        <Header />
        <main className='container  mx-auto px-4 overflow-auto'>
          <Component {...pageProps} />
        </main>
      </>
    </ShoppingCardProvider>
  )
}

export default MyApp
