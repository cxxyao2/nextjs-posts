import { NextPage } from 'next'
import StoreItem from '../components/store-item'
import { useShoppingCart } from '../context/shoppingcart-context'
import { useState } from 'react'
import Paginator from '../components/paginator'

const Store: NextPage = () => {
  const { products } = useShoppingCart()
  const [current, setCurrent] = useState(1)
  const [itemNumber, setItemNumber] = useState(5)
  const handlePageChanged = (
    currentPage: number,
    itemNumberPerPage: number
  ) => {
    setCurrent(currentPage)
    setItemNumber(itemNumberPerPage)
  }

  if (!products || products.length === 0) return <div>Loading...</div>

  return (
    <>
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
