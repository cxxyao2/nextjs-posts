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

const DashBoard = ({}) => {
  const { customers, products, setCustomers, setProducts } = useShoppingCart()
  const { showNotification, notification } = useNotificationContext()

  const { setOrderDetails, setIsDescend } = useDashBoardContext()

  const [datePeriod, setDatePeriod] = useState({
    start: new Date(new Date().getFullYear(), 0, 1),
    end: new Date()
  })

  useEffect(() => {
    getSalesDataByRange(datePeriod.start, datePeriod.end).then()
  }, [datePeriod])

  const getSalesDataByRange = async (startDate: Date, endDate: Date) => {
    try {
      let data = await getOrderOfRange(startDate, endDate)
      setOrderDetails(data as Array<IOrderDetail>)

      if (customers.length === 0) {
        data = await downloadCustomerList()
        setCustomers(data.customers)
      }
      if (products.length === 0) {
        data = await downloadProductList()
        setProducts(data.products)
      }
    } catch (error) {
      const castError = error as unknown as Error
      showNotification({
        id: '',
        message: castError.message,
        status: 'error'
      })
      return
    }
  }

  const handleRefresh = async (
    startDate: Date,
    endDate: Date,
    ascending: boolean
  ) => {
    setIsDescend(ascending)
    setDatePeriod({ start: startDate, end: endDate })
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
