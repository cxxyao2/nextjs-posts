import { useContext } from 'react'
import NotificationContext, {
  NotificationType
} from '../contexts/notification-context'

const Notification = (props: NotificationType) => {
  const notificationCtx = useContext(NotificationContext)

  return (
    <div className='fixed  top-14 left-0 right-0 z-70 w-[99%] lg:right-12 lg:ml-auto lg:w-[70%] p-2 rounded-md text-white'>
      <ul
        className={`flex ${
          props.status === 'error' ? 'bg-red-600 ' : ' bg-green-600 '
        }   items-center justify-around gap-6 border`}>
        <li>{props.id} </li>
        <li className='text-clip overflow-hidden'>{props.message}</li>
        <li className='text-right text-lg'>
          <button
            aria-label='close'
            onClick={notificationCtx.hideNotification}>
            <span className='mx-4'>X</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Notification
