import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className='container m-auto px-8 overflow-auto'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
