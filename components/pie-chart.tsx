import { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import { useDashBoardContext } from '../context/dashboard-context'

type PieDataType = {
  name: string
  value: number
}
export default function DashBoardPieChart() {
  const [pieData, setPieData] = useState<PieDataType[]>([
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }
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

    const chartData: PieDataType[] = []
    orderDetails.length >= 1 &&
      products.length >= 1 &&
      products.forEach((product) => {
        const filterResult = orderDetails.filter(
          (order) => order.productId === product.id
        )

        const total = filterResult.reduce((previousValue, current) => {
          return previousValue + current.amount
        }, 0)

        chartData.push({ name: product.name, value: total })
      })
    if (isDescend) chartData.sort((a, b) => b.value - a.value)
    if (!isDescend) chartData.sort((a, b) => a.value - b.value)

    setPieData(chartData.filter((item) => item.value > 0).slice(0, 3))
  }, [orderDetails, isDescend])

  if (orderDetails.length === 0)
    return (
      <div className='col-span-full truncate text-ellipsis rounded-md font-semibold text-indigo-800'>
        No data.Please click refresh button to load data...{' '}
      </div>
    )

  return (
    <div className='flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-md border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-400'>
        <h2 className='font-semibold text-slate-800 text-left'>
          High Profit Margin
        </h2>
      </header>
      <div className='p-2 flex flex-col items-start justify-start md:flex-row md:items-center md:justify-center gap-6 text-gray-800 '>
        {pieData.length >= 1 && (
          <div>
            <span className='text-sm font-gray-600'> {pieData[0].name}</span>{' '}
            <span className='font-semibold'>${pieData[0].value} </span>
          </div>
        )}
        {pieData.length >= 2 && (
          <div>
            <span className='text-sm font-gray-600'> {pieData[1].name}</span>{' '}
            <span className='font-semibold'>${pieData[1].value} </span>
          </div>
        )}
        {pieData.length >= 3 && (
          <div>
            <span className='text-sm font-gray-600'> {pieData[2].name}</span>{' '}
            <span className='font-semibold'>${pieData[2].value} </span>
          </div>
        )}
      </div>
      <div className=' flex flex-col justify-center'>
        <PieChart
          width={300}
          height={300}>
          <Pie
            dataKey='value'
            startAngle={180}
            endAngle={0}
            data={pieData}
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label
          />
        </PieChart>
      </div>
    </div>
  )
}
