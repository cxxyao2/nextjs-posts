import StoreItem from '../components/store-item'
import { useState, useEffect } from 'react'
import Paginator from '../components/paginator'
import Meta from '../components/meta'
import IProduct from '../models/product'
import { downloadProductList } from '../serivces/master-service'
import { useShoppingCart } from '../context/shoppingcart-context'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

type StorePageProp = {
  products: IProduct[]
  errorFromServer: string
}

const Store = ({ products, errorFromServer }: StorePageProp) => {
  const [current, setCurrent] = useState(1)
  const [itemNumber, setItemNumber] = useState(5)
  const { setProducts } = useShoppingCart()
  const { showNotification, notification } = useNotificationContext()

  useEffect(() => {
    setProducts(products)
    if (errorFromServer) {
      showNotification({
        id: 'Store',
        message: errorFromServer,
        status: 'error'
      })
    }
  }, [])

  const handlePageChanged = (
    currentPage: number,
    itemNumberPerPage: number
  ) => {
    setCurrent(currentPage)
    setItemNumber(itemNumberPerPage)
  }

  if (!products || products.length === 0)
    return (
      <>
        {notification && <Notification {...notification} />}
        <div>Loading...</div>
      </>
    )

  return (
    <>
      <Meta
        title='Product Store'
        keywords=''
        description='buy products here...'></Meta>
      {notification && <Notification {...notification} />}
      <Paginator
        className='mb-4'
        itemCount={products?.length}
        pageChanged={handlePageChanged}></Paginator>
      <div className='grid grid-cols-12 gap-6'>
        {products
          .slice((current - 1) * itemNumber, current * itemNumber)
          .map((item) => (
            <StoreItem
              {...item}
              key={item.id}
            />
          ))}
      </div>
    </>
  )
}

export default Store

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin?from=/store',
        permanent: false
      }
    }
  }
  const data = await downloadProductList()

  return {
    props: {
      products: data.products,
      errorFromServer: data.errorMessage
    }
  }
}
