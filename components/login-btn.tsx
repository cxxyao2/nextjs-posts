import { useSession, signIn, signOut } from 'next-auth/react'
import { Router, useRouter } from 'next/router'
type LoginButtonProps = {
  className: string
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    let currentName = session?.user?.name
    if (currentName) {
      let index = currentName.indexOf('@')
      if (index >= 0) currentName = currentName.slice(0, index)
      currentName =
        currentName.slice(0, 1).toUpperCase() +
        currentName.slice(1).toLowerCase()
    }
    return (
      <>
        <div className=' relative group p-2 rounded-md hover:text-indigo-600 hover:bg-white  flex flex-col justify-center'>
          <span>{currentName}</span>
          <div className=' hidden absolute rounded-md divide-y-2 divide-gray-200 shadow-sm shadow-gray-400 left-0 p-1 top-full whitespace-nowrap  text-xs group-hover:block bg-white text-gray-800 transition-all duration-300 ease-in-out'>
            <div className=' py-1 px-2  hover:bg-gray-200'>
              <a
                className='hover:text-indigo-600 active:text-indigo-600 '
                onClick={() => {
                  localStorage.removeItem('tokenFromServer')
                  signOut()
                }}>
                Sign Out
              </a>
            </div>
            <div className=' px-2 py-1 hover:bg-gray-200'>
              <a
                className='hover:text-indigo-600 active:text-indigo-600 '
                onClick={() => {
                  router.push(`/profile?person=${currentName}`)
                }}>
                Profile
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <button
        className={className}
        onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default LoginButton
