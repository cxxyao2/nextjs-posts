import { NextPage } from 'next'
import StoreItem from '../components/store-item'
import storeItems from '../data/items.json'

const Store: NextPage = () => {
  return (
    <div className='flex flex-row flex-wrap  justify-between items-center gap-6'>
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
