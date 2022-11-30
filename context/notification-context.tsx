import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

type NotificationProviderProps = {
  children: ReactNode
}

/**
 * status: true, error message; false, normal information
 */
export type NotificationType = {
  id?: string
  message?: string
  status: 'error' | 'success' | 'info'
}

type NotificationContextType = {
  notification: NotificationType | null
  showNotification: (val: NotificationType) => void
  hideNotification: () => void
  isLoading:boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const NotificationContext = createContext({} as NotificationContextType)

export function useNotificationContext() {
  return useContext(NotificationContext)
}

export function NotificationContextProvider({
  children
}: NotificationProviderProps) {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification])

  function showNotification(newNotification: NotificationType) {
    setNotification(newNotification)
  }

  function hideNotification() {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification, isLoading, setIsLoading }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
