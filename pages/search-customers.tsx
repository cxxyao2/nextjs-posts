import { useEffect, useState } from 'react'
import SearchClient from '../components/search-client'
import { Customer } from '../models/customer'
type Props = React.PropsWithChildren<{
  customers: Customer[]
  keyword: string
}>

const SearchCustomers = ({ customers, keyword }: Props) => {
  const [data, setData] = useState<Customer[]>([])

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(keyword)
    )
    setData(filtered)

    return () => {
      setData([])
    }
  }, [customers, keyword])

  if (data.length === 0)
    return (
      <div className='text-center p-2 col-span-full rounded-md shadow shadow-gray-400'>
        No client found.
      </div>
    )

  return (
    <>
      {data.map((customer) => (
        <SearchClient
          key={customer.id}
          client={customer}
        />
      ))}
    </>
  )
}

export default SearchCustomers
