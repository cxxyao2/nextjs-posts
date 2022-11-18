import { TOKEN_HEADER_NAME } from '../data/constants'
import { convertDateToYYYYmmDD } from '../utils'
import { convertError } from '../utils/convert-error'

export async function getMonthlySalesperson(year: number, month: number) {
  const authUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
    `reports/monthly-salesperson?year=${year}&&month=${month}`
  )
  const token = localStorage.getItem('tokenFromServer') || ''
  const headers = {
    'Content-type': 'application/json',
    [TOKEN_HEADER_NAME]: token,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  const res = await fetch(authUrl, {
    method: 'GET',
    headers
  })

  const data = await res.json()
  return data
}

export async function getMonthlyCustomer(year: number, month: number) {
  const authUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
    `reports/monthly-customer?year=${year}&&month=${month}`
  )
  const token = localStorage.getItem('tokenFromServer') || ''
  const headers = {
    'Content-type': 'application/json',
    [TOKEN_HEADER_NAME]: token
  }

  const res = await fetch(authUrl, {
    method: 'GET',
    headers
  })

  const data = await res.json()
  return data
}

export async function getMonthlyProduct(year: number, month: number) {
  // save order header
  const authUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
    `reports/monthly-product?year=${year}&&month=${month}`
  )
  const token = localStorage.getItem('tokenFromServer') || ''
  const headers = {
    'Content-type': 'application/json',
    [TOKEN_HEADER_NAME]: token,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  const res = await fetch(authUrl, {
    method: 'GET',
    headers
  })

  const data = await res.json()
  return data
}

export async function getOrderOfRange(startDate: Date, endDate: Date) {
  let backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat('orders')
  const startDateString = convertDateToYYYYmmDD(startDate)
  const endDateString = convertDateToYYYYmmDD(endDate)
  backendUrl = backendUrl.concat(
    `?startdate=${startDateString}&&enddate=${endDateString}`
  )
  const token = localStorage.getItem('tokenFromServer') || ''
  const headers = {
    'Content-type': 'application/json',
    [TOKEN_HEADER_NAME]: token,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  try {
    const res = await fetch(backendUrl, {
      method: 'get',
      headers
    })
    const data = await res.json()
    return {
      data,
      message: 'ok'
    }
  } catch (error) {
    console.error(error)
    return {
      data: [],
      message:
        'Error when fetching data. Please try later or contact support team.'
    }
  }
}
