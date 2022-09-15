import React, { useState } from 'react'
import { BACKEND_URL } from '../../data/constants'
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
      const backendUrl = BACKEND_URL.concat('/auth/send-reset-email')
      const res = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({ email: formData.email })
      })
      const result = res.json()
      // todo if ok. display message on form
      // hide form input box && button
    } catch (error) {}
  }
  return (
    <div className='max-w-prose bg-white'>
      <form onSubmit={sentResetPasswordRequest}>
        <h2 className='text-lg text-center'>Forget Password</h2>
        <div className='flex flex-col justify-start gap-4'>
          <label
            htmlFor='email'
            className='text-left text-sm'>
            Enter your email
          </label>
          <input
            id='email'
            name='email'
            className='invalid:border-red-500 block outline outline-offset-2 outline-indigo-500 bg-gray-100 text-gray-800 rounded-md w-full p-1 text-left'
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
      </form>
      Fortget Password
    </div>
  )
}
export default ForgetPassword
