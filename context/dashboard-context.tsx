import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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
}

const DashBoardContext = createContext({} as DashBoardContextType)

export function useDashBoardContext() {
  return useContext(DashBoardContext)
}

export function DashBoardContextProvider({ children }: DashBoardProviderProps) {
  const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([])
  const [isDescend, setIsDescend] = useState(true)

  return (
    <DashBoardContext.Provider
      value={{ orderDetails, setOrderDetails, isDescend, setIsDescend }}>
      {children}
    </DashBoardContext.Provider>
  )
}

export default DashBoardContext
