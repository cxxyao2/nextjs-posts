import { BACKEND_URL, TOKEN_HEADER_NAME } from '../data/constants'
import ICartItem from '../models/cart-item'
import { convertDateToYYYYmmDD } from '../utils'

export async function saveOrder(items: ICartItem[], customerId: string) {
  // save order header
  const authUrl = BACKEND_URL.concat('orderheaders')
  const token = localStorage.getItem('tokenFromServer') || ''

  const headers = {
    'Content-type': 'application/json',
    [TOKEN_HEADER_NAME]: token,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  const headerDate = convertDateToYYYYmmDD(new Date())

  const res = await fetch(authUrl, {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId,
      orderDate: headerDate
    }),
    headers
  })

  const orderHeader = await res.json()

  if (orderHeader) {
    console.log('orderheader is', orderHeader)
    items.map(async (item) => {
      const orderBody = {
        orderHeader: orderHeader._id,
        orderDate: orderHeader.orderDate,
        customerId: customerId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        amount: item.quantity * item.price
      }
      const orderUrl = BACKEND_URL + 'orders'

      await fetch(orderUrl, {
        method: 'POST',
        body: JSON.stringify(orderBody),
        headers
      })
    })
  }
}
