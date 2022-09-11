import { NextPage } from 'next'
import StoreItem from '../components/store-item'
import storeItems from '../data/items.json'

const Store: NextPage = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {storeItems.map((item) => (
        <StoreItem
          {...item}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default Store
