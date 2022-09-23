import { NextPage } from 'next'
import StoreItem from '../components/store-item'
import storeItems from '../data/items.json'

const Store: NextPage = () => {
  return (
    <>
      <div>todo - pagination</div>
      <div className='grid grid-cols-12 gap-6'>
        {storeItems.map((item) => (
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
