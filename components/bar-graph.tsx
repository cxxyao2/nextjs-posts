import { useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const dataTemplate = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

export default function DashBoardColumnGraph() {
  const [data, setData] = useState(dataTemplate)

  return (
    <div
      className='col-span-full sm:col-span-6 bg-white shadow-lg
    rounded-sm border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Direct vs Indirect</h2>
      </header>
      <div className='px-5 py-3'>
        <ul className='flex flex-wrap'>
          <li className='mr-4'>
            <button className='inline-flex items-center'>
              <span className='block w-3 h-3 rounded-full mr-2 border-2 border-blue-200  pointer-events-none'></span>
              <span className='text-xl font-bold mr-2 pointer-events-none dark:text-gray-700'>
                $8.25k
              </span>
              <span className='text-slate-400 text-sm '>Direct</span>
            </button>
          </li>
          <li className='mr-4'>
            <button className='inline-flex items-center'>
              <span className='block w-3 h-3 rounded-full mr-2 border-2 border-blue-200  pointer-events-none'></span>
              <span className='text-xl font-bold mr-2 pointer-events-none dark:text-gray-700'>
                $27.25k
              </span>
              <span className='text-slate-400 text-sm '>Indirect</span>
            </button>
          </li>
        </ul>

        <BarChart
          data={data}
          height={300}
          width={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey='pv'
            fill='#8884d8'
          />
          <Bar
            dataKey='uv'
            fill='#82ca9d'
          />
        </BarChart>
      </div>
    </div>
  )
}
