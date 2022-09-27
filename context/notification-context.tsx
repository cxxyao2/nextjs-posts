import {
  createContext,
  ReactNode,
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
}

const NotificationContext = createContext({} as NotificationContextType)

export function useNotificationContext() {
  return useContext(NotificationContext)
}

export function NotificationContextProvider({
  children
}: NotificationProviderProps) {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

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
      value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
