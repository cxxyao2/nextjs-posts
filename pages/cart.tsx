// todo
import { NextPage } from 'next'
import { useEffect } from 'react'
import CartItem from '../components/cart-item'
import { BACKEND_URL } from '../data/constants'
import { ICartItem } from '../models/cart-item'

const Cart: NextPage = () => {
  const items: Array<ICartItem> = [
    {
      image: '/images/products/gas1.jpg',
      title: 'gas1',
      price: 12,
      quantity: 12
    },
    {
      image: '/images/products/gas2.jpg',
      title: 'gas2',
      price: 13,
      quantity: 13
    }
  ]
  // const getProducts = async () => {
  //   try {
  //     const backendUrl = BACKEND_URL.concat('products')
  //     const res = await fetch(backendUrl, {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     })
  //     const products = await res.json()
  //     console.log('products', products)
  //   } catch (error) {
  //     console.log('error is', error)
  //   }
  // }
  // useEffect(() => {
  //   getProducts()
  // }, [])

  return (
    <div>
      {items.map((item) => (
        <CartItem
          item={item}
          key={item.title}></CartItem>
      ))}
    </div>
  )
}

export default Cart
