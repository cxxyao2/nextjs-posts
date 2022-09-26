import { useContext } from 'react'
import NotificationContext, {
  NotificationType
} from '../context/notification-context'

const Notification = (props: NotificationType) => {
  const notificationCtx = useContext(NotificationContext)

  return (
    <div
      className='absolute top-0 left-0 right-0 z-70 w-full p-2 rounded-md text-white'
      onClick={notificationCtx.hideNotification}>
      <ul
        className={`flex ${
          props.status ? 'bg-red-600 ' : ' bg-green-600 '
        }   items-center justify-around gap-6 border`}>
        <li>{props.id} </li>
        <li>{props.message}</li>
        <li className='text-right text-lg'>X</li>
      </ul>
    </div>
  )
}

export default Notification
