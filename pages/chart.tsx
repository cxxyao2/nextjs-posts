import Audience from './line-chart'
import AudienceDynamic from './line-chart-dynamic'

const Chart = () => {
  return (
    <div className='flex flex-row justify-around gap-6'>
      <Audience></Audience>
      <AudienceDynamic></AudienceDynamic>
    </div>
  )
}

export default Chart
