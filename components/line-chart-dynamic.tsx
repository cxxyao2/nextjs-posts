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

const SalesLineChartDynamic = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const [data, setData] = useState([
    { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
    { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
    { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
    { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
    { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
    { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
    { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] }
  ])

  useEffect(() => {
    const interval1 = setInterval(() => {
      // randome page, uv, pv ,
      const nameIndex = Math.ceil(Math.random() * 5)
      const randomName = 'Page '.concat(
        ['A', 'B', 'C', 'D', 'J', 'H'].slice(nameIndex, nameIndex + 1)[0]
      )
      const pv = Math.ceil(Math.random() * 4800)
      const uv = Math.ceil(Math.random() * 189)
      const oldData = data.filter((item) => item.name !== randomName)
      oldData.push({ name: randomName, pv, uv, amt: 2000, uvError: 28 })
      setData(() => oldData)
    }, 3000)

    return () => {
      clearInterval(interval1)
    }
  })

  return (
    <div className='bg-white flex flex-col col-span-full sm:col-span-6 xl:col-span-4 shadow-md rounded-sm border border-slate-200'>
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
                className='absolute origin-top-right z-10 top-full right-0 min-w-36 bg-white border border-slate-200 py-1.5 rounded shadow-md overflow-hidden mt-1'
                onClick={() => setIsMenuVisible((prev) => !prev)}>
                <ul>
                  <li>
                    <a
                      href='#'
                      className='font-medium text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-800 flex py-1 px-3'>
                      Data
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='font-medium text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-800 flex py-1 px-3'>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='font-medium text-sm text-slate-600 hover:bg-slate-200 hover:text-slate-800 flex py-1 px-3'>
                      Remove
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>
          Jennifer Laurent
        </h2>
        <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
          Sales
        </div>
        <div className='flex items-start'>
          <div className='text-3xl font-bold text-slate-800 mb-2'>$24,780</div>

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
              dataKey='uv'
              yAxisId={0}
            />
            <Line
              type='monotone'
              dataKey='pv'
              yAxisId={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default SalesLineChartDynamic
