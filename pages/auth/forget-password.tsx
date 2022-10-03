import React, { useState } from 'react'
import { validateEmail } from '../../utils'

interface ReturnData {
  data: Array<any>
  message: string
}

const ForgetPassword = () => {
  const defaultFormData = {
    email: ''
  }

  const [formData, setFormData] = useState(defaultFormData)
  const [successMessage, setSuccessMessage] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  }

  const validateForm = () => {
    return validateEmail(formData.email)
  }
  const sentResetPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    try {
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').concat(
        'auth/send-reset-email'
      )
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ email: formData.email }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      const result = await res.json()
      setSuccessMessage(() => {
        return result.message
      })
    } catch (error) {
      console.log('error is', error)
    }
  }

  return (
    <section className='m-auto  max-w-md rounded-md bg-white dark:text-gray-700  shadow-gray-200 shadow-xl p-4'>
      <form onSubmit={sentResetPasswordRequest}>
        <h2 className='text-lg text-center mb-6'>Forget Password</h2>
        {successMessage ? (
          <div className='rounded-lg p-1 text-center break-words outline outline-indigo-400'>
            {successMessage}
          </div>
        ) : (
          <div className='flex flex-col justify-start gap-4'>
            <label
              htmlFor='email'
              className='text-left'>
              Enter your email
            </label>
            <input
              id='email'
              name='email'
              className=' border   hover:outline hover:outline-offset-2 hover:outline-indigo-500 focus:outline focus:outline-offset-2 focus:outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1'
              placeholder='abc@gmail.com'
              type='email'
              onChange={handleChange}
              required
            />
            <button
              type='submit'
              className='cursor-pointer text-white bg-indigo-600 outline outline-offset-2 outline-indigo-200 border-solid'>
              Submit
            </button>
          </div>
        )}
      </form>
    </section>
  )
}
export default ForgetPassword
