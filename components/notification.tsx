import { useContext } from 'react'
import NotificationContext, {
  NotificationType
} from '../context/notification-context'

const Notification = (props: NotificationType) => {
  const notificationCtx = useContext(NotificationContext)

  return (
    <div
      className='absolute top-0 left-0 right-0 z-70 w-full'
      onClick={notificationCtx.hideNotification}>
      <ul
        className={`flex ${
          props.status ? 'bg-red-600 ' : ' bg-green-200 '
        } text-gray-900  dark:text-gray-900  items-center justify-center space-x-4 border`}>
        <li>id: {props.id} </li>
        <li> message: {props.message}</li>
      </ul>
    </div>
  )
}

export default Notification
