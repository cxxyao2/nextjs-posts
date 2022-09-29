import { useSession, signIn, signOut } from 'next-auth/react'
type LoginButtonProps = {
  className: string
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const { data: session } = useSession()
  if (session) {
    let currentName = session?.user?.name
    if (currentName) {
      let index = currentName.indexOf('@')
      if (index >= 0) currentName = currentName.slice(0, index)
    }
    return (
      <>
        <div className=' relative group p-2 rounded-md hover:bg-indigo-400 hover:text-white flex flex-col justify-center'>
          <span>{currentName}</span>
          <div
            className=' hidden absolute rounded-md shadow-sm shadow-gray-400 left-0 p-2 top-full whitespace-nowrap  text-xs group-hover:block bg-white text-gray-800 transition-all duration-300 ease-in-out'
            onClick={() => {
              localStorage.removeItem('tokenFromServer')
              signOut()
            }}>
            Sign Out
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
