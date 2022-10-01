import React, { useEffect, useState } from 'react'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop
    console.log('scrooled', scrolled)
    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  })

  if (!visible) return null

  return (
    <button
      className='fixed right-8 top-[90%] p-1 bg-white border border-gray-300 duration-200 transition-all'
      onClick={scrollToTop}>
      <ChevronDoubleUpIcon className='w-4 h-4 text-indigo-400' />
    </button>
  )
}

export default ScrollButton
