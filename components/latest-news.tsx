import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
const LatestNews = () => {
  const [userName, setUserName] = useState('')
  const [timeSection, setTimeSection] = useState('Morning')
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      let currentName = session?.user?.name
      if (currentName) {
        let index = currentName.indexOf('@')
        if (index >= 0) currentName = currentName.slice(0, index)
        currentName =
          currentName.slice(0, 1).toUpperCase() +
          currentName.slice(1).toLowerCase()
        setUserName(currentName)
      }
    }

    let hour = new Date().getHours()
    let suffix = hour >= 12 ? 'Afternoon' : 'Morning'
    setTimeSection(suffix)
  }, [session])

  return (
    <div className='relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8'>
      <h1 className='text-2xl md:text-3xl text-slate-800 font-bold mb-1'>
        Good {timeSection},{userName} 👍
      </h1>
      <p className='dark: text-gray-900'>
        Golden Lion series of gasoline have a successful rollout. We are waiting
        for a official launch soon.
      </p>
    </div>
  )
}

export default LatestNews
