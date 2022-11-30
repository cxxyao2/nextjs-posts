import { FlagIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDashBoardContext } from '../contexts/dashboard-context'

type TableDataType = {
  product: string
  visitor: number
  orderQty: number
  sales: number
  conversion: number
}

const DashBoardDataTable = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([
    {
      product: 'Product A',
      visitor: 400,
      orderQty: 100,
      sales: 1000,
      conversion: 4
    }
  ])
  const { orderDetails, isDescend } = useDashBoardContext()

  useEffect(() => {
    const products: { id: string; name: string }[] = []
    orderDetails.forEach((order) => {
      const index = products.findIndex(
        (p) => p.id === order.productId && p.name === order.productName
      )
      if (index < 0) {
        products.push({ id: order.productId, name: order.productName })
      }
    })
    const chartData: TableDataType[] = []
    orderDetails.length >= 1 &&
      products.length >= 1 &&
      products.forEach((product) => {
        const filterResult = orderDetails.filter(
          (order) => order.productId === product.id
        )

        const total = filterResult.reduce((previousValue, current) => {
          return previousValue + current.amount
        }, 0)

        let conversion = Math.round(Math.random() * 100)
        if (conversion === 0) {
          conversion = 1
        }
        let visitor = Math.round((filterResult.length / conversion) * 100)

        chartData.push({
          product: product.name,
          visitor,
          orderQty: filterResult.length,
          sales: total,
          conversion
        })
      })
    if (isDescend) chartData.sort((a, b) => b.sales - a.sales)
    if (!isDescend) chartData.sort((a, b) => a.sales - b.sales)
    setTableData(chartData.filter((item) => item.sales > 0).slice(0, 5))
  }, [orderDetails, isDescend])

  if (orderDetails.length === 0)
    return (
      <div className='col-span-full truncate text-ellipsis rounded-md font-semibold text-indigo-800'>
        No data.Please click refresh button to load data...{' '}
      </div>
    )

  return (
    <div className='col-span-full xl:self-center xl:col-span-8 bg-white shadow-md rounded-sm border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Best Sellers</h2>
      </header>
      <div className='p-3'>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full dark:text-gray-700'>
            <thead className='text-xs uppercase text-slate-400 bg-slate-50 rounded-sm'>
              <tr>
                <th className='p-2'>
                  <div className='font-semibold text-left'>PRODUCTS</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>VISITORS</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>ORDERS</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>SALES</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>CONVENSION</div>
                </th>
                <th className='p-2'>COMMENTS</th>
              </tr>
            </thead>
            <tbody className='text-sm font-medium divide-y'>
              {tableData.map((detail, index) => (
                <tr key={index}>
                  <td className='p-2'>
                    <div className='flex items-center'>
                      {index === 0 && (
                        <FlagIcon className='shrink-0 w-6 h-6  mr-1 text-red-400' />
                      )}
                      {index === 1 && (
                        <FlagIcon className='shrink-0  w-6 h-6  mr-1 text-purple-400' />
                      )}
                      {index === 2 && (
                        <FlagIcon className='shrink-0  w-6 h-6  mr-1 text-green-400' />
                      )}
                      {index === 3 && (
                        <FlagIcon className=' shrink-0  w-6 h-6  mr-1 text-orange-400' />
                      )}
                      {index === 4 && (
                        <FlagIcon className='shrink-0  w-6 h-6  mr-1 text-gray-400' />
                      )}
                      <div className='text-slate-600 line-clamp-1'>
                        {detail.product}
                      </div>
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='text-center'>{detail.visitor}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-center'>{detail.orderQty}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-center'>{detail.sales}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-center'>{detail.conversion}%</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-center'>⭐⭐⭐⭐⭐</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashBoardDataTable
