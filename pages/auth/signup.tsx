import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useNotificationContext } from '../../contexts/notification-context'
import Notification from '../../components/notification'
import { ExtendedUser } from '../../models/extended-user'

const SignUpForm = () => {
  const defaultFormData = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(defaultFormData)
  const [hidePassword, setHidePassword] = useState(true)
  const router = useRouter()
  const { showNotification, notification } = useNotificationContext()
  const { data: session } = useSession()

  useEffect(() => {
    if (session && session.user) {
      const customToken = (session.user as unknown as ExtendedUser)
        .tokenFromServer
      if (customToken) localStorage.setItem('tokenFromServer', customToken)
    }
  }, [session])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = formData.email
    const password = formData.password

    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
        'users'
      )
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ name: email, email, password }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      }).then((result) => {
        if (result?.ok) {
          router.push('/') //
        } else {
          showNotification({
            id: '',
            message: `${result?.status.toString()}`,
            status: 'error'
          })
        }
      })
    } catch (error) {
      const newError = error as unknown as Error

      showNotification({
        id: '',
        message: newError.message,
        status: 'error'
      })
    }
  }

  return (
    <section className='m-auto my-12 max-w-md rounded-md bg-white dark:text-gray-700  shadow-gray-200 shadow-md p-4'>
      {notification && <Notification {...notification} />}
      <h1 className='text-center text-2xl mb-6'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4 justify-center items-begin'>
          <label
            htmlFor='email'
            className='font-semibold'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='abc@email.com'
            className='invalid:border-red-500  hover:outline hover:outline-offset-2 hover:outline-indigo-500 focus:outline focus:outline-offset-2 focus:outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1'
            onChange={handleChange}
            required
          />

          <label className='font-semibold'>Password</label>
          <div className='relative bg-gray-100 hover:outline hover:outline-offset-2 hover:outline-indigo-500 focus:outline focus:outline-offset-2 focus:outline-indigo-500 rounded-md w-full'>
            <input
              id='password'
              name='password'
              type={hidePassword ? 'password' : 'text'}
              autoCapitalize='off'
              autoComplete='off'
              autoCorrect='off'
              minLength={8}
              maxLength={100}
              required
              className='invalid:border-red-500 p-1 min-w-[200px] bg-gray-100 outline-none rounded-tl-md rounded-bl-md'
              onChange={handleChange}
            />
            <button
              className='absolute  right-1 top-1 p-1 pb-0 rounded-md text-sm text-right outline-none bg-white'
              onClick={() => setHidePassword((prevState) => !prevState)}>
              {hidePassword ? 'Show' : 'Hide'}
            </button>
          </div>

          <button
            type='submit'
            className='cursor-pointer px-2 py-1 rounded-md text-white bg-indigo-600 outline-none focus:outline  focus:outline-indigo-200 '>
            Sign Up
          </button>
          <p className='text-sm'>
            Already have an account?
            <Link href='/auth/signin'>
              <a className='ml-2  text-indigo-600'>SIGN IN</a>
            </Link>
          </p>
          <p className='text-sm'>
            Forget your password?
            <Link href='/auth/forget-password'>
              <a className='ml-2  text-indigo-600'>RESET PASSWORD</a>
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default SignUpForm
