import { NextPage } from 'next'
import StoreItem from '../components/store-item'
import storeItems from '../data/items.json'
import { useShoppingCart } from '../context/ShoppingCartContext'

const Store: NextPage = () => {
  const { products } = useShoppingCart()

  return (
    <>
      <div>todo - pagination</div>
      <div className='grid grid-cols-12 gap-6'>
        {products.map((item) => (
          <StoreItem
            {...item}
            key={item.id}
          />
        ))}
      </div>
      <div>todo - pagination</div>
    </>
  )
}

export default Store
