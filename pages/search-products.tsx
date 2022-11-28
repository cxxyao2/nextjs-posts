import { useEffect, useState } from 'react'
import SearchItem from '../components/search-item'
import IProduct from './../models/product'
type Props = React.PropsWithChildren<{
  products: IProduct[]
  keyword: string
}>

const SearchProducts = ({ products, keyword }: Props) => {
  const [data, setData] = useState<IProduct[]>([])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    )
    setData(filtered)

    return () => {
      setData([])
    }
  }, [products, keyword])

  if (data.length === 0)
    return (
      <div className='text-center p-2 col-span-full rounded-md shadow shadow-gray-400'>
        No product found.
      </div>
    )

  return (
    <>
      {data.map((pro) => (
        <SearchItem
          key={pro.id}
          item={pro}
        />
      ))}
    </>
  )
}

export default SearchProducts
