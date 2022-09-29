import { BACKEND_URL } from '../data/constants'
import { Customer } from '../models/customer'
import IProduct from '../models/product'

export const downloadProductList = async () => {
  let products: IProduct[] = []
  let errorMessage = ''

  try {
    const response = await fetch(`${BACKEND_URL}products`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await response.json()
    products = data.map((item: any) => ({
      ...item,
      id: item._id,
      imageUrl: '/' + item.imageUrl + '.jpg'
    }))
  } catch (error) {
    errorMessage = 'error details: ' + JSON.stringify(error)
  }

  return {
    products,
    errorMessage
  }
}

export const downloadCustomerList = async () => {
  let customers: Customer[] = []
  let errorMessage = ''

  try {
    const response = await fetch(`${BACKEND_URL}customers`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await response.json()
    customers = data.map((item: any) => ({
      ...item,
      id: item._id
    }))
  } catch (error) {
    console.log('error message is' + JSON.stringify(error))
  }

  return {
    customers,
    errorMessage
  }
}
