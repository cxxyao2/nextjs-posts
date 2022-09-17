// todo
import { NextPage } from 'next'
import { useEffect } from 'react'
import { BACKEND_URL } from '../data/constants'

const Cart: NextPage = () => {
  const getProducts = async () => {
    try {
      const backendUrl = BACKEND_URL.concat('products')
      const res = await fetch(backendUrl, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const products = await res.json()
      console.log('products', products)
    } catch (error) {
      console.log('error is', error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  return <div>Cart</div>
}

export default Cart
