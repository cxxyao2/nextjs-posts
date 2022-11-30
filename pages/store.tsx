import StoreItem from '../components/store-item'
import { useState, useEffect } from 'react'
import Paginator from '../components/paginator'
import Meta from '../components/meta'
import IProduct from '../models/product'
import { downloadProductList } from '../serivces/master-service'
import { useShoppingCart } from '../contexts/shoppingcart-context'
import { useNotificationContext } from '../contexts/notification-context'
import Notification from '../components/notification'
import { GetStaticProps } from 'next'

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
        description='buy products here'></Meta>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await downloadProductList()

  if (!data || data.products.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products: data.products,
      errorFromServer: data.errorMessage
    },
    revalidate: 10
  }
}
