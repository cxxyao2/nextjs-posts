import Chart from '../components/chart'
import LatestNews from '../components/latest-news'
import Meta from '../components/meta'

const DashBoard = () => {
  return (
    <>
      <Meta
        title='Dashboard'
        keywords='Metrics'
        description='Conversion, sales, profit, market share...'
      />
      <LatestNews />
      <Chart />
    </>
  )
}

export default DashBoard
