import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts'

import { useDashBoardContext } from '../context/dashboard-context'
import { convertDateToYYYYmmDD } from '../utils'
import { formatCurrency } from '../utils/formatCurrency'
import { makeCSV, saveBlobtoLocalFile } from '../utils/file-convert'
import { useRouter } from 'next/router'

type SalesLineChartProp = {
  rank: number
}

type ChartRow = {
  name: string
  gas: number
  lubricate: number
  diesel: number
}

const SalesLineChart = ({ rank }: SalesLineChartProp) => {
  const [data, setData] = useState<ChartRow[]>([])
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const { orderDetails, isDescend, salespersons } = useDashBoardContext()
  const [salesName, setSalesName] = useState('')
  const [amount, setAmount] = useState(0)
  const router = useRouter()
  // const data = [
  //   { name: 'Jan', gas: 1000, lubricate: 2400, diesel: 2400 },
  //   { name: 'Feb', gas: 300, lubricate: 4567, diesel: 2400 },
  //   { name: 'Mar', gas: 280, lubricate: 1398, diesel: 2400 }
  // ]

  const downloadData = () => {
    const csvFileData = makeCSV(data)
    saveBlobtoLocalFile(csvFileData, salesName + '.csv', 'text/csv')
  }

  useEffect(() => {
    console.log('line-chart')
    const sales = [...salespersons]
    if (!sales || sales.length === 0 || sales.length < rank) return
    sales.sort((a, b) => b.amount - a.amount)

    const topThree = sales.slice(0, 3)
    if (!isDescend) {
      topThree.sort((a, b) => a.amount - b.amount)
    }

    let person = topThree[rank - 1]
    let currentName = person.name
    let index = currentName.indexOf('@')
    if (index >= 0) currentName = currentName.slice(0, index)
    currentName = currentName.slice(0, 1).toUpperCase() + currentName.slice(1)
    setSalesName(currentName)
    setAmount(person.amount)
    orderDetails.sort((a, b) => (a.orderDate > b.orderDate ? -1 : 1))
    if (orderDetails.length > 0) {
      // yyyy-mm-dd yyyy-09,yyyy-08,yyyy-07,
      let thirdMonth = new Date(orderDetails[0].orderDate)
      let secondMonth = new Date(
        new Date(orderDetails[0].orderDate).getFullYear(),
        thirdMonth.getMonth() - 1,
        1
      )
      let firstMonth = new Date(
        secondMonth.getFullYear(),
        secondMonth.getMonth() - 1,
        1
      )

      let thirdYearMonth = convertDateToYYYYmmDD(thirdMonth).slice(0, 7)
      let secondYearMonth = convertDateToYYYYmmDD(secondMonth).slice(0, 7)
      let firstYearMonth = convertDateToYYYYmmDD(firstMonth).slice(0, 7)
      const months: { monthName: string; monthInit: string }[] = []
      const formatter = new Intl.DateTimeFormat('en', { month: 'short' })

      months.push({
        monthName: formatter.format(firstMonth),
        monthInit: firstYearMonth
      })
      months.push({
        monthName: formatter.format(secondMonth),
        monthInit: secondYearMonth
      })
      months.push({
        monthName: formatter.format(thirdMonth),
        monthInit: thirdYearMonth
      })

      const filteredByPerson = orderDetails.filter(
        (order) => order.salespersonName === person.name
      )
      const temporyData: ChartRow[] = []
      months.forEach((item) => {
        let gas = 0
        let lubricate = 0
        let diesel = 0

        const currentMonthData = filteredByPerson.filter(
          (order) => order.orderDate.slice(0, 7) === item.monthInit
        )

        currentMonthData.forEach((cur) => {
          if (cur.productCategory === 'gas') {
            gas += cur.amount
          }
          if (cur.productCategory === 'lubricate') {
            lubricate += cur.amount
          }
          if (cur.productCategory === 'diesel') {
            diesel += cur.amount
          }
        })
        temporyData.push({
          name: item.monthName,
          gas,
          lubricate,
          diesel
        })
      })
      setData(temporyData)
    }
  }, [orderDetails, isDescend])

  if (!salesName || salesName.length === 0 || salesName.length < rank)
    return null

  if (orderDetails.length === 0)
    return (
      <div className='col-span-full truncate text-ellipsis rounded-md font-semibold text-indigo-800'>
        No data.Please click refresh button to load data...{' '}
      </div>
    )

  return (
    <div className='bg-white flex flex-col col-span-full md:col-span-6 xl:col-span-4 shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between items-start mb-2'>
          <PaperAirplaneIcon className='w-8 h-8 text-indigo-400 stroke-1 fill-indigo-300' />
          <div className='relative inline-flex'>
            <button
              className='text-slate-400 hover:text-slate-500 rounded-full bg-slate-100 '
              onClick={() => setIsMenuVisible((prev) => !prev)}>
              <span className='sr-only'>Menu</span>
              <EllipsisHorizontalIcon className='w-8 h-8 fill-current' />
            </button>

            {isMenuVisible && (
              <div
                className='absolute origin-top-right z-10 top-full right-0 min-w-36 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1'
                onClick={() => setIsMenuVisible((prev) => !prev)}>
                <ul>
                  <li>
                    <a
                      onClick={() => downloadData()}
                      href='#'
                      className='font-medium text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-800 flex py-1 px-3'>
                      Data
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        router.push(`/profile?person=${salesName}`)
                      }
                      href='#'
                      className='font-medium text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-800 flex py-1 px-3'>
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>
          {salesName}
        </h2>
        <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
          Sales
        </div>
        <div className='flex items-start'>
          <div className='text-3xl font-bold text-slate-800 mb-2'>
            {formatCurrency(amount)}
          </div>

          <div className='text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full'>
            +49%
          </div>
        </div>
        <ResponsiveContainer
          width='100%'
          height='60%'>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey='name' />
            <Tooltip></Tooltip>
            <CartesianGrid stroke='green' />
            <Line
              type='monotone'
              dataKey='gas'
              yAxisId={0}
              stroke='#fe4a49'
            />
            <Line
              type='monotone'
              dataKey='lubricate'
              yAxisId={1}
              stroke='#2ab7ca'
            />
            <Line
              type='monotone'
              dataKey='diesel'
              yAxisId={2}
              stroke='#1e2b3b'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesLineChart
