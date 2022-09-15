import { BACKEND_URL } from '../../data/constants'

const ResetPassword = () => {
  let successMessage = ''
  const validateForm = () => {
    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return
    const newPassword = ''
    const token = ''
    try {
      const backendUrl = BACKEND_URL.concat(
        `/auth/reset-password?token=${token}`
      )
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ newPassword })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.log('error is ', JSON.stringify(error))
    }
  }

  return (
    <div className='container bg-white mx-auto'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-lg font-semibold'>Reset Password</h2>
        {successMessage ? (
          successMessage
        ) : (
          <div>
            <label
              htmlFor='newPassword'
              className='text-left text-sm'></label>
            <input
              className='invalid:border-red-500 block outline outline-offset-2 outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1 text-left'
              id='newPassword'
              name='newPassword'
              type='password'
              required
            />
            <button type='submit'>Submit</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ResetPassword
