import { useEffect, useState } from 'react'
import Chart from '../components/chart'
import DashBoardDatePicker from '../components/dashboard-datepicker'
import LatestNews from '../components/latest-news'
import Meta from '../components/meta'
import { IOrderDetail } from '../models/order-detail'
import { useDashBoardContext } from '../context/dashboard-context'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'
import { getOrderOfRange } from '../serivces/report-service'
import { useShoppingCart } from '../context/shoppingcart-context'
import {
  downloadCustomerList,
  downloadProductList
} from '../serivces/master-service'

const DashBoard = () => {
  const { customers, products, setCustomers, setProducts } = useShoppingCart()
  const { showNotification, notification } = useNotificationContext()

  const { setOrderDetails, setIsDescend } = useDashBoardContext()

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  )
  const [endDate, setEndDate] = useState(new Date())

  const getDashData = (startDate: Date, endDate: Date) => {
    try {
      getOrderOfRange(startDate, endDate)
        .then((data) => {
          setOrderDetails(data as Array<IOrderDetail>)
        })
        .catch((error) => {
          throw error
        })

      if (customers.length === 0) {
        downloadCustomerList()
          .then((data) => {
            setCustomers(data.customers)
          })
          .catch((error) => {
            throw error
          })
      }
      if (products.length === 0) {
        downloadProductList()
          .then((data) => {
            setProducts(data.products)
          })
          .catch((error) => {
            throw error
          })
      }
    } catch (error) {
      const castError = error as unknown as Error
      showNotification({
        id: '',
        message: castError.message,
        status: 'error'
      })
    }
  }

  useEffect(() => {
    getDashData(startDate, endDate)
  }, [])

  useEffect(() => {
    getDashData(startDate, endDate)
  }, [startDate, endDate])

  const handleRefresh = async (
    startDate: Date,
    endDate: Date,
    ascending: boolean
  ) => {
    setIsDescend(ascending)
    setStartDate(startDate)
    setEndDate(endDate)
  }

  return (
    <>
      <Meta
        title='Dashboard'
        keywords='Metrics'
        description='Conversion, sales, profit, market share...'
      />
      {notification && <Notification {...notification} />}
      <LatestNews />
      <DashBoardDatePicker onRefresh={handleRefresh} />
      <Chart />
    </>
  )
}

export default DashBoard
