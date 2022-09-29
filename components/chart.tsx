import SalesLineChart from './line-chart'
import SalesLineChartDynamic from './line-chart-dynamic'
import DashBoardColumnGraph from './bar-graph'
import DashBoardPieChart from './pie-chart'
import DashBoardDataTable from './table-sample'

const Chart = () => {
  return (
    <div className='grid grid-cols-12  gap-6'>
      {/* <SalesLineChart rank={1}></SalesLineChart>
      <SalesLineChart rank={2}></SalesLineChart>
      <SalesLineChart rank={3}></SalesLineChart>*/}
      <SalesLineChartDynamic></SalesLineChartDynamic>
      <DashBoardColumnGraph />
      <DashBoardPieChart />
      <DashBoardDataTable />
    </div>
  )
}

export default Chart
