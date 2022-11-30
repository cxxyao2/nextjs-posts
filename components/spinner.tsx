import { useNotificationContext } from '../contexts/notification-context'

const Spinner = () => {
  const { isLoading } = useNotificationContext()

  if (!isLoading) return null

  return (
    <>
      <div className='fixed inset-0 grid place-items-center'>
        <div className='inline-block h-20 w-20 items-center p-2'>
          <div
            className='block w-16 h-16  rounded-full border-4 border-indigo-600 animate-spin z-5000 m-2'
            style={{
              borderColor:
                'rgb(129 140 248) transparent rgb(129 140 248) transparent'
            }}></div>
        </div>
      </div>
    </>
  )
}

export default Spinner
