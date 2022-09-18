import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts'

const AudienceDynamic = () => {
  const [aa, setAa] = useState(true)
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
    setAa(false)
  }, [])

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
  }, [])

  if (aa) return null

  return (
    <div className='bg-white'>
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey='name' />
        <Tooltip></Tooltip>
        <CartesianGrid stroke='purple' />
        <Line
          type='monotone'
          dataKey='uv'
          yAxisId={0}
          fill='red'
          stroke='green'
        />
        <Line
          type='monotone'
          dataKey='pv'
          yAxisId={1}
          fill='red'
          stroke='green'
        />
      </LineChart>
    </div>
  )
}
export default AudienceDynamic
