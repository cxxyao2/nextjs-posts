import { useSession, signIn, signOut } from 'next-auth/react'
type LoginButtonProps = {
  className: string
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div className=' relative group p-2 rounded-md hover:bg-indigo-400 hover:text-white flex flex-col justify-center'>
          <span>{(session?.user?.name ?? '').slice(0, 8)}</span>
          <div
            className=' hidden absolute rounded-md shadow-sm shadow-gray-400 left-0 p-2 top-full whitespace-nowrap  text-xs group-hover:block bg-white text-gray-800 transition-all duration-300 ease-in-out'
            onClick={() => signOut()}>
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
