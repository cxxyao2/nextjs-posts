import Link from 'next/link'
import GasFillingSVG from './gas-filling-svg'
import SvgComponent from './svgtest'

const SideBar = () => {
  return (
    <>
      <div>
        <Link href='/'>
          <a className=''>Home</a>
        </Link>
      </div>
    </>
  )
}

export default SideBar
