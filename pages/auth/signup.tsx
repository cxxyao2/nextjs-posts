import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BACKEND_URL } from '../../data/constants'
import Link from 'next/link'

const SignUpForm = () => {
  const defaultFormData = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(defaultFormData)
  const [hidePassword, setHidePassword] = useState(true)
  const { email, password } = formData
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const backendUrl = BACKEND_URL.concat('users')
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ name: email, email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/'
      })
    } catch (error) {
      console.log('error is ', JSON.stringify(error))
    }
  }

  return (
    <section className='mx-auto my-12 max-w-md rounded-md bg-white  shadow-gray-200 shadow-xl p-4 text-center'>
      <h1 className='text-center text-indigo-500'>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label
            htmlFor='email'
            className='block text-indiogo-400 font-bold mb-2'></label>
          <input
            id='email'
            type='email'
            placeholder='abc@email.com'
            className='block outline outline-offset-2 outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1 text-left'
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-2'>
          <label
            htmlFor='password'
            className='block text-indiogo-400 font-bold mb-2'></label>
          <div>
            <input
              id='password'
              type={hidePassword ? 'password' : 'text'}
              autoCapitalize='off'
              autoComplete='off'
              autoCorrect='off'
              minLength={8}
              maxLength={20}
              required
              className='outline outline-offset-2 outline-indigo-500 bg-gray-100 text-gray-800 rounded-md  p-1 text-left'
              onChange={handleChange}
            />
            <button
              className='px-2 py-1'
              onClick={() => setHidePassword((prevState) => !prevState)}>
              {' '}
              {hidePassword ? 'Show' : 'Hide'}{' '}
            </button>
          </div>
        </div>
        <div className='mt-6 flex flex-col items-center'>
          <button
            type='submit'
            className='cursor-pointer text-white bg-indigo-600 outline outline-offset-2 outline-indigo-200 border-solid'>
            SIGN UP
          </button>
          <p className='text-xs'>
            Already have an account?{' '}
            <Link href={'/auth/signin'}>
              <a className='inline text-indigo-500   cursor-pointer no-underline text-sm hover:shadow hover:shadow-indigo-300'>
                SIGN IN
              </a>
            </Link>
          </p>
          <p>
            Forget your password?
            <Link href={'/auth/forget-password'}>
              <a className='inline text-indigo-500   rounded-md cursor-pointer no-underline text-sm hover:shadow hover:shadow-indigo-300'>
                RESET PASSWORD
              </a>
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default SignUpForm
