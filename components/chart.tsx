import Audience from './line-chart'
import AudienceDynamic from './line-chart-dynamic'
import DashBoardColumnGraph from './bar-graph'
import DashBoardPieChart from './pie-chart'
import DashBoardDataTable from './table-sample'

const Chart = () => {
  return (
    <div className='grid grid-cols-12  gap-6'>
      <Audience></Audience>
      <Audience></Audience> <Audience></Audience>
      <AudienceDynamic></AudienceDynamic>
      <AudienceDynamic></AudienceDynamic>
      <DashBoardColumnGraph />
      <DashBoardPieChart />
      <DashBoardDataTable />
    </div>
  )
}

export default Chart
