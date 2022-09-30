import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { IOrderDetail } from '../models/order-detail'

type DashBoardProviderProps = {
  children: ReactNode
}

type DashBoardContextType = {
  orderDetails: IOrderDetail[]
  setOrderDetails: Dispatch<SetStateAction<IOrderDetail[]>>
  isDescend: boolean
  setIsDescend: Dispatch<SetStateAction<boolean>>
  salespersons: SalespersonData[]
}

type SalespersonData = {
  name: string
  amount: number
}

const DashBoardContext = createContext({} as DashBoardContextType)

export function useDashBoardContext() {
  return useContext(DashBoardContext)
}

export function DashBoardContextProvider({ children }: DashBoardProviderProps) {
  const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([])
  const [isDescend, setIsDescend] = useState(true)
  const [salespersons, setSalespersons] = useState<SalespersonData[]>([])
  useEffect(() => {
    const names: string[] = []
    orderDetails.forEach((order) => {
      if (!names.includes(order.salespersonName)) {
        names.push(order.salespersonName)
      }
    })
    const data: SalespersonData[] = []
    names.forEach((name) => {
      const filtered = orderDetails.filter(
        (order) => order.salespersonName === name
      )
      const amount = filtered.reduce((prev, current) => {
        return prev + current.amount
      }, 0)
      data.push({ name, amount })
    })
    data
      .filter((item) => item.amount > 0)
      .sort((a, b) => (a.amount > b.amount ? -1 : 1))
    setSalespersons(data)
  }, [orderDetails])

  return (
    <DashBoardContext.Provider
      value={{
        orderDetails,
        setOrderDetails,
        isDescend,
        setIsDescend,
        salespersons
      }}>
      {children}
    </DashBoardContext.Provider>
  )
}

export default DashBoardContext
