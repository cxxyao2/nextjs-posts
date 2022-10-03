import Link from 'next/link'
import { useRouter } from 'next/router'
import { createRef, useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const ResetPassword = () => {
  const router = useRouter()
  const passwordRef = createRef<HTMLInputElement>()

  const [token, setToken] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  useEffect(() => {
    let position = router.asPath.search('token')
    if (position >= 0) {
      setToken(router.asPath.substring(position))
    }
  }, [router])

  const validateForm = () => {
    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return
    const newPassword = passwordRef.current?.value || ''
    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
        'auth/reset-password?',
        token
      )
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ newPassword }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      const data = await res.json()
      setSuccessMessage(() => data.message)
    } catch (error) {
      console.log('error is ', JSON.stringify(error))
    }
  }

  return (
    <section className='m-auto  max-w-md rounded-md bg-white dark:text-gray-700  shadow-gray-200 shadow-xl p-4'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-lg text-center mb-6'>Reset Password</h2>
        {successMessage ? (
          <div className='rounded-lg p-1 text-center break-words outline outline-indigo-400'>
            <span>
              {successMessage}
              <ArrowRightIcon className='inline ml-2 text-indigo-400 w-6 h-6 ' />
            </span>
            <Link href='/auth/signin'>
              <a className='ml-2  text-indigo-400'>SIGN IN</a>
            </Link>
          </div>
        ) : (
          <div className='flex flex-col justify-start gap-4'>
            <label
              htmlFor='newPassword'
              className='text-left text-sm'>
              New Password
            </label>
            <input
              ref={passwordRef}
              className='border block outline outline-offset-2 outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1 text-left'
              id='newPassword'
              name='newPassword'
              type='password'
              minLength={8}
              maxLength={20}
              required
            />
            <button
              type='submit'
              className='rounded-md cursor-pointer text-white bg-indigo-600 outline outline-offset-2 outline-indigo-200 border-solid py-1'>
              Submit
            </button>
          </div>
        )}
      </form>
    </section>
  )
}

export default ResetPassword
